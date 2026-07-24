# Prelims Drill — Style Codex (Adarsh's UPSC prep)

The rulebook for generating exam-grade Prelims MCQ drills. Adapted for all GS subjects
(History, Polity, Geography, Economy, Environment, S&T) and the Sociology optional.

## Schema (every question object)
```
{ t, g, fmt, layer, axis, type, hard, q, o, a, e }
```
- `t` — topic/node number (from the subject's numbered lexicon).
- `g` — group key (a cluster of nodes).
- `fmt` — Codex format letter (A–L, below). **Required** so the validator can check the mix.
- `layer` — depth layer 1–5 (below). **Required**; aim ≥50% at layer 3+.
- `axis` — the specific property being tested (e.g. "founder", "powers", "chronology").
  No two items on the same `t` may share an `axis`.
- `type` — human label ("Statements", "How many", "Scenario"…).
- `hard` — boolean.
- `q` — stem (HTML ok: `<span class='stmt'>…</span>`, `<blockquote class='passage'>…</blockquote>`, `.pairs` table).
- `o` — exactly 4 options. `a` — correct index 0–3. `e` — explanation that **names the trap type**.

## Formats (target mix, from real ForumIAS papers)
- **A** single-best / term-identification — ~22%. Prefer the **inverted** form (term in stem, four 15–35-word mechanisms as options).
- **B** "which statement(s) is/are correct" — ~26%. ≥30% of these carry **≥3 statements**.
- **C** "how many" / membership counts — **~24% (the workhorse)**; include items with **5–6 listed members**.
- **D** Statement-I/II — ~12%. Include at least one keyed **(d)** (I is the misconception, II corrects it).
- **G** pairs / match — ~2–8%. **H** indirection — ~4–7%. **J** scenario — ~8% (60–100 words, ≥2 concrete specifics, closing clause rules out the first-instinct answer).
- **E** assertion, **F** pure description→label (**cap 2 per set** — it is the easy direction; invert into A), **I/K/L** sequence/numerical.

## Five depth layers (§2.5)
1. Definition. 2. Direction of effect. 3. **Boundary / cap / number / eligibility.**
4. **Locus / authority / statute / who-decides.** 5. **Membership / list / cross-topic.**
Layers 1–2 are scaffolding. The paper is won at 3–5 → **≥50% of items must be layer 3+**.

## Statement construction (§3.5)
- Prose statements: **≥18 words**, carrying a **qualifier clause** (a percentage, tenor, base,
  Act, authority, or eligibility condition) — **the qualifier is where the falsehood is planted.**
- Membership-list members may be short (bare named entities).

## Trap taxonomy (§5 — name the trap in every `e`)
named-entity confusion · wrong-number/base · absolute-qualifier ("only", "always") ·
swapped-body/author/founder · definition-swap · statutory-locus · period/era mismatch ·
cross-topic red herring · direction-reversal · true-but-not-the-explanation.

## Anti-bias (checked by the validator)
- No answer key >45% of one position; keep a/b/c/d reasonably spread.
- **No length tell** — the correct option must not be the lone-longest.
- Named real entities dense (target ≥ N/2 distinct) — they make distractors hard.
- Full coverage of the declared lexicon range; avoid single-question nodes.

## Build workflow
1. Fix the subject + lexicon node range. 2. List each node's property-axis matrix and a
   named-entity inventory. 3. Draft to the format mix and depth bands, declaring `fmt/layer/axis`.
4. Run `python3 validate_drill.py drills/<file>.html` → fix hard failures, justify warnings.
5. Ship. Periodically **gap-analyse** a drill against a real mock and fold fixes back here.
