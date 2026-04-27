# Step 3 — Generate Voiceover + Word Timing

ElevenLabs v3 narration with word-level timestamps.

## Run

```bash
cd hyperframes
node --strip-types --env-file=../.env generate-vo.mts bloom-<slug> --model=eleven_v3
```

This reads `scripts/bloom-<slug>.json`, calls ElevenLabs v3 with voice ID `JZ3e95uoTACVf6tXaaEi`, and writes:

- `assets/voiceover/bloom-<slug>/scene-01.mp3`
- `assets/voiceover/bloom-<slug>/scene-01.timing.json` (word-level timestamps in sec + frames @30fps)
- `assets/voiceover/bloom-<slug>/timing.json` (combined manifest)

## Copy into project

```bash
cp hyperframes/assets/voiceover/bloom-<slug>/scene-01.mp3 \
   hyperframes/videos/bloom-<slug>/narration.mp3

cp hyperframes/assets/voiceover/bloom-<slug>/scene-01.timing.json \
   hyperframes/videos/bloom-<slug>/transcript.json
```

## Map word timings to beat boundaries

For each beat, identify the **first** and **last** word in `transcript.json` and compute:

- `beatStart` = first word's `start`
- `beatEnd` = last word's `end` + small tail (or = next beat's first word's `start` - small lead-in)

In practice, set `beatStart[N+1]` slightly before the next beat's first word so the crossfade transitions naturally.

Record beat boundaries in a small markdown table for use in Step 4.

## Keyword onsets — resolved at runtime, not extracted manually

You no longer need to extract per-keyword onset times into a constants table. Step 6 inlines the transcript into `index.html` and uses [`landOn(phrase, duration)`](../references/timing-helpers.md) to resolve word timings at composition load. The phrases live in your storyboard (e.g. "land on `sneakers`", "land on `eighty thousand dollars`") and the helper does the lookup.

**Do still note candidate keywords in your storyboard** — the helper only finds words that exist in the transcript, and disambiguation requires you to know whether a word repeats. Skim the transcript once for repeated words ("but", "investing", "stocks") and write the disambiguating phrase in your storyboard so Step 6 can paste it straight in.

## Save the timings

Write a `BEATS.md` (or extend STORYBOARD.md in Step 4) with the beat boundary + keyword onset table. Example:

```
| Beat | Start | End | Duration | Keyword onset(s) |
|------|-------|-----|----------|------------------|
| 1    | 0.00  | 2.62 | 2.62 | intimidating @ 1.498 |
| 2    | 2.62  | 5.55 | 2.93 | already @ 3.242 |
| 3    | 5.55  | 10.34 | 4.79 | brands @ 7.096, every @ 7.839 |
| 4    | 10.34 | 16.32 | 5.98 | phone @ 11.342, shoes @ 12.861, drink @ 14.540 |
...
```

## Gate

- [ ] `narration.mp3` and `transcript.json` exist in `videos/bloom-<slug>/`
- [ ] Total duration is in the 45-90s range
- [ ] Beat boundaries computed
- [ ] Keyword onsets extracted for every animation that needs sync
