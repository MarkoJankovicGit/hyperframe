---
name: bloom-educational-video
description: Create a short-form Bloom-branded educational video (~45-90s portrait) from a topic. Use ONLY when the user explicitly types `/bloom-educational-video <topic>`. Do not auto-trigger on related keywords like "explain stocks" or "make a finance video" — wait for the explicit slash command. Produces a 4-13 beat HTML composition rendered with HyperFrames, narrated by ElevenLabs v3, with logos and AI-generated assets.
---

# Bloom Educational Video

Build a short-form (~45-90s portrait, 1080×1920) educational video in the **Bloom brand**, narrated by **ElevenLabs v3** (voice ID `JZ3e95uoTACVf6tXaaEi`), using **stock logos**, **AI-generated 3D-lite assets**, and **inline HTML/CSS/SVG**. The composition is rendered via HyperFrames as a root `index.html` that wires per-beat sub-compositions (`compositions/beat-N-<name>.html`) via `data-composition-src`.

## When to use

- User explicitly types `/bloom-educational-video <topic or text>`
- User asks for "another Bloom lesson", "next Bloom lesson", or "Bloom educational video about X"

## The 7-step flow

| Step | What | Mandatory Pre-read |
|---|---|---|
| 1 | Project setup + asset bootstrap | [references/step-1-setup.md](references/step-1-setup.md) |
| 2 | Write narration + assemble beats | **[references/beat-library.md](references/beat-library.md)** |
| 3 | Generate VO + word timing | [references/step-3-vo.md](references/step-3-vo.md) |
| 4 | Write storyboard (per-beat direction) | **[references/composition-rules.md](references/composition-rules.md)** |
| 5 | Generate any missing assets via Kie | [references/step-5-assets.md](references/step-5-assets.md) |
| 6 | Build per-beat compositions + wire root | [references/step-6-build.md](references/step-6-build.md) |
| 7 | Lint, snapshot, render | [references/step-7-validate.md](references/step-7-validate.md) |

## Frozen choices (don't ask the user)

- **Voice:** ElevenLabs v3 (`eleven_v3`), voice ID `JZ3e95uoTACVf6tXaaEi`
- **Format:** 1080×1920 portrait @ 30fps
- **Brand:** Bloom — `#1658FF` blue, `#1C2329` ink, `#FFFFFF` white, `#01CD74` green, Inter Tight 800 italic caps for headlines, black rounded-rect badges
- **Length:** ~45-90s based on text length (2.5 wps natural pace)
- **Beat count:** 4-13 derived from script (default lands around 8 beats for a 60s lesson)
- **Composition style:** Root `index.html` wires per-beat sub-compositions (`compositions/beat-N-<name>.html`) via `data-composition-src`. Each beat file is a `<template>` with its own scoped HTML/CSS/JS and its own GSAP timeline registered on `window.__timelines["bloom-<slug>-beat-N"]`.
- **Audience:** Gen Z, trusted-older-sibling tone

## Hard rules (non-negotiable)

1. **No emojis ever.**
2. **Animations LAND on keyword, not start at it** — use `landOn(phrase, duration)`.
3. **Logo container backgrounds must be DARK (`#1C2329`).**
4. **Stock logos must be project-local.**
5. **Use flexbox for centering — never CSS `transform: translate(-50%,-50%)`.**
6. **Alternating tracks for crossfades** — When using 0.2s overlaps between beats in `index.html`, you MUST alternate `data-track-index` between 1 and 2 for every consecutive clip to prevent track collisions.
7. **GSAP Script in Shell** — The root `index.html` MUST include the GSAP `<script>` tag in its `<head>` or validation/rendering will fail.
8. **Attribute Placement** — `data-composition-id`, `data-width`, `data-height`, `data-start="0"`, and `data-duration` MUST be on the actual visual root `<div>` inside the `<template>`, not on the `<template>` itself.
9. **Selector Scoping** — All GSAP selectors in sub-compositions MUST be prefixed with the composition ID (e.g., `tl.from("#beat1 .card", ...)`) to prevent global collision.
10. **`overwrite: "auto"`** — Use `overwrite: "auto"` on all entrance tweens to prevent conflicts with idle loops or transition fades.
11. **Unique `landOn` phrases** — Use 2-3 word phrases (e.g. `"here to make"`), never single common words like "a" or "the" to avoid ambiguity errors.
12. **Visibility-kill `tl.set` after each beat exit.**
13. **No `Math.random()`** — use `mulberry32` PRNG.
14. **Always start with Hook, end with Tease or CTA-close.**
15. **No two consecutive scenes with the same background color.**
16. **Every visible illustrated asset has motion** — entrance + idle (yoyo) + reaction.
17. **Always run BOTH `npx hyperframes lint` AND `npx hyperframes validate`.**

## Composition Shell Template (index.html)

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=1080, height=1920" />
    <title>Bloom Lesson</title>
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
    <style>body { margin: 0; background: #1C2329; }</style>
  </head>
  <body>
    <div id="root" data-composition-id="bloom-slug" data-width="1080" data-height="1920" data-start="0" data-duration="TOTAL">
      <audio id="narration" class="clip" data-start="0" data-duration="TOTAL" data-track-index="0" src="narration.mp3"></audio>
      <!-- Alternate tracks 1 and 2 for 0.2s crossfade overlaps -->
      <div class="clip" data-composition-src="compositions/beat-1.html" data-composition-id="beat-1" data-start="0" data-duration="5" data-track-index="1"></div>
      <div class="clip" data-composition-src="compositions/beat-2.html" data-composition-id="beat-2" data-start="4.8" data-duration="5" data-track-index="2"></div>
    </div>
    <script>window.__timelines = window.__timelines || {};</script>
  </body>
</html>
```

## Sub-Composition Template

```html
<template>
  <div id="beatN" class="scene" data-composition-id="bloom-slug-beat-N" data-width="1080" data-height="1920" data-start="0" data-duration="5">
    <style>/* scoped styles */</style>
    <script>
      (function() {
        window.__timelines = window.__timelines || {};
        const tl = gsap.timeline({ paused: true });
        // tweens with overwrite: "auto"
        window.__timelines["bloom-slug-beat-N"] = tl;
      })();
    </script>
  </div>
</template>
```
