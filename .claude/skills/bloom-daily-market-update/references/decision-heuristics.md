# Decision Heuristics — what to reach for when

These are NUDGES, not templates. The AI is free to invent something better for any given script line. But when in doubt, these are moves we know land.

## Read the script for visual signals

Scan today's narration for these cues. When you spot one, the right-column move is a strong default.

| Script signal | Suggested move | Reference |
|---|---|---|
| **Stock or index named with a % change** ("Nasdaq up 1.3%", "SPY +0.8%", "Bitcoin 78,650") | Rich ticker card: dark logo orb + ticker name + sub-label + big italic number + green/red pill + sparkline. Animate counter from 0 → final value. Sparkline draws via `stroke-dashoffset`. | `videos/bloom-market-2026-04-28` Beat 3 (NDX/SPX cards) |
| **Real-world concept named** (oil, gold, the Fed, a building, a chip, a drug, a country) | Generate 3D PNG asset via Higgsfield (magenta-key, chroma-key out via ffmpeg). Slide in from a side, hold, slide out the other way. | 04-28 Beats 9–11 (oil barrel, honey blob, fed pillar) |
| **Comparison: A vs B** ("Tech leading, Dow lagging", "Bonds vs equities") | Two cards stacked. A slides in from LEFT, B slides in from RIGHT. Big italic "VS" between them. Visual contrast does the work (vibrant + animated for winner, muted + flat for loser). | 04-28 Beat 7 (TECH vs DOW) |
| **Divergence / gap mentioned** ("rally is narrow", "gap widening", "decoupling") | Two-line chart on shared axes with red shaded wedge between them. End-of-line tags. The gap area IS the message. | Reference frame in `refs/ref_race_v2.png` |
| **Verdict / signal / call to action** ("bullish on tech", "cautious on small caps", "watch the Fed") | Solid color full-bleed slam (Bloom green / yellow / blue) + huge italic word + small target pill. Speed-line bg, text-shadow trail for motion blur. | 04-28 Beats 12–14 (BULLISH / CAUTIOUS / FOCUSED) |
| **"Record high", "fresh ATH", "all-time high"** | Slammed bordered red stamp, slight tilt, in/out beat. **Fold into adjacent beat** if standalone moment is < 1.5s. | 04-28 RECORD HIGH (folded into Beat 3 Tickers) |
| **Sector / Mag-7 / basket of names** ("AI earnings drove gains", "semis pumping") | Real PNG company logos arranged in a constellation OR a 3D coin wreath (Three.js) with company logos as textures. NVDA tinted hero, others as supporting cast. | 04-28 Beats 5–6 (AI Earnings coin wreath) |
| **Negative shock / cracks / breakage** ("looks fragile", "warning signs", "concerns") | Rising chart line + cracks fanning out from anchor points (jagged SVG paths drawing outward) + red break ticks + payoff headline. | 04-28 Beat 8 (CRACKS) |
| **Opener** ("Today's market in 30s", "Here's your daily pulse") | Bloom-blue stage with scrolling-orb canvas BG + black date pill + huge italic headline + small "DAILY PULSE · BLOOM" tag. | 04-28 Beat 1 (Title) |
| **Sign-off** ("See you tomorrow", "That's your daily pulse") | Bloom-blue + Bloomie logo + ECG heartbeat pulse line + tagline. | 04-28 Beat 15 (Sign Off) |

## When the script doesn't fit the table

**Invent freely.** The vocabulary above is a starter set, not a constraint. If today's narration introduces a concept the table doesn't cover (e.g. "VIX spiked", "IPO calendar full", "options flow turned bearish"), design something new.

After designing, write a one-line entry in [`PROMOTIONS.md`](../PROMOTIONS.md) so the move can be promoted into the vocabulary if it's reused.

## Anti-patterns (don't do this)

These came up during iteration. Avoid:

- ❌ **Repetitive card patterns across beats**. If Beat 3 used rich ticker cards, don't have Beat 7 also use rich ticker cards UNLESS the contrast (e.g. green vs muted) is doing real work.
- ❌ **Generic "+X%" pills as the entire visual** — these only earn their place inside a richer card. Standalone pills feel weak.
- ❌ **Eyebrow pills repeated in every beat** ("PRE-MARKET · FUTURES" → "TALE OF TWO INDICES" → "INFLATION OUTLOOK" → ...). Use them sparingly. Sometimes the visual carries the moment without needing a header.
- ❌ **Solid-color hero slams without any depth** (no speed lines, no BG panels, no shimmer pass). Pure flat color reads as "filler."
- ❌ **2.5D perspective tilts on cards with right-edge content** (the green pill clipped off-frame in v8). If you tilt, content has to fit even at max rotation.
- ❌ **Charts in cards that don't fill the card** (the v6 RACE beat — chart only used 30% of card space, looked empty). Either make the chart fill the card or drop the card chrome.

## Cohesion across the day

Within a single video, you have ~8–16 beats and need them to feel like ONE piece. Apply some cohesion:

- **Reuse 2–3 card classes** across multiple beats (e.g. `idx-card` for Beat 3 + Beat 5, OR a custom card class repeated in 3 places). Don't invent a new card class for every beat.
- **Use the same eyebrow style** when eyebrows do appear.
- **Use the same Higgsfield asset style** for all 3D shots in one video (all magenta-key, similar lighting, similar palette).
- **One accent color per beat is enough** — don't pile on multiple highlight colors in a single shot.

## Cohesion across the format

Across days (week-over-week), the visuals should feel "Bloom Daily" branded. The recurring beats — Title, Sign Off, signal triplet — should look basically the same every day. Only the data inside changes.

The middle (Beats 3–14) is where creativity lives — those vary day to day.
