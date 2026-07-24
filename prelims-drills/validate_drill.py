#!/usr/bin/env python3
"""
validate_drill.py — mechanical gate for generated UPSC Prelims drills.

Enforces the STYLE_CODEX schema + anti-bias statistics. Run before shipping ANY drill.

Usage:
    python3 validate_drill.py drills/modern-history-01-foundation-of-congress.html
    python3 validate_drill.py drills/some_drill.html --topics 89-110

Exit 0 = all HARD checks pass. Non-zero = at least one hard failure. WARNINGS never fail the
build but should be justified or fixed. Requires: node on PATH (to evaluate the BANK literal).
"""
import sys, re, json, subprocess, tempfile, os, collections, argparse

FIXED_OPTION_SIGNATURES = [
    "1 only", "2 only", "both 1 and 2", "neither 1 nor 2",
    "only one", "only two", "only three", "only four", "all three", "all four", "all five", "none",
    "1 and 2 only", "2 and 3 only", "1 and 3 only", "1, 2 and 3",
    "correct explanation", "not the explanation", "ii explains i",
    "there is only one correct statement", "there are two correct statements",
]

def die(msg):
    print(f"\n\033[31mVALIDATION ERROR:\033[0m {msg}"); sys.exit(2)

def extract_script(html):
    parts = html.split("<script>")
    if len(parts) < 2: die("no <script> block found")
    return "\n".join(p.split("</script>")[0] for p in parts[1:])

def extract_bank_literal(script):
    m = re.search(r'\bBANK\s*=\s*\[', script)
    if not m: die("could not find `BANK = [` assignment")
    i = m.end() - 1; depth = 0; j = i; in_str = False; esc = False; quote = ""
    while j < len(script):
        c = script[j]
        if in_str:
            if esc: esc = False
            elif c == "\\": esc = True
            elif c == quote: in_str = False
        else:
            if c in "\"'`": in_str = True; quote = c
            elif c == "[": depth += 1
            elif c == "]":
                depth -= 1
                if depth == 0: return script[i:j+1]
        j += 1
    die("unterminated BANK array literal")

def bank_to_json(literal):
    harness = "const B=" + literal + ";process.stdout.write(JSON.stringify(B));"
    with tempfile.NamedTemporaryFile("w", suffix=".js", delete=False) as f:
        f.write(harness); path = f.name
    try:
        out = subprocess.run(["node", path], capture_output=True, text=True)
    finally:
        os.unlink(path)
    if out.returncode != 0: die("BANK is not valid JS:\n" + out.stderr[:800])
    return json.loads(out.stdout)

def pct(n, d): return (100.0 * n / d) if d else 0.0
TAGS = re.compile(r"<[^>]+>")
STMT = re.compile(r"<span class='stmt'>(.*?)</span>", re.S)
PASSAGE = re.compile(r"<blockquote class='passage'>(.*?)</blockquote>", re.S)
LABEL = re.compile(r"^\s*(?:Statement[-\s]?[IVX]+\s*:|Assertion\s*:|[IVX]+\.|\d+\.)\s*")

def plain(s): return re.sub(r"\s+", " ", TAGS.sub(" ", str(s))).strip()
def wc(s): return len(s.split())

def statements(q):
    out = []
    for raw in STMT.findall(q.get("q", "")):
        t = plain(raw)
        if re.match(r"^\s*(Statement|Assertion)\b", t): continue
        out.append(LABEL.sub("", t))
    return out

def depth_checks(bank, N, warn):
    PROSE = {"B", "D", "E", "H", "I"}
    all_st, members = [], []
    for q in bank:
        st = statements(q); f = q.get("fmt")
        (all_st if (f in PROSE or (f is None and any(wc(s) >= 8 for s in st))) else members).extend(st)
    if members: print(f"Membership-list members: {len(members)} enumerated entities (not held to word floor)")
    if all_st:
        thin = [s for s in all_st if wc(s) < 18]; mean_w = sum(wc(s) for s in all_st) / len(all_st)
        print(f"Statement density: {len(all_st)} statements | mean {mean_w:.1f} words | {pct(len(thin),len(all_st)):.0f}% under 18w")
        if mean_w < 18 or pct(len(thin), len(all_st)) > 40:
            warn.append(f"stmt-thin: statements average {mean_w:.1f}w, {pct(len(thin),len(all_st)):.0f}% under 18w. "
                        f"Real papers run ~20w with a qualifier (cap/tenor/base/Act/authority) — the trap lives there (Codex §3.5).")
    counts = [len(statements(q)) for q in bank]; b_items = [c for c in counts if c >= 2]
    if b_items:
        multi = [c for c in b_items if c >= 3]
        if pct(len(multi), len(b_items)) < 30:
            warn.append(f"stmt-count-monotony: only {pct(len(multi),len(b_items)):.0f}% of multi-statement items carry >=3 statements (<30%).")
        if max(counts) < 5:
            warn.append(f"stmt-count-monotony: longest list is {max(counts)} items — include one 5–6 member count item.")
    sb_means = []
    for q in bank:
        opts = [plain(o) for o in q["o"]]
        if any(any(sig in o.lower() for sig in FIXED_OPTION_SIGNATURES) for o in opts): continue
        sb_means.append(sum(wc(o) for o in opts) / 4)
    if sb_means:
        m = sum(sb_means) / len(sb_means)
        print(f"Option density (free-text items): mean {m:.1f} words  (target >=9)")
        if m < 9:
            warn.append(f"option-thin: free-text options average {m:.1f}w (<9). Put the TERM in the stem and four 15–35w mechanisms in the options (Codex §3-A inversion).")
    fmts = [q.get("fmt") for q in bank if q.get("fmt")]
    if len(fmts) < N:
        warn.append(f"fmt-undeclared: only {len(fmts)}/{N} items declare `fmt` — format-mix gates cannot run.")
    if fmts:
        fc = collections.Counter(fmts)
        print("Format mix: " + "  ".join(f"{k}={v} ({pct(v,len(fmts)):.0f}%)" for k, v in sorted(fc.items())))
        if pct(fc.get("C", 0), len(fmts)) < 20:
            warn.append(f"format-C-thin: Format C is {pct(fc.get('C',0),len(fmts)):.0f}% (<20%); it is ~24% of the real paper.")
        if fc.get("F", 0) > 2:
            warn.append(f"format-F-heavy: {fc['F']} Format-F items (cap 2) — invert into Format A.")
        for k, v in fc.items():
            if pct(v, len(fmts)) > 28:
                warn.append(f"format-dominant: Format {k} is {pct(v,len(fmts)):.0f}% (>28%).")
        if len(bank) >= 25 and not fc.get("H"):
            warn.append("Format-H indirection absent from a set of >=25.")
        d_idx = [i for i, q in enumerate(bank) if q.get("fmt") == "D"]
        if len(d_idx) >= 4 and 3 not in {bank[i]["a"] for i in d_idx}:
            warn.append("D-key-range: multiple Statement-I/II items and none keyed (d) — write one where I is the misconception.")
    for idx, q in enumerate(bank):
        for p in PASSAGE.findall(q.get("q", "")):
            n = wc(plain(p))
            if n < 60 and (q.get("fmt") == "J" or "scenario" in str(q.get("type", "")).lower()):
                warn.append(f"scenario-thin: Q#{idx+1} scenario is {n}w (<60). Run 60–100w with >=2 specifics and a ruling-out clause.")
    axes = collections.defaultdict(list)
    for idx, q in enumerate(bank):
        if q.get("axis"): axes[(q.get("t"), str(q["axis"]).strip().lower())].append(idx + 1)
    for (t, ax), idxs in {k: v for k, v in axes.items() if len(v) > 1}.items():
        warn.append(f"axis-repeat: t={t} tests axis '{ax}' in Q#{idxs} — no two items on a node may share an axis.")
    layers = [q["layer"] for q in bank if isinstance(q.get("layer"), int)]
    if layers:
        deep = [l for l in layers if l >= 3]
        print(f"Depth layers on {len(layers)}/{N} items | layer 3+: {pct(len(deep),len(layers)):.0f}%  (target >=50%)")
        if pct(len(deep), len(layers)) < 50:
            warn.append(f"depth-shallow: only {pct(len(deep),len(layers)):.0f}% at layer 3+ (<50%).")
    else:
        warn.append("depth-shallow: no `layer` field declared — depth gate could not run.")

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("html"); ap.add_argument("--topics", default=None)
    args = ap.parse_args()
    html = open(args.html, encoding="utf-8").read()
    script = extract_script(html); bank = bank_to_json(extract_bank_literal(script)); N = len(bank)
    if N == 0: die("BANK is empty")
    hard_fail, warn, keys = [], [], []
    for idx, q in enumerate(bank):
        o = q.get("o"); a = q.get("a"); tag = f"Q#{idx+1} (t={q.get('t')})"
        if not isinstance(o, list) or len(o) != 4:
            hard_fail.append(f"{tag}: must have exactly 4 options")
        if not isinstance(a, int) or a not in (0, 1, 2, 3):
            hard_fail.append(f"{tag}: answer index `a` must be 0-3 (is {a})")
        else: keys.append(a)
        if "t" not in q: hard_fail.append(f"{tag}: missing topic field `t`")
        if not q.get("q"): hard_fail.append(f"{tag}: empty stem `q`")
    kc = collections.Counter(keys)
    print("\nKey distribution (a/b/c/d): " + "  ".join(f"{'abcd'[i]}={kc.get(i,0)} ({pct(kc.get(i,0),len(keys)):.0f}%)" for i in range(4)))
    for i in range(4):
        share = pct(kc.get(i, 0), len(keys))
        if share > 45: hard_fail.append(f"key bias: '{'abcd'[i]}' is {share:.0f}% of answers (>45%).")
        elif share < 8 and len(keys) >= 12: warn.append(f"key almost unused: '{'abcd'[i]}' is only {share:.0f}%.")
    long_key = 0
    for q in bank:
        lens = [len(str(x)) for x in q["o"]]; ck = lens[q["a"]]
        others = sorted(l for i, l in enumerate(lens) if i != q["a"]); runner = others[-1] if others else 0
        if ck == max(lens) and runner and ck > 1.35 * runner and ck > 1.35 * (sum(lens) / 4): long_key += 1
    if pct(long_key, N) > 20:
        warn.append(f"length tell: correct option is lone-longest by >35% in {pct(long_key,N):.0f}% of Qs (>20%).")
    topics = sorted({q["t"] for q in bank if isinstance(q.get("t"), int)})
    per = collections.Counter(q["t"] for q in bank if isinstance(q.get("t"), int))
    if args.topics:
        lo, hi = (int(x) for x in args.topics.split("-"))
        missing = [i for i in range(lo, hi + 1) if i not in topics]
        if missing: hard_fail.append(f"coverage: nodes with zero questions: {missing}")
    print(f"Nodes covered: {len(topics)} | per-node: {dict(sorted(per.items()))}")
    print()
    depth_checks(bank, N, warn)
    ents = set()
    for q in bank:
        text = plain(q.get("q", "")) + " " + " ".join(plain(o) for o in q["o"])
        for m in re.findall(r"\b(?:[A-Z][a-z]+(?:\s+(?:of|and|the))?\s+){1,4}[A-Z][a-z]+\b|\b[A-Z]{2,6}\b", text):
            if m.lower() not in ("the", "which", "consider", "statement", "with", "select"): ents.add(m.strip())
    print(f"Named real entities (approx distinct): {len(ents)}  (target >= {N//2})")
    if len(ents) < N // 2:
        warn.append(f"entity-sparse: ~{len(ents)} distinct named entities across {N} items (target >= {N//2}).")
    print(f"\nTotal questions: {N}")
    if warn:
        print(f"\n\033[33mWARNINGS ({len(warn)}):\033[0m")
        for w in warn: print("  • " + w)
    if hard_fail:
        print(f"\n\033[31mHARD FAILURES ({len(hard_fail)}):\033[0m")
        for h in hard_fail: print("  x " + h)
        sys.exit(1)
    print("\n\033[32m✓ All hard checks passed.\033[0m" + ("  (address warnings above.)" if warn else ""))
    sys.exit(0)

if __name__ == "__main__":
    main()
