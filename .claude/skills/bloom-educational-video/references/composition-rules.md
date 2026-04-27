# Composition Rules

After scanning the script with [beat-library.md](beat-library.md) and proposing a beat list, validate against these rules. **Reject or swap any beat that violates them.**

## Required structure

1. **First beat must be Hook (or a Hook variant).** Always. If the script doesn't open with friction or intrigue, write a Hook line yourself before generating VO.

2. **Last beat must be Tease or CTA-close.** No lesson ends mid-thought. Pick:
   - **Tease** — if there's a follow-up lesson ("next, lesson 2 is about…")
   - **CTA-close** — if standalone ("get Bloom and start now")

3. **Hook + (one or more middle beats) + close** — minimum viable structure is **3 beats**, but most lessons land 6-13.

## Visual rhythm

4. **No two consecutive beats with the same background color.**
   Backgrounds alternate by intent:
   - `#1658FF` Bloom blue → energy, brand, payoff
   - `#FFFFFF` white → clarity, breathing room
   - `#F8F8F9` soft gray → neutral data, "your turn" moments
   
   If your proposed sequence has two same-bg beats in a row, swap one to its alt-bg variant (Concept can be white or blue; Stat-reveal can be gray or blue; Hook is always blue).

5. **No two consecutive beats with the same scaffold.**
   The library has 14 distinct scaffolds. If your sequence has Stat-reveal → Stat-reveal back-to-back with the same scaffold, that's a Stat-comparison (one composite beat) — switch the second to its emphatic variant (different bg, different sizing, particle burst).

## Pairing rules

6. **Try-it must be paired with a Reveal beat (Brand-reveal or Stat-reveal).**
   Try-it without a reveal feels like an unanswered prompt. Either:
   - Add a Brand-reveal/Stat-reveal right after, OR
   - Drop the Try-it (the script's prompt was rhetorical without an answer in the text)
   
   Exception: if the Try-it explicitly tells the viewer to think and the script intentionally doesn't answer ("now think about your own list…"), it can stand alone — but that's rare for Bloom lessons.

7. **Stat-comparison is two consecutive Stat-reveal beats.** Count as 2 beats, but treat as one comparison moment. The second has emphasis (color shift, confetti, particle burst). Cannot have other beats between them.

8. **Brand-reveal continues Try-it's scene.** They share a `<div class="scene">` block. Don't write `tl.set("#sceneN", { visibility: "hidden" })` between them. The reveal is a continuation animation, not a new scene.

## Length & pacing

9. **Target average beat duration: 4-7s.** Compute `total_duration / beat_count`:
   - 45s / 8 beats = 5.6s avg ✓
   - 60s / 11 beats = 5.5s avg ✓
   - 60s / 5 beats = 12s avg ✗ (beats too long, lesson drags)
   - 45s / 14 beats = 3.2s avg ✗ (beats too tight, viewer can't read)

10. **Individual beat range: 2-9s.** Below 2s and the viewer can't process the visual; above 9s and the energy collapses. If a beat needs more time, it's actually two beats — split it.

11. **Min 4 beats, max 13 beats.** Below 4 = not a lesson, just a card. Above 13 = the script is too long for short-form; trim to 60-90s of speech.

## Hard rules (carried over from skill-level)

12. **No emojis** in any beat copy or visual.
13. **Logo containers must be dark `#1C2329`** for any beat showing ticker logos (white-on-transparent logos vanish on light bg).
14. **Animations LAND on keyword** — schedule entrances at `wordStart - duration`.
15. **Visibility-kill `tl.set` after each beat exit** to prevent ghosting.

## Validation checklist

Before moving to Step 4 (storyboard), confirm your proposed beat sequence passes:

- [ ] Starts with Hook
- [ ] Ends with Tease or CTA-close
- [ ] No two consecutive same-bg
- [ ] No two consecutive same-scaffold (except Stat-comparison's intentional pair)
- [ ] Every Try-it has a paired Reveal
- [ ] Total duration / beat count is between 4 and 7s
- [ ] No individual beat outside 2-9s range
- [ ] Beat count is 4-13
- [ ] No emojis
- [ ] No light-bg logo containers

If any rule fails, swap or restructure before proceeding. The rules are cheap to enforce now and expensive to fix later in Step 6.

## Worked example: rule application

Source script: "Did you know you can make money while you're sleeping? Investing equals buying anything that can grow in value — like sneakers, houses, or stocks. Saving alone won't get you rich, but investing makes your money work for you. $30 a month saved becomes $16,000 by 65. But $30 invested becomes $380,000! It takes time, patience, and discipline. Bloom will teach you how."

**Initial trigger scan:**

| Line | Beat |
|---|---|
| "make money while you're sleeping?" | Hook (blue) |
| "Investing = buying anything that grows" | Concept (white) |
| "sneakers, houses, or stocks" | Examples (blue) |
| "Saving won't get you rich, but investing…" | Reframe (white) |
| "$30 saved → $16,000" | Stat-reveal A (gray) |
| "$30 invested → $380,000" | Stat-reveal B (blue) — Stat-comparison continuation |
| "time, patience, discipline" | Insight 3-word (blue) |
| "Bloom will teach you" | Tease (blue) |

**Validation:**
- ✅ Starts with Hook
- ✅ Ends with Tease
- ✅ Stat-comparison correctly placed (gray → blue with emphasis)
- ❌ Stat-reveal B blue → Insight blue → Tease blue → 3 same-bg in a row
- 8 beats × 44s = 5.5s avg ✓

**Fix:** Insight → switch bg to white (still works — spinning star + headline badge work on white too). Resulting sequence: blue → white → blue → white → gray → blue → white → blue.

**After fix:**
- ✅ All 15 rules pass
- ✅ Variety: 4 blue / 3 white / 1 gray
- ✅ Stat-comparison emphasis preserved
- ✅ 8 beats, ~5.5s avg

Ready for storyboard.
