# Bloom Brand Cheat Sheet (FROZEN)

Bloom is an investing app for new investors aged 13+, owned by Bloom Investment Advisers. Brand identity is bold, playful, Gen-Z fintech — confident but warm.

## Colors

- **Primary Brand Blue:** `#1658FF` — hero backgrounds, CTAs, key accents
- **Ink / Near-Black:** `#1C2329` — text on white, the signature headline-badge fill
- **White:** `#FFFFFF` — dominant surface color
- **Soft Surface:** `#F8F8F9` — alternating section background, subtle contrast
- **Muted Ink:** `#4A4F54` — secondary body copy
- **Divider:** `#E8E9EA` — card borders, hairlines
- **Success Green:** `#01CD74` — rewards, positive stats, secondary accent
- **System Yellow:** `#EFC42C` — Bloom star badge, trophy accents

## Typography

- **Inter Tight** (700/800, italic, uppercase) — signature headline style. Lives inside the black rounded-rect badge. Tracking tight (`-0.012em` to `-0.02em`), no stroke. Used for all major impact text.
- **Inter** (500/700, regular case) — section subheads (28-44px), body copy (18-22px)
- **Inter** (400) — supporting paragraph copy, muted gray
- Sizing rule: this is VIDEO not web. **Headlines 100-200px**, body 36px+. Never below 36px.

## The signature component: the Black Headline Badge

Black rounded-rect (`background: #1C2329`, `border-radius: 26px`) with white **Inter Tight 800 italic caps** text inside, generous padding. Soft shadow `0 24px 60px rgba(6,10,30,0.28)`.

```css
.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #1c2329;
  color: #fff;
  border-radius: 26px;
  box-shadow: 0 24px 60px rgba(6,10,30,0.28);
}
.badge-text {
  font-family: "Inter Tight", system-ui, sans-serif;
  font-weight: 800;
  font-style: italic;
  text-transform: uppercase;
  letter-spacing: -0.012em;
  line-height: 0.95;
  color: #fff;
}
```

This is Bloom's most recognizable visual handshake — use it for every major headline. Sizes vary 70-200px depending on word length.

## Other components

- **Logo orb / chip:** circular badge containing a brand logo. **Background must be dark (`#1C2329`)** so white-on-transparent logos like AAPL render visibly. Box-shadow soft and subtle.
- **iPhone mockup:** captured Bloom mockup PNG (with real device frame and shadow) overlaid with HTML/CSS UI inside, OR Higgsfield i2i-generated 3D iPhone (chroma-keyed from magenta). Real-photo-feel device frame is non-negotiable.
- **CTA pill:** `border-radius: 300px` (full pill), black fill `#1C2329`, white Inter Tight 800 italic caps text
- **Stat callout:** huge numeral (Inter Tight 800 italic, 180-220px), small uppercase label below in `Inter 600` with `letter-spacing: 0.22em`
- **Ticker tape (Canvas 2D):** subtle stock symbols scrolling vertically over Bloom blue, 8-15% opacity. Round y-coords to integers to prevent jitter. Slow scroll (~20 px/s).

## Do's

- Use the **black headline badge** for every impact moment. It's the brand's strongest visual handshake.
- Keep hero backgrounds solid `#1658FF` — no gradients on the primary blue
- Pair every claim with either a **logo / mockup / illustration** — never just typography for product proof
- Use `#01CD74` green for rewards, positive stats, confirmation moments
- Lean on generous whitespace in feature sections — Bloom's layout breathes

## Don'ts

- **Never use emojis OR emoji-equivalent icons.** Drop them — don't substitute, don't replace. The dividing line: a logo is OK when it IS the subject of the beat (Apple logo when the beat is about Apple); it's emoji-equivalent when it's a decorative tag next to text (X/Twitter bird in a quote card, Apple logo as a corner flair, lightning bolts/sparkles/fire/checkmarks-in-circles as flair). Source-text emojis (`Mom 💝` → `Mom`; `@cryptobro 🐦` → `@cryptobro`) are noise — strip them, don't replace with cute SVG. If a "social media post" needs platform context, do it through layout (notification card, @handle, timestamp), never a brand icon.
- **No gradients on the brand blue** — solid fill only
- **No more than one `#1658FF` panel per scene** — the blue is meant to dominate, not repeat
- **No red/orange decorative accents** — Bloom's palette is blue + black + green. Red reads as "loss/error" only (e.g., a down sparkline).
- **No light containers for white-on-transparent ticker logos** (AAPL, MSFT, NFLX) — they vanish. Use `#1C2329` containers.
- **No Duolingo-style cartoon mascots** — keep characters out unless they're real Bloom mascot art

## Audio direction

- Voice: ElevenLabs v3 (`eleven_v3`), voice ID `JZ3e95uoTACVf6tXaaEi`
- Register: warm, energetic, confident — Gen-Z trusted-older-sibling. Short sentences, clear pauses.
- No underscore music for short-form (45-90s). Voice + room tone is enough at this length.

## Asset library locations

- **Stock logos:** `hyperframes/assets/logos/<TICKER>.png` — 29 tickers (AAPL, AMZN, BLOOM, COST, DIS, GOOGL, IBM, JPM, KO, MCD, META, MRNA, MSFT, NFLX, NKE, NOW, NVDA, PEP, QQQ, SAVE, SBUX, SPY, TSLA, TXN, V, VOO, WMT, ADNOC, POWERBI). Always copy needed logos into project-local `videos/<project>/logos/` for the renderer.
- **Bloom marks:** `bloom-logo.png` (the flower icon), `bloom-star.png` (yellow 4-point star with cross center)
- **3D-lite asset library:** generated as needed via the Higgsfield MCP `gpt_image_2` model with the chunky-3D-lite prompt template (see `references/higgsfield-prompts.md`)
- **Bloom UI mockup references:** `videos/bloomapp-promo/capture/assets/690ba8a8c56264654608fd99-mock-cta-p-1080.png` (and similar) — upload via `mcp__higgsfield__media_upload` and pass the resulting UUIDs in `medias` for i2i style refs when generating new "Bloom showing X" mockups
