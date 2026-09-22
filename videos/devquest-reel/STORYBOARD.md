# DevQuest — Storyboard (ultra premium reel)

**Format:** 1080×1920 @ 30fps (portrait reel), ≤60s
**Audio:** ElevenLabs VO (English) + chiptune-orchestral underscore + game SFX (coin, level-up fanfare, door creak, torch crackle, typing)
**VO direction:** warm male voice, confident "trailer" register but friendly — a game-trailer narrator speaking to educators, not gamers. Silence between sentences is a feature.
**Style basis:** DESIGN.md — void `#13111C`, gold `#DBB44C`, Silkscreen for HUD, pixel art with `image-rendering: pixelated`.

**Global guardrails:**
- The whole video is "inside the game": every beat is a scene from the RPG world, with HUD frame, torch light, sparkle particles. Never a "slide".
- Every beat has min. 3 depth layers (BG atmosphere / MG content / FG particles+HUD) and at least one gold or green accent.
- Sprites always scale with `image-rendering: pixelated`.
- Real app UI screenshots appear inside pixel-art frames (magic mirror / scroll frame), never as bare screenshots.
- Underscore: chiptune arpeggio + orchestral pad; swell on Beat 3 (map) and Beat 8 (CTA); drop to silence before "Correct answer" in Beat 4.

---

## Asset Audit

Source: `C:\Users\marko.jankovic\Desktop\Personal\razno\devquest\` → copied into `videos/devquest-reel/assets/`

| Asset (source) | Type | Beat | Role |
| --- | --- | --- | --- |
| `public/devquest/production-assets/duck/duck-wizard-sparkles.png` | sprite | 1, 8 | mascot — hook + CTA |
| `public/devquest/production-assets/duck/duck-wizard-fire.apng/.mp4` | anim sprite | 1 | living mascot in cold open |
| `public/devquest/duck-thumbsup.gif` | anim sprite | 8 | CTA celebration |
| `public/logo.svg` + `public/devquest/logo.png` | logo | 1, 8 | brand mark |
| `public/devquest/world-map.png` | pixel map | 3 | HERO asset — pan/zoom across realms |
| `public/devquest/dungeon/door-locked-v3.png`, `door-active-new.png`, `door-completed-new.png` | sprites | 3, 7 | dungeon metaphor / three audiences |
| `public/devquest/dungeon/crystal-question.png`, `scroll-new.png`, `boss-skull-v2.png` | sprites | 3, 4 | quest path nodes |
| `lesson-code-screen.png`, `quiz-screen.png`, `correct-answer.png` | UI screenshots | 4 | student flow in phone frame |
| `realm-map.png` (paths UI) | UI screenshot | 6 | curriculum as quest path |
| `home-hub.png` | UI screenshot | 5 | streak/missions/rank hub |
| `public/devquest/stats/xp.png`, `streak-v2.png`, `badges.png`, `rank.png` | pixel icons | 4, 5 | XP crystal, flame, badges |
| `public/devquest/characters/*.png` (8 ranks) | sprites | 5 | rank evolution Code Apprentice → God Tier |
| `public/devquest/demo-assets/torch-lit.png`, `production-assets/torch/torch.apng` | anim sprite | 2, 3, 7 | atmosphere, framing |
| `public/devquest/demo-assets/particles.png`, `glow-warm.png`, `key.png`, `icon-fire.png` | decor | all | particles, glow |
| `public/devquest/demo-assets/wall-tile-*.png` | tiles | 2, 4 | dungeon wall background |
| `public/devquest/hero-system-design.png` | illustration | 2 | duck studying at desk — "every lesson is a quest" |
| `public/devquest/hero-python-mini.png`, `hero-introduction-to-sql.png`, `hero-algorithms.png`, `hero-computer-architecture.png`, `hero-go-fundamentals.png` | illustrations | 3/6 | subject cards |
| `public/devquest/icons/*-new.png` (10 system-design icons) | pixel icons | 6 | curriculum areas |
| `public/courses/python.svg`, `datastructures.svg`, `postgresql.svg` | icons | 6 | subjects |
| `capture/screenshots/scroll-000.png` | site hero | — | reference only, not used directly |

Minimum utilization ✓: logo in first and last beat; world map (signature visual) in Beat 3; 6+ UI screenshots/illustrations spread across beats; no beat is text-only.

---

## BEAT 1 — COLD OPEN / HOOK (0:00–0:05)

**VO:** "What if learning felt... like a game?"

**Concept:** We don't open with a presentation — we open with a game. Black screen, torch crackle, then two torches ignite and reveal the duck wizard CASTING a spell. Pixel particles fly from his staff and assemble into the title. Within 2 seconds the viewer knows: this is not another EdTech video.

**Visual:** BG: void `#13111C` with subtle vignette and twinkling pixel stars. MG: `duck-wizard-fire` (apng/mp4) centered, levitating (yoyo float ±12px); soft violet glow `#A78BFA` beneath. FG: sparkle particles orbiting. Text "WHAT IF LEARNING" (Geist 900) fade+rise, then "FELT LIKE A GAME?" where "GAME" STAMPS in Silkscreen gold with pixel-shatter particles and a CRT glitch micro-shift. DevQuest logo discreet at top + "PRESS START" blinking (arcade blink) at bottom.

**Choreo:** torches POP alight (scale 0→1 back.out) → duck FADE+RISE → text CASCADE per word → "GAME?" SLAMS with 4px screen-shake.

**SFX:** torch crackle, magic shimmer, coin "ding" on SLAM.
**Transition OUT:** Glitch shader (0.3s) — arcade energy.

---

## BEAT 2 — WHAT IS DEVQUEST (0:05–0:12)

**VO:** "DevQuest turns knowledge into an adventure. No boring lectures — every lesson is a quest."

**Concept:** Contrast: boring lecture vs. quest. A grey "video lecture" window (play button, timeline 2:14:37) shatters into pixel dust, revealing a warm dungeon-study scene behind it — the duck wizard at a desk with a system-design parchment (hero-system-design.png).

**Visual:** BG: dungeon wall tiles (wall-tile-*.png), moss, two lit torches with flicker light (radial gradient pulse). MG: hero-system-design.png in a pixel frame, Ken Burns zoom 1→1.06. Grey lecture mockup enters, shakes, DISINTEGRATES (pixel particles fall). FG: title "EVERY LESSON IS A QUEST" — Silkscreen, word by word, "QUEST" in gold with glow pulse. Scroll icon and key.png float in corners.

**Choreo:** lecture window DROPS in → SHAKES → SHATTERS into pixels (particles fall+fade) → hero scene REVEALS through the break → title TYPES on (typewriter SFX).

**SFX:** dull "video buffering" tone → pixel crumble → warm pad + torch.
**Transition OUT:** velocity-matched upward (y:-150, blur 30px).

---

## BEAT 3 — WORLD OF KNOWLEDGE / WORLD MAP (0:12–0:19)

**VO:** "Every subject is a world. Every topic — a dungeon to conquer."

**Concept:** CENTERPIECE. Camera flies over world-map.png — "Kingdom of the Void". The most recognizable asset: lava arena, ice mountain, mystic forest, treasure desert. Plates with subject names pop over the realms — mapping the RPG world onto a curriculum.

**Visual:** world-map.png (1376×768 → scaled ~2.6x, pixelated) in a slow diagonal pan with zoom 1.15→1.0; parallax star layer above. On 3 realms, pixel plate cards POP (Silkscreen): "PYTHON" (green), "SYSTEM DESIGN" (cyan), "DATABASES" (gold) — each with a mini hero illustration, connected by glowing bridge lines (SVG DrawSVG paths between realms). FG: HUD frame with corner gems + title plate "WORLD OF KNOWLEDGE" at top.

**Choreo:** map DRIFTS (power1.inOut) → bridge lines DRAW between realms → plate cards POP staggered 0.4s (back.out + coin SFX each) → gentle camera settle.

**SFX:** underscore SWELL, three coin dings, wind ambience.
**Transition OUT:** Cinematic Zoom shader (0.5s) — we dive INTO a realm.

---

## BEAT 4 — STUDENT USE CASE (0:19–0:29)

**VO:** "Students learn through five-minute challenges. Code. Quiz. Correct answer — XP, streaks, level up."

**Concept:** Longest beat — the real product. A phone inside a pixel "magic mirror" frame shows the real student flow: code lesson → quiz → CORRECT! +15 XP celebration. All cut to the VO rhythm: "Code." (cut) "Quiz." (cut) "Correct answer" (green burst).

**Visual:** BG: lesson `#1A1D2E` with dungeon tiles at the edges and indigo glow. MG: phone frame (pixel border, corner gems) with real screenshots: lesson-code-screen.png → quiz-screen.png → correct-answer.png, whip-pan cuts between. Code types itself over the lesson screen (Geist Mono `print("Hello, world!")`). On "Correct answer": green flash, pixel confetti, "+15 XP" COUNTS UP and the xp.png crystal FLIES to the streak counter in the FG HUD (MotionPath arc). FG HUD: streak flame (streak-v2.png) + XP counter at top, always visible.

**Choreo:** phone SLIDES up → "CODE" plate STAMPS + typing → WHIP-PAN to quiz → answer A PULSES then LOCKS green → correct bar SLIDES up + confetti BURST + counter COUNTS 0→15 → flame IGNITES (scale bump).

**SFX:** typing, UI tap, 0.3s silence before the answer → level-up fanfare + coin.
**Transition OUT:** hard cut on the music beat.

---

## BEAT 5 — RPG PROGRESSION (0:29–0:36)

**VO:** "Motivation is built in: ranks, badges, and progress you can see."

**Concept:** Rank evolution as a Pokémon evolution: the pixel avatar grows through ranks — Code Apprentice → Bug Squire → Junior Architect → Archmage → God Tier. Behind it, the XP bar fills and badges pop. This is the "dopamine" beat — everything glimmers.

**Visual:** BG: void + radial gold glow growing with each rank. MG: large central sprite (characters/*.png, pixelated ~8x) MORPHS through 5 ranks — each transition a flash + particles; below, a Silkscreen plate with the rank name SWAPPING (scramble text). XP bar (segmented, gold) FILLS progressively; badges.png and rank.png icons float left/right. FG: home-hub.png card (streak + daily missions) tilted 8°, drifting in the lower corner as "proof".

**Choreo:** avatar POPS → FLASH-MORPH ×4 (each with screen glow pulse + fanfare note rising) → XP bar FILLS with each morph → badges CASCADE in an arc (stagger back.out).

**SFX:** rising arpeggio — each rank one note higher, finale: God Tier = golden shimmer + choir hit.
**Transition OUT:** blur-through (20px, 0.3s).

---

## BEAT 6 — PROFESSORS & INSTITUTIONS (0:36–0:45)

**VO:** "Professors turn their curriculum into quests — and track every student's progress in real time."

**Concept:** The professor's angle: a syllabus becomes a quest path. A paper list of topics (left) TRANSFORMS into a vertical quest path with nodes (right) — the same one students play. Then the "professor HUD": a mini analytics panel with student progress (progress bars in realm colors) — still fully in pixel style.

**Visual:** BG: `#13111C` + torch lights. Phase 1: parchment scroll (scroll-new.png enlarged) with a topic list (Geist) ROLLS open; topics DETACH one by one and FLY (MotionPath) to the right side where they become quest nodes (scroll/crystal/boss-skull sprites) connected by a dashed path that DRAWS itself. Phase 2: realm-map.png (paths UI screenshot) SLIDES in inside a pixel frame + 3 mini progress bars over it ("Group A 78%", "Group B 64%", "Group C 91%") that FILL + COUNT UP, green checkmark on the best. Title: "FOR PROFESSORS" Silkscreen plate at top.

**Choreo:** scroll UNROLLS → topics FLY staggered → path DRAWS (DrawSVG) → boss skull node LANDS last with a thud → UI card SLIDES + bars FILL.

**SFX:** paper unroll, whoosh ×3, pen scratch, three soft pops for the bars.
**Transition OUT:** whip pan left.

---

## BEAT 7 — ENTERPRISE & CREATORS (0:45–0:53)

**VO:** "The same magic works beyond the classroom. Corporate training. Team onboarding. Creator courses."

**Concept:** Three dungeon doors = three audiences. "UNIVERSITIES" (completed, gold), "COMPANIES" (active, green glow), "CREATORS" (unlocking before our eyes — the padlock drops, the door ignites). Message: one engine, three worlds.

**Visual:** BG: dungeon corridor — wall tiles with a perspective gradient, two torches. MG: three doors (door-completed-new / door-active-new / door-locked-v3 → door-active-v2 swap) in a row, each with a Silkscreen plate above. On the VO rhythm the camera PANS door to door (container x-shift): above "COMPANIES" mini pixel icons pop (docker/kubernetes/aws from svgs/ — tinted to brand colors) as "internal training"; above "CREATORS" a coin/key pops + "YOUR COURSE" plate. The padlock on the third door SHAKES → FALLS → the door IGNITES with green glow. FG: particles, glow-warm.png at the bottom.

**Choreo:** doors CASCADE in (stagger 0.25s) → camera PANS per VO phrase → padlock DROPS + bounces → glow IGNITES + particle BURST.

**SFX:** door creak, metal padlock clank, magic ignite whoosh.
**Transition OUT:** Cross-Warp Morph shader (0.6s) into the finale.

---

## BEAT 8 — CTA / FINALE (0:53–0:59)

**VO:** "DevQuest. Learn by playing. Start your quest."

**Concept:** Game title screen. Logo + mascot + START button — like a game boot screen. The duck wizard gives a thumbs-up. The final frame is calm, branded, screenshot-worthy.

**Visual:** BG: void + stars + gentle vertical gold gradient at the bottom. MG: DevQuest logo (shield) SLAMS in centered, below it "DEVQUEST" Geist 900 + tagline "LEARN BY PLAYING" Silkscreen gold with tracking-widen animation. duck-thumbsup.gif beside the logo (levitating). Gold quest button "START YOUR QUEST →" PULSES (scale 1→1.04 yoyo) with a shimmer sweep. FG: sparkle confetti drifting down slowly. "PRESS START" blink at the bottom for the arcade finish.

**Choreo:** logo SLAMS (scale 1.6→1, expo.out + 3px shake) → text RISES → button POPS + shimmer LOOP → confetti DRIFTS.

**SFX:** final fanfare chord, coin ding on the button, underscore resolution.

---

## Production Architecture

```
videos/devquest-reel/
├── index.html                  root — VO + underscore + beat orchestration (1080×1920)
├── hyperframes.json / meta.json
├── DESIGN.md / SCRIPT.md / STORYBOARD.md
├── capture/                    site capture (tokens, screenshots)
├── scripts/devquest.json       VO scene script
└── assets/
    ├── devquest/               sprites/screenshots copied from the local app
    ├── fonts/                  Silkscreen + Geist (local, deterministic render)
    ├── voiceover/devquest/     ElevenLabs mp3 + timing.json per beat
    └── audio/                  underscore + SFX
```

**Font note:** Silkscreen + Geist/Geist Mono must be downloaded into `assets/fonts/` — the render must be deterministic, no network font loads.
