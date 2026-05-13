# Motion Rules (non-negotiable)

These rules are enforced regardless of script content. They exist because we discovered (the hard way) that violating them produces choppy or empty-feeling beats.

## Beat duration

| Range | Pattern |
|---|---|
| **< 1.5s** | ❌ NEVER. If a script moment is shorter, **fold it into the adjacent beat** as a sub-action. |
| **1.5–3s** | Single move: entrance + small idle wobble or held gradient breathe |
| **3–5s** | Two-stage: entrance → callout / pulse / sub-element entrance |
| **5–7s** | **Cross-cut**: BG holds, multiple subjects slide IN → perform → slide OUT, next subject enters. AE-editor style. |
| **> 7s** | ❌ NEVER. Cut into multiple beats — attention drops past 7s. |

### Examples from `videos/bloom-market-2026-04-28/index.html`

- **1.5–3s short slam**: Beats 12 / 13 / 14 (BULLISH / CAUTIOUS / FOCUSED) — single hero word + arrow + pill, brief idle wobble.
- **3–5s two-stage**: Beat 8 CRACKS — chart line draws (1.5s), shatter cracks fan out (1.5s), headline stamps (1s).
- **5–7s cross-cut**: Beats 9–11 PRESSURE (7s) — oil barrel slides in from L → out R → honey blob rises ↑ → exits ↑ → fed pillar rises ↑ + ?'s pop. Same dark-navy stage holds throughout. THIS IS THE GOLD STANDARD.

## Continuous animation

**Every beat must have something animating throughout its full duration.** No element should sit completely static after its entrance. Options:

- Idle wobble on 3D-card heroes (rotateY ±2° over 2s sine.inOut yoyo)
- Slow rotation on 3D coins / objects
- Counter ticker on big numbers
- Slow camera dolly in 3D scenes (`camera.position.z` tween)
- Drift / parallax on BG depth panels
- Stroke-dashoffset draw-in for sparklines (use over the FULL beat, not just first 0.5s)
- Color tint shifts (red → honey-yellow on freeze moments)

If you can't think of a continuous animation, the beat is too long — split it.

## Cross-cut pattern (for 5–7s beats)

The signature move from 04-28 Beat 9–11. Use whenever a single beat covers multiple distinct subjects:

```
t=0.0  ─┬─ BG fades in, eyebrow + depth panels persist for whole beat
        │
t=0.5  ─┴─ Subject A slides IN from LEFT (motion-blur smear, settle)
t=1.0   ──  Subject A holds (idle wobble) + companion overlay (callout/pill) pops
t=2.0  ─┬─ Subject A slides OUT to RIGHT
t=2.0  ─┴─ Subject B rises IN from BELOW (different entry direction = visual variety)
t=2.5   ──  Subject B holds + companion text stamps in
t=3.5  ─┬─ Subject B exits (shrink up + fade)
t=3.5  ─┴─ Subject C rises IN from BELOW
t=5.5   ──  Subject C's accent moment (e.g. ?'s pop)
t=7.0  ───  Beat ends (next beat's visibility kicks in)
```

Rules within cross-cut:
- **BG always holds** — eyebrow + depth panels never disappear mid-beat
- **Each subject enters from a DIFFERENT direction** (don't have all three slide from left — gets monotonous)
- **Exits use motion-blur via x-translate + opacity fade** so it reads as "swept off"
- **Overlap exits and entrances by ~0.1–0.2s** so there's never empty-frame in the middle

## Anchor every animation to a VO word

Use the timing.json word-level timestamps. Every entrance / exit / callout / pulse should land within ~50ms of a spoken keyword. Not before, not after, not "around."

Example word landmarks from a real beat (Pressure 19.5–26.5):

| Time | Word | Action |
|---|---|---|
| 19.55 | "other big story" | eyebrow fades in |
| 20.70 | **oil** | barrel slides in from L, lands |
| 21.43 | "Higher energy" | $93 pill pops at barrel side |
| 22.58 | "inflation" | barrel exits R + honey blob rises ↑ |
| 23.17 | **sticky** | STICKY word stamps next to honey |
| 24.49 | "Fed's path" | honey exits + fed pillar rises ↑ |
| 25.17 | "harder to read" | 3 ?'s pop at pillar top |

If your beat doesn't have at least 4–6 word-anchored moments per ~5s, it's likely too sparse.

## Entrance / exit vocabulary

Enter directions to vary across beats:

- Slide in from LEFT (`x: -1200 → 0`) — most "TV-graphic" feel
- Slide in from RIGHT (`x: 1200 → 0`) — counterpart to left
- Rise UP from below (`y: 1200 → 0`) — solid for "appearing on stage"
- Drop DOWN from above (`y: -800 → 0`) — for stamps, slams
- Scale IN with rotation (`scale: 0.4, rotation: -16 → scale: 1, rotation: -8`) — for stamps, accents
- Z-axis fly in (Three.js scene) — for 3D heroes (`camZ: 11 → 8.8`)
- Glass-card flip (`rotationX: 18 → 8, rotationY: -14 → -3`) — for ticker boards (subtle, do not clip content)

Exit directions usually MIRROR or COMPLEMENT the entrance:

- Slide out to OPPOSITE side from entry
- Shrink + fade UP for exits before a slam
- Scale up + fade out for "energy dissipating"

## What NOT to do

- ❌ Element sits motionless after entrance for > 1s
- ❌ Two elements in the same beat both enter from the same direction
- ❌ Beat under 1.5s (it's a flash, not a moment)
- ❌ Beat over 7s (split into two)
- ❌ Solid-color hero slam with NO movement at all between entrance and end
- ❌ Sparkline that draws in 0.4s and then sits motionless for the next 3s — extend the draw or add a continuous secondary animation
