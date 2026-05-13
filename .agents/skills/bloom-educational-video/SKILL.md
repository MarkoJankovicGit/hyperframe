---
name: bloom-educational-video
description: Create a short-form Bloom-branded educational video (~45-90s portrait) from a topic. Use ONLY when the user explicitly types `/bloom-educational-video <topic>`. Do not auto-trigger on related keywords like "explain stocks" or "make a finance video" — wait for the explicit slash command. Produces a 4-13 beat HTML composition rendered with HyperFrames, narrated by ElevenLabs v3, with logos and AI-generated assets.
---

# Bloom Educational Video

Build a short-form (~45-90s portrait, 1080×1920) educational video in the **Bloom brand**, narrated by **ElevenLabs v3** (voice ID `JZ3e95uoTACVf6tXaaEi`), using **stock logos**, **AI-generated 3D-lite assets**, and **inline HTML/CSS/SVG**.

The composition is a **single self-contained `index.html`** with one root GSAP timeline that drives all beats. **DO NOT split beats into per-beat sub-composition files** — see "Single-file rule" below.

## When to use

- User explicitly types `/bloom-educational-video <topic or text>`
- User asks for "another Bloom lesson", "next Bloom lesson", or "Bloom educational video about X"

## The 7-step flow

| Step | What | Mandatory Pre-read |
|---|---|---|
| 1 | Project setup + asset bootstrap | [references/step-1-setup.md](references/step-1-setup.md) |
| 2 | Write narration + assemble beats | **[references/beat-library.md](references/beat-library.md)** |
| 3 | Generate VO + word timing | [references/step-3-vo.md](references/step-3-vo.md) |
| 4 | Storyboard — pick or invent compositions per beat | **[references/compositions-library.md](references/compositions-library.md)** + **[references/editorial-baseline.md](references/editorial-baseline.md)** |
| 5 | Generate any missing assets via Higgsfield MCP | [references/step-5-assets.md](references/step-5-assets.md) |
| 6 | Build the single-file `index.html` | [references/step-6-build.md](references/step-6-build.md) + **[references/editorial-baseline.md](references/editorial-baseline.md)** |
| 7 | Lint, snapshot, render | [references/step-7-validate.md](references/step-7-validate.md) |

## Two foundational reads (apply to every lesson)

- **[editorial-baseline.md](references/editorial-baseline.md)** — process-level rules that elevate "PowerPoint rendered to video" → "in-app polished video." Grain overlay, no `#FFF`/`#000`, no overshoot eases, camera drift, no glows on type, no decorative pills, no SaaS feature-grids. Apply ALL of them as the project skeleton.
- **[compositions-library.md](references/compositions-library.md)** — the **growing** catalog of scene compositions. For each beat: scan the library; if a fit exists, use it; if nothing fits, **invent via Higgsfield gpt_image_2 ideation** and document the new composition back into the library. Never limit yourself to existing entries — the library grows by exactly one composition per lesson when a beat calls for something new.

## Frozen choices (don't ask the user)

- **Voice:** ElevenLabs v3 (`eleven_v3`), voice ID `JZ3e95uoTACVf6tXaaEi`
- **Format:** 1080×1920 portrait @ 30fps
- **Brand:** Bloom — `#1658FF` blue, `#1C2329` ink, `#FFFFFF` white, `#01CD74` green, Inter Tight 800 italic caps for headlines, black rounded-rect badges
- **Length:** ~45-90s based on text length (2.5 wps natural pace)
- **Beat count:** 4-13 derived from script (default lands around 8 beats for a 60s lesson)
- **Composition style:** **Single monolithic `index.html`** with one root timeline. All beats inline as stacked `<div id="beatN">` elements. One `gsap.timeline({paused:true})` registered on `window.__timelines["bloom-<slug>"]`, with each beat's tweens scheduled at its absolute time via a `makeBeat(id, start, dur, words)` helper that offsets every position. **No `compositions/` folder. No `data-composition-src`.**
- **Audience:** Gen Z, trusted-older-sibling tone

## Single-file rule (READ THIS FIRST)

Bloom lessons are **always one file**: `videos/bloom-<slug>/index.html`. Do not create `compositions/beat-*.html` sub-files. Do not use `data-composition-src`. Reasons:

1. **Sub-comp rendering quirks** — when beats are wrapped in HF host divs, naive `#beatN` CSS selectors don't always apply (the runtime templating intercepts them), causing missing background colors and other styling bugs that take a long time to diagnose.
2. **Single timeline is simpler** — one `ROOT` timeline scheduled at absolute times beats coordinating ten paused-and-mounted child timelines. Visibility is just `tl.set("#beatN", { visibility: "visible" }, beatStart)`.
3. **Easier to scrub, edit, and diff** — one file to read, one place to fix timing, no cross-file path resolution.

If the lint emits `composition_file_too_large`, ignore it for Bloom lessons — that warning is for the generic case where splitting helps; here the single file is the contract.

## Hard rules (non-negotiable)

1. **No emojis ever.**
2. **Animations LAND on keyword, not start at it** — use `landOn(phrase, duration)`.
3. **Logo container backgrounds must be DARK (`#1C2329`).**
4. **Stock logos must be project-local.**
5. **Use flexbox for centering — never CSS `transform: translate(-50%,-50%)`.**
6. **Single file** — one `index.html`. No sub-composition files. No `data-composition-src`.
7. **GSAP Script** — The root `index.html` MUST include the GSAP `<script>` tag in its `<head>` or validation/rendering will fail.
8. **Per-beat scope** — Each beat's tweens, `W` array, and `landOn`/`landAfter` helpers live in their own `{ … }` block scope inside the script tag. Phrase ambiguity stays beat-local.
9. **`overwrite: "auto"`** — Use `overwrite: "auto"` on all entrance tweens to prevent conflicts with idle loops.
10. **Unique `landOn` phrases** — Use 2-3 word phrases (e.g. `"here to make"`), never single common words like "a" or "the" to avoid ambiguity errors.
11. **Visibility-windowing** — Each beat's `tl.set("#beatN", {visibility:"visible"}, 0)` and `tl.set("#beatN", {visibility:"hidden"}, beatDur)` are emitted by the `makeBeat` helper automatically.
12. **No `Math.random()`** — use `mulberry32` PRNG.
13. **Always start with Hook, end with Tease or CTA-close.**
14. **No two consecutive scenes with the same background color.**
15. **Every visible illustrated asset has motion** — entrance + idle (yoyo) + reaction.
16. **Always run BOTH `npx hyperframes lint` AND `npx hyperframes validate`.**
17. **NEVER render unless the user explicitly asks** (`render it`, `render high`, `make the mp4`, `I'm happy`). Renders are expensive (60–90s + 7–15MB) and the user controls when they fire. For visual verification use `npx hyperframes snapshot <project> --at <times>` (single frames, fast). After making baseline / structural changes, *offer* the render as a next step — don't fire it. This applies even when motion needs verifying end-to-end.

## Composition Shell Template (single-file `index.html`)

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=1080, height=1920" />
    <title>Bloom Lesson</title>
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
    <style>
      body { margin: 0; background: #1C2329; font-family: "Inter Tight", "Inter", system-ui, sans-serif; }
      .scene { position: absolute; inset: 0; width: 1080px; height: 1920px; overflow: hidden; visibility: hidden; }

      #beat1 { background: #1658FF; color: #fff; }
      /* … per-beat CSS, all #beatN-prefixed … */
    </style>
  </head>
  <body>
    <div id="root"
         data-composition-id="bloom-<slug>"
         data-width="1080" data-height="1920"
         data-start="0" data-duration="<TOTAL>">

      <audio id="narration" class="clip"
             data-start="0" data-duration="<TOTAL>" data-track-index="0" data-volume="1"
             src="narration.mp3"></audio>

      <!-- All beats stacked, hidden by default; visibility windowed by the timeline. -->
      <div id="beat1" class="scene"> … </div>
      <div id="beat2" class="scene"> … </div>
      <!-- … one row per beat … -->
    </div>

    <script>
      (function () {
        window.__timelines = window.__timelines || {};
        const ROOT = gsap.timeline({ paused: true });
        window.__timelines["bloom-<slug>"] = ROOT;

        function mulberry32(seed){return function(){let t=(seed+=0x6d2b79f5);t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296;};}

        // Per-beat scope helper: scoped landOn + tween offsetting
        function makeBeat(beatId, beatStart, beatDur, words) {
          const W = words;
          const _norm = s => s.toLowerCase().replace(/[^\p{L}\p{N}'-]/gu, "");
          function _findPhrase(p) {
            const t = p.toLowerCase().split(/\s+/).map(_norm).filter(Boolean);
            const hits = [];
            for (let i=0; i<=W.length-t.length; i++) {
              let ok=true; for (let j=0;j<t.length;j++) if (_norm(W[i+j].w)!==t[j]) { ok=false; break; }
              if (ok) hits.push(i);
            }
            if (!hits.length) throw new Error('landOn ['+beatId+']: "'+p+'" not found');
            if (hits.length>1) throw new Error('landOn ['+beatId+']: "'+p+'" matches '+hits.length);
            return { s: W[hits[0]].s, e: W[hits[0]+t.length-1].e };
          }
          const at        = p     => _findPhrase(p).s;
          const landOn    = (p,d=0) => _findPhrase(p).s - d;
          const landAfter = (p,d=0) => _findPhrase(p).e - d;

          // proxy that adds beatStart to every position arg
          const tl = {
            fromTo: (sel, from, to, pos=0) => ROOT.fromTo(sel, from, to, beatStart + pos),
            to:     (sel, vars, pos=0)     => ROOT.to(sel, vars, beatStart + pos),
            set:    (sel, vars, pos=0)     => ROOT.set(sel, vars, beatStart + pos),
            call:   (fn, args, pos=0)      => ROOT.call(fn, args, beatStart + pos),
          };
          tl.set("#"+beatId, { visibility: "visible" }, 0);
          tl.set("#"+beatId, { visibility: "hidden"  }, beatDur);
          return { tl, landOn, landAfter, at };
        }

        // ─── Beat 1 ───────────────────────────
        {
          const W = [/* beat-relative word slice */];
          const { tl, landOn } = makeBeat("beat1", 0.00, 6.50, W);
          // tl.fromTo(...) etc. — positions are BEAT-RELATIVE; helper adds beatStart for you
        }

        // ─── Beat 2 ───────────────────────────
        { /* same pattern */ }
      })();
    </script>
  </body>
</html>
```
