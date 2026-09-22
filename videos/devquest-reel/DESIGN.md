# DevQuest — Design System (video reference)

## Overview

DevQuest is a dark-fantasy, pixel-art RPG learning platform. The landing site and app share one identity: deep void-navy backgrounds, gold arcade accents, pixel-art sprites (duck wizard mascot, dungeon doors, world map), and Silkscreen arcade typography for game elements over clean Geist UI type. The feel is "indie game studio" — atmospheric, rewarding, cool enough for adult developers. Every success is celebrated (XP bursts, green flashes, rank-ups).

## Colors

- **Void Background**: `#13111C` — global page background (site + app)
- **Lesson Background**: `#1A1D2E` — lesson screens, alternate sections
- **Surface**: `#242842` → `#2C3050` — cards, elevation hierarchy
- **Border**: `#343858` (standard), `#3E4268` (light)
- **Text Primary**: `#E8EAF0` — headings, body
- **Text Muted**: `#9298B0` — supporting copy
- **Gold**: `#DBB44C` — CTAs, achievements, realm highlights, arcade icons
- **Success Green**: `#4ADE80` — correct answers, XP, completion
- **Error Red**: `#F87171` — wrong answers
- **Accent Cyan**: `#22D3EE` — global accent, links
- **Accent Indigo**: `#818CF8` — lesson accents
- **Accent Violet**: `#A78BFA` — magic/portal glows

## Typography

- **Geist** (100–900 variable): UI text, headings. Site hero is 900 weight, 96px, `#E8EAF0`.
- **Geist Mono**: code snippets, technical labels.
- **Silkscreen** (400/700): THE signature font — pixel/arcade. Used for game labels ("START YOUR QUEST", "CORRECT!", "+15 XP", "DAILY MISSIONS"), all-caps, letter-spaced. Any game-HUD element in the video uses Silkscreen.
- Hierarchy: hero 96px/900, section 48px/900, feature titles 20px/900, body 16px.

## Elevation

Flat dark surfaces with 1px borders (`#343858`) and generous border-radius (~10–16px). Depth comes from glow, not shadow: gold/green/violet radial glows behind active elements, torch light flicker, pixel sprites with soft outer glow. Buttons are gold pills with a darker gold bottom edge (chunky game-button look, pressed 3D edge).

## Components

- **Gold Quest Button**: rounded pill, `#DBB44C` fill, Silkscreen all-caps label, darker bottom edge (3D game button), arrow suffix.
- **Quest Path**: vertical dashed path connecting circular nodes (scroll icon = lesson, ? crystal = quiz, lock = locked) with gold ring on active node.
- **Correct-Answer Bar**: full-width bottom bar, green `#4ADE80` — "✓ CORRECT!" left, "+15 XP" right, both Silkscreen.
- **Segmented Progress Bar**: 11 rounded segments at top of lesson, filled ones orange/gold.
- **Stat Cards**: streak flame + day circles, daily missions with "+25 XP" gold rewards, rank card with pixel avatar.
- **World Map**: full pixel-art map, floating island realms connected by glowing bridges, each realm color-coded (lava red, ice blue, forest violet, desert gold).
- **Dungeon Doors**: pixel stone arches — locked (padlock), active (green glow), completed (gold).
- **Pixel HUD frames**: bordered map frame with corner gems, title plates ("WORLD MAP: KINGDOM OF THE VOID").

## Do's and Don'ts

### Do's
- Use Silkscreen for every game/HUD label, all-caps, wide tracking.
- Use `image-rendering: pixelated` when upscaling sprites — crisp pixels are the aesthetic.
- Celebrate: green flash + XP burst on success, gold shimmer on achievements.
- Keep the void: everything lives on `#13111C`, glows carry the depth.
- Use torches, sparkle particles and floating pixel decorations to keep frames alive.

### Don'ts
- No corporate/enterprise look (no white slides, no stock photos) — even the enterprise beat stays in the game world.
- No smooth cartoon gradients on sprites — pixel art stays pixel art.
- No standard drop shadows — radial glow or bloom only.
- Don't mix in foreign fonts — Geist / Geist Mono / Silkscreen only.
