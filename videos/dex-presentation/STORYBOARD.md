# STORYBOARD — DEX Company Presentation

**Format:** 1920×1080 (landscape) · 30fps
**Audio:** ElevenLabs VO (English) + soft cinematic underscore + SFX accents
**VO direction:** Mid-age, calm and confident — Apple-keynote register. Economy of words; the
silences between lines are part of the design. Never salesy. Authority through restraint.
**Style basis:** [DESIGN.md](DESIGN.md) — DARK PREMIUM. Navy `#1F2739`→`#141A28` void, white DEX
logo, periwinkle `#88A7DB` + steel `#405D8E` + purple `#7A00DF`/`#8969C3` glows. Roobert font.
**Energy:** Premium/enterprise → Lottie + slow velocity transitions + per-word kinetic type +
SVG path-drawing + CSS-3D isometric + counter animations. Calm, fluid, never frantic.

> Beat times below are **provisional** — locked to real VO word timing in Step 5 (`transcript.json`).
> Target total ≈ 60s. The brand logo opens (Beat 2) and closes (Beat 8). The signature isometric
> diorama anchors Beat 3. No CTA, no contact form, no phone numbers anywhere.

---

## Asset Audit

| Asset | Type | Assign to Beat | Role |
| ----- | ---- | -------------- | ---- |
| `capture/assets/dex-logo-black.svg` | Vector wordmark (D·hex·X) | Beat 2, Beat 8 | Recolor **white**; self-draws / assembles. Hero brand mark. |
| `capture/assets/dex-logo-with-subline-white-highres.png` | Raster logo + "Digital EXperience" | Beat 2, Beat 8 | Subline lockup fallback / crisp close-frame. |
| `capture/assets/lottie/animation-0.json` | Lottie isometric diorama (cloud + data-grid + icon tiles) | Beat 3 | Signature hero illustration — rises & plays. |
| `capture/assets/fonts/RoobertTRIAL-*.woff` | Brand font (Light/Regular/Medium/Bold) | ALL | `@font-face` — every headline, number, label. |
| `capture/assets/team.jpg` | Photo (team) | Beat 6 (optional) | Small, masked vignette behind "experts" — never full-bleed (DESIGN). |
| `capture/assets/favicon.png`, `preloader.gif`, `mejs-controls-dark.svg` | Misc | SKIP | Not video-grade. |
| Partner logos (Oracle, Ingram, M&I, Robotiq.ai, Spark, TerraCore) | — | SKIP | Not downloaded as clean transparent files; not in script. |

Isometric **icon tiles** and **connector lines** are rebuilt in CSS/SVG (brand purple/blue) for
Beats 3–5 — gives full motion control vs. static raster.

**Underscore:** Minimal cinematic — one warm sustained pad + sub bass, already breathing at frame 0.
Sits under VO, never competing. Gentle swell into Beat 2 (logo), a lift into Beat 6 (stats),
resolves on a single sustained chord under Beat 8. (Add a licensed bed if provided; otherwise
SFX-led with a low drone from `sound-effects/`.)

---

## BEAT 1 — COLD OPEN / HOOK  (≈0:00–0:08)

**VO:** "Behind Southeast Europe's most demanding software — the banks, the institutions, the enterprises — you'll often find the same name."

**Concept:** We're already moving. A vast dark navy data-space, an isometric grid floor receding
to a glowing horizon. We drift forward past faint floating glass panels labelled BANKS,
INSTITUTIONS, ENTERPRISES — the invisible infrastructure of a whole region. Everything points
inward, building toward a name not yet shown. Mystery, scale, gravitas.

**Visual:** BG: Canvas-2D particle/data field drifting slowly (periwinkle dots, deterministic
hash). A perspective grid floor (`#405D8E` hairlines at 12% opacity) recedes to a soft purple
horizon glow. MG: 3 ghosted glass panels at ±8° iso angles slide past at different parallax
depths, each with an uppercase label that types/fades on with the VO word. FG: thin connector
lines DRAW between panels (SVG dashoffset). A subtle vignette darkens the edges.

**Mood:** Cinematic title-sequence opener — the kind where you lean forward. Think enterprise
"deep infrastructure," not startup-bright. Restraint + depth.

**Techniques:** Canvas-2D procedural field · per-word kinetic typography · SVG path drawing.

**Choreography:** Camera DRIFTS forward (scale 1→1.06, y +20) over 8s, power1.inOut. Panels SLIDE
past with parallax (far slow, near fast). Labels FADE+rise per VO word (y:18→0, 0.4s power2.out).
Connector lines DRAW (0.7s power2.out) as each panel settles. Particles FLOAT continuously.

**Transition OUT:** Shader **Cinematic Zoom** into Beat 2 (0.5s, power2.inOut) — the push collapses
the data-space into the logo. This is a centerpiece reveal → earns a shader.

**Depth:** BG particle field + grid + horizon glow · MG parallax panels · FG connector lines + vignette.

**SFX:** Low warm drone fades up from silence; faint digital shimmer as each label lands
(`sound-effects/data-reveal-sound-6460.mp3`, low volume).

---

## BEAT 2 — BRAND REVEAL  (≈0:08–0:13)  ★ centerpiece

**VO:** "DEX. Digital Experience."

**Concept:** Everything resolves to one point. The DEX hexagon wordmark assembles itself in pure
white at center — the interlocking D · hex-knot · X — as a purple-blue bloom blooms behind it. A
single light sweep crosses the mark. The name the whole open was building to.

**Visual:** BG: near-black navy with a central radial bloom (`#8969C3`→transparent, heavily
blurred) that scales up as the mark forms. MG: `dex-logo-black.svg` recolored white — its three
paths reveal via clip/mask wipe (or scale-from-0.96 + fade), landing crisp. Below, "DIGITAL
EXPERIENCE" in wide-tracked (0.3em) uppercase Roobert, periwinkle `#88A7DB`, fades up letter-grouped.
FG: a diagonal specular light-sweep crosses the logo once; a few faint hex particles drift outward.

**Mood:** Brand moment. Quiet power. The transition *is* the visual.

**Techniques:** SVG/mask reveal · glow bloom · per-word (tagline) reveal.

**Choreography:** Logo SETTLES from scale 1.05→1 + opacity 0→1 (0.6s power3.out) as bloom EXPANDS
behind it. Light sweep WIPES across (0.5s, 0.3s after lock). Tagline FADES up (y:14→0, 0.5s) staggered.

**Transition OUT:** Velocity-matched upward (exit y:-120, blur 24px, 0.33s power2.in) → Beat 3 enters from below.

**Depth:** BG navy + radial bloom · MG white logo · FG light sweep + hex particles.

**SFX:** Drone resolves into one clean chime + soft whoosh on logo lock
(`sound-effects/flash-whoosh-swoosh-3-SBA-300463407.mp3` + `digital-bell-ding-demo-309885.mp3`).

---

## BEAT 3 — HERITAGE / WHAT WE DO  (≈0:13–0:23)

**VO:** "For three decades, we've engineered the systems that run serious business — innovative software, built to automate the work that holds companies back."

**Concept:** Three decades of engineering, made tangible. A timeline ribbon draws across the frame;
the signature isometric diorama (cloud + dark data-grid panel + floating icon tiles) rises into
view, alive with flowing connector light. This is unmistakably DEX.

**Visual:** BG: navy + soft drifting glow. MG: the captured Lottie diorama (`animation-0.json`)
scales/floats up from y+80, plays through; glowing connector lines pulse between tiles. A thin
SVG **timeline** draws left→right with three subtle node ticks (the "three decades"). FG: headline
"We engineer the systems that run serious business" — Roobert, white, key phrase "automate" in
purple `#7A00DF`; appears per-word with the VO.

**Mood:** Engineering depth, craft, calm confidence. Premium product-render energy.

**Techniques:** Lottie · SVG path drawing (timeline + connectors) · CSS-3D float/parallax · per-word type.

**Choreography:** Diorama RISES + FLOATS (continuous 6px bob). Timeline ribbon DRAWS (1.0s power2.out),
nodes POP at decade ticks. Headline words FADE+rise per VO. Gentle camera parallax (bg slower than diorama).

**Transition OUT:** CSS blur-through (exit blur 18px, 0.3s) → product cards.

**Depth:** BG glow + timeline · MG isometric diorama · FG headline + node ticks.

**SFX:** Soft mechanical "settle" as diorama lands; faint tick per timeline node.

---

## BEAT 4 — PRODUCTS / MODULAR PLATFORM  (≈0:23–0:33)

**VO:** "A modular platform you can shape to fit. Custom development, end to end. Human resources. Document management."

**Concept:** Modularity, literally. Neumorphic light cards (the brand's `#E0E5EC` surfaces) snap
into an isometric grid against the dark — each a product, each a module clicking into place. The
platform builds itself before your eyes.

**Visual:** BG: navy + faint iso grid. MG: 4 product cards CASCADE / SNAP into a 2×2 (or fanned
row) iso arrangement: **Digital Experience Platform**, **Custom Software Development**, **HR
Software**, **Document Management**. Each card = neumorphic light tile, rebuilt iso icon (purple/
blue), Roobert title, one-line label. Connector lines SNAP between modules as they lock. FG:
floating glyph accents; the active card lifts slightly toward camera as its VO line is spoken.

**Mood:** Clean, systematic, satisfying. "It all fits together." Soft-UI premium.

**Techniques:** CSS-3D (iso cards) · staggered cascade · SVG connectors · per-word labels.

**Choreography:** Cards DROP+SNAP in staggered 0.18s (scale 0.9→1, y+40→0, 0.4s back.out(1.3)).
Connectors DRAW on snap. Spoken card LIFTS (z +30, glow up) on its VO line, settles as next speaks.

**Transition OUT:** CSS push-left / whip (0.3s power3.in) → RPA.

**Depth:** BG iso grid · MG product cards · FG glyphs + connectors.

**SFX:** Soft "click/seat" per card snap (`sound-effects/Game Item Pickup.mp3`, low); subtle whoosh on push-out.

---

## BEAT 5 — RPA / INTELLIGENT AUTOMATION  (≈0:33–0:41)

**VO:** "And robotic process automation — so the repetitive work runs itself, and your people don't have to."

**Concept:** The machine that runs itself. A closed automation loop glows to life; a light-dot
travels its path through process nodes, repetitive task-tiles getting pulled in and resolved
automatically. Purple automation energy pulses around the cycle.

**Visual:** BG: navy + purple pulse glow. MG: an SVG **process loop** (rounded-rect circuit) DRAWS
itself; 4–5 process nodes sit on it. A glowing dot RUNS the loop on a MotionPath, and each time it
passes a node, a small task-tile gets absorbed (scales to 0 into the node) — "runs itself." A
counter of "tasks automated" ticks up subtly. FG: headline "Robotic Process Automation", "runs
itself" emphasized purple.

**Mood:** Effortless, intelligent, slightly hypnotic. Motion = the message.

**Techniques:** GSAP MotionPath · SVG path drawing · counter · canvas/particle pulse.

**Choreography:** Loop DRAWS (0.8s). Dot RUNS continuously (MotionPath, ~2.5s/lap, power1.inOut).
Task-tiles ABSORB on node pass (scale→0, 0.3s). Glow PULSES with the loop rhythm. Headline per-word.

**Transition OUT:** Shader **Cross-Warp Morph** (0.6s) into the stats — energy lift. (2nd & final shader.)

**Depth:** BG purple pulse · MG automation loop + dot · FG headline + counter.

**SFX:** Soft cyclic "whir"/pulse synced to the dot lap; gentle tick on each absorb.

---

## BEAT 6 — PROOF / SCALE  (≈0:41–0:49)

**VO:** "More than a hundred experts. Over fifty clients. Trusted right across the region."

**Concept:** The receipts. Three big numbers count up on neumorphic stat cards, a faint
constellation of client-points lighting up across a stylized SEE region behind them. Quiet pride.

**Visual:** BG: faint iso constellation — points light up and connect across a soft region shape
(`#88A7DB` lines, low opacity); optional `team.jpg` as a small masked, desaturated vignette behind
the center card. MG: 3 neumorphic stat cards with thin gradient borders: **100+ Experts**,
**50+ Clients**, **30+ Years** — numbers COUNT UP from 0. FG: small uppercase labels, "+" punches in last.

**Mood:** Grounded, credible, premium-corporate. Numbers as quiet confidence, not a hard sell.

**Techniques:** Counter animation · SVG constellation draw · per-word · (optional masked photo).

**Choreography:** Cards PUNCH in staggered 0.2s (scale 0.92→1, 0.4s power3.out). Numbers COUNT UP
(1.0s power1.out), "+" SNAPS on at end with a tiny scale pop. Constellation points TWINKLE/connect behind.

**Transition OUT:** CSS velocity-matched upward (0.33s power2.in) → leadership statement.

**Depth:** BG region constellation (+ masked photo) · MG stat cards · FG labels + "+".

**SFX:** Soft rising "data" tick under the count-up; a warm low swell as all three land.

---

## BEAT 7 — WHY WE LEAD  (≈0:49–0:55)

**VO:** "That's what makes us the region's leader in custom development and intelligent automation."

**Concept:** One confident line gets the whole frame. "THE REGION'S LEADER" in commanding white
Roobert, the two pillars — *custom development* and *intelligent automation* — glowing purple. A
faint hexagon watermark breathes behind; a clean underline draws beneath the key phrase.

**Visual:** BG: dark + a large faint hex-knot watermark (brand motif) slow-rotating at ~3% opacity
+ soft glow. MG: stacked headline; "REGION'S LEADER" large, "custom development" / "intelligent
automation" set as two emphasized purple sub-lines. FG: an SVG underline DRAWS under the key phrase;
subtle upward light rays.

**Mood:** Assured, declarative, premium. The peak statement before the resolve.

**Techniques:** Per-word kinetic type (or Roobert weight shift) · SVG underline draw · glow pulse.

**Choreography:** Headline RISES per word (y:30→0, 0.45s power2.out). Purple sub-lines GLOW-pulse
on arrival. Underline DRAWS (0.6s). Hex watermark rotates slowly throughout.

**Transition OUT:** Velocity-matched upward (0.33s power2.in) → close.

**Depth:** BG hex watermark + glow · MG headline · FG underline + light rays.

**SFX:** A single sustained tone swells; soft pulse on the purple emphasis.

---

## BEAT 8 — PHILOSOPHY + SIGN-OFF  (≈0:55–1:02)

**VO:** "We don't just deliver software. We become your digital colleague." … "DEX. Digital Experience."

**Concept:** Calm resolve and a callback. "Your digital colleague" lands, then the frame dissolves
back to the DEX logo at center (echo of Beat 2) — white on navy, the wide-tracked tagline beneath,
one last light sweep and a soft glow that breathes. The brand simply rests. No CTA — it doesn't need one.

**Visual:** BG: navy + slow-breathing central glow. MG: "We become your **digital colleague**"
appears per-word (colleague in purple), holds ~1s, then crossfades as the white DEX logomark
re-forms center with "DIGITAL EXPERIENCE" wide-tracked beneath. FG: final diagonal light sweep
across the mark; faint hex particles settle. Hold on the logo ~1–1.5s to end.

**Mood:** Warm, resolved, premium. A confident exhale.

**Techniques:** Per-word type · logo reveal callback · glow bloom · light sweep.

**Choreography:** Phrase FADES up per word. Crossfade (0.5s) to logo (scale 1.04→1, 0.6s power3.out)
+ bloom expand. Light sweep WIPES once. Final HOLD.

**Transition:** End of timeline (gentle fade to navy on the last 0.5s, logo last to leave).

**Depth:** BG navy + breathing glow · MG phrase→logo · FG light sweep + particles.

**SFX:** Warm resolving chord; final soft chime on logo lock, then quiet.

---

## Production Architecture

```
videos/dex-presentation/
├── index.html                 root — VO + underscore + 8 beat orchestration (1920×1080)
├── meta.json                  project id/name
├── hyperframes.json           registry paths
├── DESIGN.md                  brand reference (Step 2)
├── SCRIPT.md                  narration (Step 3)
├── STORYBOARD.md              THIS FILE — creative north star
├── transcript.json            word-level timing (Step 5)
├── assets/
│   ├── voiceover/dex/         narration.mp3 + timing.json (Step 5)
│   ├── dex-logo-white.svg     recolored brand mark
│   └── lottie/animation-0.json  isometric diorama (copied from capture)
├── capture/                   captured dex.rs data (Step 1)
└── compositions/
    ├── beat-1-hook.html
    ├── beat-2-brand-reveal.html
    ├── beat-3-heritage.html
    ├── beat-4-products.html
    ├── beat-5-rpa.html
    ├── beat-6-proof.html
    ├── beat-7-leadership.html
    ├── beat-8-signoff.html
    └── captions.html          (optional lower-third captions synced to transcript.json)
```
