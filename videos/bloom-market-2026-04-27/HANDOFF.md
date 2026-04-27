# Bloom Daily Market Pulse — 2026-04-27 — Handoff

> **Context limit hit. Continuing in Codex.** This doc is self-contained so a fresh agent can pick up without reading the prior session.

---

## Where we are

A 57.5-second daily-market video composition exists at `videos/bloom-market-2026-04-27/index.html`. It lints clean (0 errors, 1 ignorable warning). Audio + 10 beats are wired to actual ElevenLabs word timings.

**Adjacent work that's already done and reusable:**

- [`videos/bloom-components-showreel/`](../bloom-components-showreel/) — 13-beat component reel, lints clean. The market video reuses every component proven there.
- [`videos/bloom-market-2026-04-26-proof/`](../bloom-market-2026-04-26-proof/) — Phase 1 cinematic gold-bar proof (recipe locked, see [LEFTOVER.md](../bloom-market-2026-04-26-proof/LEFTOVER.md)).
- [`.claude/plans/here-s-your-daily-market-eager-gem.md`](../../.claude/plans/here-s-your-daily-market-eager-gem.md) — original 5-phase plan.

---

## What user wants next (the pending work)

After reviewing the 57.5s market video, user said: *"I would like to do all of them. I want to impress a client by making something that could be posted on social media because it's so high quality."*

**"Them"** = the 8 upgrades I proposed (after dropping Mag 7 + VIX, which don't fit the recorded VO):

| # | Upgrade | Action | Beat affected |
|---|---|---|---|
| 1 | **Index Triplet** | REPLACE the single S&P PriceCard with three stacked mini-cards (SPY / NDX / DOW) | Beat 4 (15.0–22.0s) |
| 2 | **Crypto Pair Card** | REPLACE single BTC PriceCard with BTC (big) + ETH (small) stacked, + range bar `$77,500 ━●━ $80,100` inside BTC | Beat 5 (22.0–28.5s) |
| 3 | **Oil supply callout** | ADD red chip overlay `−10M BBL/D · SUPPLY` top-right of Oil 3D beat. Anchor: "ten million barrels a day" (~33–34s, beat-relative ~4.5–5.5s) | Beat 6 (28.5–38.0s) |
| 4 | **Sentiment trendline** | ADD multi-decade SVG line behind the big "49.8" number, ending at the floor in red. Communicates "we've been here before but never this low" | Beat 7 (38.0–42.5s) |
| 5 | **Polymarket-style odds bar** | REPLACE "99% / ODDS · NO CHANGE" text with a horizontal odds bar: 99% green (NO CHANGE) / 1% red (CUT), animated fill | Beat 8 (42.5–47.0s) |
| 6 | **Long/Short Ladder** | REPLACE two `plan-pill`s with a 2-column ladder. LEFT col "GO LONG" green (NDX SEMIS, BTC). RIGHT col "GO SHORT" red (OIL-SENSITIVE INDUSTRIALS) | Beat 9 (47.0–53.5s) |
| 7 | **Calendar tile** | APPEND to end of Action Plan beat. Black date chip `WED · APR 29` + label `CPI · WATCH`. Anchors to "Watch Wednesday's print" near 52s | Beat 9 (last ~1.5s) |
| 8 | **Sources strip** | ADD below the host pill in SignOff: tiny tracked-out caps `DATA · BLOOMBERG · CNBC · POLYMARKET`, fades in at start + 3.4s | Beat 10 (53.5–57.5s) |

User wants these all in one go to ship a "social-media-quality" piece.

---

## Approach already decided

- **Keep the 57.5s total duration locked** — narration is fixed at 56.796s.
- **Keep all current beat windows locked** — VO timing is anchored, don't shift.
- **Prefer in-place upgrades over new beats** — replace contents within an existing time window.
- **Edit the existing `index.html`** — don't write new files. Style → markup → JS, then lint.
- **Lint is the gate.** `npx hyperframes lint` must end with `0 error(s)`. The 1 warning about duplicate `img` discovery is a known false-positive from the BLOOM logo appearing in two beats — leave it.

---

## Visual register / brand rules (don't violate)

- **Bloom blue**: `#1658FF` (primary brand)
- **Ink**: `#1C2329` (text on white, signature black headline-badge fill)
- **White**: `#FFFFFF`
- **Soft surface**: `#F8F8F9`
- **Muted ink**: `#4A4F54`
- **Divider**: `#E8E9EA`
- **Success green**: `#01CD74` (gains, "GO LONG", odds-yes)
- **Error red** (for losses only): `#FF5252` — used for record-low badge, calendar urgency, odds-no
- **Yellow accent**: `#FFC847` (used for the radial pulse dot in MarketPulseOpen's date pill)
- **Typography**: Inter Tight 800 italic uppercase for all impact. Inter 600/700 for labels with `letter-spacing: 0.18em–0.42em`.
- **No emojis.** SVG icons are OK as functional UI affordances inside a price/UI mockup (e.g., the back-arrow / bell / check on the price card). They're emoji-equivalent only when used as decorative tags next to copy.
- **Bloom logo NEVER inside a circular orb.** Always standalone, with `filter: drop-shadow(...)`. Already enforced in MarketPulseOpen (#b1-logo) and SignOff (#b10-logo).
- **3D beats are now on white BG, not dark.** Subtle Bloom-blue radial behind the model, contact shadow CSS pseudo-element grounds the model, alpha:true canvas, fog disabled, lights toned down. Don't revert this.
- **For Oil + Pillar overlay text on white**: eyebrow → Bloom blue `#1658FF`, `$` → Bloom blue, big number → ink `#1C2329`, unit label → muted `#4A4F54`.

---

## Word-timing cheat sheet (already in `vo-words.json`)

The composition uses absolute time markers, not `landOn()`. But the new beats need to land on these phrases — pre-resolved:

| Phrase | Start | End | Used by |
|---|---|---|---|
| Monday April | 0.000 | 1.033 | Beat 1 |
| Pre-market | 2.368 | 2.972 | Beat 1 |
| Nasdaq up | 5.468 | 6.339 | Beat 2 |
| one percent | 6.676 | 7.512 | Beat 2 (counter lands) |
| Intel | 10.971 | 11.424 | Beat 3 |
| AMD up | 13.537 | 14.466 | Beat 3 |
| S and P | 15.488 | 16.161 | Beat 4 (Index Triplet kicker) |
| seven thousand one | 18.657 | 19.668 | Beat 4 (S&P value) |
| Bitcoin | 23.081 | 23.592 | Beat 5 |
| seventy-eight thousand | 24.010 | 25.264 | Beat 5 (BTC value) |
| Ethereum | 25.473 | 26.169 | Beat 5 (ETH card slides in) |
| war and oil | 29.025 | 30.407 | Beat 6 (badge slam) |
| Middle East | 31.010 | 31.591 | Beat 6 |
| ten million | ~33.0 | ~33.5 | Beat 6 (supply callout — beat-rel ~4.5s) |
| one hundred dollars | 35.956 | 37.082 | Beat 6 ($100 counter lands) |
| sentiment | 38.023 | 38.441 | Beat 7 |
| forty-nine | 40.554 | 41.134 | Beat 7 (49.8 lands) |
| Fed meets | 42.597 | 43.131 | Beat 8 |
| Ninety-nine percent | 44.199 | 45.117 | Beat 8 (odds bar fills to 99%) |
| Bulls bet | 47.160 | 47.694 | Beat 9 (eyebrow) |
| Semis lead | 49.134 | 49.958 | Beat 9 (long col reveal) |
| Wednesday's | (search "Wednesday") | — | Beat 9 (calendar tile) |
| See you tomorrow | 55.798 | 56.796 | Beat 10 |

Run this to resolve "Wednesday's print" timing:
```bash
cd C:/Users/User/git/bloom-hyperframes/videos/bloom-market-2026-04-27
node -e "const W=JSON.parse(require('fs').readFileSync('vo-words.json','utf8')); W.forEach((w,i)=>{if(w.w.toLowerCase().startsWith('wednesday')||w.w.toLowerCase().startsWith('print')||w.w.toLowerCase().startsWith('watch'))console.log(w.w, w.s, w.e);});"
```

---

## Recipes for each pending upgrade

### 1. Index Triplet (Beat 4, 15.0–22.0s)

Three stacked mini-cards on Bloom-blue BG. Each `880×220` with logo orb, ticker+name, sparkline middle, value+pill right.

**Data:**
- SPY · S&P 500 · `$7,165` · `+0.80%` · up
- NDX · NASDAQ · `24,798` · `+1.30%` · up
- DOW · DJI · `41,560` · `+0.30%` · up

**Animation:**
- All three cards stagger in 0.20–0.55s (anchor: `S and P` at +0.49s in beat)
- Sparklines `stroke-dashoffset` draw ~0.9–1.1s each, staggered
- Counter ramps for the SPY value lands on `seven thousand one` (+3.66s in beat)

Reuse `setupDraw(pathEl)` helper.

### 2. Crypto Pair Card (Beat 5, 22.0–28.5s)

Two cards on Bloom-blue BG, stacked vertically:

**BTC card (top)** — full-featured, `920×950`:
- Header: orange `#F7931A` orb with white `₿` glyph, name BITCOIN, exchange BTC · CRYPTO, green `▲ +2.34%` pill on the right
- Big price `$78,650` (counter ramps, lands on `seventy-eight thousand` end = +3.26s in beat)
- Sparkline drawing
- **Range bar** below: track `#E8E9EA`, fill is `linear-gradient(to right, #FF5252, #FFC847, #01CD74)` clipped to current %, white circular marker with 4px ink border at the current value. Labels `$77,500` / `$80,100` below at corners. Marker animates from 0 → ~57% (current $78,650 inside the $77.5K–$80.1K band).

**ETH card (bottom)** — single-row summary, `920×220`:
- Dark orb with white `Ξ` glyph
- ETHEREUM · ETH · CRYPTO
- `$3,247` · red `▼ −1.84%` pill
- Mini sparkline (descending)
- Slides in from right anchored to `Ethereum` (=+3.47s in beat)

### 3. Oil supply callout (Beat 6 overlay)

Add an absolute-positioned chip at top: `top: 130px; right: 56px;` z-index above the c3d-overlay.

```css
.c3d-callout {
  background: #FF5252; color: #fff;
  border-radius: 24px;
  padding: 18px 28px;
  box-shadow: 0 18px 36px rgba(255,82,82,0.32);
  opacity: 0; transform: scale(0.7);
}
.c3d-callout .num {
  font: italic 800 56px "Inter Tight",sans-serif;
  letter-spacing: -0.018em; line-height: 1;
}
.c3d-callout .lbl {
  font: 700 18px "Inter",sans-serif;
  letter-spacing: 0.32em; text-transform: uppercase;
  color: rgba(255,255,255,0.85);
  margin-top: 4px;
}
```

Animate at `start + 4.20` with `back.out(1.7)` ease, scale 0.7→1 + opacity 0→1 + x: 30→0. Anchor: `ten million` (~33s = beat-rel +4.5s).

### 4. Sentiment trendline (Beat 7 background layer)

SVG `viewBox="0 0 800 240"` placed `position: absolute` behind the big "49.8" number (z-index 1 vs number z-index 2).

Path with oscillating waves ending at the floor (the 49.8 dot):
```
M 0 100 C 30 90, 60 110, 100 80 C 140 50, 180 70, 220 110 C 260 150, 300 90, 340 70 C 380 50, 420 130, 460 100 C 500 70, 540 50, 580 90 C 620 130, 660 110, 700 150 C 740 190, 770 210, 800 220
```

Stroke `#E8E9EA` width 5. Add a final red `#FF5252` dot at (800, 220) with `r: 14`, `opacity: 0`.

Animate via `setupDraw()` then `tl.to("#b7-line", { strokeDashoffset: 0, duration: 1.6 }, start + 0.55)`. Final dot fades in at `start + 2.0` with a 1.5× scale pulse.

Add tiny axis labels: "1952" at left, "2026" at right, font-size 22, color `#4A4F54`.

### 5. Polymarket-style odds bar (Beat 8)

Replaces the existing `.c3d-bottom` for the pillar beat (or sits above it).

```css
.odds-bar {
  position: relative;
  width: 760px; height: 86px;
  background: #FFE5E5; /* CUT-side bg */
  border-radius: 999px;
  overflow: hidden;
  box-shadow: 0 14px 32px rgba(6,10,30,0.18);
  margin: 0 auto;
  opacity: 0;
}
.odds-fill {
  position: absolute; left: 0; top: 0; bottom: 0;
  width: 0%;  /* animate to 99% */
  background: #01CD74;
  border-radius: 999px 0 0 999px;
}
.odds-label {
  position: absolute; top: 50%; transform: translateY(-50%);
  font: italic 800 38px "Inter Tight",sans-serif;
  text-transform: uppercase; letter-spacing: -0.012em;
  color: #fff;
}
.odds-label.yes { left: 36px; }
.odds-label.no  { right: 36px; color: #FF5252; }
```

Markup:
```html
<div class="odds-bar" id="b8-odds">
  <div class="odds-fill" id="b8-fill"></div>
  <span class="odds-label yes">99% NO CHANGE</span>
  <span class="odds-label no">1% CUT</span>
</div>
```

Above the bar, a tiny eyebrow `POLYMARKET ODDS · FOMC THIS WEEK` in muted gray uppercase.

Animate fill from 0% → 99% lasting 0.9s, ending on `Ninety-nine percent` end (=+2.62s in beat). The bar wrap fades in 0.4s before the fill starts.

Note: keep the existing `c3d-eyebrow` and `c3d-badge` (FED) — only the bottom `c3d-bottom` block is replaced.

### 6. Long/Short Ladder (Beat 9, replace the 2 pills)

```css
.ladder {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  width: 920px;
}
.ladder-col {
  background: #fff;
  border-radius: 32px;
  padding: 36px 32px;
  box-shadow: 0 24px 60px rgba(6,10,30,0.30);
  display: flex; flex-direction: column;
  opacity: 0;
}
.ladder-header {
  font: italic 800 48px "Inter Tight",sans-serif;
  text-transform: uppercase; letter-spacing: -0.018em;
  margin-bottom: 18px;
  display: flex; align-items: center; gap: 10px;
}
.ladder-col.long .ladder-header  { color: #01CD74; }
.ladder-col.short .ladder-header { color: #FF5252; }
.ladder-row {
  font: italic 700 28px "Inter Tight",sans-serif;
  text-transform: uppercase; letter-spacing: -0.012em;
  color: #1C2329;
  padding: 14px 0;
  border-top: 1px solid #E8E9EA;
  display: flex; align-items: center; gap: 10px;
  opacity: 0;
}
.ladder-row:first-of-type { border-top: none; }
```

Markup:
```html
<div class="ladder">
  <div class="ladder-col long" id="b9-long">
    <div class="ladder-header">▲ GO LONG</div>
    <div class="ladder-row">NDX · SEMIS</div>
    <div class="ladder-row">BTC</div>
  </div>
  <div class="ladder-col short" id="b9-short">
    <div class="ladder-header">▼ GO SHORT</div>
    <div class="ladder-row">OIL-SENSITIVE<br/>INDUSTRIALS</div>
  </div>
</div>
```

Animation:
- Eyebrow `BULLS BET ON FED PAUSE` lands on `Bulls bet` (=+0.16s in beat)
- Long column slides in from left at +0.9s, ease back.out(1.5)
- Long rows stagger 0.12s
- Short column slides in from right at +2.1s (anchor `Semis lead`)
- Short rows stagger
- Ladder columns fade out at +5.0s in beat to make room for calendar tile

### 7. Calendar tile (Beat 9 tail)

Slide in over (or after) the ladder fades out. Anchor to `Wednesday's` (run the cheat-sheet script to get exact time).

```css
.cal-tile {
  display: inline-flex; align-items: center; gap: 26px;
  background: #fff; border-radius: 32px;
  padding: 28px 44px;
  box-shadow: 0 28px 64px rgba(6,10,30,0.30);
  opacity: 0;
}
.cal-day {
  display: flex; flex-direction: column; align-items: center;
  background: #1C2329; color: #fff;
  border-radius: 18px;
  padding: 14px 26px; min-width: 130px;
}
.cal-day-name {
  font: 700 22px "Inter",sans-serif;
  letter-spacing: 0.32em; text-transform: uppercase;
}
.cal-day-num {
  font: italic 800 64px "Inter Tight",sans-serif;
  letter-spacing: -0.025em; line-height: 1; margin-top: 4px;
}
.cal-event {
  font: italic 800 56px "Inter Tight",sans-serif;
  text-transform: uppercase; letter-spacing: -0.018em;
  color: #1C2329; line-height: 1;
}
.cal-sub {
  margin-top: 8px;
  font: 600 22px "Inter",sans-serif;
  letter-spacing: 0.28em; text-transform: uppercase;
  color: #4A4F54;
}
```

Markup:
```html
<div class="cal-tile" id="b9-cal">
  <div class="cal-day">
    <span class="cal-day-name">WED</span>
    <span class="cal-day-num">29</span>
  </div>
  <div class="cal-text">
    <div class="cal-event">CPI · INFLATION</div>
    <div class="cal-sub">WATCH THIS DATA</div>
  </div>
</div>
```

Animate: scale 0.85→1 + y 30→0 + opacity 0→1, duration 0.5, `back.out(1.7)`, anchored to `Wednesday's` start.

### 8. Sources strip (Beat 10 SignOff)

Add inside `.so-overlay`, below `#b10-host`:

```css
#beat-signoff .so-sources {
  margin-top: 22px;
  font: 600 18px "Inter",sans-serif;
  letter-spacing: 0.32em; text-transform: uppercase;
  color: rgba(255,255,255,0.55);
  display: inline-flex; gap: 14px; align-items: center;
  opacity: 0;
}
#beat-signoff .so-sources .dot {
  width: 4px; height: 4px; border-radius: 50%;
  background: rgba(255,255,255,0.35);
}
```

Markup:
```html
<div class="so-sources" id="b10-sources">
  DATA <span class="dot"></span> BLOOMBERG <span class="dot"></span> CNBC <span class="dot"></span> POLYMARKET
</div>
```

Animate: `tl.fromTo("#b10-sources", { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.4 }, start + 3.40);`

---

## Files to know

| File | Purpose |
|---|---|
| `index.html` | Production composition — what gets rendered to MP4 |
| `narration.mp3` | ElevenLabs VO (voice `JZ3e95uoTACVf6tXaaEi`, 30fps, 56.796s) |
| `transcript.json` | Full word-level timings (output of `generate-vo.mts`) |
| `vo-words.json` | Compact `{w,s,e}` array for inline scripting |
| `assets/studio.hdr` | HDRi for both 3D beats |
| `assets/models/oil-barrel.glb` | Meshy-textured oil barrel (~22 MB) |
| `assets/models/fed-pillar.glb` | Meshy-textured marble Doric column (~13 MB) |
| `assets/models/gold-bar.glb` | Inherited from proof project |
| `assets/logos/` | 28 ticker logos (BLOOM excluded from rotation) |
| `renders/` | MP4 output |

External:
- [`scripts/bloom-market-2026-04-27.json`](../../scripts/bloom-market-2026-04-27.json) — TTS source script
- [`generate-vo.mts`](../../generate-vo.mts) — ElevenLabs TTS generator (already run, don't re-run unless rewriting script)

---

## Critical session learnings (don't re-discover)

1. **Google blocks named real-people likenesses.** When you tried `nano-banana-pro` for "Apple CEO Tim Cook", the request was filtered with "violated Google's Generative AI Prohibited Use policy". The fix: prompt the **archetype** (older man, silver hair, navy sweater, neutral studio) and label them in the composition. Worked for the showreel CEO Quote beat with `tim-cook.png` (currently in showreel project, copy to this project if you want to add a CEO Quote beat here).
2. **`.envrc` doesn't load automatically.** Use `node --strip-types --env-file=.env generate-vo.mts <id>` exactly — the `--env-file=.env` is required.
3. **Lint warning `duplicate_media_discovery_risk` is informational.** Triggered by BLOOM logo appearing in MarketPulseOpen + SignOff. Ignore.
4. **3D beats are now on white BG**, not dark. Three.js: `alpha: true`, `setClearColor(0x000000, 0.0)`, `scene.fog = null`. Don't reintroduce fog or dark gradients.
5. **The `c3d::after` pseudo-element is the contact shadow** that grounds the 3D model on the white floor. Don't remove it.
6. **`landOn()` helpers are NOT used in this composition** — beat starts are absolute time literals (`const start = 22.0`). New animations should follow the same pattern. Keep the W array as a *reference* but don't wire `landOn()` per element — it's overkill for this scale and the lint surfaces ambiguity issues that the existing pattern avoids.
7. **`mover-card`'s `orb-fallback` works** when a logo doesn't exist (e.g., `INTC`, `AMD`). The `<img>` `onerror` handler swaps in a styled text span. Reuse this pattern for new cards.
8. **Bloom logo never inside a circle.** `.pulse-logo` and `.so-logo` use no background — just `<img>` with `filter: drop-shadow(...)`.
9. **Existing PriceCard CSS is `.pc-*`** prefix and lives in the file. The Index Triplet should NOT reuse `.pc-*` — use `.idx-*` to avoid leaking the full PriceCard styling onto small mini-cards.

---

## Verification gates

```bash
cd C:/Users/User/git/bloom-hyperframes/videos/bloom-market-2026-04-27

# 1. Lint must end with "0 error(s)"
npx hyperframes lint

# 2. Run preview (browser studio at http://localhost:3003)
npx hyperframes preview

# 3. Render — only after preview review passes
npx hyperframes render -q draft -o renders/market.mp4
# Estimated ~12 minutes for 57.5s at draft quality
```

**Acceptance**: every new beat lands its key animation on the spoken keyword (re-resolve via cheat-sheet). No visual ghosting between beats. Counters land cleanly. The 3D models read as premium product shots on white, not amateur 3D.

---

## Open questions for next session

1. After all 8 upgrades land, render at `-q draft` and review. If a beat feels too dense, simplify rather than re-shoot.
2. Should we generate INTC + AMD logos via Kie image to upgrade the text-fallback orbs in Beat 3 (Movers)? Probably yes for "social-media-quality" polish.
3. Add a CEO Quote beat for Powell? The Pillar beat could be enriched with a Powell portrait + "Inflation remains above target." quote, similar to the showreel's Tim Cook treatment. Would need another Kie portrait gen with the archetype-prompt trick.
4. Music bed? Currently silent under VO. Bloom's design-system says "no underscore music for short-form (45–90s)" — narration + room tone is the rule. So leave silent.
5. After this video lands, formalize as the `bloom-daily-market-update` skill (Phase 3 of the original plan). All proven components live in this file + the showreel — extracting them is the skill scaffolding work.

---

## Quick start for the next agent

```bash
cd C:/Users/User/git/bloom-hyperframes/videos/bloom-market-2026-04-27
npx hyperframes lint                  # confirm baseline is clean
npx hyperframes preview               # http://localhost:3003 — review current state
# Then implement upgrades 1–8 in any order. Recommended order (small → big):
#   8 (Sources), 3 (Oil callout), 7 (Calendar), 5 (Odds bar),
#   4 (Sentiment trendline), 6 (Long/Short Ladder), 1 (Index Triplet), 2 (Crypto Pair).
```
