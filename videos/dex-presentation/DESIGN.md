# Design System — DEX (Digital EXperience)

Source: https://dex.rs/ · Captured palette + fonts. **Video direction: DARK PREMIUM** (the
site itself is light/neumorphic; for a 60s cinematic company reel we invert to the brand's
own navy `#1F2739` "void" with the white logo, keeping every brand color as accent/glow).

## Overview

DEX is a Southeast-European software house (three decades, Belgrade) selling trust and
engineering depth: custom software, business platforms, and AI/robotic process automation.
The web identity is light, soft, and neumorphic — pale `#E0E5EC` surfaces, rounded cards with
faint colored gradient borders, navy geometric headings (Roobert), and a signature isometric
"tech diorama" (a glassy lavender cloud, a dark data-grid panel, floating icon tiles). The
darkest brand color `#1F2739` powers the footer and the white logo — that is our video base.
Tone: calm, premium, confident. Motion is fluid and unhurried, never frantic.

## Colors

- **Base / Void**: `#1F2739` — primary dark navy background (brand `awb-color8`, the footer color).
- **Base Deep** (derived): `#141A28` — deeper navy for vignette/gradient floor, depth layering.
- **Content / Flare**: `#FFFFFF` — high-purity white for the logo, headlines, key numbers.
- **Accent Cool**: `#88A7DB` — periwinkle blue. Eyebrow labels, glows, connective lines (`awb-color6`).
- **Accent Mid**: `#405D8E` — steel blue. Secondary text, supporting strokes (`awb-color7`).
- **Accent Purple**: `#7A00DF` — vivid brand purple. Primary highlight, hexagon energy (`--wp-block-synced-color`).
- **Accent Purple Soft**: `#8969C3` — the logo/illustration purple (from the hero Lottie). Glow blends.
- **Neumorphic Light**: `#E0E5EC` — pale lavender-gray for "lifted" light cards that appear against the dark.
- **Hairline**: `rgba(255,255,255,0.08)` → `0.14` — thin borders, grid lines, card edges.

Illustration-only accents (isometric icon tiles — use sparingly, never as backgrounds):
green `#8BC34A`, amber `#F5C646`, orange (FontAwesome icons). Semantic (rare): success `#12B878`.

## Typography

- **Roobert** (TRIAL) — the brand geometric sans. Local files in `capture/assets/fonts/`
  (`RoobertTRIAL-Bold/Medium/Regular/Light`). Roles:
  - **Display / H1**: Roobert Bold, 96–140px, tight tracking (-0.02em). Headlines & big numbers.
  - **H2 / Subhead**: Roobert Medium, 44–64px.
  - **Body**: Roobert Light, 22–30px, line-height 1.45, color `#88A7DB`/`rgba(255,255,255,.72)`.
- **Eyebrow / Label**: Roobert (Medium), UPPERCASE, 16–20px, letter-spacing 0.26em, color `#88A7DB`.
  (Mirrors the site's "Roobert SemiMono" small-caps labels — we fake the mono look with wide tracking.)
- **Fallback**: `"Roboto", system-ui, sans-serif` (also loaded by the site).

## Elevation

The site is neumorphic (soft dual shadows on `#E0E5EC`, e.g. `6px 6px 9px rgba(0,0,0,.2)`) with
faint gradient-border cards. On our dark base we translate this to **glow + lift**: soft radial
blooms (purple `#8969C3` / blue `#88A7DB` at 18–35% opacity, heavily blurred) behind hero
objects for depth; thin `rgba(255,255,255,.08–.14)` hairline borders to define cards instead of
hard edges; and occasional neumorphic *light* cards (`#E0E5EC`) that float above the navy with a
soft drop + inner highlight. No hard black drop-shadows. Depth comes from blur, scale, and parallax.

## Components

- **DEX Hexagon Logomark** — the interlocking "D · hex-ribbon · X" wordmark (`dex-logo-black.svg`,
  recolor to white). The hex-knot is the brand's energy motif — reuse as a watermark / transition wipe.
- **Isometric Tech Diorama** — signature hero: glassy lavender **cloud**, dark **data-grid panel**
  (solar-panel look) with glowing connector lines, floating **icon tiles** (purple/green/blue). Captured
  as Lottie `animation-0.json` — embed directly, or rebuild the motifs in CSS/SVG for control.
- **Neumorphic Stat Card** — rounded rect, soft shadow, thin colored gradient outline; huge number
  (`50+ / 100+ / 30+`) over a small uppercase label.
- **Product Card** — rounded card, isometric illustration top, Roobert title, light body line.
- **Partner Logo Wall** — bordered rounded tiles (Oracle, M&I Systems, Ingram Micro, Robotiq.ai, Spark Analytics, TerraCore).
- **Typewriter Hero** — "Experts in __" with a blinking cursor cycling words (site uses this on "Stručnjaci za").

## Do's and Don'ts

### Do's
- Stay in the navy "void" (`#1F2739`→`#141A28`); let purple/blue glows and the white logo carry contrast.
- Lead with the isometric tech motifs and the hexagon mark — they are unmistakably DEX.
- Keep motion fluid and premium: `power2/power3` eases, 0.6–1.0s entrances, gentle parallax & float.
- Use generous negative space — landscape 1920×1080 gives room; don't crowd the frame.
- Set numbers and brand lines in white Roobert Bold; labels in wide-tracked uppercase periwinkle.

### Don'ts
- No bright/saturated fills as backgrounds — saturated colors live only on small icon tiles.
- No hard drop shadows or neon outlines — depth is soft glow + blur only.
- No fast cuts, jitter, or bouncy overshoot — premium reads as calm and controlled.
- No call-to-action, no contact form, no phone numbers — this is a pure brand presentation.
- Don't stretch/upscale the raster team photo full-frame; use it small/masked if at all.
