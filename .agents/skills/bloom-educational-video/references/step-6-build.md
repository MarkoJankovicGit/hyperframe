# Step 6 — Build the Composition (Per-Beat Sub-Comps)

The Bloom video is a root `index.html` that wires per-beat sub-compositions via `data-composition-src` — the same pattern as `/website-to-hyperframes`. Each beat is its own file under `compositions/`, written in isolation by a fresh sub-agent. The root file just orchestrates: which beat plays when, and the narration audio.

## Read these BEFORE writing any HTML

- [DESIGN.md](../DESIGN.md) — frozen Bloom brand
- `videos/bloom-<slug>/STORYBOARD.md` — beat plan with timings
- `videos/bloom-<slug>/transcript.json` — word-level timestamps
- [timing-helpers.md](timing-helpers.md) — **`landOn(phrase, dur)` / `landAfter(phrase, dur)` / `at(phrase)`** — required pattern; do NOT hardcode `KW_X = 1.234` constants
- [techniques.md](techniques.md) — 11 visual techniques with code patterns. When the storyboard says "SVG path drawing" or "per-word kinetic typography" — read the code pattern from this file and adapt it.
- [animation-patterns.md](animation-patterns.md) — entrance/idle/reaction triad, dwell minimum, dead-air audit, landOn-uniqueness rule
- The `hyperframes` skill (load via `Skill: hyperframes`) — composition contract, `data-*` attributes, layout rules

**After reading each file, write a 1-2 sentence summary** of what you'll use from it. These summaries are your working memory — file content may be evicted from your context as you build. The summary is what you'll re-reference; the raw file is the source of truth when something doesn't match.

## Phase 1 — Build the root `index.html`

The root file is small. It declares the video viewport, wires the narration audio on track 0, and lists each beat as a sub-composition `<div>` with the right `data-start` and `data-duration`. Do this BEFORE spawning per-beat agents — they need to know their slug, duration, and start time.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=1080, height=1920" />
    <title>Bloom Lesson — <Topic></title>
  </head>
  <body>
    <div
      id="root"
      data-composition-id="bloom-<slug>"
      data-width="1080" data-height="1920"
      data-start="0" data-duration="<TOTAL_S>"
    >
      <!-- Narration on track 0 -->
      <audio id="narration" class="clip"
             data-start="0" data-duration="<TOTAL_S>" data-track-index="0" data-volume="1"
             src="narration.mp3"></audio>

      <!-- Per-beat sub-compositions.
           Overlap data-start by 0.2s for a crossfade across each seam.
           Alternate tracks 1 and 2 so overlapping clips never collide. -->
      <div class="clip" data-composition-src="compositions/beat-1-hook.html"
           data-start="0.00" data-duration="6.50" data-track-index="1"></div>
      <div class="clip" data-composition-src="compositions/beat-2-myth1.html"
           data-start="6.30" data-duration="8.20" data-track-index="2"></div>
      <div class="clip" data-composition-src="compositions/beat-3-bust1.html"
           data-start="14.30" data-duration="7.40" data-track-index="1"></div>
      <!-- … one row per beat … -->
    </div>
  </body>
</html>
```

**Notes:**
- `<TOTAL_S>` comes from the narration duration (rounded up to nearest 0.1s).
- Each beat's `data-start` should equal the previous beat's `data-start + data-duration - 0.2` (0.2s crossfade overlap). Round to 2 decimals.
- Beat sub-comps alternate `data-track-index` between `1` and `2` whenever consecutive beats overlap for crossfades. Same-track clips cannot overlap. Audio is on track 0, narration only.
- DO NOT add a master GSAP timeline in the root — each beat owns its own timeline, root is just orchestration.

## Phase 2 — Spawn one sub-agent per beat

By this step your context already has DESIGN.md, STORYBOARD.md, transcript.json, asset inventories. Building 8 compositions on top of all that means details compete with thousands of tokens of prior work. **One sub-agent per beat = fresh context = dramatically better output.**

For each beat in STORYBOARD.md, spawn a sub-agent with the prompt below. Pass file PATHS, not file contents — the #1 failure mode is reading an asset and pasting its raw SVG/image data into the sub-agent prompt.

### Sub-agent dispatch template

```
Build the composition for BEAT <N>: "<Beat name>" of the Bloom lesson "<topic>".

SAVE TO: hyperframes/videos/bloom-<slug>/compositions/beat-<N>-<short-name>.html

THIS BEAT:
- Duration: <DUR>s   (data-duration on the root <template>)
- Bg color: <#hex>
- VO line: "<full sentence(s) for this beat>"
- Storyboard direction: [paste the ### BEAT N section from STORYBOARD.md verbatim]
- Keyword onsets (for landOn anchors, BEAT-RELATIVE seconds — already shifted):
  - "Myth two" @ 0.42 (topic word, anchor entrances here)
  - "lose all your money" @ 4.18 (punchline, anchor reaction pulse here)

VO timing data (BEAT-RELATIVE — already shifted so beat starts at t=0):
  W = [
    { word: "Myth", t: 0.21, e: 0.45 },
    { word: "two:", t: 0.45, e: 0.78 },
    { word: "investing", t: 0.85, e: 1.32 },
    ...
  ];
Inline this `W` array at the top of your beat composition's <script> so landOn()/landAfter() can resolve phrases against it.

ASSETS — reference by relative path, do NOT inline SVG/image data:
- Bloom logo: <img src="../bloom-logo.png">    (110×110 corner if Bloom is named in this beat)
- Generated illustration: <img src="../generated-assets/broken-piggy.png">  (cutout, transparent)
- Stock logos: <img src="../logos/AAPL.png">  (use a #1C2329 dark orb wrapper for ticker logos)

REQUIRED FILES TO READ:
- ../DESIGN.md — exact hex colors and Do's/Don'ts
- C:/Users/User/.claude/skills/bloom-educational-video/references/techniques.md — pick 2-3 techniques for this beat
- C:/Users/User/.claude/skills/bloom-educational-video/references/timing-helpers.md — landOn/landAfter pattern (REQUIRED, do not hardcode timestamps)
- C:/Users/User/.claude/skills/bloom-educational-video/references/animation-patterns.md — entrance/idle/reaction triad
Load the `hyperframes` skill for composition data-attribute rules.

OUTPUT REQUIREMENTS:
- Single self-contained <template> with scoped CSS (#beat<N>-* prefixes everywhere)
- Root <template> has data-start="0" and data-duration="<DUR>"
- Inside: <div id="beat<N>" class="scene"> ... </div> as the visual root, sized 1080×1920
- A paused gsap.timeline() registered on window.__timelines["bloom-<slug>-beat-<N>"]
- All entrances scheduled via landOn(...) / landAfter(...) — never hardcoded constants
- Every visible illustrated asset has entrance + idle (yoyo) + reaction triad
- Visibility kill at exit: tl.set("#beat<N>", { visibility: "hidden" }, <DUR>)

Hard rules (lint will fail without these):
- No emojis, no Math.random(), no Date.now(), no repeat:-1
- Logo containers backgrounds = #1C2329 (dark orb) for ticker logos
- Use flexbox for centering — never CSS `transform: translate(-50%,-50%)`
- All entrances LAND on the TOPIC word (not the punchline); reaction pulses fire on the punchline
- 36px minimum readable text; 72-100px+ for headlines
```

### Why pass beat-relative VO timings, not absolute

Each beat composition's GSAP timeline starts at t=0. The `landOn()` helper resolves a phrase against the inlined `W` array and returns a numeric position to schedule the tween. If you pass absolute words from the master `transcript.json`, every `landOn` returns a number like `27.3` and your tween fires 27 seconds INTO the beat (way past the end). Always shift the slice so beat-start = 0.

Quick shift snippet (run when preparing each sub-agent prompt):

```js
const beatStart = 6.30;  // from root index.html data-start of this beat
const beatEnd   = 14.50; // beatStart + data-duration
const W = transcript.words
  .filter(w => w.t >= beatStart && w.t < beatEnd)
  .map(w => ({ word: w.word, t: +(w.t - beatStart).toFixed(3), e: +(w.e - beatStart).toFixed(3) }));
```

## Phase 3 — Verify each beat composition after the sub-agent finishes

Don't trust the sub-agent's "done" message. After each beat is written, open the file and check:

### Asset cross-reference

1. Open STORYBOARD.md, find this beat's asset list
2. Search the beat HTML for each filename (e.g., `grep "broken-piggy"`)
3. If any assigned asset is missing, add it now
4. Check for the inline anti-pattern: if the HTML contains `<svg xmlns=` or `data:image/` blobs but no `../generated-assets/` references, the asset was inlined — replace with `<img src="../generated-assets/<file>.png">`

### Structural checks

- [ ] Root `<template>` has `data-start="0"` AND `data-duration="<DUR>"` (linter fails without both)
- [ ] Visual root `<div id="beat<N>" class="scene">` is `position:absolute; inset:0; width:1080px; height:1920px` (or flexbox-centered inside that)
- [ ] Timeline registered: `window.__timelines["bloom-<slug>-beat-<N>"] = tl`
- [ ] Inlined `W` array is BEAT-RELATIVE (first word's `t` is < 1.0s, not 27s)
- [ ] All `landOn(...)` calls use 2-3 word unique phrases — search the beat's W for each phrase, confirm exactly one match
- [ ] Visibility kill present: `tl.set("#beat<N>", { visibility: "hidden" }, <DUR>)`
- [ ] Every visible asset has entrance + idle yoyo (rotation, scale, or y-drift) + reaction
- [ ] No CSS `transform: translate(-50%,-50%)` for centering — use flexbox

### Lint each beat individually

The `hyperframes lint` command surfaces structural issues:

```bash
cd hyperframes/videos/bloom-<slug>
npx hyperframes lint compositions/beat-<N>-<name>.html
```

Fix every error before moving on. A few warnings (`overlapping_gsap_tweens` with `overwrite: "auto"` set) are OK.

## Phase 4 — Wire it all in the root and lint the whole thing

Once every beat file passes its individual lint, run lint on the root:

```bash
npx hyperframes lint
```

This validates the orchestration: every `data-composition-src` resolves, every `data-start`/`data-duration` is consistent, narration covers the full duration.

## Beat composition skeleton (give this to each sub-agent)

```html
<template
  data-start="0"
  data-duration="<DUR>"
>
  <style>
    /* All selectors scoped to #beat<N> to avoid cross-beat leakage */
    #beat<N> {
      position: absolute; inset: 0;
      width: 1080px; height: 1920px;
      overflow: hidden;
      background: <#bg-hex>;
      font-family: "Inter Tight", "Inter", system-ui, sans-serif;
    }
    #beat<N> .badge {
      display: inline-flex; align-items: center; justify-content: center;
      background: #1c2329; color: #fff; border-radius: 26px;
      box-shadow: 0 24px 60px rgba(6,10,30,0.28);
    }
    /* … beat-specific CSS, all #beat<N>-prefixed … */
  </style>

  <div id="beat<N>" class="scene">
    <!-- Static end-state HTML: every element where it should be at peak visibility.
         Animations describe the journey TO this state; CSS positions are the truth. -->
    <h1 id="beat<N>-headline" class="badge">
      <span class="badge-text">Myth Two</span>
    </h1>
    <img id="beat<N>-asset" src="../generated-assets/broken-piggy.png" />
  </div>

  <script>
    (function () {
      // ---- VO word timing (BEAT-RELATIVE) ----
      const W = [
        { word: "Myth",      t: 0.21, e: 0.45 },
        { word: "two:",      t: 0.45, e: 0.78 },
        // … sliced from transcript.json, shifted to beat-relative …
      ];

      // ---- Phrase-anchored timing helpers (inline, no module imports) ----
      const _norm = s => s.toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, "").trim();
      function _findPhrase(phrase) {
        const ws = _norm(phrase).split(/\s+/);
        const out = [];
        for (let i = 0; i <= W.length - ws.length; i++) {
          let ok = true;
          for (let j = 0; j < ws.length; j++) {
            if (_norm(W[i + j].word) !== ws[j]) { ok = false; break; }
          }
          if (ok) out.push({ start: W[i].t, end: W[i + ws.length - 1].e });
        }
        if (out.length === 0) throw new Error('landOn: phrase "' + phrase + '" not found in beat W');
        if (out.length > 1) throw new Error('landOn: phrase "' + phrase + '" matched ' + out.length + ' positions — use a unique 2-3 word phrase');
        return out[0];
      }
      function landOn(phrase, dur)  { return _findPhrase(phrase).start - dur; }
      function landAfter(phrase, dur) { return _findPhrase(phrase).end - dur; }
      function at(phrase)           { return _findPhrase(phrase).start; }

      // ---- Timeline ----
      window.__timelines = window.__timelines || {};
      const tl = gsap.timeline({ paused: true });

      // 1) Entrances (LAND on topic word, schedule at landOn(topic, dur))
      tl.fromTo("#beat<N>-headline",
        { y: -60, opacity: 0, scale: 0.8 },
        { y: 0, opacity: 1, scale: 1, duration: 0.45, ease: "back.out(1.7)" },
        landOn("Myth two", 0.45));

      tl.fromTo("#beat<N>-asset",
        { x: 200, opacity: 0, rotation: -8 },
        { x: 0, opacity: 1, rotation: 0, duration: 0.55, ease: "power3.out" },
        landOn("Myth two", 0.55));

      // 2) Idle (asset drifts/rotates while on screen — NEVER a static image >2s)
      tl.to("#beat<N>-asset",
        { rotation: 2, duration: 2.8, yoyo: true, repeat: 2, ease: "sine.inOut" },
        landOn("Myth two", 0) + 0.6);

      // 3) Reaction (small pulse on punchline word)
      tl.fromTo("#beat<N>-asset",
        { scale: 1 },
        { scale: 1.06, duration: 0.18, yoyo: true, repeat: 1, ease: "power2.out" },
        landOn("lose all your money", 0));

      // 4) Visibility kill at end
      tl.set("#beat<N>", { visibility: "hidden" }, <DUR>);

      window.__timelines["bloom-<slug>-beat-<N>"] = tl;
    })();
  </script>
</template>
```

## Hard rules — won't pass lint without these

1. Every beat's root `<template>` has `data-start="0"` AND `data-duration="<DUR>"`
2. Every transition tween has `overwrite: "auto"`
3. Logo container backgrounds are dark `#1C2329` for ticker logos (white-on-transparent will vanish on light bg) — except `bloom-logo.png` which has its own background
4. No `Math.random()`, no `Date.now()` — use mulberry32 with a fixed seed
5. No CSS `transform: translate(-50%,-50%)` for centering — use flexbox
6. Stock logos referenced via local `../logos/<TICKER>.png` (NOT `../../assets/logos/`)
7. All entrances back-timed via `landOn(phrase, dur)` — never hardcoded `const KW_X = 1.234`
8. Inlined `W` array is beat-relative (subtract beat-start before passing to sub-agent)
9. Visibility kill `tl.set("#beat<N>", { visibility: "hidden" }, <DUR>)` at end of every beat

## Gate

- [ ] Root `index.html` exists with one `<div data-composition-src="compositions/beat-<N>-...">` per beat
- [ ] Each beat file exists at `compositions/beat-<N>-<short-name>.html`
- [ ] Each beat's root `<template>` has both `data-start="0"` and `data-duration="<DUR>"`
- [ ] Each beat registers its timeline as `window.__timelines["bloom-<slug>-beat-<N>"]`
- [ ] Every keyword-synced entrance back-timed via `landOn`/`landAfter`
- [ ] Visibility-kill `tl.set` after each beat's exit
- [ ] All asset paths resolve (`../bloom-logo.png`, `../logos/<TICKER>.png`, `../generated-assets/<file>.png`)
- [ ] No emojis anywhere
- [ ] `npx hyperframes lint` passes with 0 errors on every beat file AND on the root
- [ ] `npx hyperframes validate` passes with 0 errors — catches ambiguous `landOn()` phrases and runtime issues lint cannot see (see [step-7-validate.md § Validate](step-7-validate.md))
