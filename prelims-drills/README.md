# Prelims Drills — Adarsh's self-testing pipeline

Interactive, self-contained MCQ drills for UPSC Prelims, with a style codex and a mechanical
validator. Modelled on a rigorous question-factory approach: **lexicon → generate → validate →
(periodically) gap-analyse against real mocks → refine.**

## Files
- `drills/` — the drill apps (open any `.html` in a browser; works offline).
- `STYLE_CODEX.md` — the question-design rulebook (formats, depth layers, traps, anti-bias).
- `validate_drill.py` — mechanical gate; run before shipping any drill.

## Use a drill
Open the `.html` file → pick a group (or "All") → **Start**. Answer (keys 1–4), read the instant
explanation, press Enter for next. The results screen shows accuracy, nodes covered and
**weak spots**, with a **"redo weak spots"** button.

## Validate a new drill
```
python3 validate_drill.py drills/<file>.html            # requires node + python3
python3 validate_drill.py drills/<file>.html --topics 89-110   # enforce full node coverage
```
Exit 0 = hard checks pass. Fix hard failures; justify or fix warnings.

## Current drills
| Subject | Topic | Nodes | Qs | File |
|---|---|---|---|---|
| Modern History | Foundation of the INC, Moderates & Extremists, Councils Acts 1861 & 1892 | 25 | 30 | `drills/modern-history-01-foundation-of-congress.html` |
| Polity | Constitutional framework: evolution 1773–1947, Constituent Assembly, Preamble, Union & territory, Citizenship, FRs, DPSP, Duties, Art. 368 | 24 | 30 | `drills/polity-01-constitutional-framework.html` |

## Authoring conventions
- **Statement labels go *outside* the `.stmt` span** — write
  `<b class='slab'>Statement-I:</b><span class='stmt'>…</span>`, not
  `<span class='stmt'>Statement-I: …</span>`. The validator skips any statement whose text
  begins with "Statement"/"Assertion", so the inline form hides your statements from the
  word-floor check in §3.5.
- Every `fmt` C / B / D / G item should carry at least one option matching a fixed signature
  ("Only two", "1 and 2 only", "correct explanation"…) — that is how the validator knows to
  exempt it from the free-text option-density gate.
- Keep one item per `(t, axis)` pair; give roughly a quarter of the nodes a second question on
  a *different* axis rather than adding new nodes.
