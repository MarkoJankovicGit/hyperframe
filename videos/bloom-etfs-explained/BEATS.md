# Bloom ETFs Explained — Beat Plan

8 beats. ~45-55s.

| # | Beat | Bg | VO line | Anchor phrase(s) | Duration target |
|---|---|---|---|---|---|
| 1 | Hook | `#1658FF` blue | "Picking individual stocks? It can be confusing, and seriously time consuming." | `confusing` | 4.5-5.5s |
| 2 | Concept | `#FFFFFF` white | "But ETFs make investing easy. An ETF is a bundle of stocks you can buy as one." | `ETF is a bundle`, `as one` | 6.5-7.5s |
| 3 | Examples (analogy) | `#1658FF` blue | "Think of it like grabbing a carton of eggs, instead of picking twelve, one at a time." | `carton of eggs`, `twelve one at a time` | 6-7s |
| 4 | Breakdown (3 cards) | `#FFFFFF` white | "ETFs group stocks by industry, by location, or by company size." | `industry`, `location`, `company size` | 5.5-6.5s |
| 5 | Stat-reveal + brand logos | `#F8F8F9` gray | "Some ETFs even track the entire stock market, like SPY and VOO, which both follow the S and P 500." | `SPY and VOO`, `S and P 500` | 7-8s |
| 6 | Insight (3-word) | `#1658FF` blue | "One purchase. Hundreds of stocks. Instant diversification." | `One purchase`, `Hundreds of stocks`, `Instant diversification` | 4-5s |
| 7 | Stat-reveal (dividends) | `#FFFFFF` white | "And many ETFs also pay dividends, quarterly payouts, just for holding the shares." | `dividends`, `quarterly payouts` | 6-7s |
| 8 | Tease | `#1658FF` blue | "Next, we'll break down how ETFs work, and what to watch out for." | `how ETFs work`, `watch out for` | 4.5-5.5s |

## Validation
- ✅ Hook first, Tease last
- ✅ BG alternation: blue / white / blue / white / gray / blue / white / blue
- ✅ 8 beats (within 4-13)
- ✅ Avg ~5.5s per beat
- ✅ No emojis in narration
- ✅ Stat-comparison rule: only one true Stat-reveal pair (none here, two solo stat moments OK with different scaffolds)

## Asset plan
- B1 (Hook): Bloom blue + canvas ticker tape + black headline badge "CONFUSING"
- B2 (Concept): white bg + big italic-caps headline "ETF = BUNDLE OF STOCKS" + 4 ticker logo orbs (AAPL/MSFT/NVDA/AMZN) clustering into a single big basket-like card
- B3 (Examples/analogy): blue bg + 3D egg carton illustration (Kie generate) + 12 individual eggs vs 1 carton split visual
- B4 (Breakdown): white bg + 3 black cards (SVG icons: industry-building, globe, scale)
- B5 (Stat-reveal+logos): soft gray + counter "500" companies + SPY logo orb + VOO logo orb on dark `#1C2329` orbs
- B6 (Insight 3-word): blue bg + spinning yellow Bloom star + 3 sequential mini-badges + canvas particle burst
- B7 (Stat-reveal dividends): white bg + green up-trending sparkline + counter pulsing "$" coins + "QUARTERLY" eyebrow
- B8 (Tease): Bloom logo center + "NEXT LESSON" + black headline badge "HOW ETFs WORK" + animated SVG arrow drawing

## Assets to generate via Kie
- `egg-carton.png` — single 3D-lite full carton of eggs (Register A, magenta bg)
- `single-egg.png` — single 3D-lite egg (for the "twelve individually" comparison)
- `coin-stack.png` — small 3D coin stack for dividends beat (or reuse from prior project)

Will check existing `bloom-investing-myths/generated-assets/` and `bloomapp-promo/generated-assets/` for reusables before generating.
