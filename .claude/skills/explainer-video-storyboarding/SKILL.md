---
name: explainer-video-storyboarding
description: |
  Generate production-grade storyboard sheets for short-form explainer videos — finance, tech, or educational reels for Instagram, TikTok, YouTube Shorts. Use this skill whenever the user wants to plan, design, or produce a vertical short-form video — even when they don't explicitly say "storyboard." Trigger contexts include planning a Reel/Short/TikTok, recreating a reference video's style, breaking a script into visual scenes, generating keyframes for a video agent or motion designer, designing motion-graphics scenes, or turning narrative beats into visual scene sheets with assets and animation directions. Use it any time the user mentions video reels, motion design, kinetic typography, scene breakdowns, keyframes, or producing a video in the style of a reference clip.
---

# Explainer Video Storyboarding

## What this skill does

Turn a topic or script into a complete production package for a short-form vertical explainer video — typically 30–90 seconds, vertical 9:16. The deliverable is a set of **storyboard sheets** (one per scene) that a motion designer or video agent can build from directly.

Each storyboard sheet is a single 16:9 image with three zones:

- **Left half: motion sequence.** A grid of vertical 9:16 thumbnails showing the scene unfolding through time, frame by frame. Use 2 thumbnails for short transitions, 2×2 (=4) for medium scenes, and 5 for long/dense scenes.
- **Top right: production assets on cyan** (only when assets are actually needed). Each true asset isolated on a flat cyan background (`#00B8D4`) so an agent can color-key it out and use it directly. Many scenes will have no cyan panel at all — see "Asset-source decision" below.
- **Bottom right: animation brief.** A numbered, web-native animation brief specifying transforms, timing, easing, framework choice, typography, colors, and export specs.

This format works because it solves three production problems at once: it shows the temporal arc, hands over reusable assets, and tells whoever's building it exactly how to animate every element.

## When to use this skill

Use this skill when the user wants to:

- Recreate the style of a reference reel (finance, crypto, tech, educational)
- Plan a multi-scene short video with palette shifts and motion design
- Generate scene-by-scene briefs for a video agent (Hyperframes, Cavalry, AE) or motion designer
- Break a topic or VO script into visual beats
- Produce a "director's package" — script + visuals + assets + animation specs in one go

Do not use this skill for:
- Long-form video (5+ minutes — use a different planning approach)
- Pure VFX work (compositing, rotoscoping, lip-sync) — different production discipline
- Talking-head videos with no kinetic typography or motion-design elements

## The workflow

Run these phases in order. Don't skip — each one feeds the next.

### Phase 1: Capture intent and reference

Before writing anything, get clear on:

1. **The topic.** What is the video explaining? Get specific — "AMD's stock rise" beats "tech stocks." Research current facts via web search if the topic is time-sensitive (stock prices, deal terms, current events). Don't fabricate numbers.
2. **The reference style.** Ask the user for a reference video or reference frames. The skill works best with a *visual target* to match. If they don't have one, ask them to describe the aesthetic in their own words (palette, mood, type of motion, what feels too much or too little).
3. **Audience and tone.** Mass-market punchy / nerdy explainer / educational neutral / brand-style. Each one changes script cadence and visual restraint.
4. **Length target.** ~15s (tight hook), ~30s (standard reel), ~60s (full story), ~90s (deep dive).
5. **The hook angle.** If the topic has multiple narrative angles, ask which one to lead with. The first 2–3 seconds carry disproportionate weight.

If the user has already given clear answers in conversation, don't re-ask — proceed.

### Phase 2: Research the topic (if factual)

For factual content (finance, tech, current events), search the web before writing. Get:

- The hook number (the single most surprising fact)
- The 2–3 supporting facts that prove the hook
- The narrative arc (setup → twist → payoff)
- Specific dates, prices, and figures

Don't write the script until you have these. Vague scripts produce vague storyboards.

### Phase 3: Write the script with VO

Write the VO line for each scene first, before deciding visuals. The script drives the visuals — not the other way around. Good signs:

- Tight VO at ~130 WPM finance-reel pace, ~115 words for 60s
- Each scene has one clear point
- Numbers and proper nouns are explicit (so word-by-word visual sync is possible later)
- Breathing room between sentences — visuals carry weight, VO doesn't fill every second

Format VO with scene-start timing brackets:

```
[0:00] **"Headline statement."**
[0:06] **"The pivot question."**
[0:09] **"Setup line. Then payoff line."**
```

Once VO is locked, you'll generate it via TTS (e.g., ElevenLabs). The resulting word-level timing JSON becomes the source of truth for animation cues — you align animation beats to spoken-word frames, not to invented timestamps.

**Default VO speed: 1.1×.** Generate every voiceover at `--speed=1.1` (passed to ElevenLabs). Default voice tempo on stock TTS is too slow for vertical short-form — listeners drop off. The sweet spot in iteration:

- **1.0×** (default): conversational, but feels sluggish for a 30–60s reel
- **1.1×**: punchy and natural, the right pace for finance / explainer reels (use this)
- **1.2×**: aggressive — words start clipping, syllables blur on long compound words like "two-point-nine billion"
- **1.3× and above**: artifacted, audibly sped up

Always regenerate the VO and re-derive all timing from the new JSON when you change the speed. Don't try to time-stretch existing audio — TTS regeneration produces accurate per-word timestamps; ffmpeg time-stretch breaks the timing JSON.

### Phase 4: Plan visual beats per scene

**This is the most important phase. Don't skip it.**

For every scene, fill in this table BEFORE generating any image:

| Field | What goes here |
|---|---|
| **VO line** | The exact spoken sentence(s) |
| **Word-timing source** | Path to the timing JSON for this scene |
| **Visual beats** (1–4 per scene) | What the viewer literally sees, in order. Each beat names what's on screen *at its peak*. |
| **Animation pattern** for each beat | What it does — fade in, slide up, draw on, count up, palette flip, etc. |
| **Source for each beat** | One of: `html-css` / `svg` / `code-chart` / `existing-asset` / `generate-image` / `web-photo`. Default is `html-css`. Only use `generate-image` when the beat genuinely requires pixels you cannot draw with code. |

**Asset-source decision tree.** For every visual beat, ask:

1. Is this **typography or numbers**? → `html-css`. Always. Big numbers, dollar amounts, percentages, captions — all HTML text animated by GSAP. They are never assets.
2. Is this a **chart or data viz**? → `svg` + GSAP path-draw. Charts are code, never images. (If the project has existing chart patterns in sibling videos, port them — recolor, don't rebuild.)
3. Is this an **abstract visual** (palette wash, glow, particles, motion lines, geometric shapes)? → `html-css` or `svg`. CSS gradients, blend modes, and SVG primitives cover most of these.
4. Is this a **simple geometric or iconographic shape** (an arrow, a star, a flag, a coin disc, a wireframe globe)? → `svg`. Inline SVG is sharper and animates better than a raster.
5. Is this a **photograph of a real person, place, product, or scene** that the project doesn't already own? → `generate-image` or `web-photo`. AI-generated photos of real named people are unreliable — flag them as placeholders.
6. Is this a **3D object render** that requires materials/lighting you can't fake in CSS? → `generate-image` (chroma-keyed PNG) or `existing-asset` (GLB via Three.js).
7. Is this a **brand logo**? → `existing-asset` from the project's logo folder. If missing, `generate-image` as a placeholder, but flag that production should drop in the licensed PNG.

Rule of thumb: **if you can build the beat in HTML/CSS/SVG in under 30 lines of code, do that**. The cyan-panel asset pipeline is for things you genuinely cannot draw with code — real-world photos, complex 3D renders, illustrative artwork.

A scene with zero generated assets is a feature, not a bug. Many of the strongest finance-reel scenes are pure typography and palette flips.

**Anti-pattern: defaulting to "hero object on cyan"** for every scene. Skill examples and reference reels often show globes, coins, chips, logo discs, certificates — those are genre-specific choices, not a universal template. Pick the visual that fits *this specific story*, not the visuals that show up in storyboarding examples. A line chart is not lower-status than a 3D globe; the right answer depends on what the moment needs.

**Then audit the storyboard against the skill's technique library — see "Workflow: Technique-first development" below.** This is non-negotiable: any beat that calls for a technique not yet documented in this skill triggers a develop-and-approve loop BEFORE you start building the reel itself.

### Phase 5: Plan asset reuse and palette zones

After Phase 4, look across all scenes:

- **Recurring elements.** If two scenes show the same logo, the same chart pattern, or the same photo — note it once and reuse. Reusing makes the video feel cohesive.
- **The brand element.** A logo or signature mark for the subject of the video should appear in 2–4 scenes (often bookends). Not every scene.
- **Palette zones.** Group scenes by palette so the production designer builds materials once. Common pattern: shift palette to mark narrative pivots (despair → rescue → climax).

Document this as a small map before storyboarding.

### Phase 6: Generate storyboard sheets, scene by scene

Generate one storyboard sheet per scene using Higgsfield's `gpt_image_2` model. **Always pass `resolution: "1k"`** in the params — defaulting to a higher resolution wastes credits and produces no improvement on storyboard sheets (they are documents, not heroes).

**When to pause vs batch:** Pause for feedback between scenes when the user is exploring style, hasn't given a final script, or has flagged an aesthetic concern. **When the user has provided a finalized script and the deliverable is the storyboards themselves (no follow-on composition build), batch all scenes in sequence without pausing** — the user will review the full set and direct revisions in one pass. Pausing every scene becomes friction, not feedback.

For each storyboard, the prompt specifies:

1. **Aspect ratio: 16:9.**
2. **Top-left scene label** (e.g., "SCENE 03 / RESCUE / 13.0–21.0s") in white monospace.
3. **Left half: thumbnail grid.** Number of thumbnails matches scene complexity (2, 3, 4, or 5). Each thumbnail labeled `01`, `02`, `03`... in monospace top-left corner. Each captioned below with timing (e.g., `LOGO IN — 1.5s`). **Each thumbnail MUST be a full-height vertical 9:16 rectangle (taller than wide).** gpt_image_2 will default to square/landscape thumbnails if you don't explicitly demand vertical proportions — include the phrase "all four/five thumbnails are tall vertical 9:16 portrait rectangles (taller than wide), NOT square, NOT landscape" in every storyboard prompt. The whole point of the thumbnail grid is to preview what the actual 1080×1920 composition will look like; landscape thumbnails defeat that.

   **Beat-to-beat transitions vs accumulation (READ THIS BEFORE WRITING THE PROMPT).** Each numbered thumbnail represents a *moment in time*, not a *layer being added*. If thumbnail 02 shows "BAR COMPARISON" landing while the headline from thumbnail 01 is still on screen, you're telling the production agent to **stack** elements indefinitely — which produces compositions where the final frame has 5+ layered elements competing for attention. The correct read of "01 SETUP / 02 BARS / 03 NUMBER" is: setup appears → setup fades out → bars appear → bars fade out → number appears. The thumbnail captures *what is visible at that beat*, with prior elements absent unless they're load-bearing for the new state (e.g., a persistent eyebrow, a Vox-style masthead that anchors a timeline scene).

   When you write the storyboard prompt, **explicitly call this out** for every multi-beat scene: *"each thumbnail represents the scene at that moment — element from previous beat fades out before next beat lands; do NOT show elements from earlier beats unless they persist by design (eyebrow, footer, masthead)."* When you write the animation brief, encode the transitions: *"FADE OUT setup copy (opacity 1→0, duration 0.35s, ease bezierOut) starts 0.25s before bars come in at at(scene, 'double') − 0.20."* The brief is the source of truth — if it doesn't include the fade-outs, the agent will build a stacking scene every time.
4. **Top right: ASSET REQUIREMENTS LIST (text panel, NOT cyan-with-rendered-asset).** A dark gray panel headed "ASSETS REQUIRED" listing each `generate-image` / `existing-asset` beat as a bulleted text spec: filename, dimensions, alpha, one-line description, source type (AI-placeholder / licensed / project-existing). Do **not** render the asset on a cyan chroma-key panel inside the storyboard — that wastes the storyboard's pixel budget and ties the asset's look to a low-resolution preview. Instead, the storyboard sheet stands as a **reference image** that you (or the production agent) feed back into `gpt_image_2` as a `medias` input when generating each individual asset separately at full resolution: *"generate a Warren Buffett portrait asset matching the archetype shown in this storyboard reference, isolated on transparent background, 1080×1440."* This separation keeps the storyboard readable AND produces sharper, fully-isolated final assets. If a scene needs no real-world assets (all `html-css` / `svg` / `code-chart`), omit the assets panel entirely and let the animation brief expand to fill the right side.
5. **Bottom right: animation brief on dark gray.** Numbered list, web-native specifications only. Reference word-timing sync points where applicable (e.g., "land on 'Intel' word at 1.06s").

If the user has a reference image for the visual style, upload it to Higgsfield first via `media_upload` → curl PUT → `media_confirm`, then pass `media_id` as a `medias` reference. This locks color/mood matching far better than text descriptions.

### Phase 7: Iterate per-scene based on feedback

Generate scenes in sequence. Don't generate all in parallel — feedback on early scenes reshapes later ones.

Common iteration patterns:
- "This scene leans on the same archetype as scene N" → diversify the visual vocabulary, find a beat type the video hasn't used yet
- "Color too neon" → match a reference image more directly via `medias`
- "Brand isn't visible" → add the logo to a bookend scene
- "Text on the cyan" → regenerate with cleaner asset panel separation
- "This shouldn't be a generated asset" → revisit Phase 4's source decision; rebuild as HTML/SVG/chart

If a generation produces a malformed result, simplify the prompt rather than adding more detail. Heavy prompts make GPT Image 2 skip elements.

## Animation brief constraints

Every animation brief must be **web-native by default** unless the user is producing in After Effects.

Web-native means:
- **Allowed:** transforms (translate, scale, rotate), opacity, CSS filters (blur, brightness, drop-shadow, hue-rotate), SVG path draw-on (stroke-dashoffset), color crossfades, counter animations on text content, Three.js for 3D objects (camera moves, emissive intensity, geometry scale), GSAP SplitText for word/char-level reveals
- **Disallowed:** particle dissolves, liquid morphs, true motion blur, complex glitch effects, shader-driven warps. Replace these with crossfades, opacity overlaps, scale-and-fade combinations, or CSS filter chains.

Output format for a brief is a numbered list specifying:
- **Action verbs:** translate, scale, opacity, filter, draw-on, counter
- **Numeric ranges:** `scale(0.9 → 1.0)`, `opacity(0 → 1)`
- **Timing:** duration in seconds, easing curve (`ease-out-cubic`, `back.out(1.5)`)
- **Sync points:** "+0.3s delay", "land on word 'Intel' at 1.06s" (reference the timing JSON when possible)
- **Stack:** which layer handles what (Three.js for 3D, GSAP for timeline orchestration, HTML+CSS for text, SVG for charts/diagrams)
- **Type:** font + size for each text element
- **Color:** hex codes for backgrounds and accents
- **Export:** capture method (CCapture.js, screen-record) and format (1080×1920 @ 60fps, ProRes 4444)

## Word-by-word VO sync

When VO is locked, every word that's emphatically spoken should have a corresponding visual beat aligned to its frame. Pull start/end frames from the per-scene timing JSON and use them to set GSAP delay values.

Example: VO says *"Q2 losses: two-point-nine billion."* — the timing JSON gives you frame numbers for `Q2`, `losses`, `two-point-nine`, `billion`. The animation brief reads:

```
05. WORD STACK:
    "Q2"        — fade-in 0.3s, ease-out, t=word("Q2")
    "LOSSES:"   — fade-in 0.3s, ease-out, t=word("losses")
    "$2.9B"     — SplitText scale 1.2→1.0 + opacity 0→1, back.out(1.4), t=word("billion")
```

This is what makes finance-reel pacing feel alive — every spoken beat hits a visual beat.

## Asset panel design rules (when used)

When a scene includes a cyan asset panel:

- Cyan color: `#00B8D4` (chroma-key cyan)
- The cyan rectangle contains *only* the assets. No text, no labels, no filenames, no borders inside the cyan.
- Asset metadata (filename, dimensions, alpha) goes in a thin strip *above* the cyan, on the dark gray background. Never overlapping the cyan.
- For multiple assets, subdivide the cyan into a grid of separate cyan cells, each containing one asset. The agent crops each cell separately.
- The asset must be the same hero element that appears in the thumbnails — not a stylized variant. Consistency between thumbnail and cyan asset is what makes the asset reusable.
- Numbers, percentages, dollar amounts, dates, and other typography are **never** placed on the cyan. They belong in the thumbnail composition only.

## Editorial baseline (apply on every video, BEFORE writing scenes)

These five fixes are non-negotiable. They are what separates "YouTube edit" from "Bloomberg / Vox / FT editorial." If you build a scene without them, you will rebuild it. Apply them as the project skeleton, then write scenes inside that skeleton.

### 1. Never `#000` or `#FFF`. Use warm near-black / off-white.

Pure black and pure white are the single biggest amateur tell. Editorial pieces use:

- **Near-black:** `#0F0F0F` (default), `#14110d` (warmer), `#0e0905` (cream-paper ink). Never `#000000`.
- **Cream / off-white grounds:** `#ebe5d2` (newsprint), `#FFF1E5` (FT salmon), `#F1F3F2` (Bloomberg cream), `#f0e5b8` (legal pad). Never `#FFFFFF`.

Even gradients that *end* in `#000` count. `linear-gradient(180deg, #0a0a14 0%, #000 60%)` is still pure black at the bottom — change to `… 0%, #0F0F0F 60%)`.

### 2. ONE accent color per video. Brand color when the video promotes a brand.

A video gets exactly ONE accent. Repetition of that one color across scenes is what makes the piece feel like a brand, not a deck.

- **For Bloom videos:** the accent is **Bloom blue `#1658FF`** (with `#0F47CC` as the darker variant). Anything that promotes Bloom — explainer, market tick, educational lesson — uses Bloom blue. Not green. Not red. Not a "feels finance-y" green.
- **For non-Bloom pieces:** pick once, commit. Amber `#FB8B1E`, Vox yellow `#FFEB00`, Economist red `#E3120B` — choose ONE.

**Red is reserved.** Red is allowed only for: strikethroughs on rejected items, "NOT" / "NO" markers, and explicit alert/negative-change indicators. It is NOT for accentuating dotcom-crash hero numbers, danger-zone callouts, or timeline event dates. Those become ink-black or muted ink. If you find yourself reaching for red as a second accent, you've broken the rule.

**Check:** grep your composition for hex codes. If you see more than one saturated accent in active use, recolor until one remains.

### 3. CSS variables for accent + ink. Every time.

Every composition opens with:

```css
:root {
  --accent:     #1658FF;   /* Bloom blue (or chosen single accent) */
  --accent-dk:  #0F47CC;
  --accent-soft: rgba(22,88,255,0.18);
  --ink:        #0e0905;
  --ink-mute:   #6B6B68;
  --bg-dark:    #0F0F0F;
  --paper:      #ebe5d2;
}
```

Reference `var(--accent)` inside scene CSS, never inline hex. This unlocks the color-recolor pivot (one CSS-variable tween shifts the whole piece between two related ideas) and prevents accent drift across scenes.

### 4. Grain overlay on every composition.

A subtle paper-grain overlay grounds every shot. Add ONCE inside `#root`, above all scenes:

```html
<div id="root">
  <div id="grain"></div>
  <!-- scenes here -->
</div>
```

```css
#grain {
  position: absolute; inset: 0;
  pointer-events: none;
  opacity: 0.16;                /* tune 0.14–0.18 */
  mix-blend-mode: soft-light;
  z-index: 9999;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.6 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");
}
```

It's the single visual change that most separates "YouTube edit" from "editorial." Works on both dark and cream grounds because of `mix-blend-mode: soft-light`.

### 5. Editorial easing system. Asymmetric snap-in, never symmetric.

Symmetric curves like `power2.out` / `power2.inOut` / `back.out` read as template/library defaults. Editorial uses asymmetric curves — fast start, long settle on entry; soft start, fast exit on departure.

Register ONCE at the top of every composition:

```js
gsap.registerPlugin(CustomEase);
CustomEase.create("snapIn",  "0.22, 1, 0.36, 1");   // 90% of element entrances
CustomEase.create("settle",  "0.16, 1, 0.3, 1");    // hero reveals, big stats (longer tail)
CustomEase.create("snapOut", "0.5, 0, 0.75, 0");    // exits, snappy off
CustomEase.create("smooth",  "0.65, 0, 0.35, 1");   // long camera moves, parallax
// 'none' (linear) — drift only, never entry/exit
```

| Curve | Use for | Default duration |
| ----- | ------- | ---------------- |
| `snapIn` | Element entrances, text reveals, bar scaleX, chart line draw-on | 0.4–0.6s |
| `settle` | Hero headlines, big-number stats, brand reveals | 0.7–1.0s |
| `snapOut` | Exits, beat→beat fades, whip-pan exit halves | 0.2–0.3s |
| `smooth` | Slow parallax, photo drift, camera-style moves | 1.5–4.0s |
| `'none'` | Hold-on-still drift only | full beat |

**Forbidden eases:** `power*.out`, `power*.in`, `power*.inOut`, `back.out`, `elastic.out`, `bounce.out`, GSAP default ease. Replace on sight.

The previous `bezierIn (0.1, 0.7, 0.5, 1)` curve in this skill was too symmetric — it has been re-pointed to the `snapIn (0.22, 1, 0.36, 1)` curve. Existing compositions using `bezierIn` / `bezierOut` should alias them to `snapIn` / `snapOut` for back-compat.

### 6. Word-block reveals, NEVER character-by-character.

Editorial pieces reveal **whole words** as units. Words rise + fade in together with a ~0.12s stagger between them. Character-by-character staggers (`type: "words,chars"`, animating `split.chars`) are a Johnny-Harris archive affectation — they read as typewriter / hand-drawn aesthetic, not Bloomberg/Vox. They also make every headline feel slow and twitchy at the same time.

The reusable helper (drop in once, call everywhere):

```js
// Reveals an element's words with rise + fade. Forces parent opacity:1 so
// CSS opacity:0 doesn't multiplicatively hide the words.
// Accepts either a selector string or an Element node.
function chars(selectorOrEl, time, opts = {}) {
  const el = typeof selectorOrEl === "string"
    ? document.querySelector(selectorOrEl)
    : selectorOrEl;
  if (!el) return;
  const split = new SplitText(el, { type: "words" });   // WORDS, not chars
  gsap.set(el, { opacity: 1 });
  gsap.set(split.words, { opacity: 0, y: opts.y ?? 24 });
  tl.to(split.words, {
    opacity: 1, y: 0,
    duration: opts.duration ?? 0.50,
    stagger: opts.stagger ?? 0.12,
    ease: opts.ease ?? "snapIn"
  }, time);
}
```

The helper is named `chars` for back-compat with existing compositions, but it reveals words. Don't change the implementation back. If you genuinely need character-stagger for an archive / typewriter moment, write a separate `chars_typewriter()` helper — never let it become the default.

### 7. Tabular numerals on every visible number.

Without `font-variant-numeric: tabular-nums`, digits change width as a counter ticks (1 is narrower than 8), and the eye reads the jitter as cheap. The fix is a single CSS rule covering every stat / counter selector in the piece:

```css
.s3-value, #s5-price, .s6-bar-amount, #s6-payoff,
#s6-history .s6-stat-value, .s7-stat {
  font-variant-numeric: tabular-nums;
  font-feature-settings: "tnum" 1;
}
```

Apply to: stat callouts, counter elements, chart-bar value labels, time-range numbers, dates with day-precision. Skip only for body prose and editorial headlines that don't contain animated numbers.

### 8. Two weights only — 400 and 700.

Editorial uses **one typeface, two weights**. Weights 500 and 600 read as indecision; weights 800 and 900 read as over-cranked. Collapse the font-weight palette to **400 (body) and 700 (everything bold)**. Italic variants of the same weight are allowed (Playfair Display italic 700 for serif pull-quotes is the textbook editorial move).

Update the Google Fonts URL accordingly — don't load weights you won't use:

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=JetBrains+Mono:wght@400;700&family=Playfair+Display:ital,wght@0,700;1,700&family=Caveat:wght@700&display=swap" rel="stylesheet">
```

Grep your composition for `font-weight: 500|600|800|900` and replace each with `700`. The hero headlines that "feel weaker" at 700 instead of 900 actually feel more editorial — the heaviness was the amateur tell.

**Allowed typeface roster** (each with a clear job — never use one outside its role):
- **Inter** — body text, eyebrows when not serif-quoting, big stat numbers
- **JetBrains Mono** — uppercase eyebrows, date stamps, source citations
- **Playfair Display italic** — editorial serif pull-quotes, newsprint headlines
- **Caveat** — handwritten legal-pad list items, hand-annotated callouts

If you need a fifth typeface, you've broken the system — find a way to use one of these in a different weight or context instead.

### 9. Cut redundant beats. Hold longer on the payoff.

A common amateur pattern: cram setup → bars → payoff → context into 7s, give the hero number 1.5s of stillness, wipe. The viewer never gets to *see* the number land. Editorial pacing demands **3–4 seconds of stillness AFTER a stat reveals**, not 1.5s.

When you can't extend the scene (VO is locked, audio is consolidated), the fix is to **cut a beat**, not to speed up. Common cuts:

- **Cut the setup-copy beat** if the next beat already labels what the setup said. Example: a "Every public stock in America" hero-text beat followed by a bar comparison labeled "MARKET CAP / US GDP" — the bars already say the setup. Delete the setup beat; show the bars from scene start; bar labels animate in anchored to the opening VO words. The 2+ seconds you reclaim go to the payoff hold.
- **Cut the source-attribution micro-row** if the source is already implicit (you already cited it in the eyebrow or chart axis).
- **Cut the "danger pill" / accent badge** under the hero number. The number itself is the punch line. A pill below it competes.

Practical rule: if a beat would be redundant if you removed it, remove it.

### 10. CSS layout containers for beat→beat transitions (no layout stacking).

When a single scene contains multiple sequential beats (setup → comparison → payoff), each beat must be its own absolute-positioned container at `top: 50%; transform: translateY(-50%)`. They stack in the same screen position; only one is visible at a time via opacity tween. A faded-out beat takes **zero** layout space, so the next beat stays perfectly centered.

```css
.scene-beat {
  position: absolute;
  left: 80px; right: 80px;
  top: 50%;
  transform: translateY(-50%);
  display: flex; flex-direction: column;
  align-items: center;
  text-align: center;
}
```

```html
<div class="scene-beat" id="beat-1">…</div>
<div class="scene-beat" id="beat-2">…</div>  <!-- overlaps beat-1 in space -->
<div class="scene-beat" id="beat-3">…</div>
```

Then GSAP toggles `opacity: 0/1` between beats. Never use flex/grid stacking for multi-beat scenes — when beat-1 fades, the layout collapses and beat-2 jumps upward into the vacated space. The amateur signature is "elements jitter vertically as siblings fade in/out."

### Pre-flight check (run before writing any scene)

- [ ] `:root` defines `--accent`, `--accent-dk`, `--ink`, `--ink-mute`, `--bg-dark`
- [ ] No `#000` or `#FFF` literals anywhere (including gradient endpoints)
- [ ] Exactly one saturated accent color in active use across all scenes
- [ ] `#grain` div present in `#root`, soft-light, 0.14–0.18 opacity
- [ ] `snapIn / settle / snapOut / smooth` registered; no `power*` or `back.*` eases in tweens
- [ ] For Bloom videos: accent is `#1658FF`
- [ ] `chars()` helper splits **words**, not chars
- [ ] `font-variant-numeric: tabular-nums` applied to every animated number / counter / stat selector
- [ ] Google Fonts URL loads **400 and 700 only** (plus italic 700 for serifs). No weights 500/600/800/900 in CSS.
- [ ] Every multi-beat scene uses absolute-positioned `.beat` containers, never flex/grid stacking
- [ ] Hero number / payoff stat has ≥ 3s of stillness AFTER it lands (cut a redundant beat if needed)

---

## Hard visual rules

These rules apply to every storyboard and every built composition unless the user explicitly overrides them.

- **No neon glows on type, charts, or logos.** No `filter: drop-shadow(0 0 Npx <color>)` on text, no `text-shadow` rings, no glowing strokes on chart lines, no rim-light haloes on logos. They read as "AI-generated finance reel slop," not editorial. Color carries the emphasis — a saturated red `#DC2626` on black needs no glow to feel urgent. If a scene feels flat without a glow, the fix is bigger type or a stronger color contrast, not a blur halo.
- **No atmospheric radial washes behind elements.** Even at low opacity, a colored radial gradient behind the hero element (an emerald wash behind a green logo, an amber wash behind a red chart) reads as the same "AI slop" tell as a hard glow. The background is solid black (or solid white) — full stop. No `radial-gradient(...)` blobs in scene backgrounds. If you want depth, get it from contrast, scale, and motion — not background glow.
- **Drop-shadows on cards/UI surfaces are allowed** when they communicate elevation (a card lifted off the canvas), since that's a structural cue, not a decorative emphasis.
- **No overshoot eases on entrances or exits.** Forbidden: `back.out(*)`, `back.in(*)`, `elastic.out(*)`, `bounce.out(*)`, and any custom ease that overshoots past its endpoint. Overshoot reads as "playful animation library default" — it cheapens editorial typography. Use these two cubic-bezier curves instead, applied consistently:

  - **Bezier IN** (entering / appearing): `cubic-bezier(0.1, 0.7, 0.5, 1)` — fast start, soft settle. Use whenever an element enters the frame, scales up, fades in, or otherwise *arrives*.
  - **Bezier OUT** (leaving / disappearing): `cubic-bezier(0.5, 0, 0.9, 0.3)` — soft start, fast exit. Use whenever an element exits, fades out, scales down to leave, or otherwise *departs*.

  In GSAP, register them once at the top of the timeline script and reference by name:

  ```js
  gsap.registerPlugin(CustomEase);
  CustomEase.create("bezierIn",  "0.1, 0.7, 0.5, 1");
  CustomEase.create("bezierOut", "0.5, 0, 0.9, 0.3");

  // entrance
  tl.fromTo("#payoff",
    { scale: 1.25, opacity: 0 },
    { scale: 1.0, opacity: 1, duration: 0.55, ease: "bezierIn" },
    t
  );

  // exit (only on the final scene per HyperFrames rules)
  tl.to("#payoff", { opacity: 0, duration: 0.4, ease: "bezierOut" }, t);
  ```

  Acceptable existing GSAP eases that are NOT overshoot: `power1/2/3/4.out` for entrances, `power1/2/3/4.in` for exits, `power*.inOut` for through-motion. These are the fallbacks if `CustomEase` isn't available.
- **Minimum readable type sizes for vertical 1080×1920.** Short-form vertical video is viewed on a phone — small type that looks fine on a 1920×1080 dashboard becomes a smudge on a 5-inch phone screen. Use these floors:

  | Role | Minimum (1080×1920) | Notes |
  |---|---|---|
  | Display payoff (the hero number) | **180px** | Bigger if the scene only has one element |
  | Headline / caption | **80px** | Two-line headlines OK at this size |
  | Sub-caption / supporting line | **48px** | Date stamps, eyebrows that genuinely earn their place |
  | Chart axis labels, ticker text, stat-card labels | **36px** | Anything below this is visual noise on a phone |
  | **Absolute floor for ANY visible text** | **32px** | **HARD BAN below this. No exceptions, ever.** |

  These are minimums, not targets. If you find yourself wanting an "INTC · JAN — AUG 2025"-style eyebrow at 32px just because the layout has empty space at the top, **delete it**. The chart's axis labels + the marker callout already say what it is. Don't sprinkle small labels to fill space.

- **HARD BAN: no text below 32px.** Earlier drafts of this skill allowed a 28px floor; experience proved that 28–31px reads as "fine print AI-finance-reel slop" on phone screens. The new hard floor is **32px**. If a label can't earn 32px on the layout, it doesn't belong on screen. This applies to source lines, axis micro-ticks, stat-card labels, attribution captions, footer text, sidebar notes — everything.

- **HARD BAN: no decorative status pills for editorial emphasis.** Pills like `DANGER ZONE · ABOVE 200%`, `BREAKING NEWS`, `WARNING`, `ALERT`, `RECORD HIGH`, `BUBBLE TERRITORY` — these read as procedurally-generated AI-finance-reel clichés. The hero number + palette + comparison already carry the editorial weight. A red `209%` with a red `TODAY 209%` historical-comparison cell at full size next to `80%` (long-run avg) tells the danger story without a pill announcing it. **Pills are acceptable ONLY when they earn their place:**

  - **Active-state UI affordances inside a fake-UI card** — the `12Y` range chip in a Robinhood price card, the `BUY` button — these are UI vocabulary, not editorial commentary.
  - **Brand bookend pills** — `LINK IN BIO`, `FOLLOW`, `TAP THE LOGO` — functional CTA, not decoration.

  If you're tempted to add a small uppercase italic pill like `DANGER ZONE · ABOVE 200%` to "make the data hit harder," stop. Make the data hit harder by making the data bigger.

- **HARD BAN: no source / attribution micro-text at the bottom of editorial scenes.** Bottom-of-frame `SOURCE · FRED · WILSHIRE 5000 · US BEA · MAY 2026` at 18–22px is the single most-common AI-slop tell in finance reels. Vertical short-form is not a financial filing. If the data needs sourcing, either:
  - Bake the date into a full-size element (e.g., the eyebrow `Q1 2026` at 48px+ alongside the headline), or
  - Trust the viewer.

  The same rule applies to "Past performance not indicative of future results"-style disclaimers and any other regulatory micro-copy. If it has to be in the video, it has to be at full size.

- **The cut-the-clutter test (apply before every snapshot).** Look at each element on the scene and ask: *"If I remove this, what does the viewer lose?"* If the answer is "they'd wonder what data source this comes from" — cut it, trust them. If the answer is "the editorial pivot wouldn't land" — keep it. The single biggest mistake in AI-generated motion graphics is adding decorative elements that feel like they belong (because Bloomberg or Vox sometimes do them) but contribute nothing to *this specific moment*. A clean scene that breaks one of the type-size rules is still better than a cluttered scene that follows them.

- **Storyboard prompt requirement: state the type floor inline.** Every storyboard-sheet prompt (Phase 6) MUST include the literal text: *"All on-screen text in the thumbnails is sized for phone reading at 1080×1920 — minimum 32px CSS. No source attribution micro-text at the bottom. No decorative status pills (no 'DANGER ZONE', 'WARNING', 'RECORD HIGH', etc.)."* Otherwise the generated thumbnails default to dashboard-density layouts with small footer attributions that production agents will faithfully re-create in HTML.

- **HARD BAN: no verbatim composition repetition across scenes in the same reel.** If two scenes in a reel share the same layout (same hero element in the same screen position, same support-text placement, same crop, same palette), the reel feels lazy and procedurally generated — viewers register "I've seen this already" within frames. The most common offender: a portrait of a real person (e.g., Warren Buffett) filling the upper 60% of one scene with text below, *then a later scene* also showing the same portrait in the same crop with different text below. Even if the text is different, the *gestalt* is identical, and the second scene feels like a duplicate.

  **What counts as repetition (avoid):**
  - Same portrait at the same crop/scale/position in two scenes.
  - Same headline-over-image layout structure on two scenes with the same subject.
  - Same chart card style with the same color palette in two consecutive scenes without different framing.
  - The same "big number + sub-label" treatment used for two different stats back-to-back.

  **What is fine (and often good for reel cohesion):**
  - The same *technique* used twice with visibly different content: a Robinhood-style price card at scene 3 for "Buffett Indicator" and another at scene 7 for "Berkshire stock", with different palette and different chart shape. (Cohesion, not repetition.)
  - Persistent brand elements: a Bloom logo bookend at start and end. (Bookending is intentional symmetry.)
  - The same eyebrow type style across scenes (mono caps at 32px+). (Typographic consistency.)

  **Fixes when a verbatim repeat is detected:**
  - **Different framing of the same subject.** If Buffett appears twice, the second scene uses a different crop (close-up vs medium shot, profile vs three-quarter, different lighting). Generate a second AI archetype variant rather than reusing the first asset's exact crop.
  - **Different supporting visual.** Pair the second mention with a chart, a money-stack visualization, a historical comparison row, a balance-sheet card — anything that breaks the portrait-over-text gestalt.
  - **Demote the recurring element.** Shrink it. If scene 1 had a portrait filling the upper 60%, scene 8 uses the same portrait as a small circular thumbnail in the corner, while the number / chart dominates.
  - **Swap the asset entirely.** If the recurring element is decorative (a generic photo, a generic icon), replace it with a different asset in the second appearance.

  **Storyboard-time audit:** after Phase 4 (planning beats), look across the storyboard for any two scenes whose *thumbnails would look interchangeable from 10 feet away*. If yes, redesign one of them before generating any sheets.

- **HARD BAN: no web-app / dashboard / SaaS-UI compositions.** Every scene must pass the *"Could this frame appear in a professional After Effects motion-graphics piece by a real studio?"* test. If the frame looks like it could be a screenshot of a settings page, a feature-marketing site, a SaaS dashboard, or a generic React component library, it fails the test — even if the content is correct. The single most common AI-slop tell is a vertically-stacked list of cards with checkmark / X icons on the left and a title + sub-label on the right (e.g., "❌ Not buying the index / S&P 500 · NASDAQ · DOW", "❌ Not rotating to bonds / TREASURIES · CORPORATES · TIPS", "✓ Sitting in cash / $380B · T-BILLS · WAITING"). It looks like a SaaS pricing page or a feature comparison table. Motion-graphics videos by professional studios never look like that.

  **Patterns that fail this test (forbidden):**
  - Three or more vertically-stacked rounded-rect cards with the same internal layout (icon-left / title-right / subtitle-below).
  - Checkmark and X icons used as the primary visual differentiator (✓ / ✗ inside circles or squares).
  - Pricing-tier-style cards with a highlighted "winner" border and the others in muted style.
  - Generic stat-card grids: 3-up or 4-up cards each containing `LABEL` + big number + `tiny sub-label`, all the same size and rhythm.
  - Settings-page rows: label on left, toggle/value on right, separator line, repeat.
  - "Feature comparison" 2-column tables with red ✗ and green ✓ marks.
  - Any layout that would feel at home as a Stripe / Linear / Vercel marketing landing-page section.

  **Patterns that pass (good):**
  - Editorial layouts that quote a documented technique in the skill — Newsprint Clipping, Pull-quote card, Polaroid stack, Vox timeline scroll, Editorial legal-pad checklist (with handwritten Caveat font + red marker strikethroughs + green underline + hand-drawn arrows), Map zoom, Split-screen comparison, Robinhood-style price card in dark mode.
  - Big kinetic typography moments (hero numbers, char-staggered headlines) where the type itself is the composition.
  - Photographic compositions where a real photo or asset carries the frame.
  - Anything that looks like it was art-directed for After Effects by a designer who watches Vox / Bloomberg Originals / Johnny Harris / Wendover.

  **The "rendered Stripe page" test:** if you can imagine the frame on a SaaS pricing or feature page with no edits, the composition is wrong. Pick a documented technique from the techniques library instead. If none fit, design something new that draws from motion-graphics vocabulary — annotations, handwriting, marker strokes, editorial typography, photographic anchors — rather than from web UI vocabulary.

  **Rebuild prescription when a scene fails this test:** swap the card grid for a Vox-style editorial layout. The "Buffett's not buying the index / not bonds / sitting in cash" beat that previously rendered as a 3-card stack was rebuilt as an italic Playfair "What Buffett is NOT doing." headline + handwritten Caveat numbered list with thick red marker strikethroughs on rejected options and a thick green marker underline + hand-drawn check + arrow annotation on the chosen one, all on cream legal-pad paper with a red left margin. Same content, infinitely more editorial weight.

- **Never run two text-only scenes back-to-back.** After Phase 4 (visual beat planning), do a pacing pass across the full scene list:

  Tag each scene as one of:
  - **TEXT-ONLY** — pure typography, no charts/SVG diagrams/photos/logos/3D objects
  - **MIXED** — typography + at least one visual element (chart, photo, logo circle, 3D render, illustration)

  Hard rules:
  - **Forbidden:** two consecutive TEXT-ONLY scenes. Viewers fatigue when the only thing changing is the words on a black canvas — they tune out within 4-5 seconds.
  - **Strictly forbidden:** three or more consecutive TEXT-ONLY scenes. This is structural failure of the storyboard; rewrite or merge.
  - **Goal:** interleave so every TEXT-ONLY scene is sandwiched by MIXED scenes. The ideal cadence is `MIXED → TEXT → MIXED → TEXT → MIXED` or `MIXED → MIXED → TEXT → MIXED`.

  When the pacing audit catches a violation, the fix is one of:
  - **Add a visual element** to one of the offending text scenes (a chart, a logo orbit, a photo, an SVG diagram, a small 3D object) — turn it MIXED.
  - **Reorder** scenes so text-only ones aren't adjacent.
  - **Merge** the two text scenes into one denser beat if they're saying related things.
  - **Cut** one of the scenes if its content can fold into another.

  Why it matters: even with strong char-stagger and camera drift, a black canvas with only type on it relies entirely on the words for visual interest. Two in a row = the viewer's eye has nothing new to chase, and the scene starts feeling like a slideshow. A logo, a chart, a photo — anything visual — gives the eye new spatial info to latch onto.

  This rule applies to the storyboard plan, not just the finished build. Catch the pacing failure before generating any assets.

- **Real people get rendered, not just named.** Whenever the script mentions a real-life person — a CEO, a politician, an analyst, a founder — the scene that names them MUST include their face. Treating the name as text-only when there's a real human behind it is a missed editorial beat: portraits anchor abstract claims ("the CEO cut 15% of staff") in a concrete subject the viewer can attach the action to.

  Sourcing order:
  1. **Licensed press photo** — preferred for production. Asks the user to drop one into `assets/`.
  2. **AI-generated archetype portrait** (gpt_image_2 with a careful descriptor: ethnicity, approximate age, hair, glasses, attire, lighting style, neutral background). Acceptable as a *placeholder* during iteration. Always flag in the delivery summary that this is a placeholder needing a licensed swap before publication.
  3. **Name-only typographic treatment** is a last resort — only use if the user explicitly chooses it or if the person's image is unavailable for legal/policy reasons.

  AI-generated faces of named real people are unreliable — the model produces "the right archetype" (e.g., "East Asian male tech CEO mid-60s with glasses"), not a literal likeness. Don't claim the AI portrait *is* the person; treat it as a stand-in that production will replace.

  Layout pattern that works: portrait fills the upper 60–70% of the vertical frame, edges fading via vignette into the dark canvas, then big numeric or word callout overlapping the lower portion of the photo. The text-over-photo overlap is what makes it feel editorial rather than slide-deck-y.

- **Camera drift on every scene.** Static frames feel like a slideshow. A subtle continuous camera move on the *whole* scene container — not on individual elements — reads as "filmed" instead of "rendered." Apply this to every scene by default unless the scene's hero is already in motion (e.g., a 3D object rotating).

  Recipe: tween the scene's content container with a 1–4% scale push and a 12–24px lateral drift over the full duration of the scene, with `ease: "none"` (linear). Direction can vary per scene to keep eyes refreshed.

  ```js
  tl.fromTo("#scene2 .scene-content",
    { scale: 1.00, y: 0 },
    { scale: 1.04, y: -16, duration: 6.5, ease: "none" },
    sceneStart
  );
  ```

  Why it works: the human eye reads any continuous low-amplitude motion as "the camera is alive," which is the single biggest cue separating "professional video" from "PowerPoint." It costs nothing in attention budget — viewers don't consciously notice it — but the absence of it is exactly what makes a finance reel feel "dry."

- **Text reveals are character-staggered, not word-blocks.** Default to character-level SplitText reveals on every text element that's part of a kinetic-typography moment (numbers, captions, eyebrows, payoffs). Block-fade entrances feel inert in 2026; characters rolling out at 20–40ms stagger feel like a live ticker.

  ```js
  // Synchronously create the SplitText (chars are in DOM before timeline runs)
  const split = new SplitText("#payoff", { type: "words,chars" });
  gsap.set(split.chars, { opacity: 0, y: 14 });

  // Animate chars with stagger; first char lands on the spoken word.
  tl.to(split.chars, {
    opacity: 1, y: 0, duration: 0.35, stagger: 0.025, ease: "bezierIn"
  }, wordTime);
  ```

  Stagger calibration:
  - Display payoff numbers (`+480%`, `−15%`): **0.03–0.04s/char** (snappy, dramatic)
  - Captions and labels (`Q2`, `LOSSES`, `WORKFORCE CUT`): **0.020–0.025s/char** (rapid roll-out)
  - Long subtitles (8+ words): **0.015–0.020s/char** (otherwise the spread becomes too long)

  Always use `type: "words,chars"`, not `type: "chars"` alone. Word-only chars break wrapping at any character — `BILLION` becomes `BIL\nLION` mid-word. Word boundaries must be preserved so wrapping happens at spaces.

  Don't combine character stagger with overshoot eases (forbidden anyway). The bezierIn ease handles the deceleration cleanly.

- **Animation timing — anchor every position to a spoken phrase, never to a magic number.** Hard-coded timestamps (`tl.to(..., 9.0)`) are forbidden. They become invalid the moment VO is re-recorded with different word timing, and they hide *why* a position was chosen. Use a phrase-resolution helper instead.

  Every composition that has VO must include a small inline helper based on the per-scene timing JSON (`assets/voiceover/<id>/scene-NN.timing.json`):

  ```js
  // SCENES: { "scene-01": { offset, words:[{word, start}, ...] }, ... }
  function _norm(s) { return s.toLowerCase().replace(/[^\p{L}\p{N}'-]/gu, ""); }
  function _findPhrase(sceneId, phrase) {
    const W = SCENES[sceneId].words;
    const tokens = phrase.toLowerCase().split(/\s+/).map(_norm).filter(Boolean);
    const hits = [];
    for (let i = 0; i <= W.length - tokens.length; i++) {
      let ok = true;
      for (let j = 0; j < tokens.length; j++) {
        if (_norm(W[i+j].word) !== tokens[j]) { ok = false; break; }
      }
      if (ok) hits.push(i);
    }
    if (hits.length === 0) throw new Error(`at: phrase "${phrase}" not found in ${sceneId}`);
    if (hits.length > 1) throw new Error(`at: phrase "${phrase}" matches ${hits.length} occurrences in ${sceneId}. Use a longer phrase.`);
    return W[hits[0]].start;
  }
  function at(sceneId, phrase)              { return SCENES[sceneId].offset + _findPhrase(sceneId, phrase); }
  function landOn(sceneId, phrase, dur = 0) { return at(sceneId, phrase) - dur; }
  ```

  **The contract:**
  - `at(sceneId, phrase)` returns the composition-absolute start time of the first word of `phrase`.
  - The helper throws if the phrase doesn't appear, AND throws if it appears more than once with all conflicting timestamps printed.
  - **Always pass a phrase, not a single word**, even when the word is currently unique. Phrases stay unambiguous as VO grows; single common words ("the", "of", "a") collide quickly.
  - The phrase match is whitespace- and punctuation-insensitive: `"q two"` matches the transcript word `"Q2"`, `"left for dead"` matches `"left-for-dead"`. Hyphens are preserved, so `"left-for-dead"` works too.

  **Usage patterns:**

  ```js
  // Animation peaks roughly on the spoken word — small lead-in for entrance ease
  tl.from("#chip", { ... }, at("scene-01", "Intel went") - 0.21);

  // Animation REACTS to a word — start it slightly after
  tl.fromTo("#payoff", { ... }, at("scene-01", "comeback story") + 0.14);

  // Bloom-style "animation FINISHES on the word" — duration is subtractive
  tl.to("#card", { opacity: 1, duration: 0.5 }, landOn("scene-02", "nineteen", 0.5));

  // Scene transitions: anchor to the next scene's first phrase
  tl.to("#scene1", { opacity: 0, duration: 0.4 }, at("scene-02", "Last August") - 0.3);
  ```

  **Rules:**
  - Never hardcode a timestamp. If you're tempted, you're missing a phrase anchor.
  - Use longer phrases (2-4 words) to disambiguate even when 1 word is unique today — future VO changes will collide.
  - The data block (`SCENES`) should be regenerated whenever VO is re-recorded. A small build script that reads the per-scene `timing.json` files and emits the JS const is the right shape; until then, hand-update the inline data block when the script changes.
  - Bake the data inline (don't `fetch()` it at runtime). HyperFrames timeline construction is synchronous; async loading violates the framework's contract.

## Workflow: Technique-first development (self-evolving)

**This is the rule that holds everything else together.** When the user hands you a script (or asks you to write one from a topic), do NOT immediately start building the video. Instead, follow this loop. The loop guarantees that every reel is built from techniques the skill knows how to do well, AND that the skill grows by exactly one approved technique each time a reel calls for something new.

### The loop

```
1. STORYBOARD with technique annotations
   For each scene/beat, name the compositional technique it would use
   (e.g. "Newsprint clipping", "Split-screen comparison") AND the
   transitions between scenes (e.g. "Match-cut zoom-blur", "Whip-pan").
   Reference techniques BY NAME from this skill's libraries below.

2. AUDIT the storyboard against the skill's technique library
   Walk through the storyboard. For each named technique:
     • Already documented in the skill? ✓ Note it as ready to build.
     • NOT documented but a popular Vox/Bloomberg/explainer pattern? ⚠
     • Custom one-off you invented for this beat? Treat as ⚠ too.

3. PRESENT the audit to the user
   "Storyboard uses 6 techniques. 4 are already in the skill (X, Y, Z, W).
    2 are popular techniques worth building first because they'd land harder
    than improvising: [Annotation arrows + circles] for the chart-callout
    beat, [Counterfactual overlay] for the what-if comparison.
    Want to develop these two before I build the video?"
   Pause for user decision.

4. DEVELOP missing techniques ITERATIVELY (one at a time)
   For each missing technique the user wants to build:
     a. Build a small standalone demo composition (10-15s) that ONLY exercises
        that technique. Pick a topic that exercises the technique cleanly,
        not the user's actual reel topic — separate concerns.
     b. Generate any required assets (images via gpt_image_2, audio via TTS).
     c. Lint + validate + snapshot.
     d. Give the user the preview command, listen to feedback.
     e. Iterate based on feedback (often 2-4 cycles per technique).
     f. ONLY after user approval, document the technique in the appropriate
        section of this skill (Compositional techniques OR Transitions).

5. GATE: never start building the actual video until ALL techniques the
   storyboard depends on are documented and user-approved.
   If you start the video first and develop techniques mid-build, they'll
   ship as lackluster afterthoughts. The whole point of the loop is to
   guarantee each technique gets the iteration time it needs to land.

6. BUILD the actual video using the now-complete technique library.
   Apply each documented technique by reading its skill entry as a recipe
   (not a verbatim template — see "Originality rule" below).
```

### The originality rule

When you implement a documented technique in a new reel, you are NOT copying the previous implementation verbatim. The skill entry is a *recipe*, not a *template*.

Specifically:
- **Read the technique's anatomy + critical details + HTML scaffold** as a structural recipe — the elements that must be present, their roles, the load-bearing details, the gotchas.
- **Write fresh code** for THIS reel. Different ID names, different content, different palette tints, different exact pixel values. The PATTERN is preserved; the CODE is new.
- **Adjust to fit the topic.** If the documented Newsprint Clipping uses a green highlighter and a Wall Street Journal masthead, your new implementation might use an orange highlighter and a Reuters masthead because the topic is different. The technique stays Newsprint Clipping; the specifics change.
- **Never** open a previous video's `index.html` and copy a CSS block into a new one. That trains you (and future agents reading this skill) to ship homogeneous reels. Always rewrite from the recipe.

This is also why the skill's HTML scaffolds use semantic placeholder names (`<polaroid-card>`, `<scribble-pin>`, `<rail-event>`) instead of the literal class names from the demo compositions — they're recipes, not templates.

### Don't copy reference videos beat-for-beat

When the user provides a reference video (a Vox piece, a Bloomberg Original, a Johnny Harris explainer), use it as a *style* and *technique vocabulary* reference — not a beat-for-beat target. Copying a reference's exact beat sequence + timing + transitions produces a derivative video that feels imitative. The reference tells you "we want this *kind* of editorial energy" and "this *kind* of motion vocabulary"; the storyboard is yours to author.

Specifically:
- Identify which TECHNIQUES the reference uses (e.g. "Vox piece uses newsprint-clipping for the historical beat, polaroid-stack for the archival figures, split-screen for the comparison"). Add these to the technique pool for your storyboard.
- Identify the PALETTE and TYPOGRAPHY register (cream paper + Playfair Display + dark editorial red). Match the register, not the literal beats.
- WRITE YOUR OWN beats. Your reel's narrative arc, hook, payoff, transitions are based on the user's topic and angle, not the reference's.

### When the user asks for a video, your first response is the storyboard + audit

Don't ask "what techniques should I use?" — that's your job. Don't dive into building — that skips the gate. Always:

1. (If they gave you a topic but no script) Write the VO script first.
2. Storyboard each beat with the technique it'll use.
3. Audit against the skill library.
4. Present the audit + technique-development plan to the user.
5. Wait for them to greenlight either "build now with what you have" or "develop these missing techniques first."

This response is the contract. Everything that follows depends on the user knowing what's coming and approving the plan.

## Compositional techniques

A library of named visual techniques for breaking up the default "dark canvas + kinetic typography" rhythm. Each one is most effective when used **once** in a reel as a deliberate tonal pivot — overuse dilutes the punch.

### Technique: Newsprint clipping (Vox-style)

Convert one news-event scene into a faux-newspaper / magazine clipping. The viewer feels they've momentarily switched from "watching a motion-graphics reel" to "reading the news." Then the next scene cuts back to dark/data, and the contrast lands the editorial weight.

**When to use:**
- Scene narrates an actual news event with a known publication date (an announcement, a deal, an earnings beat, a regulatory ruling). The treatment must be editorially honest — *don't* style a generic claim as a fake headline.
- The reel has been on dark-canvas typography for several scenes and needs a tonal pivot.
- You want one scene that the viewer *remembers* as a "moment."

**Don't use it:**
- Twice in the same reel (the second clipping reads as a pattern, not a moment) — unless you visibly differentiate (different paper stock, different masthead, different layout) AND there's narrative reason for two news beats.
- For abstract claims, opinions, or non-news content. A clipping demands a real headline backed by a real publication date.

**Anatomy** (every element earns its place — strip anything that doesn't):

| Element | Role | Implementation |
|---|---|---|
| **Cream paper background** | "This is print, not a screen" | gpt_image_2 photorealistic paper texture (cream `#f0ead7` with faint grid + worn edges), or solid `#f0ead7` + SVG grid pattern as fallback |
| **Date pill** | Anchors the news in time | Top-left rounded badge, dark editorial green (`#005C2E`+) with white serif/sans, slight `rotate(-1.5deg)` so it reads as a stamp |
| **Black serif headline** | Authority — reads as ink-on-paper | Playfair Display 900 weight, ~120-140px, letter-spacing -0.018em, line-height 1.02. Use 2 lines max. |
| **Green highlighter swipe** | Where the eye should land | Bloom-green rounded `<span>` behind key words. Uneven `border-radius: 14px 6px 12px 8px / 8px 12px 6px 14px` for hand-drawn feel + `rotate(-1deg)`. Animated in via `clip-path: inset(0 100% 0 0) → inset(0 0% 0 0)`. |
| **Italic masthead + hairline rule** | Citation = credibility | Playfair italic 700 (e.g., "The Wall Street Journal"), 36px, with a 2px black rule expanding from `width:0` to fill the column. |
| **Knocked-out subject + green marker outline** | "Cut from the page" energy | gpt_image_2: portrait of named real person (Tim Cook, etc.) with explicit prompt for "thick uneven hand-drawn green marker outline traced around silhouette, like a producer cut him out with a Sharpie, varying thickness 6-12px, slight wobble, stray bleeds." White BG handled with `mix-blend-mode: multiply`. Slight `rotate(2deg)` + drop-shadow for "pasted on" feel. |
| **Hand-drawn SVG arrow** | Editorial annotation voice | `<path>` with curved `Q` Bezier + small triangle arrowhead, `stroke-width: 7`, `stroke-linecap: round`, drawn on via `stroke-dashoffset` animation. Points at the subject. |
| **Halftone dot gradient** | Newsprint ink texture | Pure CSS: `background-image: radial-gradient(circle, #1a1a1a 1.6px, transparent 2.0px); background-size: 14px 14px;` masked with a diagonal `linear-gradient` so density fades from one corner. |

**Animation choreography** (anchored to spoken phrases):

```
1. on "Last week"        → date pill rotates in from x:-80, opacity 0→1, ease bezierIn
2. on "Apple"            → headline line 1 fade-up (y:22→0, opacity 0→1)
3. on "make chips at"    → headline line 2 fade-up
4. on "Intel"            → highlighter clip-path 100%→0% (paints left→right, 0.45s)
5. on "Intel" + 0.30s    → masthead char-stagger reveal
6. on "Intel" + 0.45s    → source rule width 0→full
7. on "The stock"        → subject slides in (x:60→0, scale 0.92→1.0); halftone fades to opacity 0.55; arrow strokeDashoffset → 0 (line 0.55s, head 0.20s)
8. on "all-time"         → bottom payoff number char-stagger
9. on "high"             → bottom subtitle char-stagger
```

**Critical details:**
- The headline is **black serif on cream paper** — *not* white-on-dark. Inverting the contrast from the rest of the reel is the entire point.
- The highlighter color is your brand green, but **darken it** for any white-text-on-green elements (date pill) — bright neon green fails WCAG AA against white. Use `#005C2E` for white-text pills, reserve the bright `#00DA70` / `#00FF88` for highlighter swipes that sit *behind* black serif text.
- The hand-drawn outline on the portrait is **the make-or-break detail**. A subject without it looks like a stock-photo placement; with it, the whole composition feels editorially produced. Don't try to fake it with CSS `filter: drop-shadow()` stacked — gpt_image_2 with an explicit "hand-drawn green marker outline, wobbly, varying thickness, with bleeds" prompt produces a dramatically better result.
- Keep the camera drift on the scene container — the paper subtly drifts like every other scene. Don't disable it.
- The closing payoff (the number/stat that comes after the headline beat) should also be in **black Playfair serif**, not the brand display font. Consistency within the scene matters more than consistency across the reel — once you've committed to a newsprint pivot, every text element in that scene plays by newsprint rules.

**File-size note:** the cream paper texture PNG is ~1.4 MB and the cutout portrait ~1.2 MB. Budget the per-scene asset weight; don't apply this technique to multiple scenes without considering total composition load time.

**HTML scaffold** — structural recipe, not literal copy:

```html
<scene>
  <paper-bg-image src="paper-bg.png" />        <!-- gpt_image_2 cream paper photo, NOT a CSS color -->
  <halftone-corner-overlay />                  <!-- CSS radial-gradient pattern + diagonal mask -->

  <date-pill>MAY 1, 2026</date-pill>           <!-- top-left, dark editorial green BG, white sans, rotate(-1.5deg) -->

  <serif-headline>                             <!-- Playfair 900, ~120-140px, black on cream -->
    <line>Apple in Talks to</line>
    <line>
      <highlight-bg />                         <!-- absolute behind text, clip-path: inset(0 100% 0 0); rotate(-1deg); uneven border-radius -->
      <highlight-text>Make Chips at Intel</highlight-text>
    </line>
  </serif-headline>

  <italic-masthead>The Wall Street Journal</italic-masthead>   <!-- Playfair italic 700 -->
  <hairline-rule />                            <!-- 2px black, animates width 0 → full -->

  <subject-cutout-image src="tim-cook-cutout.png" />
  <!-- gpt_image_2 portrait with hand-drawn green marker outline; mix-blend-mode: multiply onto paper; slight rotate(2deg); drop-shadow -->

  <hand-drawn-arrow as svg>                    <!-- stroke-dashoffset draws on -->
    <path /> <path />                          <!-- main curve + arrowhead, stroke-linecap: round, stroke 7px -->
  </hand-drawn-arrow>

  <bottom-payoff-number>$113.01</bottom-payoff-number>   <!-- Playfair 900 ~200px, black on cream -->
  <bottom-payoff-label>ALL-TIME HIGH</bottom-payoff-label>   <!-- Inter 800 caps, dark editorial green -->
</scene>
```

### Technique: Editorial pull-quote card

Big italic Playfair serif quote body, framed by an oversized open-quote glyph above and an attribution card below (small circular portrait + name + role / publication). Black canvas. Functions as the *authority beat* in a reel — when you need a named expert's statement to carry weight, the pull-quote treatment gives the words editorial gravitas without leaning on the speaker's portrait as the hero element.

Reference: New York Times Magazine pull-quote callouts, Bloomberg Opinion editorial layouts, Wall Street Journal feature spreads.

**When to use:**
- Scene attributes a specific quote to a named, identifiable expert — Buffett, Powell, an analyst, a CEO. The quote is the entire content of the beat.
- The expert has a verifiable historical statement that's pithy (≤ 18 words) and editorial. Long quotes don't fit the rhythm of a 3–4-second beat; long bookish prose belongs in a different medium.
- You want the reel to feel *earned* — citing an authority gives the next claim (the implied "so listen to them on this") more weight than the same words in your own voice.

**Don't use it:**
- For anonymous quotes ("a Wall Street analyst once said..."). The whole point is the attribution carries the weight.
- For quotes that need explanation. If the quote requires a setup sentence to make sense, it's not pull-quote material — it's a regular kinetic-typography beat.
- For an inflammatory or controversial quote without strong sourcing. Pull-quotes confer authority; misusing them is editorial malpractice.
- Twice in the same reel. One authority beat is potent; two trains the viewer to mentally tune out attribution.

**Anatomy** (six load-bearing elements; cut any of them and the gravitas leaks out):

| Element | Role | Implementation |
|---|---|---|
| **Eyebrow attribution** | Time-stamps and sources the quote | Mono caps (JetBrains Mono 500), ~32–36px, low-alpha white, letter-spacing 0.22em. Format: `LASTNAME, PUBLICATION YEAR` — e.g., `BUFFETT, FORTUNE 2001`. Stamps the quote in time so it doesn't read as fabricated. |
| **Open-quote glyph** | Visual anchor that says "this is a quote" | Giant Playfair Display 900 left-double-quote (`&ldquo;`), ~180–220px, white. Sits above the body, slightly left-aligned. The size carries the editorial signal — small quote glyphs are decorative; oversized ones are typographic statements. |
| **Quote body** | The words themselves | Playfair Display *italic* 700, ~76–88px, line-height 1.06, white. Three to four lines maximum. Italic Playfair is the entire point of the technique — sans-serif quotes feel like social-media screenshots; upright serif quotes feel like Bible verses; italic serif quotes feel like editorial pull-quotes from a magazine. **This is non-negotiable**: if you find yourself using Inter or any sans-serif for the quote body, you're not running this technique anymore. |
| **Closing-quote glyph** *(optional, light)* | Closes the typographic frame | Same style as the open-quote, but smaller (~120px), aligned to the bottom-right corner of the body. Optional — strong open-glyph + clear sentence-ending punctuation makes the close-glyph redundant. |
| **Attribution card** | Names the speaker | Horizontal row beneath the body: small circular portrait thumbnail (~80–100px, B&W or sepia, vignetted), then `WARREN BUFFETT` in Inter 700 caps ~32–36px (above), and `CHAIRMAN · BERKSHIRE HATHAWAY` in mono caps low-alpha ~22–24px... **wait — 22–24px violates the 32px hard floor. Use 32px+ for ALL elements in this card.** Better format: portrait thumb + `WARREN BUFFETT` at 36px + role/publication at 32px in mono caps low-alpha. |
| **Black canvas** | Editorial restraint | Pure `#000` background or a near-black gradient. NO photo backdrop, NO chart, NO logo orbit, NO scribbles. The technique's power comes from *visual silence* — anything else competes with the words. |

**Animation choreography** (anchored to spoken phrases):

```
1. on first word of attribution name (e.g., "Buffett") − 0.30s
   → eyebrow `BUFFETT, FORTUNE 2001` char-stagger (0.020s/char)

2. on "called it" or equivalent setup phrase − 0.10s
   → open-quote glyph stroke-dashoffset draw-on (0.40s)
     (the glyph DRAWS in like a hand wrote it, doesn't just fade — uses the SVG quote-mark path, NOT a font glyph)

3. on the body's first content word (e.g., "best single measure")
   → SplitText word-stagger reveal of the body, stagger 0.04–0.06s/word, ease bezierIn
     Each word's appearance roughly aligns to the spoken word when possible

4. on the body's last word + 0.10s
   → closing-quote glyph stroke-dashoffset draw-on (if used)

5. on the attribution word (e.g., "valuation") + 0.20s
   → attribution card fades in (portrait thumb scale 0.90→1.00 + label opacity 0→1)

6. Camera drift on the scene container (scale 1.00→1.03, y 0→-12, duration matches scene length, ease 'none')
```

**Critical details:**

- **The italic Playfair is the technique.** Swap it for Inter and the scene loses 90% of its weight. Test: take a screenshot of any famous magazine pull-quote — it's italic serif. The genre convention is centuries old and the eye recognizes it instantly. If your font stack doesn't include Playfair Display (or a comparable italic serif: Source Serif, EB Garamond, Lora), don't run this technique.

- **The eyebrow attribution must precede the quote, not follow it.** Putting `— Warren Buffett` *after* the body is a Twitter convention, not an editorial one. The eyebrow `BUFFETT, FORTUNE 2001` *above* the quote signals to the viewer "this is sourced editorial copy" before they read a word. The attribution card *below* doubles down — but the eyebrow above is the load-bearing piece.

- **Don't pair this with a hero portrait.** If the scene above this one ALREADY uses the same person's portrait as the hero (e.g., "WARREN BUFFETT / HAS A RECESSION SIGNAL." with the full portrait), the pull-quote card with a *third* portrait thumb feels redundant. Either drop the eyebrow / attribution portrait, OR use the pull-quote technique in place of a portrait-hero scene (and don't add the portrait-hero scene at all).

- **Three-line maximum on the body.** Four-line quotes wrap awkwardly at vertical 1080×1920. If the quote is longer than ~18 words, find a shorter excerpt or use a different technique. The pull-quote works because the words *land in one visual gulp* — the eye reads the whole thing without re-scanning.

- **Pure black background.** No subtle palette tint, no scene-bg-photo, no gradient. The cream-paper newsprint clipping technique uses a *textured* background to invoke print; the pull-quote uses *black silence* to invoke editorial restraint. Don't mix.

- **No drop shadow on the quote glyph or body text.** The glyph is a typographic mark, not a 3D object. Drop shadows on serif italics read as PowerPoint clipart. Keep the strokes flat, the type sharp.

- **The portrait thumb is optional.** If you don't have a clean B&W portrait at hand, drop the thumbnail and use a vertical hairline rule + `WARREN BUFFETT` + role text alone. The attribution still works without an image. Don't fake it with a generic silhouette.

**HTML scaffold** — structural recipe, not literal copy:

```html
<scene>
  <pullquote-stack>                            <!-- absolute, left/right 100px, vertically centered via translateY(-50%) -->

    <eyebrow-attribution>BUFFETT, FORTUNE 2001</eyebrow-attribution>
                                               <!-- JetBrains Mono 500, 32-36px, low-alpha white, letter-spacing 0.22em, uppercase -->

    <open-quote>&ldquo;</open-quote>           <!-- Playfair Display 900, ~200px white;
                                                    or use an SVG path with stroke-dashoffset draw-on for a hand-drawn feel -->

    <quote-body>
      The best single measure of where market valuations stand at any given moment.
    </quote-body>                              <!-- Playfair Display ITALIC 700, ~80px white, line-height 1.06;
                                                    SplitText words, stagger reveal aligned to spoken cadence -->

    <close-quote>&rdquo;</close-quote>         <!-- (optional) smaller closing glyph at body bottom-right -->

    <attribution-card>                         <!-- row: portrait thumb + name + role; opacity 0 initially, fades in last -->
      <portrait-thumb-circular />              <!-- ~90px circle; B&W press-photo; vignetted -->
      <attribution-text>
        <name>WARREN BUFFETT</name>            <!-- Inter 700 caps, ~36px -->
        <role>CHAIRMAN · BERKSHIRE HATHAWAY</role>   <!-- mono caps, 32px+ low-alpha; clears the 32px floor -->
      </attribution-text>
    </attribution-card>

  </pullquote-stack>
</scene>

<!-- Reveal sequence (timeline anchored to spoken words):
       eyebrow at(speakerName) − 0.30  → char-stagger 0.020s/char
       open-quote at("called it") − 0.10  → stroke-dashoffset full → 0 over 0.40s
       body words at(firstBodyWord) onward → SplitText words, stagger 0.04-0.06s/word, bezierIn
       attribution-card at(lastBodyWord) + 0.20 → opacity 0 → 1, thumb scale 0.90 → 1.00
       scene drift (1.00 → 1.03 scale, 0 → -12 y, ease 'none', full scene duration) -->
```

### Technique: Split-screen comparison (vs / before-after)

Two halves of the frame divided by a vertical (or diagonal) rule, comparing two entities head-to-head. Each half has its own subtle palette tint, its own logo, its own number, its own chart. A center "VS" badge sits on the divider. The technique's superpower: **keeping the layout fixed across multiple beats while only the data inside swaps** so the comparison itself becomes the through-line — viewers can see the divergence at a glance.

Reference: Bloomberg Originals deal-comparison segments, Vox economics breakdowns, sports stat overlays.

**When to use:**
- "X vs Y" beats where two entities are the actual subject — Apple vs Intel, AMD vs Nvidia, before-stake vs after-stake, your portfolio vs the index.
- Beats where the *change* between two states is the story — first state on left, second state on right (or first state on both sides at time T1, then both sides update at time T2).
- When you need to dramatize *magnitude* of difference — putting two numbers side by side with synchronized chart lines makes a 18% drop next to a 60% drop hit emotionally in a way that sequential reveals don't.

**Don't use it:**
- For a single-subject narrative. If the scene is about Intel alone, splitting the frame just to fill the second half with related-but-not-comparable info is decorative.
- When the two entities aren't really comparable. "Intel vs the Apollo program" forces a comparison the viewer can't reason about.
- When you have more than 2 things to compare. Three-way splits work occasionally but quickly become illegible at 1080×1920; consider a small-multiples grid (3-up or 4-up of mini cards) instead.

**Anatomy** (the layout is fixed; the contents swap):

| Zone | Role | Implementation |
|---|---|---|
| **Headline** (top) | The framing question or time period | Big white serif/sans, ~130px Inter 900, centered across full width. Often a year ("2024") or a question ("WHO WON?"). May morph mid-comp via two stacked elements + opacity swap. |
| **Subhead** (under headline) | The descriptor that ties both sides together | Mono caps, ~32px, low-opacity. "A TALE OF TWO CHIPS" / "DEAL COMPARISON". |
| **Vertical divider** | The visual axis of comparison | 1px white line at `rgba(255,255,255,0.20)` running from below the headline to just above the side labels. Animates in via `scaleY(0 → 1)` with `transform-origin: top`. |
| **VS badge** | The "vs" anchor at center | 120px circular black disc with thin white-alpha border, centered on the divider midline, "VS" in Inter 900. Pops in via `scale(0.6 → 1.0)` + opacity. |
| **Side palette tint** | Differentiates the two halves emotionally | Each half gets a subtle vertical gradient — left cool (`#0a1320 → #000`), right warm (`#1a0e08 → #000`). Almost imperceptible until you remove it; then the frame feels flat. |
| **Logo** (per side, top) | Brand identification | Centered in a 140px-tall slot. Different logos can have different aspect ratios — let `max-width: 80%` + `object-fit: contain` handle it. |
| **Number** (per side, middle) | The hero comparison value | Inter 900 ~180px, color-coded: red for negative, green for positive, white for flat. Absolute positioning so both sides' numbers sit at the same y-coordinate — alignment IS the comparison. |
| **Chart** (per side, below number) | Visual trend reinforcing the number | Small SVG line, 360×140 viewBox, `stroke-dasharray` draw-on. Same color as the number. Down lines descend, up lines climb, flat lines stay near the middle. Path `d` shapes hand-tuned per beat. |
| **Side label** (per side, bottom) | The entity's name | Mono 700 caps, ~56px, "AMD" / "INTEL". Char-stagger in. |
| **Footer ticker** | Editorial micro-context | Small mono caps below labels — "CHART · YEAR-OVER-YEAR · % CHANGE". Sets the comparison's data type so the viewer knows what they're seeing. |

**Animation choreography** — the entire technique works by *fixing the layout* and morphing the contents:

```
PHASE 1: ESTABLISH THE FRAME (~2s)
  • Divider scaleY: 0 → 1 (paints down)
  • VS badge: scale 0.6 → 1.0 + opacity 0 → 1
  • Headline char-stagger
  • Subhead char-stagger
  • Side labels char-stagger (left + right at the same beat — the axis is set)

PHASE 2: REVEAL THE FIRST COMPARISON (~3s)
  • Left logo + number + chart: anchor reveal to spoken "AMD"
  • Right logo + number + chart: anchor reveal to spoken "Intel"
  • Reveal order matters editorially: usually left → right, matching Western reading order

PHASE 3: TRANSITION (~2s)
  • Numbers + charts fade out (stroke-dashoffset back to undrawn)
  • Headline morphs ("2024" exits up, "9 MONTHS LATER" enters via second pre-positioned element)
  • Layout (logos, divider, VS badge, side labels, footer) STAYS PUT — this is the trick

PHASE 4: REVEAL THE FLIPPED COMPARISON (~4s)
  • Same number/chart slots get new content (different value, different color class, different chart path)
  • Use deterministic content swaps — see "Critical details" below
```

**Critical details:**

- **Layout persistence is the entire point.** If you cut to a new scene to show the "after" state, you've lost the technique — viewers process two scenes as two stories. Keep the same logos, divider, side labels, footer ticker visible across the morph; only swap the headline + numbers + charts. The constancy is what lets the viewer's eye travel `−18% → 0%` and `−60% → +480%` and feel the magnitude of the divergence.

- **Both sides reveal at the same beat in Phase 2.** Don't stagger left-then-right with a long delay — both halves should appear close together so the *comparison* is what registers, not "first AMD, then Intel." A small 100-200ms offset for editorial flow is fine; a 1s+ gap turns the split-screen into two sequential cards.

- **Deterministic content swaps.** GSAP's `tl.add(callback, time)` callbacks run in real-time when the timeline plays linearly, but **don't fire reliably during HyperFrames frame seeks**, which means snapshots and renders may capture the pre-callback state. The fix:
  1. **For text changes** — pre-create both versions as separate stacked DOM elements, swap visibility via opacity tweens on the timeline. Don't `element.textContent = "..."` in a callback.
  2. **For class/color changes** (e.g., red `down` chart → green `up` chart) — if you must use a callback, the callback's *visual effect* should be invisible at the moment it fires (e.g., the element is at opacity 0 anyway because of an outgoing tween), and the next *visible* tween reveals it. The callback only swaps DOM state during the "blank" beat between fade-out and fade-in.
  3. **For SVG path morphs** — same rule. Set the new `d` attribute via callback only while the path is invisible (stroke-dashoffset full). Then the next tween animates strokeDashoffset to 0, revealing the new path.

- **Don't use `gsap.to(...)` outside the timeline inside callbacks.** This is the variant of the determinism trap that bites first. `gsap.to(...)` runs in real wall-clock time, not on the timeline. Always use `tl.to(...)` so the tween is part of the captured timeline. If you find yourself wanting `gsap.to` inside a `tl.add` callback, restructure with a pre-created second element instead.

- **Color discipline.** The side palettes must be *subtle* — almost imperceptible. If a viewer's first reaction is "why is the left side blue?" the tint is too strong. The goal is the frame feels rich without anyone consciously noticing the differentiation. Use lightness 5-10% above the surrounding black, and saturation under 15%.

- **Number alignment is the unsung hero.** Both sides' numbers MUST sit at the exact same y-coordinate so the viewer's eye doesn't have to track up-and-down between them. Use absolute positioning, not flex centering — flex will let different number widths shift them vertically depending on font metrics. Lock both numbers to `position: absolute; top: <fixed value>;`.

- **Chart shape > chart precision.** A small SVG line with 4-5 hand-tuned waypoints (a Bezier `Q` curve usually) reads better than an accurate plotted dataset. The chart's job here is *direction and slope*, not data fidelity. A flat line should be slightly textured (a tiny 2-pixel up-down wiggle) so it looks like a real chart, not a rule.

- **Charts always need a frame, never a bare line.** A descending or ascending line floating against a flat background reads as "abstract icon," not "market data." Wrap every chart in a card container with: subtle background tint, faint horizontal gridlines (3-4 dashed at low alpha), an axis baseline, axis labels (months / quarters / years on the bottom), and a soft area fill under the line at ~10% opacity. The grid is what makes the line read as *data* instead of *clip art*.

**HTML scaffold** — structural recipe, not literal copy. For vertical 9:16, default to a **horizontal split** (top half / bottom half); reserve vertical splits for landscape 16:9 layouts:

```html
<scene>
  <half-top>                                   <!-- 1080×780 region; subtle cool palette tint background, very low saturation -->
    <ticker-label>AMD</ticker-label>           <!-- absolute top-left; JetBrains Mono caps ~50px; the entity name -->
    <sub-meta>NYSE · 2024</sub-meta>           <!-- absolute top-left below label; mono caps low-alpha; -->
    <logo-circle>                              <!-- absolute top-right; ~130px circle, dark disc, thin white border, drop-shadow -->
      <logo-image />
    </logo-circle>
    <hero-number>−18%</hero-number>            <!-- absolute mid-left; Inter 900 ~200px;
                                                    color-coded class: down (red) / flat (gray) / up (green) -->
    <chart-card>                               <!-- absolute bottom-aligned, full-width minus padding;
                                                    rgba(255,255,255,0.04) BG, 1px white-alpha border, border-radius 12px -->
      <svg>
        <gridline /> × 3                       <!-- horizontal dashed lines, low alpha -->
        <axis-baseline />                      <!-- solid bottom rule -->
        <area-fill />                          <!-- under-line path closed to baseline; fill-opacity ~0.10; same color as line -->
        <chart-line />                         <!-- 4-5 hand-tuned Bezier waypoints; stroke-dashoffset draws on -->
        <axis-month-label /> × 4               <!-- JAN / APR / JUL / DEC at bottom; mono ~14px low-alpha -->
      </svg>
    </chart-card>
  </half-top>

  <half-bottom>                                <!-- mirror structure; warm palette tint -->
    <!-- ... same internal structure: ticker-label, sub-meta, logo-circle, hero-number, chart-card ... -->
  </half-bottom>

  <horizontal-divider />                       <!-- 1px white-alpha line between halves; transform-origin left;
                                                    scaleX(0 → 1) paint-in -->
  <vs-badge>VS</vs-badge>                      <!-- 120px black circle on the divider midline;
                                                    Inter 900 ~44px caps; pop-in via scale 0.6 → 1.0 -->

  <headline-1>2024</headline-1>                <!-- pre-positioned at top; Inter 900 ~130px white -->
  <headline-2>9 MONTHS LATER</headline-2>      <!-- pre-positioned same area; opacity-swap, NOT textContent in callbacks -->
  <subhead>A TALE OF TWO CHIPS</subhead>       <!-- mono caps low-alpha under headline -->
  <footer-ticker>CHART · YEAR-OVER-YEAR · % CHANGE</footer-ticker>   <!-- micro-context at very bottom -->
</scene>

<!-- For Phase 2 → Phase 4 morph, the layout stays put.
     Hero numbers + chart paths swap via:
       (1) timeline tweens that fade-out → callback swaps DOM textContent / classList / path.d
           while element is invisible → timeline tween fades-in the new state.
     Avoid `gsap.to()` inside `tl.add(callback)` — runs in real-time, breaks frame capture. -->
```

### Technique: Polaroid / photo-stack drop-in

Three (or two, or four) polaroid-style photo cards drop sequentially onto a real-looking surface — cork board, wooden desk, leather blotter — each landing on a beat. After they settle, an editorial pivot lands: a red ink stamp, a hand-drawn annotation, or a sharp typographic headline reframes the photos. Reads as "evidence pulled from a shoebox" — archival, conspiratorial, scrappy. The technique's editorial superpower is using the *cliché itself* as the joke: when the topic is conspiracy theories about secret families, the conspiracy-board aesthetic IS the punchline before any text lands.

Reference: Johnny Harris's archival montages, Wendover Productions historical segments, Last Chance U title cards, vintage detective-story openings.

**When to use:**
- Introducing a *set* of historical figures (founders of an industry, members of a dynasty, "the people behind X").
- Editorial-debunking beats where the visual gesture itself signals "let's look at the evidence" while the text reframes what the evidence means.
- Archival-evidence beats — old photos, memos, headlines, documents — anything that should feel "pulled from an archive" rather than rendered fresh.

**Don't use it:**
- For modern subjects. A polaroid of a 2024 CEO reads as anachronistic costume; use a clean editorial portrait card instead.
- More than once per reel. The technique is a *gesture* — repeating it dilutes the "oh, conspiracy board!" recognition that makes it land.
- Without a pivot. Polaroids dropping in for their own sake is a slideshow; the editorial reframe (stamp / headline / line crossing them out) is what gives the gesture its meaning.

**Anatomy:**

| Element | Role | Implementation |
|---|---|---|
| **Photographic backdrop** | "This is a real surface, not a screen" | gpt_image_2 photograph of cork board / wood grain / dark leather. **Never** a CSS gradient — even a perfectly tuned `linear-gradient` reads as digital UI. The grain, edge wear, and natural lighting of a real photograph are non-negotiable. |
| **Vignette overlay** | Pulls the eye to center | Soft radial `linear-gradient(transparent 35%, rgba(0,0,0,0.45) 100%)` over the backdrop. |
| **Polaroid card** | The hero element | White-cream `#f5efde` card with thick padding (22px sides, 90px bottom for caption strip), strong drop shadow (`0 18px 40px rgba(0,0,0,0.55)`), per-card position + final rotation (varied: -6°, +3°, -4°). Photo fills upper portion. |
| **Tape strip** | "Stuck on cork-board" cue | Small semi-transparent yellow rectangle (`rgba(220,200,130,0.40)`) absolutely positioned at top edge of polaroid, slight rotation (-2°). |
| **Archival photo** | The subject | gpt_image_2 sepia / B&W / oil-painting portrait, cropped 4:3 inside a dark inset frame within the polaroid. Use stylistic descriptors that match the era ("Victorian banker", "Renaissance oil painting", "Gilded Age press photo"). |
| **Handwritten caption** | The name | Kalam (Google Font) at ~30px bold, dark brown on cream paper. Reads as "scrawled in pen by a producer." |
| **Mono meta line** | Place + year | JetBrains Mono caps, ~18px, lower opacity. "EUROPE · 1820" / "USA · 1900" / "FLORENCE · 1450". Stamps the artifact in time + place. |
| **Ink stamp** | The editorial pivot | Big uppercase red word (e.g., "DISTRACTION") at ~140px, with red border outline + slight rotation (-12°), `mix-blend-mode: multiply` so it stains through the photos like real ink, and tiny `filter: blur(0.4px)` for hand-stamp imperfection. Slams in via scale 1.6→1.0 + opacity 0→0.92. |
| **Pivot headline** | The reframe text | Inter 900 ~110px white at the bottom of the frame. Char-stagger entrance. The text answers "so what" — what does the viewer take away from the polaroids being labeled "DISTRACTION." |
| **Slow camera zoom** | The "filmed" feel | Scale 1.00 → 1.05 over the full composition duration with `ease: "none"` (linear), `transformOrigin: 50% 50%`. Subtle but the absence of it makes the whole composition feel inert. |

**Animation choreography:**

```
PHASE 1: DROP THE POLAROIDS (one per spoken name)
  • Each polaroid starts off-screen above (y: -1500) with extra rotation (more tilted than final)
  • Drop on the spoken name word — duration ~0.55s, ease bezierIn (decelerating into rest)
  • Final rotation is the LANDING rotation — no post-landing wobble or settle
  • Stagger: the natural cadence of the VO ("Rothschild. Rockefeller. Medici.") drives the timing — each polaroid lands on its name

PHASE 2: SETTLE (no animation — let the viewer dwell)
  • The polaroids stay still while the supporting VO line plays ("Three families. Endless theories.")
  • This is the "the evidence is on the table" beat. Movement here distracts from the read.

PHASE 3: THE PIVOT
  • Ink stamp slams in diagonally on the pivot word ("distractions") — scale 1.6 → 1.0 + opacity → 0.92 + multiply blend
  • Polaroids react slightly: small additional rotation + tiny x/y nudge as if the stamp impacted them physically (~0.30s, bezierIn)
  • Pivot headline char-stagger reveals at the bottom
  • Subhead with the takeaway follows
```

**Critical details:**

- **Photographic backdrop is non-negotiable.** A CSS gradient — no matter how well-tuned — reads as "AI-generated motion graphics." A real photographed cork board (or leather, or wood) reads as "this is actual surface." The grain, micro-shadows, and natural lighting variance of a real photo do work that procedural CSS cannot. This is the single most-impactful detail in the technique. Always generate via gpt_image_2 with explicit "NOT illustrated, NOT digital art" in the prompt.

- **Landing rotation = final rotation. No settle wobble.** The temptation to "let the polaroid settle" by adding a small rotation correction after landing is wrong — it reads as fidgety, not natural. A real polaroid dropped on a board lands once and stays. Tween directly to the final rotation; the absence of further movement after landing is what reads as "physical."

- **Multiply blend on the stamp is the make-or-break detail.** A `color: red; opacity: 0.92` overlay reads as "PNG slapped on top." `mix-blend-mode: multiply` makes the red ink interact with the underlying image — staining the white polaroid border, darkening through the photo — which is how a real ink stamp behaves. Without multiply blend, the gesture loses its physical authority.

- **Sequential drops follow VO cadence, not equal timing.** Each polaroid lands on its named word. Don't quantize the drops into a regular beat (e.g., every 0.7s) — the VO has its own irregular rhythm, and the polaroid landings should mirror it. This is what makes the technique feel choreographed to the speech rather than mechanical.

- **Handwritten font + mono font in combination.** Use a real handwriting font (Kalam, Caveat, Indie Flower) for the *name* on each polaroid — it's the human annotation. Use mono caps (JetBrains Mono) for the *date/place* — it's the impersonal archival metadata. Mixing them on the same card is what makes it feel like a real producer's annotation pass over an archive photo.

- **Slow camera zoom across the full duration.** Scale 1.00 → 1.05 over the entire composition with ease "none". Without it, the polaroid drop is the only motion and the scene flatlines once the polaroids settle. With it, even the "no animation" PHASE 2 has subtle continuous motion that keeps the viewer's eye engaged.

- **AI portraits are archetypes, not likenesses.** Per the skill's earlier rule on real people, AI-generated portraits of "Rothschild" or "Rockefeller" are *generic 19th-century banker / Gilded Age tycoon archetypes* — never claim they're the actual person. Use stylistic descriptors that signal era + role (Victorian, Renaissance, Gilded Age) and a "NOT a specific real person" tail in the prompt.

**HTML scaffold** — structural recipe, not literal copy:

```html
<scene>
  <photographic-backdrop src="cork-board.png" />     <!-- gpt_image_2 photo of cork / wood / leather;
                                                          NEVER a CSS gradient, that reads as AI-generated -->
  <vignette-overlay />                               <!-- radial-gradient transparent center → rgba(0,0,0,0.45) edges -->

  <eyebrow>A SHORT HISTORY OF ...</eyebrow>          <!-- top mono caps, low-alpha, sets the framing -->

  <polaroid-card> × N                                <!-- one per subject (typical N = 3) -->
    <!-- container: width ~460px, height ~600px; background #f5efde (aged white);
         padding: 22px sides, 90px bottom for caption strip; strong drop-shadow;
         absolute left/top for scattered placement;
         GSAP owns y + rotation from gsap.set() onward — no CSS transform conflict -->

    <tape-strip />                                   <!-- absolute on top edge; rgba(220,200,130,0.40);
                                                          rotate(-2deg); subtle shadow -->
    <photo-wrap>                                     <!-- inset frame; dark background fills any photo gaps -->
      <archival-photo src="rothschild.png" />        <!-- gpt_image_2 era-appropriate portrait;
                                                          object-fit: cover -->
    </photo-wrap>
    <handwritten-name>Rothschild</handwritten-name>  <!-- Kalam (or Caveat / Indie Flower) bold ~30px;
                                                          dark brown on cream -->
    <mono-meta>EUROPE · 1820</mono-meta>             <!-- JetBrains Mono ~18px caps, low-alpha;
                                                          place · year stamps the artifact -->
  </polaroid-card>

  <ink-stamp>DISTRACTION</ink-stamp>                 <!-- big red Inter 900 ~140px caps;
                                                          red border outline; rotate(-12deg);
                                                          mix-blend-mode: multiply; tiny filter: blur(0.4px);
                                                          slams in via scale 1.6 → 1.0 + opacity 0 → 0.92 -->

  <pivot-headline>Mostly distractions.</pivot-headline>  <!-- bottom; Inter 900 ~110px white;
                                                              char-stagger entrance -->
  <pivot-subhead>FOLLOW THE INDEX FUNDS INSTEAD</pivot-subhead>
                                                     <!-- mono caps low-alpha under headline -->
</scene>

<!-- Camera zoom across full duration: tl.fromTo(scene, { scale: 1.00 }, { scale: 1.05, duration: TOTAL, ease: "none" }, 0);
     Without this the technique flatlines after the polaroids settle. -->

<!-- Drop animation per polaroid:
     gsap.set(polaroidN, { y: -1500, rotation: -22 });           ← above frame, more rotated than final
     tl.to(polaroidN, { y: 0, rotation: -6, duration: 0.55, ease: "bezierIn" }, at(scene, "RothschildName") - 0.10);
     ↑ Lands at FINAL rotation. NEVER add a "settle wobble" tween after — it reads as fidgety, not natural. -->
```

### Technique: Map zoom / location callout

A map composition where the camera starts wide (showing regional context), then zooms into a specific geographic feature (a strait, a city, a fab, a port, a border). A pin / scribble / circle annotation lands on the target, with a label naming it. Reads as Johnny Harris / Wendover Productions — "let me show you where this is happening." The technique's editorial superpower is grounding abstract claims ("20% of world oil") in physical geography ("right here, in this narrow strait between two countries"), which is what makes the viewer feel the stakes.

Reference: Johnny Harris (the canonical example), Wendover Productions, Bloomberg geopolitical explainers, Vox "Borders" series.

Reference implementation in this codebase: `compositions/north-korea-locked-down.html` (camera + map + scribble pattern).

**When to use:**
- Geography is load-bearing — a city, a chokepoint, a border, a fab location, a route, a contested region. The story doesn't make sense without spatial context.
- Real news events with a location ("the deal happened in Cupertino", "the fab is in Arizona", "the strait is between Iran and Oman").
- Beats where you want to give the viewer an "ah, *that's* where this is" moment.

**Don't use it:**
- For non-geographic stories ("interest rates in Q1") — adding a map is decorative, not editorial.
- For features the audience already knows the location of ("Apple is in Cupertino" — they know).
- More than once per reel unless the reel is about geography. Otherwise the camera-zoom-into-map gesture becomes a tic.

**The reliability hierarchy** (read this BEFORE you build anything):

| Approach | Reliability | When |
|---|---|---|
| **SVG vector map** with known coordinates | 🏆 Bulletproof, no calibration | Production work, repeatable patterns, any time you can source an SVG of the region (Natural Earth, simple-maps, world-atlas TopoJSON, MapSVG). |
| **Raster map + AI labels target on map + per-image visual calibration** | 🥈 High, with 1-2 calibration iterations | One-off explainer videos where SVG-sourcing isn't worth the time. Accept ~5 minutes of pixel-pick calibration per generation. |
| **Raster map + naive `50%/50%` pin** | ❌ Unreliable | Don't do this. AI doesn't put targets at exact center even when prompted. |

**Anatomy** (raster-map workflow; SVG follows the same conceptual structure but with real coordinates):

| Element | Role | Implementation |
|---|---|---|
| **`.camera` wrapper** | Owns the zoom transform | `position: absolute; inset: 0; transform-origin: <calibrated %> <calibrated %>;`. The transform-origin is set to the target's pixel position so the target stays fixed during zoom — no translation math. |
| **Map image** | The geographic canvas | `<img src="map.png" object-fit: cover>` filling the camera. gpt_image_2 prompted with "label the target on the map" so calibration has a visual anchor. |
| **Paper-depth overlay** | Subtle texture on the map | Soft gradient with `mix-blend-mode: overlay` — adds depth, kills the AI-flat look. |
| **Tactical corner brackets** | "Surveillance frame" feel | Four small L-shaped brackets at the viewport corners. Optional but cheap and adds editorial weight. |
| **Top scrim** | Dark gradient for text legibility | `linear-gradient` from `rgba(8,12,20,0.65)` → transparent. Sits behind the eyebrow + hero stat in scene 1. |
| **Hero stat** | The big number that makes the geographic fact concrete | "20%" / "$5T" / "9 MILLION BARRELS" in Inter 900 ~200-240px. Position over the map's natural dark/empty regions (water bodies are great) — never over country labels. |
| **Scribble pin** *(inside `.camera`)* | The annotation that circles the target | Small SVG with two overlapping rough oval paths (`stroke-dashoffset` draws on), red `#FF3B30` with drop-shadow. Position via `left: <X%>; top: <Y%>` matching the calibrated target coords. **Lives inside `.camera` so it transforms with the map — always tracks the target regardless of zoom level.** |
| **Floating label** *(outside `.camera`)* | The name of the location | Black card with white Inter 900 caps, rounded corners, ::after triangle pointer. Position at fixed viewport coords near where the pin will visually land after zoom. **Lives outside `.camera` so it stays at constant readable size.** |
| **Territorial wash** | Highlights one country / region | Radial-gradient red/green at low alpha with `mix-blend-mode: multiply`. **Limitation: imprecise on raster maps because the wash is rectangular while country borders are not — wash bleeds into adjacent water and neighbor countries. SVG maps allow proper country-mask wash; raster does not.** Use only when approximate region highlighting is acceptable. |

**Animation choreography:**

```
SCENE 1 (wide view, ~2s)
  • Eyebrow + hero stat reveal over the wide map (stat positioned over a dark/empty region for legibility)
  • Tactical corner brackets fade in
  • Top scrim subtle backdrop

SCENE 2 (zoom in, ~2s)
  • Hero stat fades out
  • Camera scale 1.0 → 2.3 over ~1.5s, ease bezierIn — strait stays as fixed point because transform-origin = pin position
  • Scribble pin reveals at peak of zoom (stroke-dashoffset draws on the rough oval)
  • Floating label slides in above the pin's viewport landing position

SCENE 3 (territorial highlight, ~2s)
  • Multiply-blend wash fades in over one country's land area
  • Subtle camera y-shift (~28px down) — small refocus toward the highlighted region

SCENE 4 (payoff, ~2s)
  • Pin + label dim slightly
  • Bottom scrim fades in for legibility
  • Payoff headline char-stagger reveals at bottom
```

**Step-by-step calibration workflow** (the part that's actually hard):

```
1. PROMPT: Generate the map asking the AI to LABEL the target by name on the map itself
   ("label STRAIT OF HORMUZ in white sans-serif italic on the actual water passage").
   The label is your visual anchor for calibration.

   ALSO include explicit anti-artifact rules:
     "DO NOT draw any crosshair, plus sign, target reticle, scope mark, or coordinate marker.
      DO NOT draw any shaded circle, halo, focus zone, highlight, or attention-marker.
      The map must be a CLEAN cartographic base."
   Without these the AI will literally draw whatever you described in the imagery prompt
   (e.g. if you say "imagine a crosshair", it draws a crosshair).

2. INSPECT: Open the rendered map. Find the target's actual position — NOT the label position.
   Labels typically sit ABOVE or BESIDE their target; you want the geographic feature itself.
   For a strait/water passage, find the navy water; for a city, find the dot.

3. ENCODE: Convert pixel coords to percentage of image.
   E.g. "the strait water is at roughly x=520, y=690 of a 768×1376 image" → (68%, 50%).

4. APPLY: Set THREE places to the same percentage:
     a. CSS:  #camera { transform-origin: 68% 50%; }      ← strait is the fixed point of the zoom
     b. CSS:  #scribble-pin { left: 68%; top: 50%; }      ← pin tracks the strait
     c. JS:   #label-floating positioned in viewport coords
              roughly at (68% × 1080, 50% × 1920) = (734, 960)
              (typically a bit above for the label-points-down feel)

5. SNAPSHOT and verify. If the pin is off, adjust the percentage by 5-10% and re-snap.
   Expect 1-2 iterations. Reading 5% off the first time is normal — the source image is small
   on screen and visual estimation is imprecise.

6. (OPTIONAL) Future-proof: store the calibrated coordinates in a comment next to the values
   so a future regeneration of the same map can quickly recalibrate.
```

**Critical details:**

- **Pin INSIDE camera, label OUTSIDE camera.** This is the single most important structural decision. Pin inside → tracks the geographic feature regardless of zoom level; you can change the zoom amount later without breaking the annotation. Label outside → stays at constant readable viewport size; doesn't grow into a billboard when the camera zooms 2.3×.

- **Set `transform-origin` to the pin position, not 50%/50%.** This makes the target the FIXED POINT of the zoom — it doesn't move during the camera scale. No translation math required. The viewer's eye stays locked on the target while everything around it expands.

- **Read the TARGET, not its label, when calibrating.** AI maps almost always place the geographic label slightly above or beside the actual feature (because the label would otherwise overlap the colored region). When you visually inspect to read coordinates, find where the *thing itself* is (the navy water of the strait, the dot of the city), not where its name is printed.

- **Hero stat over dark/empty regions.** Big white text over a beige country full of small labels turns into a mess. Big white text over a navy ocean / desert / negative space is crisp. Compose the map so there's a body of water or empty desert at viewport center where the hero stat lands.

- **Territorial highlights are imprecise on raster maps.** A `mix-blend-mode: multiply` radial-gradient red wash for "Iran's side of the strait" will bleed into the water and the neighboring country because the wash is a rectangle while Iran's border is not. **For accurate country-shape highlighting, use SVG.** Raster wash is acceptable as "approximate region attention pull" but never as "this country specifically." Document this as a known limitation in the technique's output.

- **Ask the AI to label the target on the map — it's your calibration anchor.** Without the AI-drawn label, you have nothing to visually align against. The label becomes the calibration guide; you set the pin to where the label points (not where the label IS, see point above).

- **Anti-artifact prompts are non-negotiable.** Without explicit "DO NOT draw crosshair / plus sign / target / shaded circle" instructions, the AI will draw literal artifacts of any imagery you describe in the prompt (it took "imagine a crosshair at center" as a drawing instruction in our build). Always include the strict anti-artifact block.

- **gpt_image_2 cannot reliably place a target at "center."** No prompt phrasing produces consistent dead-center placement. Either accept the natural composition + calibrate, or use an SVG map. Do not trust the model to honor exact positional constraints.

**HTML scaffold** — structural recipe, not literal copy:

```html
<scene>
  <camera>                                     <!-- position: absolute; inset: 0;
                                                    transform-origin: <calibrated X%> <calibrated Y%>;
                                                    GSAP tweens scale 1.0 → ~2.3 to zoom into target -->
    <map-image src="region-map.png" />         <!-- gpt_image_2 generated; AI prompted to label target on map -->
    <paper-depth-overlay />                    <!-- subtle gradient with mix-blend-mode: overlay -->

    <scribble-pin>                             <!-- position: absolute;
                                                    left: <calibrated X%>; top: <calibrated Y%>;  ← matches transform-origin
                                                    INSIDE the camera so it transforms with the map -->
      <svg viewBox="0 0 W H">
        <path id="scribble-outer" />           <!-- rough oval, stroke-dasharray draws on, red #FF3B30 -->
        <path id="scribble-inner" />           <!-- second oval inside, marker-doubled-up look -->
      </svg>
    </scribble-pin>
  </camera>

  <territorial-wash />                         <!-- position: absolute; radial-gradient red/green;
                                                    mix-blend-mode: multiply;
                                                    Imprecise on raster maps — only for "approximate region attention" -->

  <corner-bracket × 4 />                       <!-- L-shaped brackets at viewport corners; "tactical frame" feel -->

  <top-scrim />                                <!-- linear-gradient dark → transparent; legibility for hero stat -->
  <bottom-scrim />                             <!-- mirror; for payoff text -->

  <eyebrow>GLOBAL OIL FLOW</eyebrow>           <!-- top mono caps low-alpha -->
  <hero-stat>20%</hero-stat>                   <!-- positioned over map's dark/empty region (water body, desert);
                                                    NEVER over country labels -->
  <hero-stat-label>OF WORLD OIL</hero-stat-label>

  <label-floating>STRAIT OF HORMUZ</label-floating>
                                               <!-- position: absolute at viewport coords;
                                                    OUTSIDE the camera so it stays at constant readable size;
                                                    positioned near where the pin visually lands after zoom;
                                                    black card + white Inter 900 caps + ::after triangle pointer -->

  <payoff>Prices triple.</payoff>              <!-- bottom; Inter 900 ~130px white; char-stagger entrance -->
  <payoff-sub>SCENARIO · IRAN BLOCKS STRAIT</payoff-sub>
</scene>

<!-- Camera zoom: tl.to("#camera", { scale: 2.3, duration: 1.5, ease: "bezierIn" }, ...);
     transform-origin in CSS keeps the target as the fixed point — no translation needed. -->

<!-- For a more accurate territorial wash, use SVG with country-shape clip-path
     instead of a CSS radial gradient. Raster wash bleeds into water and neighbors. -->
```

### Technique: Vertical timeline scroll

A tall column of chronologically-dated events that the "camera" pans down through, each event revealing as it lands at viewport center. A vertical rail runs down one side connecting the events with dots at each beat. Reads as a Vox / The Atlantic editorial "scroll through history" piece — the viewer feels they're walking through a timeline spatially. The vertical orientation fits 9:16 native; horizontal-scroll variants are for 16:9 landscape.

Reference: Vox economics chronologies, NYT interactives, The Atlantic long-form scrollytelling, Wendover historical breakdowns.

**When to use:**
- The story IS a chronology — a sequence of dated events that gain meaning from being seen in succession (recessions, regulatory milestones, company history, deal sequence, war escalation).
- You have 4–6 named beats with concrete dates. Fewer than 4 doesn't earn the technique; more than 6 turns into a list and loses pacing.
- The reel needs editorial weight — chronology + named events + visual continuity all cue "this is a researched piece."
- The chronology has an *editorial through-line* — every recession ended in recovery, every regulation followed a crisis, every deal escalated. The payoff event at the end of the scroll is what makes it more than a list.

**Don't use it:**
- For non-chronological content. A "5 reasons" or "3 takeaways" structure isn't a timeline; using a rail+dots for it is decorative.
- For 1–3 events. The technique earns its run-time only with enough beats to make the scroll feel like motion through *time*.
- Mid-reel as a tangent. The scroll is its own complete reel pattern; jamming it as one beat in a different reel breaks the pacing.

**Anatomy** (Vox cream-paper aesthetic; dark variants exist but lean into the editorial print feel by default):

| Element | Role | Implementation |
|---|---|---|
| **Cream paper background** | "This is print" | gpt_image_2 photographed paper texture (cream `#ebe5d2` base + ruled lines + worn edges) at `mix-blend-mode: multiply`. Reuse the same `paper-bg.png` as the Newsprint clipping technique. |
| **Persistent masthead** | Editorial framing | Italic Playfair Display ~38px in dark brown (`#1a1208`) at top; thin centered hairline rule below. Stays put at the `#root` level — does NOT scroll with the strip. |
| **Persistent footer ticker** | Editorial micro-context | Mono caps low-alpha at bottom (e.g., "DOW · S&P · NASDAQ"). Also outside the strip. |
| **Vertical rail** | The timeline itself | 3px line at `rgba(26,18,8,0.55)` running the full strip height, anchored to the LEFT (`left: 80px`). Lives INSIDE `#strip` so it scrolls with the events — the rail and the dots stay aligned. |
| **Rail dots** | Per-event markers on the rail | 50px circles, dark border, cream-paper fill. On `.event.active` they fill in with editorial color (`#B83227` red for crashes, `#1E7A3E` green for the payoff). **No box-shadow glows** — a solid filled dot reads as ink-on-paper; a glowing dot reads as motion graphics. |
| **Event card** | The unit of content | Positioned by its CENTER in the strip (`top: <centerY>; transform: translateY(-50%)`) so it lands vertically centered in the viewport when scrolled to. Width 880px, padded, centered horizontally. |
| **Date** | The chronology marker | JetBrains Mono 700 ~50px in editorial red (`#B83227`). Above the headline. |
| **Headline** | The event name | Italic Playfair 900 ~96px in dark brown. The serif is what sells "magazine print" vs "slideware." |
| **Stat** | The supporting number | Mono 500 ~26px low-alpha. Two-line is fine ("−22.6% in one day / DOW JONES INDUSTRIAL"). The negative number gets the red `.neg` class for emphasis. |
| **Photo** | The visual evidence | Full content-width (~740×460) editorial photo with thin dark hairline border (1px) — NOT thick white polaroid border. Slight rotation (alternating ±1° per event for rhythm). Photo caption strip overlaid at bottom in mono caps with dark text-shadow. |
| **Top + bottom scrims** | Edge fades | Cream-color gradient at the top and bottom edges of the viewport so events fade out as they leave frame instead of hard-clipping. Stronger at top (480px tall) so the previous event doesn't bleed into the masthead zone. |

**Scroll choreography:**

```
PHASE 1: Initial state — strip positioned so event 1 is at viewport center
  • Pre-state: gsap.set("#strip", { y: VIEWPORT_CENTER_Y - eventStripY["#event-1"] })
  • Event 1 contents reveal via char-stagger + photo fade-in
  • All other events have opacity:0 contents

PHASE 2: Per-event scroll-and-reveal (one per VO mention)
  • tl.to("#strip", { y: VIEWPORT_CENTER_Y - eventStripY[nextEvent], duration: 0.65, ease: "bezierIn" })
    — anchors to spoken date / event name minus 0.20s lead-in
  • Slightly after the scroll lands, revealEvent(nextEvent, atTime + 0.05)
    — char-stagger date → headline → stat, then photo fades in

PHASE 3: Payoff scroll
  • Final scroll to the payoff event (no photo, just typography in green)
  • The previous events visually persist on the rail above (continuous scroll feel)
```

**Layout math** (the part that's actually load-bearing):

```
Strip total height: ~6400px
Event center positions in strip:
  Event 1: 700
  Event 2: 1900
  Event 3: 3100
  Event 4: 4300
  Payoff:  5500
(1200px gap between events to accommodate ~700px-tall full-photo cards)

Each event uses:
  position: absolute; top: <centerY>; transform: translateY(-50%);
  → its content center sits at <centerY> within the strip.

To bring an event to viewport center:
  strip translateY = VIEWPORT_CENTER_Y - eventCenterY
  e.g., event 3 at center: 960 - 3100 = -2140

Tween at each VO beat:
  tl.to("#strip", { y: 960 - eventCenterY, duration: 0.65, ease: "bezierIn" })
```

**The single-image-grid + crop trick** — this is the editorial efficiency win:

Instead of generating N separate photos via gpt_image_2, generate ONE composite image with all N photos in a grid (typically 2×2 for 4 events), then crop in Python:

```python
from PIL import Image
img = Image.open('crashes-grid.png')
w, h = img.size
half_w, half_h = w // 2, h // 2
crops = {
  'crash-1987.png': (0, 0, half_w, half_h),
  'crash-2000.png': (half_w, 0, w, half_h),
  'crash-2008.png': (0, half_h, half_w, h),
  'crash-2020.png': (half_w, half_h, w, h),
}
for name, box in crops.items():
  img.crop(box).save(name, 'PNG', optimize=True)
```

Why this matters:
- **Visual consistency.** All N photos share identical color grading, photojournalism aesthetic, lighting style — because they were generated together as one composition. Separate generations drift in style across events.
- **Single prompt, single iteration.** If the result needs adjustment, re-prompt and re-crop once instead of N times.
- **Asset weight.** Four 512×512 PNGs from one 1024×1024 source totals less than four independent 1024×1024 generations.

Prompt the grid as: "Editorial 2×2 photo grid layout, four archival press photographs of [topic events] arranged in a square 2×2 grid with thin black 4-pixel separator lines between panels. TOP-LEFT: [event 1 description]. TOP-RIGHT: [event 2 description]. BOTTOM-LEFT: [event 3 description]. BOTTOM-RIGHT: [event 4 description]. All four panels share consistent photojournalism aesthetic and matching color grading."

**Critical details:**

- **Persistent masthead + footer outside the strip.** The "A Short History of Crashes" masthead and the "DOW · S&P · NASDAQ" footer ticker live at the `#root` level, NOT inside `#strip`. They stay locked in viewport position while the strip scrolls underneath. This is the same insight as the match-cut zoom-blur technique: a fixed reference frame sells the scroll as a *camera move* through a stationary timeline rather than a slide swap.

- **Rail INSIDE the strip, not outside.** If the rail is fixed in the viewport (outside the strip), the dots scroll past it but the rail itself doesn't move — events would visually float off the rail as they scroll. Putting the rail INSIDE `#strip` makes the rail and dots scroll together as one structure.

- **z-index matters.** The cream paper background sits at `#paper-bg z-index: 1` with `mix-blend-mode: multiply`. The strip needs `z-index: 5+` to render the rail and dots ON TOP of the paper texture. Without this z-index, the rail visually disappears into the paper.

- **No glows on the dots.** A `box-shadow: 0 0 32px rgba(255,...)` on the active dot makes it look like a video game UI element, not a print artifact. Solid filled dots in editorial colors (`#B83227` red, `#1E7A3E` green) read as ink stamps on the timeline rail.

- **Color discipline: red for the recurring beats, green for the payoff.** All four crashes get red dots / red dates / red `.neg` percentages. The payoff event gets green — this is the only color shift, and it lands the editorial conclusion ("they all recovered, the trajectory was upward"). Don't add a third or fourth color; restraint is the entire Vox visual signature.

- **Hairline photo border, not thick polaroid border.** A thick white border + heavy drop shadow turns the photo into a polaroid-style "found artifact" (different technique). For Vox-editorial, use a 1px dark hairline border with subtle drop-shadow — it reads as a photo *embedded* in the page rather than *pasted onto* it.

- **Events centered around the dot, not below it.** Position each event with `top: <centerY>; transform: translateY(-50%)` so the event's vertical center (between the date/headline above and the photo below) lands at the dot. Without `translateY(-50%)`, the event's TOP lands at the dot and content extends only downward, leaving empty space above the dot.

- **Top scrim must be stronger than bottom.** The previous event bleeds into the top of viewport as the camera pans down (the rail above the active dot is visible). A weak top scrim lets the previous event's headline overlap the masthead. Use a graduated 480px-tall scrim at `linear-gradient(180deg, #ebe5d2 0%, #ebe5d2 35%, rgba(235,229,210,0.85) 60%, transparent 100%)` to fully cover the masthead zone.

- **Trim composition `data-duration` to the last meaningful animation.** If the timeline has dead time after the payoff settles, HyperFrames frame-capture at the end may render black. Set `data-duration` to ~0.2s after the payoff char-stagger completes.

- **Vertical for 9:16, horizontal for 16:9.** The original "scrubbed timeline" technique is horizontal pan on landscape video. The vertical-scroll variant is the right adaptation for portrait reels — eyes naturally scroll vertically on phones, the gesture mirrors the platform's native scroll, and 1080×1920 has enough vertical room for tall event cards with photos.

**HTML scaffold** — structural recipe:

```html
<root>
  <paper-bg-image src="paper-bg.png" />        <!-- cream paper texture; mix-blend: multiply -->
  <persistent-masthead>A Short History of ...</persistent-masthead>   <!-- italic Playfair, dark brown, top -->
  <header-rule />                              <!-- thin centered hairline -->

  <scrim-top />                                <!-- cream-color gradient, 480px tall, covers masthead zone -->
  <scrim-bottom />                             <!-- mirror, shorter -->

  <strip>                                      <!-- the scrollable container; z-index above paper-bg
                                                    GSAP tweens its translateY to scroll through events -->
    <rail />                                   <!-- vertical line, left: 80px, scrolls WITH strip -->

    <event id="event-N" style="top: <centerY>; transform: translateY(-50%)">  <!-- × N events -->
      <dot />                                  <!-- on the rail; left: 56px; activates with editorial color -->
      <event-content>                          <!-- centered horizontally, max-width 880px -->
        <event-text>
          <date>1987</date>                    <!-- editorial red mono -->
          <headline>Black Monday</headline>    <!-- italic Playfair, dark brown -->
          <stat>−22.6% in one day · DOW</stat> <!-- mono with .neg span on negative number -->
        </event-text>
        <event-photo-wrap>                     <!-- thin dark hairline border, ±1° rotation per event -->
          <event-photo src="crash-1987.png" />
          <photo-caption>NYSE · OCT 19, 1987</photo-caption>
        </event-photo-wrap>
      </event-content>
    </event>

    <event payoff>                              <!-- final event: no photo, green typography -->
      <dot />
      <event-content>
        <date>100% Recovery</date>
        <headline>Every one.</headline>
        <stat>Markets always came back.</stat>
      </event-content>
    </event>
  </strip>

  <persistent-footer-ticker>DOW · S&P · NASDAQ</persistent-footer-ticker>
</root>

<!-- Animation: per VO mention, tween strip.y to bring next event's centerY to viewport center.
     Then char-stagger reveal date → headline → stat, then photo fade-in.
     Helper:
       function revealEvent(sel, atTime) { ... char-stagger date/headline/stat + photo fade ... }
       tl.to("#strip", { y: 960 - eventCenterY, duration: 0.65, ease: "bezierIn" }, at(scene, "Word") - 0.20);
       revealEvent("#event-N", at(scene, "WordN") + 0.05); -->
```

## Transitions

A library of named patterns for **how scenes hand off to each other**. Distinct from compositional techniques (which are *what* a scene looks like) — these specify the connective tissue between scenes.

The default scene transition in HyperFrames reels is a 0.4s opacity crossfade — clean, neutral, gets out of the way. Use the techniques below when a specific cut deserves to *be* a beat in the reel rather than just connect two beats. **Don't use these on every transition** — overuse turns the gesture into wallpaper and the reel feels frenetic.

### Transition: Match-cut on motion peak ("cutting the curve")

Two scenes back-to-back where the outgoing scene's last 4–8 frames accelerate outward (scale up, fade, optionally blur) and the incoming scene's first 4–8 frames decelerate inward from the same end-state. The *cut* lands at the apex of motion — the moment of peak velocity, when the viewer's eye is tracking the motion itself rather than the static composition. The cut hides inside the motion and reads as one continuous gesture instead of two slides.

Reference: Vox, Bloomberg Originals, Sam Kolder travel edits, Mr. Beast cuts. The zoom-blur variant is the canonical "TikTok / Reels punch zoom."

**Two variants:**

| Variant | What it does | When |
|---|---|---|
| **Plain match-cut** (scale + opacity) | Outgoing scales 1.0 → 1.7, opacity 1 → 0. Cut at apex. Incoming scales 1.5 → 1.0, opacity 0 → 1. | Financial / data-heavy reels where the cinematic blur would feel excessive. The motion is felt but stays restrained. |
| **Zoom-blur match-cut** (scale + opacity + blur) | Outgoing scales 1.0 → 1.9, opacity 1 → 0, **filter: blur 0 → 16px**. Cut at apex. Incoming reverses all three. | High-energy / cinematic / modal-pivot moments. The blur sells the "camera punched through the screen" feel. |

**When to use:**
- One specific transition deserves to be a *moment* in the reel — a hard pivot in tone, a magnitude jump, a modal shift (data → news, abstract → concrete, present → past).
- You have a strong *editorial reason* for the cut to feel kinetic. "It would look cool" is not enough; "the story is escalating right here and the cut should feel that" is.
- The two scenes share enough visual vocabulary (a hero number, a center-anchored layout) that the motion can read as continuous.

**When not to use:**
- **Not at the very first cut.** The first 1–2 scenes establish the reel's visual baseline (color, typography, pace). If your first scene transition is a punch-zoom, the viewer hasn't yet calibrated what's normal in this reel — the cut reads as "the editor knows one trick" instead of "this moment is special." Save kinetic cuts for transitions 3+.
- **Not on every cut.** One zoom-blur per reel is potent. Two is acceptable if they mark distinct narrative beats. Three or more turns the reel into a Mr. Beast parody.
- Not when the two scenes are radically different in structure — the cut needs *something* to read as continuous (position, magnitude, color), otherwise the motion feels arbitrary.
- Not on the final scene's exit — the reel should END at rest, not punching out into nothing.

**Anatomy** (zoom-blur variant; plain variant drops the `filter`):

| Element | Role | Implementation |
|---|---|---|
| **Outgoing tween** | Scene leaves under acceleration | `tl.to(outgoing, { scale: 1.9, filter: "blur(16px)", opacity: 0, duration: 0.22, ease: "bezierOut", transformOrigin: "50% 50%" }, cutTime - 0.22)` |
| **Visibility swap at apex** | The actual cut | `tl.set(outgoing, { visibility: "hidden" }, cutTime); tl.set(incoming, { visibility: "visible", scale: 1.9, filter: "blur(16px)", opacity: 0 }, cutTime)` — incoming is pre-set to the same end-state as outgoing's peak |
| **Incoming tween** | Scene arrives under deceleration | `tl.to(incoming, { scale: 1.0, filter: "blur(0px)", opacity: 1, duration: 0.30, ease: "bezierIn" }, cutTime)` — slightly longer than outgoing so the deceleration feels grounded |
| **Persistent eyebrow / footer** *(optional but recommended)* | A constant frame around the cut | Elements at the `#root` level OUTSIDE the `.scene` containers — they don't zoom or blur. Their staying still is what makes the scene zoom-blur read as a *camera move* rather than just a CSS animation. |

**Animation choreography:**

```
T = cutTime (the moment scene B should be settled-and-visible enough that the next VO beat lands on it)

T - 0.22s : OUTGOING starts
            scale 1.0 → 1.9, blur 0 → 16px, opacity 1 → 0
            ease "bezierOut" (slow start, fast finish — accelerating)

T         : APEX — the cut
            tl.set outgoing { visibility: hidden }
            tl.set incoming { visibility: visible, scale: 1.9, blur(16px), opacity: 0 }
            (incoming starts at the SAME end-state as outgoing's peak — that's the match)

T         : INCOMING starts (same instant as the cut)
            scale 1.9 → 1.0, blur 16px → 0, opacity 0 → 1
            ease "bezierIn" (fast start, slow finish — decelerating)
            duration 0.30s (slightly longer than outgoing so it feels settled, not jarring)

T + 0.30s : Scene B fully settled, sharp, opaque, at rest
```

**Critical details:**

- **The cut MUST happen at peak velocity.** If the outgoing has already started decelerating before the cut, or the incoming has already started decelerating before the cut, the eye perceives a slowdown — and a slowdown reveals the cut. The whole point is that velocity is at maximum at the cut frame, so the eye is tracking motion rather than registering composition. Tune by inspecting the apex frame: outgoing should be at ~scale 1.9 + full blur, incoming should be at ~scale 1.9 + full blur, cut moment is when they swap.

- **Asymmetric durations are correct.** Outgoing 0.22s + incoming 0.30s feels better than symmetric 0.25s/0.25s. The decelerating incoming wants slightly more time to "land" — like a ball rolling to a stop after a throw. Symmetric durations feel mechanical.

- **Persistent eyebrow / footer outside the scene container.** This is the single biggest "it reads as a camera move" cue. Put your eyebrow (`COMPOUND INTEREST · DEMO`, `GLOBAL OIL FLOW`, etc.) and footer (small attribution / tag) at the `#root` level, NOT inside `.scene`. They stay sharp and locked in position while the scenes zoom-blur around them, which sells the gesture as "the camera punched through" rather than "the layer faded."

- **Helper function for repeated use.** If you have multiple match-cuts in one reel, factor the pattern into a helper:
  ```js
  function zoomBlurCut(outgoing, incoming, cutTime) {
    tl.to(outgoing, { scale: 1.9, filter: "blur(16px)", opacity: 0,
      duration: 0.22, ease: "bezierOut", transformOrigin: "50% 50%" }, cutTime - 0.22);
    tl.set(outgoing, { visibility: "hidden" }, cutTime);
    tl.set(incoming, { visibility: "visible", scale: 1.9, filter: "blur(16px)",
      opacity: 0, transformOrigin: "50% 50%" }, cutTime);
    tl.to(incoming, { scale: 1.0, filter: "blur(0px)", opacity: 1,
      duration: 0.30, ease: "bezierIn" }, cutTime);
  }
  ```
  Then `zoomBlurCut("#scene1", "#scene2", 2.10)` etc. Keeps the timeline readable; lets you tune the parameters in one place.

- **Scale + blur both crossing the cut is non-negotiable for the zoom-blur variant.** Scale alone gives a "punch" but reveals the cut. Blur alone gives "out of focus" but feels static. Both together create a directional motion that the eye reads as 3D camera movement.

- **The cut anchors to a spoken word, not a wall-clock time.** Use `at(sceneId, phrase)` to position the cut on the first word of the incoming scene's VO. This is the same anchor pattern as everything else in the skill — never hardcode timestamps.

- **Don't zoom-blur INTO a scene with its own complex entry animations** unless you account for the timing. Scene 9 in the Intel reel has its own date-pill / headline / highlighter / cutout choreography starting on `at("scene-09", "Last")` — the zoom-blur resolves at that same moment, so the scene-9 animations fire on a clean settled scene container. If incoming scene's animations started DURING the zoom-blur, they'd be invisible (blurred / scaled) and the viewer would miss them.

**HTML scaffold** — structural recipe:

```html
<root>
  <persistent-eyebrow />              <!-- outside any .scene; doesn't zoom or blur; gives the cut a fixed reference frame -->
  <persistent-footer />               <!-- same — outside .scene -->

  <scene id="scene1">                 <!-- visibility: visible initially -->
    <bg-tint />                       <!-- per-scene palette tint -->
    <hero-content />                  <!-- the thing that zooms with the cut -->
    <secondary-content />
  </scene>

  <scene id="scene2">                 <!-- visibility: hidden initially; revealed by zoomBlurCut -->
    <bg-tint />                       <!-- different palette — change masked by the blur -->
    <hero-content />
    <secondary-content />
  </scene>

  <!-- ... more scenes ... -->
</root>

<!-- JS:
     1. Pre-set scenes 2-N to visibility: hidden, opacity: 1, scale: 1, no blur.
        (zoomBlurCut will override at the cut moment.)
     2. Define the helper function once.
     3. Call zoomBlurCut("#sceneN", "#sceneN+1", at("scene-N+1", "FirstWord"))
        for each transition that deserves the gesture. Use plain crossfades for the
        rest of the reel. -->
```

## Common mistakes to avoid

- **Defaulting to "hero 3D object on cyan" for every scene.** If your storyboard has the same archetype (chip, globe, coin, certificate) repeating across most scenes, you're following a generic template instead of designing for the specific story. Match the visual to the moment — a chart, a real photo, pure typography, an inline SVG diagram, a news-clipping card, a portrait with text wrap — pick whichever fits the beat.
- **Glowing type or charts.** No `filter: drop-shadow` blur haloes on text, numbers, chart strokes, or logo edges. See "Hard visual rules" above.
- **Treating numbers as production assets.** Big animated numbers, dollar amounts, percentages, dates — all HTML text orchestrated by GSAP. They never ship as PNG assets and never belong on the cyan panel.
- **Generating an image when code is faster.** A line chart is SVG + GSAP path-draw, not a raster. A glowing circle is a CSS radial gradient + blur. A typographic stack is HTML + SplitText. Default to code; reach for image generation only when code can't deliver the look.
- **Forgetting the brand.** The video has to feel like it's *about* the subject, not a generic explainer. Logo presence in 2–4 scenes (especially bookends) anchors the subject.
- **Generating all scenes at once.** Pace yourself — one scene, get feedback, iterate. Early-scene feedback often reshapes later scenes.
- **Putting labels on the cyan asset panel.** The cyan must be pristine. Labels go above it, not on it.
- **Writing After Effects briefs.** Default to web-native unless the user explicitly says otherwise.
- **Skipping the reference image upload.** If the user has a reference, upload it to Higgsfield via `media_upload` and pass `media_id`. Text descriptions of color and mood drift; visual references lock the look.
- **Specifying logos as text overlays.** Real corporate logos belong as actual brand assets. The cyan-panel logo is a placeholder for the official PNG.
- **Filling the right side with a fake cyan panel** when the scene has no real assets. Skip the cyan zone entirely and let the animation brief expand.

## Final delivery format

When the storyboards are complete, deliver:

1. **The script** as a single block with VO and timing.
2. **The N storyboard images** in scene order.
3. **A summary** listing assets the production team needs to source, grouped by source type:
   - `existing-asset` — files the project already owns
   - `code-chart` / `svg` — patterns to port from sibling projects (or build fresh)
   - `generate-image` / `web-photo` — images to source (and which are AI-placeholder vs licensed)
   - `brand-logo` — official logo PNGs to drop in
4. **The production stack recommendation** — which tools handle which layers (e.g., "GSAP for timeline orchestration; SVG + GSAP path-draw for charts; HTML+CSS for typography; Three.js only for the chip-render scene; HyperFrames or Cavalry for final composition").

This is the deliverable. Hand this package to a motion designer or a video agent and they should be able to start production immediately.
