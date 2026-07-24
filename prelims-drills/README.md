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
| Subject | Topic | File |
|---|---|---|
| Modern History | Foundation of the INC, Moderates & Extremists, Councils Acts 1861 & 1892 | `drills/modern-history-01-foundation-of-congress.html` |
