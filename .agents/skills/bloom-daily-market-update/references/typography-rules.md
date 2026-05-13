# Typography Rules (non-negotiable)

## Hard floor: 20px

**No text in any beat may be smaller than 20px on the rendered 1080×1920 canvas.** No exceptions for axis labels, footers, sub-captions, badges, decorative meta text — anything.

If a label has to be < 20px to fit, the label is cut, not shrunk. Either:
- The data point doesn't need a label (the visual conveys it)
- Make the container bigger so 20px+ fits
- Move the label inside a more readable form (e.g. an end-of-line tag instead of a tiny axis tick)

## No "garbage small text"

Even if it's ≥ 20px, don't add text that doesn't drive the story:

- ❌ Decorative meta footers like "OPEN +0.5% · RECORD HIGH" under a card already showing those numbers
- ❌ "Source: Bloomberg Terminal" type chrome
- ❌ Tiny tags / badges that fight with the hero element
- ❌ Sub-sub-labels nesting inside cards (e.g. "+8.40% · MTD · YTD vs S&P")
- ❌ Repeating the same info in a smaller form anywhere on screen

If a piece of text doesn't earn a clear "this drives the moment" answer, delete it.

## Hierarchy by size

| Tier | Range | Used for |
|---|---|---|
| **Hero** | 140–220px | Slammed words ("BULLISH", "STICKY", "RECORD HIGH"), index names ("TECH", "DOW", "NDX") |
| **Headline** | 80–130px | Card titles ("Tech vs Dow"), big numbers ("24,798.62") |
| **Label** | 36–60px | Pills ("+8.40%"), end-of-line tags, callout text |
| **Sub** | 22–32px | Sub-captions ("NDX · MTD"), Y-axis labels, secondary meta |
| **Floor** | 20px | Anything smaller is REMOVED, not shown |

## Display typography

- **Inter Tight 800 italic** for hero / headline / number tier
- **Inter 700** (regular weight, NOT italic) for sub / label tier
- **Letter-spacing**: tight on display (`-0.03em` to `-0.045em`), wide caps on labels (`0.20em` to `0.34em`)
- **No outline / stroke text effects** unless the bg requires it for contrast (e.g. yellow STICKY on white needed an ink stroke)

## Two-weight rhythm

This is the Hano-style move we adopted: **don't use uniform display 800 italic for an entire phrase**. Set up calm, slam the payoff:

- ✗ "TECH IS LEADING" — all 800 italic, monotonous
- ✓ "Tech is" (light setup 700) + "**LEADING**" (slam 800 italic) — rhythm

Apply to:
- Card titles ("Tech *vs* Dow" — italic 800 names, "vs" muted gray italic)
- Eyebrows + sub-headers
- Multi-line headlines ("RECORD" / "**HIGH**" stamp lands on second line)

## Color rules (typography-specific)

- **White on Bloom-blue, ink on white, ink on yellow, white on green** are the four "default" pairings
- **Red `#FF5252`** is reserved for negative state / alerts / divergence callouts (gap fill, RECORD stamp border, target-cross flash)
- **Yellow `#FFC847`** is reserved for "stuck/warning/sticky" moments — never decorative
- **Bloom blue eyebrow text** is OK on light backgrounds for top-of-frame labels

## Pill / badge sizing

| Element | Padding | Font |
|---|---|---|
| Eyebrow pill (top of frame) | `14px 32px` | 800 22–26px |
| Index pill (large, on rich card) | `16px 30px` | italic 800 46–60px |
| Sub-tag pill (smaller) | `12px 24px` | italic 800 36–42px |
| End-of-line tag (chart) | `28px 60px` rect, rx 30 | italic 800 36–38px |

If a pill requires text smaller than 36px, it's probably the wrong element — use plain text or a different pattern.

## Cap rule on small captions

You are allowed at most **TWO sub-tier (22–32px) text elements per beat**. More than that turns the beat into an infographic — a different format. Daily Market Update beats are kinetic, not data-dense.

Examples of beats that respect this:
- Beat 3 NDX/SPX cards: 1 hero ("NDX"), 1 sub ("NASDAQ 100"), 1 hero number ("24,798.62"), 1 pill ("+1.30%"). One sub-tier ("NASDAQ 100"). ✓
- Beat 7 TECH vs DOW: 1 hero ("TECH"), 1 sub ("NDX · MTD"), 1 pill ("+8.40%"). One sub-tier. ✓
- Beat 9–11 Pressure: hero asset (oil/honey/pillar), eyebrow ("THE OTHER STORY"), pill ("BRENT $93 ↑"). One sub-tier. ✓

## Quick test

Before committing a beat, scan it: every visible text element ≥ 20px? Every text element earning its place? If yes, ship. If not, cut.
