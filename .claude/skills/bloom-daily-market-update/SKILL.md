---
description: Create the day's Bloom Daily Market Update — a 30–45s vertical short narrating today's market action, with on-brand kinetic typography and 3D-asset hero shots. Use ONLY when the user explicitly types `/bloom-daily-market-update <date>` (or omits date for today). Do NOT auto-trigger on related keywords like "market video" or "today's recap" — wait for the explicit slash command. Sibling skill to bloom-educational-video — same brand DNA + HyperFrames pipeline, different unit of work (data-led, format-recurring, every day).
---

# Bloom Daily Market Update

## When to fire

ONLY when the user explicitly types `/bloom-daily-market-update [date]`. The date is optional — defaults to today (`YYYY-MM-DD`). Never auto-trigger on phrases like "make today's market video" or "do the daily recap" — wait for the explicit slash command.

## What we're building

- **Length:** 30–45s vertical 1080×1920 portrait
- **Voice:** Selma (ElevenLabs v3, voice ID `JZ3e95uoTACVf6tXaaEi`)
- **Tone:** Bloom's Gen-Z trusted-older-sibling — confident, energetic, clear
- **Project location:** `videos/bloom-market-<date>/`
- **Recurring format:** new VO every day, the visual grammar is locked but the AI is free to compose each beat differently within the rules

## Sibling skill: `bloom-educational-video`

Brand DNA, pipeline, and helpers are shared. Reuse without rewriting:

- **Brand DNA & components:** [`../bloom-educational-video/DESIGN.md`](../bloom-educational-video/DESIGN.md) — palette, typography, logo orb, CTA pill, do's/don'ts
- **Asset gen prompts (Higgsfield):** [`../bloom-educational-video/references/higgsfield-prompts.md`](../bloom-educational-video/references/higgsfield-prompts.md)
- **Animation techniques:** [`../bloom-educational-video/references/techniques.md`](../bloom-educational-video/references/techniques.md) — Canvas tickers, SVG sparkline draw-in, counter animations
- **Timing helpers:** [`../bloom-educational-video/references/timing-helpers.md`](../bloom-educational-video/references/timing-helpers.md) — `landOn(phrase, dur)`
- **VO script tooling:** repo-root `generate-vo.mts` (zero changes)

## Pipeline (8 steps)

| # | Step | Reference |
|---|---|---|
| 1 | Hand the user a research-agent prompt; when they paste back the script, save to `scripts/bloom-market-<date>.json` | [`references/step-1-script.md`](references/step-1-script.md) |
| 2 | Generate VO + word timing | [`../bloom-educational-video/references/step-3-vo.md`](../bloom-educational-video/references/step-3-vo.md) |
| 3 | Map narration words → 8–16 beats (each 1.5–7s, anchored to keyword onsets) | [`references/motion-rules.md`](references/motion-rules.md) |
| 4 | For each beat, decide what to show — pick from visual vocabulary or invent | [`references/visual-vocabulary.md`](references/visual-vocabulary.md), [`references/decision-heuristics.md`](references/decision-heuristics.md) |
| 5 | Generate any net-new assets via Higgsfield, chroma-key, drop into `generated-assets/` | [`../bloom-educational-video/references/higgsfield-prompts.md`](../bloom-educational-video/references/higgsfield-prompts.md) |
| 6 | Build each beat inline in `index.html` — wire VO timing, animations, layouts | [`references/motion-rules.md`](references/motion-rules.md), [`references/typography-rules.md`](references/typography-rules.md) |
| 7 | Iterate visually: snapshot → user feedback → refine. **Never render unless user explicitly says "render"** | [`references/iteration-loop.md`](references/iteration-loop.md) |
| 8 | After approval, render final MP4 | `npx hyperframes render videos/bloom-market-<date> -q draft -o videos/bloom-market-<date>/renders/v1.mp4` |

## Hard rules (non-negotiable)

These are enforced regardless of what's in the script:

1. **No beat shorter than 1.5s.** If a moment lands < 1.5s, fold it into the adjacent beat (e.g. RECORD HIGH stamp folded into Tickers in 04-28).
2. **No beat longer than 7s.** Above this, attention drops.
3. **Continuous animation throughout every beat.** No "still after entrance" — eye must always have something to track.
4. **For 5–7s beats, cross-cut**: BG holds, props slide IN → perform → slide OUT, next prop enters. (Pattern: 04-28 Beat 9-11 oil → sticky → fed.)
5. **No text below 20px.** Period. No "garbage" small text — meta-rows, redundant footers, decorative captions that don't drive story.
6. **No emoji or emoji-equivalent icons.** Existing Bloom rule.
7. **Snapshot, don't render, during iteration.** Renders are expensive — only on explicit "render" from user.
8. **Reuse before regenerating.** Check existing `generated-assets/`, ticker logos, and prior projects before firing Higgsfield.

## Three-layer architecture

The reason this skill works as a recurring format:

| Layer | Unit | Brand-locked? | Reused daily? |
|---|---|---|---|
| **Components** (atoms) | shimmer-sweep, grain-overlay, idx-card class, race-card class, signal-stamp class, chart-card class | Yes — frozen styles | Every day |
| **Beats** (scenes) | Compositions of components plus ad-hoc layouts. AI composes these freely per-day, guided by `decision-heuristics.md` | No | Structure varies day-to-day |
| **Storyboard** (the day's video) | Beat ordering + VO data binding from today's narration | No | Fresh per day |

This is the **opposite balance** of `bloom-educational-video`, which puts most work in the beat layer because each lesson is a unique narrative. Daily updates: invest in atoms once, daily work is just orchestration + creative composition.

## Frozen choices (don't ask the user)

- **Voice:** ElevenLabs v3, voice ID `JZ3e95uoTACVf6tXaaEi`
- **Resolution:** 1080×1920 @ 30fps
- **Audio tracks:** track 0 = narration, track 2 = optional bg music (with `data-media-start` to skip silent intros)
- **Project location:** `videos/bloom-market-<date>/`
- **Brand palette:** Bloom blue `#1658FF`, ink `#1C2329`, green `#01CD74`, yellow `#FFC847`, red `#FF5252`, off-white `#F8F8F9`
- **Display typography:** Inter Tight 800 italic for headlines / hero numbers / index names
- **Asset chroma-key:** generate on magenta `#FF00FF`, key out via `ffmpeg colorkey=0xff00ff:0.40:0.30,format=rgba`

## Evolution

Beats discovered for the day that don't fit existing patterns get logged in [`PROMOTIONS.md`](PROMOTIONS.md) for future review. Don't over-engineer — log + continue.
