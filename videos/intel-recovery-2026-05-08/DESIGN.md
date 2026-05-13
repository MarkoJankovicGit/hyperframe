# Intel Recovery — Visual Identity

## Style Prompt

Financegeekpeter-style finance reel. Pure black canvas, emerald-green kinetic typography, chrome 3D logos with subtle rim-light glow. Single lowercase scene-label word at the top (`rise`, `bottom`, `rescue`...). Hero objects float center; large numeric payoffs slam in at scene end. Palette flips between black+emerald (digital/markets) → white+silver (Wall Street/institutional) → black+amber (warning/bear).

## Colors

- `#000000` — primary background
- `#00FF88` — emerald accent (rises, gains, AI/tech register)
- `#FFFFFF` — primary type
- `#9CA3AF` — secondary type, ghost ticker
- `#F59E0B` — amber warning (bear-case scenes only)

## Typography

- **Display**: `Inter` 800 — large numeric payoffs, captions
- **Mono**: `JetBrains Mono` 500 — counters, tickers, timestamps

## Motion Rules

- Hero objects scale in from 0.85 with 0.6s `power3.out`
- Number counters use GSAP `to({ innerText })` + snap to integer or 2-decimal
- Payoff numbers SplitText-stagger in over 0.4s with `back.out(1.4)`
- Word-stack reveals are synced word-by-word to the VO timing JSON — each spoken word triggers a corresponding visual entrance

## What NOT to Do

- **No neon glows.** No `filter: drop-shadow(0 0 Npx ...)` on text, charts, logos, or markers. No `text-shadow` halos. Color and size carry emphasis — not blur rings.
- No multi-color gradients on backgrounds (solid black or solid white only; subtle radial atmospheric washes under 0.15 alpha are OK)
- No emoji or stock icons
- No more than one bold display number per scene
- Charts and data viz are allowed and encouraged when the story is data-driven — build them as SVG, not as raster assets
