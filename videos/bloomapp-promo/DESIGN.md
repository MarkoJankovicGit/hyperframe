# Design System — Bloom

## Overview

Bloom is a bold, youth-focused investing app whose identity lives in contrast: a vivid blue hero section pops against clean white feature sections, and every major heading lives inside a **black rounded-rect badge** with white Inter-Tight bold-italic uppercase copy — a distinctive signature that reads as both playful and confident. Phone mockups are the primary "hero" object, rotated at friendly angles with soft drop shadows. Gamification (trophies, "Oinks" coins, treasure chests) coexists with serious fintech signifiers (SIPC insurance, real-dollar fractional trades, stock UI). The overall register: Gen-Z confident, never corporate.

## Colors

- **Primary Brand Blue**: `#1658FF` — hero background, CTAs, key accents
- **Ink / Near-Black**: `#1C2329` — all text on white, the signature headline-badge fill
- **White**: `#FFFFFF` — dominant surface color
- **Soft Surface**: `#F8F8F9` — alternating section background
- **Muted Ink**: `#4A4F54` — secondary body copy
- **Divider**: `#E8E9EA` — card borders, hairlines
- **Success Green**: `#01CD74` — rewards, positive stats, secondary accent
- **Deep Blue**: `#0D3599` → `#0A1A63` — hero gradient depth
- **System Yellow**: `#EFC42C` — the star badge on hero, trophy accents

## Typography

- **Inter Tight** (700/800, italic, uppercase): signature headline style — lives inside the black rounded-rect badge. Tracking tight, no stroke. e.g. hero reads `INVESTING APP FOR NEW INVESTORS`.
- **Inter** (500/700, regular case): section headings (`Finally, Stock Market Education That Actually Makes Sense`, 28-51px), body copy (18px at 1.5 line-height).
- **Inter** (400): supporting paragraph copy, muted gray.
- **Source Code Pro**: stat numerals / tabular figures if used (`$14.00`, `2M+`).

## Elevation

Bloom avoids harsh drop-shadows. Cards sit on off-white (`#F8F8F9`) or inside rounded containers with `border-radius: 32px` (default) / `48px` (large) and 1px `#E8E9EA` dividers. Phone mockups use **soft ambient shadow** (large, low-opacity — `#19213D1A`) not a crisp offset. The primary depth trick is **layering**: black headline badge in foreground, phone mockup midground, soft-blue gradient or colored panel in background.

## Components

- **Black Headline Badge**: rounded-rect (border-radius ~16-24px) in `#1C2329`, white Inter-Tight 800 italic caps copy inside with generous horizontal padding. This is Bloom's most recognizable component — use it for every major headline.
- **Phone Mockup Card**: iPhone frame with rounded corners (~60px), showing app UI. Often rotated ±6-10° or presented as a parallel pair.
- **Feature Icon Row**: 5 circular soft-gray chips each with a mini-icon + label ("learning", "portfolio", "bloomie", "mirror", "play"), sitting on white.
- **CTA Button**: pill (border-radius 300px), black fill `#1C2329`, white Inter 500 text, ~48px tall.
- **Stat Callout**: huge numeral (Inter 700, 60-80px) above a small muted label. Used for "2M+ Downloads" / "80K Monthly active investors".
- **Gamification Icons**: Oink coin (gold), trophy, treasure chest — flat color vector, soft drop shadow.
- **Yellow Star Badge**: rotated 5-pointed star in `#EFC42C` sitting on hero headline, playful.

## Do's and Don'ts

### Do's
- Use the **black headline badge** whenever Bloom's signature styling is called for — it's the brand's strongest visual handshake.
- Keep the hero background solid `#1658FF` — no gradients. The blue is the brand.
- Pair every product claim with a **phone mockup** — the app UI is the proof.
- Use `#01CD74` green only for rewards, positive stats, or confirmation moments.
- Lean on generous whitespace in feature sections — Bloom's layout breathes.

### Don'ts
- Don't use pills/badges as decorative tags beside copy (brand avoids filler chips) — reserve rounded-rect black containers strictly for headline copy.
- Don't gradient the brand blue — solid fill only.
- Don't stack more than one `#1658FF` panel per scene; the blue is meant to dominate, not repeat.
- Don't use red/orange accents — Bloom's palette is blue + black + green. Red would read as "error" or "loss".
- Don't use emojis as decoration. The brand uses real icon art (trophy, chest, Oink) and photographic phone mockups, not emoji swarms.
