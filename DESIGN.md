# DESIGN.md — 3DM Solutions · Launch Film (cinematic company film)

A ~110s premium launch film for an AI product studio. Register: Apple-level restraint,
OpenAI-level confidence, Linear-level clarity, Stripe-level polish. Calm, intelligent,
ambitious, cinematic. NOT hypey "AI bro", NOT neon cyberpunk, NOT cliché corporate.

## Style Prompt

Deep, cinematic dark. Soft graphite and near-black space lit by restrained deep-blue light
and occasional silver glass highlights. Layered depth — foreground glass, midground content,
background particle/mesh/grid atmosphere with soft volumetric haze and gentle bloom. Huge
confident white typography, tight tracking on display words, small mono metadata. Every scene
breathes with slow continuous camera motion (dolly-in, parallax, 1.02–1.06 scale drift).
Motion is expensive and intentional — expo/quart easing, no bounce, no elastic. Transitions
are motivated: particles reform, glass refracts, cards Flip into new layouts, camera pushes
through typography.

## Colors

| Role                | Hex / value              | Use                                                        |
| ------------------- | ------------------------ | ---------------------------------------------------------- |
| Background black    | `#050505`                | Base                                                       |
| Graphite panel      | `#101114` → `#17181C`    | Cards, panels (glass base)                                 |
| Elevated graphite   | `#1C1D22`                | Raised elements                                            |
| White               | `#F6F7F8`                | Primary type                                               |
| Muted               | `#8A8E99`                | Secondary text, mono metadata                              |
| Dim                 | `#565A66`                | Tertiary labels                                            |
| Accent blue         | `#4D6BFF`                | Restrained accent — key lines, glow, one hero word/scene   |
| Accent blue soft    | `#6E86FF`                | Lighter blue for gradients / hover glow                    |
| Accent blue deep    | `#2D3F99`                | Deep blue for glows / gradient ends                        |
| Glass stroke        | `rgba(255,255,255,0.10)` → `0.18` | Card borders, glass edges                        |
| Hairline            | `#23252B`                | Dividers                                                   |

- **No purple. No neon. No bright saturated gradients.** Gradients only soft/moody/luxurious.
- Blue is *restrained*: think a single cold light source, not a UI theme. One accent moment per scene.
- Silver-glass = white at 10–18% alpha over graphite, with a faint top-edge highlight.
- Glows are blue or neutral-white, radial, low alpha → zero-alpha of the SAME color (never `transparent`).

## Typography

- **Display / body:** `Geist` (weights 300–700). Modern, neutral, premium (Vercel's typeface).
  Tight tracking on huge display words (`-0.03em` to `-0.05em`).
- **Technical metadata / labels / stats:** `Geist Mono` or `IBM Plex Mono` (500–600), slightly
  expanded tracking (`0.1em`–`0.28em`), uppercase. The "machine voice" for years, tags, stat units.
- Hierarchy: huge hero headlines (110–170px) · section labels (44–64px) · small mono metadata
  (18–24px). White display, muted mono. `font-variant-numeric: tabular-nums` on all stats/counters.
- On dark: body weight 350–400, +0.04 line-height. (If `Geist` isn't embeddable, fall back to `Inter`.)

## Motion

- Easing: CustomEase (expo-like), `power4.inOut`, `expo.out`. **No bounce, no elastic.**
- Entrances: SplitText line/word/char reveals with blur→sharp + vertical lift + mask. Stagger 40–90ms.
- ScrambleText: ONLY for decode/AI moments (e.g. "VALIDATE", "OWN YOUR STACK"), never everywhere.
- Flip: card/tile/module layout reorganizations between scenes (ecosystem, services).
- Continuous camera: every scene has slow dolly/parallax/scale-drift; nothing is static.
- Transitions are MOTIVATED (no plain crossfade, no hard cut unless musically hit):
  particle dissolve/reform · glass refract wipe · Flip reorg · type scale push-through ·
  network lines guiding the eye · depth-blur portal · one warp-tunnel (timeline→product).

## WebGL / Three.js (selective, supports clarity — never distracts)

Three.js 0.137 is loaded. Use sparingly, driven by the GSAP master timeline (deterministic/seekable):
- Reflective metallic sphere (brand reveal / portal).
- Point-cloud that forms the 3DM logo / disperses on transitions.
- Subtle network-line / particle field backgrounds.
- Soft procedural mesh-gradient + depth fog. Refined bloom (localized, controlled).
Most atmosphere can be CSS/SVG (radial mesh gradients, blurred glows, SVG grain, glass) — reserve
Three.js for 1–2 hero moments so the render stays fast and stable.

## What NOT to Do

- No purple, no neon, no cyberpunk, no bright saturated gradients.
- No stock people / handshakes, no cliché "AI brain" graphics, no tech-tunnel spam.
- No bounce/elastic motion, no cheap presets, no plain crossfades/hard cuts as primary transition.
- No oversized fake "0+ / 0M+" counters — use real, restrained proof tiles.
- No clutter — one focal point + one core message + one hero motion per scene.
- No `transparent` keyword in gradients (use zero-alpha of target color); no `repeat:-1`.
