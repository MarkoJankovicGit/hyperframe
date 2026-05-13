# Editorial Baseline (apply to every Bloom lesson, BEFORE writing scenes)

These rules separate "PowerPoint slide rendered to video" from "in-app educational video that feels designed." They are process-level, not aesthetic-level — Bloom brand stays primary (blue, black headline badge, etc.). The fixes here are about **how** the brand renders, not replacing it.

Apply ALL of these as the project skeleton, then write scene-specific content inside that skeleton.

---

## 1. No `#000` or `#FFF` literals. Use warm near-black + warm off-white.

Pure black and pure white are the single biggest amateur tell. They feel like browser defaults, not designed. Replace globally:

| Forbidden | Use instead |
|---|---|
| `#FFFFFF` / `#fff` for body text | `#FFF1E5` (warm cream) or `#F5F1EC` |
| `#FFFFFF` for page bg | `#F8F4ED` (paper) — for non-blue scenes |
| `#000000` / `#000` ink | `#0e0905` (warm near-black) or stay on `#1C2329` (Bloom ink) |

Bloom blue `#1658FF` stays as-is — it IS the brand. The fix is the ink/cream palette around it.

Even gradient endpoints count: `linear-gradient(180deg, #1658FF 0%, #000 100%)` is wrong → end at `#0e0905`.

---

## 2. Grain overlay on every composition (single biggest "filmed not rendered" lever)

Add ONCE inside `#root`, above all scenes:

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
  opacity: 0.14;                   /* 0.12–0.16 sweet spot */
  mix-blend-mode: soft-light;
  z-index: 9999;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.6 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");
}
```

Works on both Bloom-blue and cream backgrounds because of `mix-blend-mode: soft-light`. The grain is the single visual change that most separates "YouTube edit" from "in-app polished."

---

## 3. Camera drift on every scene (subtle continuous motion)

Static frames feel like a slideshow. Add a 1–4% scale push + 12–24px lateral drift on the **scene container** (not individual elements) over the full beat duration, with `ease: "none"`. Direction varies per scene to keep the eye refreshed.

```js
tl.fromTo("#beat3",
  { scale: 1.00, x: 0, y: 0 },
  { scale: 1.04, x: -16, y: 0, duration: beatDur, ease: "none", overwrite: "auto" },
  0);
```

The viewer doesn't consciously notice it — but its absence is exactly what makes the frames feel "rendered."

---

## 4. Editorial easing — NO overshoot eases

Forbidden on sight (replace every occurrence):
- `back.out(*)` / `back.in(*)`
- `elastic.out(*)`
- `bounce.out(*)`

These read as "GSAP library default," cheapening editorial typography.

Register ONCE at the top of every composition:

```js
gsap.registerPlugin(CustomEase);
CustomEase.create("snapIn",  "0.22, 1, 0.36, 1");   // 90% of element entrances
CustomEase.create("settle",  "0.16, 1, 0.3, 1");    // hero reveals, big stats
CustomEase.create("snapOut", "0.5, 0, 0.75, 0");    // exits
CustomEase.create("smooth",  "0.65, 0, 0.35, 1");   // long camera moves
```

| Curve | Use for | Default duration |
|---|---|---|
| `snapIn` | Element entrances, text reveals, badge slams | 0.4–0.6s |
| `settle` | Hero headlines, big-number stats, brand reveals | 0.7–1.0s |
| `snapOut` | Exits, beat→beat fades | 0.2–0.3s |
| `smooth` | Camera drift, parallax | full beat |
| `"none"` | Drift only, never entry/exit | full beat |

Acceptable fallbacks (no overshoot): `power1.out` / `power2.out` / `power3.out` for entrances, `power1.in` / `power2.in` for exits.

---

## 5. Two weights only — 400 and 700 italic for headlines (not 800)

Bloom DESIGN.md historically said 800. Update to **700** for headline badges. Weights 500/600 read as indecision; 800/900 read as over-cranked. The "weakness" at 700 vs 800 is actually the editorial weight.

Allowed weights:
- **400** — body text, supporting copy
- **700 italic** — headline badges, eyebrows, hero text

Update Google Fonts URL accordingly (don't load weights you won't use).

---

## 6. Tabular numerals on every visible number

Without `font-variant-numeric: tabular-nums`, digits change width as a counter ticks (1 is narrower than 8). The eye reads the jitter as cheap. Single CSS rule:

```css
.stat, .counter, #beat3-counter, #beat5-hero .dollar,
.scene-num, [data-number] {
  font-variant-numeric: tabular-nums;
  font-feature-settings: "tnum" 1;
}
```

Apply to: stat callouts, animated counters, hero numbers (`$1`, `1M+`), date stamps. Skip for body prose.

---

## 7. NO neon glows / drop-blur on type, charts, or logos

Forbidden on sight:
- `text-shadow: 0 N0px N0px rgba(...)` on hero numbers ← **the `$1` text-shadow in our v2 was this exact slop**
- `filter: drop-shadow(0 0 Npx <color>)` on text or chart strokes
- Glowing rings around logos
- Glowing strokes on chart curves

Color carries the emphasis. A bright `#1658FF` `$1` on a Bloom-blue ground needs higher contrast (cream `$1` on blue, or blue `$1` on cream) — NOT a drop-shadow halo. If a scene feels flat without a glow, the fix is **bigger type** or **stronger contrast**, never a blur.

`box-shadow` on cards/UI surfaces is OK when it communicates elevation (a card lifted off the canvas is a structural cue). Just no glow on **type**.

---

## 8. NO atmospheric radial washes behind elements

Even at low opacity, a colored radial gradient behind a hero element (a blue radial wash behind the shield in our Bust 4) is the same "AI-finance-reel slop" tell as a hard glow. Background is solid (Bloom blue, cream, white) — full stop. No `radial-gradient(...)` blobs.

Depth comes from contrast, scale, and motion — not background glow.

---

## 9. NO decorative status pills

"MYTH 01 — SPECIMEN", "DANGER ZONE", "RECORD HIGH", "WARNING" — these read as procedurally-generated AI-finance-reel clichés. The badge content + framing already carries the meaning. A red MYTH stamp + the headline badge already say "this is a myth" — adding a `Myth 01 · specimen` pill on top is decoration, not signal.

**Acceptable pills only when they earn their place:**
- Active-state UI affordances inside a fake-UI card (e.g., the `12Y` chip in a price card)
- Brand bookend pills (`GET BLOOM`, `TAP TO LEARN`)

If you're tempted to add a small uppercase pill to "make it hit harder," delete it instead.

---

## 10. NO verbatim composition repetition across beats

If two beats use the same scaffold (same hero element in the same position, same support placement), the reel feels lazy. Our v2 had 4 Myth beats with identical scaffolds (eyebrow + black badge + sub + red stamp at same position) — the second through fourth feel like duplicates.

**Each Myth beat must look visibly different from the others.** Different framing, different layout zone, different supporting element. Same brand DNA, different gestalt. The composition library (next file) is where you draw these alternates from.

**Storyboard-time audit:** look across the 10 beats and ask: *"Would any two of these thumbnails look interchangeable from 10 feet away?"* If yes, redesign one before building.

---

## 11. NO Stripe/SaaS-feature-grid layouts

Vertically-stacked rounded-rect cards with `LABEL + value + sub-label` repeated 3-4 times is the single most common AI-slop tell — looks like a SaaS pricing page, not a video. If a beat naturally lands as a feature-grid, swap it for one of the composition-library entries (typography hero, photo anchor, editorial pull-quote, kinetic stat-reveal).

---

## Pre-flight check (run BEFORE writing any beat)

- [ ] No `#000` / `#FFF` / `#fff` / `#FFFFFF` literals anywhere (including gradient endpoints)
- [ ] `#grain` div present in `#root`, soft-light, 0.12–0.16 opacity
- [ ] `snapIn / settle / snapOut / smooth` registered; no `back.*` / `elastic.*` / `bounce.*` in tweens
- [ ] Camera drift tween on every beat container (`scale 1.00 → 1.04`, `ease:"none"`, full beat duration)
- [ ] Headlines at `font-weight: 700` italic (not 800)
- [ ] `font-variant-numeric: tabular-nums` on every animated number / stat
- [ ] No `text-shadow` on type, no `filter: drop-shadow` on type/charts/logos
- [ ] No `radial-gradient(...)` background blobs
- [ ] No `MYTH 01 — SPECIMEN`-style decorative pills
- [ ] Storyboard audit: no two beats with the same gestalt
