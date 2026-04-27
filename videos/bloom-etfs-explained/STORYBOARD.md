# Bloom ETFs Explained — Storyboard

Total: 44.5s. 8 beats. 1080×1920 portrait @ 30fps.

Master timeline (0.2s crossfades, alternating tracks 1/2):

| # | Beat | Track | Start | Dur | End | Bg |
|---|---|---|---|---|---|---|
| 1 | Hook | 1 | 0.00 | 5.10 | 5.10 | `#1658FF` |
| 2 | Concept | 2 | 4.90 | 6.20 | 11.10 | `#FFFFFF` |
| 3 | Examples (egg analogy) | 1 | 10.90 | 5.10 | 16.00 | `#1658FF` |
| 4 | Breakdown (3 cards) | 2 | 15.80 | 5.20 | 21.00 | `#FFFFFF` |
| 5 | Stat-reveal SPY/VOO/500 | 1 | 20.80 | 8.30 | 29.10 | `#F8F8F9` |
| 6 | Insight (3-word) | 2 | 28.90 | 5.05 | 33.95 | `#1658FF` |
| 7 | Stat-reveal dividends | 1 | 33.75 | 6.05 | 39.80 | `#FFFFFF` |
| 8 | Tease | 2 | 39.60 | 4.90 | 44.50 | `#1658FF` |

---

## BEAT 1 — Hook (blue, 5.10s)

**VO (abs 0.00→4.81):** "Picking individual stocks? It can be confusing, and seriously time consuming."

**Direction:** Bloom-blue background. Subtle Canvas 2D ticker tape scrolling vertically (8% white opacity, deterministic mulberry32 seed). White eyebrow pill top: "STOCK PICKING?". Center: large black headline badge with white Inter Tight 800 italic uppercase text "CONFUSING" (180px). The badge SLAMS in landing on `confusing` — anchor `landOn("confusing", 0.45)` with `back.out(1.7)`. Then a quick reaction wobble on `time consuming`. Below the badge a thin red squiggly underline draws via `stroke-dashoffset` on `consuming`. Idle: gentle 1.5° rotation yoyo on the badge.

**Anchors:** `confusing` (entrance), `time consuming` (reaction).

**Assets:** none external — pure CSS/SVG/Canvas.

---

## BEAT 2 — Concept (white, 6.20s)

**VO (abs 4.95→10.88):** "But ETFs make investing easy. An ETF is a bundle of stocks you can buy as one."

**Direction:** White bg. Two-line italic-caps headline center: line 1 dark `#1C2329` "ETFs ARE A" + line 2 in `#1658FF` larger "BUNDLE OF STOCKS" — clip-path wipe entrance landing on `bundle`. Below the headline, 4 logo orbs (dark `#1C2329` circles, 130px) cluster from spread positions and converge into a 2×2 grid landing on `as one`. Logos: AAPL, MSFT, NVDA, AMZN. Idle: subtle group breathe (scale 1.02 yoyo). Reaction: small bounce on `as one`.

**Anchors:** `bundle` (headline land), `as one` (orbs converge).

**Assets:** `../logos/AAPL.png`, `../logos/MSFT.png`, `../logos/NVDA.png`, `../logos/AMZN.png`.

---

## BEAT 3 — Examples / Egg analogy (blue, 5.10s)

**VO (abs 10.99→15.61):** "Think of it like grabbing a carton of eggs, instead of picking twelve, one at a time."

**Direction:** Bloom-blue bg. Left half: large 3D egg carton cutout (`../generated-assets/egg-carton.png`) slides in from left landing on `carton of eggs` (back.out spring), with idle 2° rocking. Right half: 12 single-egg PNGs (`../generated-assets/single-egg.png`) arranged in a 4×3 grid, fading and staggering in one-by-one (`stagger: 0.08`) landing across `twelve, one at a time` — one egg per word approximately. Eyebrow eyebrow "VS" badge in the gap. Reaction: carton scales 1.05 on the final word `time`.

**Anchors:** `carton of eggs` (carton entrance), `picking twelve` (grid stagger start), `at a time` (reaction).

**Assets:** `../generated-assets/egg-carton.png`, `../generated-assets/single-egg.png`.

---

## BEAT 4 — Breakdown (white, 5.20s)

**VO (abs 15.89→20.72):** "ETFs group stocks by industry, by location, or by company size."

**Direction:** White bg. Top eyebrow "GROUP BY" (uppercase, muted ink). Three black cards (`#1C2329`, rounded-rect 26px, padding 36px) stack vertically. Each card = inline-SVG icon left + 2-line italic-caps text right:
1. **INDUSTRY** — building/grid icon (`#1658FF`)
2. **LOCATION** — globe icon (`#01CD74`)
3. **COMPANY SIZE** — bar-chart with 3 ascending bars (`#EFC42C`)

Each card lands on its keyword (`industry`, `location`, `company size`) with from-x:120 + opacity:0 + ease back.out(1.6) duration 0.5. Each icon does a 360° spin idle once. Reaction: tiny scale 1.04 pulse on each keyword.

**Anchors:** `industry`, `by location`, `company size`.

**Assets:** none — inline SVG.

---

## BEAT 5 — Stat-reveal SPY / VOO / 500 (gray, 8.30s)

**VO (abs 20.85→28.81):** "Some ETFs even track the entire stock market, like SPY and VOO, which both follow the S and P 500."

**Direction:** Soft gray `#F8F8F9` bg. Top eyebrow "TRACKS THE WHOLE MARKET" + small green up-arrow. Center: two 200px dark `#1C2329` orbs side-by-side, SPY (left) and VOO (right) — each lands on its name. Below them: a black headline badge "S&P 500" (160px) lands on `S and P 500`. To the right of the badge, a counter animates 0 → 500 (Inter Tight 800 italic, 200px, blue `#1658FF`) using `landAfter("five hundred", 1.0)` — actually transcript word is `500.` so use `landAfter("the S and P 500", 1.4)`. Idle: orbs gentle bob. Reaction: small green sparkline draws across the bottom on the final number.

**Anchors:** `SPY` (left orb), `VOO` (right orb), `S and P 500` (badge + counter end).

**Assets:** `../logos/SPY.png`, `../logos/VOO.png`.

---

## BEAT 6 — Insight 3-word (blue, 5.05s)

**VO (abs 29.01→33.60):** "One purchase. Hundreds of stocks. Instant diversification."

**Direction:** Bloom-blue bg. Spinning yellow Bloom star (`../bloom-star.png`, 0.4 opacity, 600px, 30s rotation) center-back. Three sequential mini-badges slam in vertically, each landing on its phrase:
1. "ONE PURCHASE" lands on `One purchase`
2. "HUNDREDS OF STOCKS" lands on `Hundreds of stocks`
3. "INSTANT DIVERSIFICATION" lands on `Instant diversification`

Canvas 2D particle burst (deterministic mulberry32, 80 particles fanning outward) fires on the third phrase. Idle: each landed badge does a sine bob.

**Anchors:** `One purchase`, `Hundreds of stocks`, `Instant diversification`.

**Assets:** `../bloom-star.png`.

---

## BEAT 7 — Stat-reveal Dividends (white, 6.05s)

**VO (abs 33.78→39.53):** "And many ETFs also pay dividends, quarterly payouts, just for holding the shares."

**Direction:** White bg. Center-left: black headline badge "DIVIDENDS" (160px) lands on `dividends`. Below it, a small blue eyebrow "QUARTERLY PAYOUTS" lands on `quarterly payouts`. Center-right: stack of money (reuse `../generated-assets/money-stack.png`, 480px) slides in from right with bounce on `dividends`, then a subtle 4-coin SVG burst pops up from the stack on `payouts` (4 small `#01CD74` coin circles staggered). Below: green up-trending sparkline draws on `holding the shares`. Idle: money stack bobs y:-8 yoyo.

**Anchors:** `dividends`, `quarterly payouts`, `holding the shares`.

**Assets:** `../generated-assets/money-stack.png`.

---

## BEAT 8 — Tease (blue, 4.90s)

**VO (abs 39.73→44.01):** "Next, we'll break down how ETFs work, and what to watch out for."

**Direction:** Bloom-blue bg. Center: Bloom logo (`../bloom-logo.png`, 220px) scale-bounce in landing on `Next` with breathe idle. White eyebrow "NEXT LESSON" above. Black headline badge below logo: "HOW ETFs WORK" (140px) lands on `how ETFs work`. Bottom: animated SVG arrow drawing rightward via stroke-dashoffset on `watch out for`. Reaction: logo soft pulse on final `for`.

**Anchors:** `Next`, `how ETFs work`, `watch out for`.

**Assets:** `../bloom-logo.png`.

---

## Quick anchor uniqueness check

Scanned VO for repeats:
- `ETFs` — appears 5× (B2, B4, B5, B7, +"how ETFs work" B8) — never use alone, always with neighbor
- `the` — many times — never use alone
- `stocks` — 3× (`bundle of stocks` B2, `Hundreds of stocks` B6, `group stocks` B4) — always pair with neighbor
- `one` — 2× (`as one` B2, `One purchase` B6) — paired
- All chosen anchors above use 1-3 distinctive words and resolve uniquely within their beat slice ✓
