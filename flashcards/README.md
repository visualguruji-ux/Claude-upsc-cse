# 🃏 Flashcards — Active Recall + Spaced Repetition

Self-contained HTML flashcard apps for quick, high-retention revision. Each file is one
browser app: **no internet, no install** — open it in any browser (phone or laptop) and study.
Progress is saved automatically in that browser (`localStorage`).

## Why this approach (Adarsh asked "flashcards or a better approach?")
**Active recall** (forcing yourself to retrieve the answer before flipping) + **spaced
repetition** (reviewing each card just as you're about to forget it) is the single
best-evidenced study method for a fact-dense syllabus like UPSC. These apps do both:

- **Flip to recall** — question first, answer on the back.
- **Rate your recall** — *Again / Good / Easy* — and the app schedules the card's next
  appearance using a **Leitner-box** system (Again → very soon; Good → a bit later;
  Easy → much later). Cards you know fade out; cards you miss keep coming back.
- **A card is "mastered"** once it reaches box 5 (a ~16-day+ interval).

## How to use
1. Open the `.html` file in a browser (double-click, or **Send to phone** and open there).
2. Pick a **deck** (or keep *All decks*) and a **mode**:
   - **🎯 Review due** — only the cards spaced-repetition says are due today. *Use this daily.*
   - **📚 Learn all** — every card, shuffled (first pass / full revision).
   - **⚠️ Weak spots** — cards you've missed (rated *Again*).
   - **⭐ Starred** — cards you bookmarked with the ☆ button.
3. Tap the card (or **Space**) to flip; rate honestly.

**Keyboard:** `Space` flip · `1` Again · `2` Good · `3` Easy · `S` star · `Esc` back.

> Tip: do **Review due** every morning (5–10 min) and one **Learn all** pass per new topic.
> Honest ratings make the schedule work — don't rate *Good* if you had to peek.

## Decks available

| File | Topic | Cards | Decks |
|---|---|---|---|
| [`modern-history-01-foundation-of-congress.html`](modern-history-01-foundation-of-congress.html) | Foundation of INC · Moderates & Extremists · Councils Acts (1861 & 1892) | 80 | 9 |

> Source: `notes/modern-history/01` & `02` (Bipan Chandra + Spectrum + coaching, web-verified).
> New topics get their own flashcard file as we build the notes.
