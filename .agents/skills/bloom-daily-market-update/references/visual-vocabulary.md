# Visual Vocabulary

Catalog of moves that have worked, with source pointers. **These are riff-able examples, not templates.** Read the relevant block in `videos/bloom-market-2026-04-28/index.html` before reusing — the structure + animations + classes are all there.

## How to use this doc

1. Read today's script (Step 1 output)
2. For each beat, scan [`decision-heuristics.md`](decision-heuristics.md) for matches
3. Look up the matched move below for the full implementation
4. Read the referenced HTML/CSS/JS in 04-28 — copy and adapt
5. Compose freely — bend, combine, deviate as the script demands

---

## 1. Title Open — scrolling logo orbs + headline

**Used for:** Day's opener. Bloom-blue stage with floating ticker logos drifting in background.

**Vibe:** Bloomberg/CNBC daily-market open. Gravitas, motion, brand-blue authority.

**Components:**
- Bloom-blue (`#1658FF`) full-bleed BG
- `<canvas>` with 5-column scrolling logo orbs (Canvas 2D, `mulberry32` seed for determinism)
- Soft vignette pass after orbs (radial gradient darkening corners)
- Black rounded date pill ("APR 28 · 2026")
- Massive italic Inter Tight 800 headline ("TODAY'S MARKET / IN 30S")
- "DAILY PULSE · BLOOM" thin sub-pill

**Source:** `videos/bloom-market-2026-04-28/index.html` Beat 1 (lines ~22–80 CSS, ~580–650 HTML, ~1015–1100 JS)

**Recurring (don't change day-to-day):** the canvas scroll setup, the sub-pill copy. Only the date pill text + headline copy can change.

---

## 2. Kinetic typography slam

**Used for:** Quick punchy moments, 1.5–2.5s. "TECH IS LEADING" type lines.

**Vibe:** SportsCenter chyron meets Apple keynote.

**Components:**
- Solid Bloom-blue or white BG
- Two-weight headline: light setup + heavy display payoff (per `typography-rules.md`)
- Slight scale-up on the payoff word + idle wobble
- Optional: shimmer-sweep registry component for metallic finish

**Source:** 04-28 Beat 2 (TECH IS LEADING)

---

## 3. Rich ticker card — single index

**Used for:** Stock or index reveal with price + percent change. Both standalone and stacked.

**Components per card:**
- 920px-wide rounded white card, 42px radius, soft shadow
- Header row: dark `#1C2329` logo orb on left + ticker name (italic 800 88px) + sub-label ("NASDAQ 100" 22px wide-tracked) + green/red `+X.XX%` pill (italic 800 38px) on right
- Hero row: massive italic 148px counter (animates from 0 → final via `Intl.NumberFormat`)
- Sparkline below (full card width, 170–220px tall, draws via `stroke-dashoffset`)
- Optional: 2 sub-tier text labels max (per typography rules) — e.g. "OPEN +0.3%" + a "RECORD HIGH" green tag

**Source:** 04-28 Beat 3 (NDX + SPX rich cards). CSS classes `.idx-card .idx-orb .idx-name .idx-sub .idx-pill .idx-price .idx-chart`.

**Animation:**
- Card slides in from below (`y: 60 → 0`, scale 0.96 → 1, 0.55s power3.out)
- Counter tweens via proxy + onUpdate
- Sparkline draws over ~1.0s power2.out

---

## 4. Stamp slam (RECORD HIGH style)

**Used for:** Punctuation moments inside a longer beat. "Record high", "Fresh ATH", "Bear flag confirmed", etc.

**Components:**
- Inline-flex column box (one or two lines: "RECORD" / "HIGH")
- 8px solid red `#FF5252` border
- Tilt `rotate(-8deg)`, slam from `scale(1.4) rotate(-16)` → settle
- Inset glow + drop shadow

**Critical rule:** if this would be a standalone < 1.5s beat, **fold into the adjacent beat** (e.g. cards exit, then stamp slams in same beat). 04-28 RECORD HIGH started as Beat 4 but was merged into Beat 3 Tickers.

**Source:** 04-28 Beat 3 (folded RECORD HIGH stamp). CSS class `.b3-stamp`.

---

## 5. Versus comparison — two cards + VS divider

**Used for:** "A vs B" moments where divergence is the point.

**Components:**
- Two race-cards stacked (TECH on top, DOW on bottom — or whatever pair)
- Big italic gradient "VS" text between them (~156px, ink → muted-ink gradient)
- Each card has the same row structure: name + sub + pill + sparkline
- **Visual contrast carries the message:** winner is vibrant (green-tinted shadow, bold pill, fill gradient under sparkline), loser is muted (lower opacity, outlined pill, flat line)

**Animation (the choreography is the move):**
- Top card slides in from **LEFT** (`x: -1200 → 0`)
- VS pops in middle on the divergence keyword ("narrow", "diverge", "split")
- Bottom card slides in from **RIGHT** (`x: 1200 → 0`)
- VS pulses on the loser keyword ("lagged", "fell", "underperformed")

**Source:** 04-28 Beat 7 (TECH vs DOW). CSS classes `.race-card .race-pill .vs-divider`.

---

## 6. 3D-asset hero with cross-cutting (oil → sticky → fed pattern)

**Used for:** 5–7s beats covering multiple distinct concepts in sequence. The signature move.

**Components:**
- Dark navy gradient stage that **persists for the whole beat**
- Persistent eyebrow at top + 1–2 blurred glassy depth panels in BG corners (also persist)
- Hero PNGs generated via Higgsfield (chroma-keyed magenta), positioned absolute
- Each subject has a companion overlay (small pill, callout, label) that enters with it

**Animation (cross-cut pattern):**
- Subject A slides in from LEFT, lands center, holds with idle motion, exits to RIGHT
- Subject B rises UP from below, settles, accent text stamps in, exits UP + fades
- Subject C rises UP from below, accents (`?`s, callouts) pop on final keyword
- BG holds throughout — only the hero PROPS change

**Source:** 04-28 Beats 9–11 PRESSURE. CSS classes `.b9-bg-panel .b9-oil .b9-honey .b9-pillar .b9-q`. JS in `(function () { const start = 19.5; ... })()`.

**Asset gen:** see `step-5-asset-gen.md` and `../bloom-educational-video/references/higgsfield-prompts.md`.

---

## 7. Cracks chart shatter

**Used for:** Negative-tension moments. "Cracks under the surface", "fragile", "warning signs".

**Components:**
- White or off-white BG with subtle grid
- Ascending Bloom-blue chart line (animated draw-in)
- 5 anchor dots along the line
- 8–10 jagged crack polylines fanning outward from anchors (drawn via stroke-dashoffset)
- Red break-tick rectangles at each anchor
- Line shifts to dashed ink-color "broken" state after cracks fan
- Big italic "CRACKS" payoff word with red zigzag slash through it

**Source:** 04-28 Beat 8. CSS classes `.b8-line .b8-crack .b8-break .b8-h1 .b8-h1-slash`.

---

## 8. AI/Mag-7 coin wreath (Three.js)

**Used for:** Sector or basket-of-names moments. 5–7s beat with continuous slow rotation.

**Components:**
- Three.js scene with PMREM env-map (procedural canvas-drawn studio HDRI)
- Beveled cylinder coin geometry (lathe of rounded profile, 40 segments)
- Logo PNG textures applied to coin faces
- Hero coin (e.g. NVDA) larger + tinted accent color
- 7 ring coins around it
- Continuous slow Y-axis hover/wobble + camera dolly
- Procedural env-map gives reflective chrome look without external HDRI files

**Source:** 04-28 Beats 5–6. JS section labeled "BEATS 5+6 — AI EARNINGS 3D coin wreath".

**Use sparingly** — Three.js scene is heavy. One per video max.

---

## 9. Signal triplet — solid-color hero slams

**Used for:** Verdict / call-to-action moments at the end. "Bullish on X. Cautious on Y. Focused on Z."

**Components per slam:**
- Full-bleed solid color BG (`#01CD74` green / `#FFC847` yellow / `#1658FF` blue)
- Speed-line conic-gradient pseudo-element behind hero (subtle white rays from center)
- Tiny eyebrow at top ("THE BOTTOM LINE" — only on first slam)
- Big icon (↑ / ! / ⊙)
- Massive italic 160px stance word ("BULLISH" / "CAUTIOUS" / "FOCUSED")
- Text-shadow stack on the stance word for left-trailing motion blur
- Black target pill ("MEGA-CAP TECH" / "REST OF THE MARKET" / "OIL · EARNINGS · FED")
- Shimmer-sweep registry component pass on each stance word (~1.0s after entrance)

**Animation:**
- Each slam: 1.5–4s
- Slide in from RIGHT for the 2nd and 3rd slams (push-cut between them)

**Source:** 04-28 Beats 12 / 13 / 14. CSS classes `.signal-bg-bullish .signal-icon .signal-stance .signal-target`.

**Recurring (don't redesign):** these three slams together with Sign Off form the recurring outro. Same structure every day, only the verdict copy + target pill change.

---

## 10. Sign Off — Bloom logo + ECG pulse

**Used for:** Final 3.5s. Closes the video.

**Components:**
- Bloom-blue stage
- Bloom logo (or Bloomie character) hero, scales in
- Yellow ECG heartbeat line traces from left to right behind the logo (`stroke-dashoffset`)
- Massive "SEE YOU / TOMORROW." italic tagline
- "DAILY MARKET PULSE · BLOOM" thin pill at bottom

**Source:** 04-28 Beat 15. CSS classes `.so-stack .so-logo .so-pulse .so-tagline .so-host`.

**Recurring (don't change):** this is the brand sign-off. Same every day.

---

## Component classes summary

Reusable across days, each one already has CSS + JS in 04-28's `index.html`:

| Class | Purpose |
|---|---|
| `.idx-card` family | Rich ticker / index card (orb + name + price + pill + sparkline) |
| `.race-card` family | Versus comparison card (vibrant or muted variant) |
| `.b3-stamp` | Slammed red bordered stamp |
| `.b9-bg-panel` | Blurred glass depth panel for BG corners |
| `.signal-*` family | Solid-color hero slam |
| `.so-*` family | Sign Off composition |
| `.shimmer-sweep-target` | Registry component — light pass across text |
| `#grain-overlay` | Registry component — film grain |
