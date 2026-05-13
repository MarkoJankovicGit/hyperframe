# Step 6 — Build the Single-File Composition

The Bloom video is a **single self-contained `index.html`** with one root GSAP timeline driving every beat. **Do NOT split beats into per-beat sub-composition files.** No `compositions/` folder. No `data-composition-src`.

This is a hard rule. See [SKILL.md § Single-file rule](../SKILL.md) for the reasoning.

## Read these BEFORE writing any HTML

- [DESIGN.md](../DESIGN.md) — frozen Bloom brand
- `videos/bloom-<slug>/STORYBOARD.md` — beat plan with timings
- `videos/bloom-<slug>/transcript.json` — word-level timestamps
- [techniques.md](techniques.md) — 11 visual techniques with code patterns
- [animation-patterns.md](animation-patterns.md) — entrance/idle/reaction triad, dwell minimum, dead-air audit
- The `hyperframes` skill (load via `Skill: hyperframes`) — `data-*` attributes, layout rules

## Architecture

One file. One root timeline (`ROOT`). Each beat is a `<div id="beatN" class="scene">` stacked at `position:absolute; inset:0`, hidden by default. The timeline windows visibility per beat and schedules every tween at its absolute master-timeline time.

The trick is the `makeBeat(beatId, beatStart, beatDur, words)` helper:
- It creates a per-beat scope with its own `W` array and `landOn`/`landAfter` helpers (so `"Bloom"` repeating across beats doesn't trigger ambiguity errors).
- It returns a `tl` proxy (`fromTo`/`to`/`set`/`call`) that **adds `beatStart` to every position argument** before forwarding to `ROOT`. So inside the block you write beat-relative positions and they land on the master timeline at the right absolute time.
- It auto-emits the visibility window: `tl.set("#beatN", {visibility:"visible"}, 0)` and `tl.set("#beatN", {visibility:"hidden"}, beatDur)`.

## Phase 1 — Generate the per-beat W slices

Each beat's `W` array is the slice of `transcript.json` words that fall inside the beat's `[beatStart, beatStart + beatDur)` window, with timestamps **shifted to beat-relative** (subtract `beatStart`). One-shot generator:

```bash
cd hyperframes/videos/bloom-<slug>
node -e "
const fs = require('fs');
const t = JSON.parse(fs.readFileSync('transcript.json','utf8'));
const W = t.words.map(w => ({w:w.word, s:+w.start.toFixed(3), e:+w.end.toFixed(3)}));
const beats = [
  {n:1, s:0.00, e:9.50},
  {n:2, s:9.50, e:15.40},
  // … one row per beat …
];
for (const b of beats) {
  const slice = W.filter(w => w.s >= b.s && w.s < b.e).map(w => ({w:w.w, s:+(w.s-b.s).toFixed(3), e:+(w.e-b.s).toFixed(3)}));
  console.log('B'+b.n, JSON.stringify(slice));
}"
```

Paste each slice as the `W = […]` literal at the top of the matching beat block in `index.html`.

## Phase 2 — Write `index.html` end to end

Use the shell + `makeBeat` helper from [SKILL.md § Composition Shell Template](../SKILL.md). Then for each beat, drop a block:

```js
// ─── Beat 3 — Bust 1 (15.40 → 24.30) ───
{
  const W = [/* beat-relative slice */];
  const { tl, landOn, landAfter } = makeBeat("beat3", 15.40, 8.90, W);

  // beat-relative positions; helper offsets to master time
  tl.fromTo("#beat3-wrong", { y:-40, opacity:0, scale:0.8 },
    { y:0, opacity:1, scale:1, duration:0.45, ease:"back.out(1.7)", overwrite:"auto" },
    landOn("Wrong.", 0.45));

  // canvas / counter / etc. — full per-beat code lives in this block
}
```

The `{ … }` block scope keeps each beat's `W` and helper functions local — no global collisions, even though every beat shares the same `ROOT` timeline.

## Per-beat HTML (stacked under `#root`)

```html
<div id="beat3" class="scene">
  <canvas id="beat3-particles" width="1080" height="1920"></canvas>
  <div id="beat3-bloom-corner"><img src="bloom-logo.png" alt="" /></div>
  <!-- … beat-specific markup, all #beat3-* prefixed … -->
</div>
```

`.scene` CSS sets `visibility: hidden` by default; `makeBeat` flips it visible at beat start and back to hidden at beat end.

## Asset paths

Single file at the project root means **NO `../` prefix**. Use direct paths:
- `bloom-logo.png`, `bloom-star.png`
- `logos/AAPL.png`
- `generated-assets/piggy-bank.png`
- `narration.mp3`

## Hard rules — won't pass lint without these

1. Single `index.html` — no `compositions/` folder, no `data-composition-src`.
2. GSAP `<script>` tag in `<head>`.
3. Every transition tween has `overwrite: "auto"`.
4. Logo container backgrounds are dark `#1C2329` for ticker logos.
5. No `Math.random()`, no `Date.now()`, no `repeat: -1` (use exact repeat counts).
6. No CSS `transform: translate(-50%,-50%)` for centering — use flexbox.
7. All entrances back-timed via `landOn(phrase, dur)` — never hardcoded `const KW_X = 1.234`.
8. Inlined per-beat `W` arrays are **beat-relative** (subtract beatStart before pasting).
9. `landOn` phrase ambiguity stays beat-local (each beat block has its own `W`), but still prefer 2-3 word phrases.
10. Each beat's CSS selectors are prefixed `#beatN-...` to avoid collisions across stacked beats.

## What lint will say (and how to read it)

- `composition_file_too_large` — **expected and ignored** for Bloom lessons. The single file is the contract.
- `duplicate_media_discovery_risk` for `bloom-logo.png` — **expected and ignored** when the logo appears in multiple beats; the renderer handles it.
- Any other warning or error — fix it.

## Gate

- [ ] Single `index.html` exists; no `compositions/` folder
- [ ] GSAP script tag in `<head>`
- [ ] One `gsap.timeline({paused:true})` registered as `window.__timelines["bloom-<slug>"]`
- [ ] Each beat is a `<div id="beatN" class="scene">` directly inside `#root`
- [ ] Each beat has a `{ … }` script block with its own `W` and `makeBeat` call
- [ ] Per-beat `W` arrays are beat-relative
- [ ] Every keyword-synced entrance back-timed via `landOn`/`landAfter`
- [ ] All asset paths resolve from project root (`bloom-logo.png`, `logos/<TICKER>.png`, `generated-assets/<file>.png`)
- [ ] No emojis anywhere
- [ ] `npx hyperframes lint` passes with 0 errors (the two warnings above are OK)
- [ ] `npx hyperframes validate` passes with 0 errors
