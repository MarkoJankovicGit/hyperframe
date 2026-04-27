# Kie Prompt Templates

Copy-and-adapt prompts for the Kie GPT Image 2 pipeline. Each one ends with the **Bloom premium 3D block** for visual consistency.

## North-star reference — Bloom uses TWO distinct visual registers

**Before generating anything, view the canonical examples in [`style-references/`](./style-references/) — particularly `podium.png`, `grad-cap-book.png`, `wallet-chart.png`, `piggy-bank.png` (Register A), and `safe-chart.png` (Register B).** These are the visual anchors. Regenerate if your output doesn't share their traits.

Looking at official Bloom marketing assets (bloomapp.com hero cards and feature illustrations), there are **two clean visual registers** that don't mix. Pick one per asset based on what the beat is showing.

### Register A — App-icon 3D-lite (for METAPHORS / CONCEPTS)
**Use for:** abstract feature illustrations — competition (podium), learning (grad cap), safety (shield), savings (piggy bank), portfolio (wallet), time (hourglass), growth (chart card).

**Visual traits:**
- Chunky 3D-rendered objects with soft rounded edges
- Saturated vibrant palette: yellow, red, soft pink, electric blue (#1658FF), mint green (#01CD74)
- Soft directional studio lighting from upper-left + soft drop shadows
- Toy-like / "squishy" proportions — exaggerated, simplified, never sharp angles
- Gradient shading does all the work — NO outlines, NO flat fills, NO grunge
- Single hero subject OR cleanly composed multi-object scene (e.g. wallet + chart card + checkmark grouped as ONE composition)
- Object IS the metaphor — podium = competition, grad cap = learning, wallet = portfolio

**Reference assets we already have (all in `bloomapp-promo/capture/assets/`):**
- `icon-bloomie.png` — Bloomie character mascot
- `icon-portfolio.png` — donut chart
- `icon-learning.png` — book with sparkles (small icon)
- `icon-tournament.svg`, `icon-oink.svg`, `icon-chest.svg` — small 3D icons

**Reference assets we generated that nailed this register:**
- `bloom-investing-myths/generated-assets/piggy-bank.png` — vibrant blue piggy
- `bloom-investing-myths/generated-assets/shield.png` — gold-trim shield
- `bloom-investing-myths/generated-assets/vault.png` — vault with dial

**Closest external references:** App Store featured-app icons, Notion's 3D illustration system, Lottiefiles 3D pack, Stripe Atlas 3D illustrations.

### Register B — Photorealistic 3D iPhone mockup (for PRODUCT)
**Use for:** showing the actual Bloom app screens — portfolio shots, "It's a Match!" moments, in-app UI demos, CTAs.

**Visual traits:**
- Photorealistic iPhone Pro device — titanium silver frame, glass reflections, realistic specular highlights
- Tilted at casual perspective angle (3/4 view, never straight-on)
- Soft realistic drop shadow underneath
- Phone fills 75-80% of canvas vertically
- Inside the screen: sharp pixel-perfect deep electric blue UI

**Reference assets we already have:**
- `mockup-cta.png` (and -p-1080, -p-1600 variants) — single iPhone with portfolio
- `mockup-safe.png` — two phones overlapping showing different screens

**Reference asset we generated that nailed this register:**
- `bloom-investing-myths/generated-assets/safe-chart.png` — iPhone with $24,231 portfolio

### ⚠ Register C — Pixar character render (USE SPARINGLY)
**Status:** technically works but is **off-brand** for Bloom. Bloom's actual brand shows real people via app screenshots (the "It's a Match!" card has a person photo, not a 3D character). So character renders are a fall-back only.

**Reference assets we generated in this register:**
- `boomer-guy.png`, `money-mountain.png`, `busy-character.png`, `roller-coaster.png` — work for myth-busting beats but feel slightly different from Bloom's icon-3D world
- `char-guy.png`, `char-girl.png`, `char-pro.png` — Pixar-quality but doesn't match Bloom's visual language

**When to use:** only when (a) the beat absolutely requires a character and (b) showing a Bloom app screen with a person isn't a viable alternative. Default first to Register A or B.

### Decision tree per beat
1. **Showing a metaphor / concept?** → Register A (app-icon 3D-lite)
2. **Showing the actual product?** → Register B (iPhone mockup)
3. **Showing a person?** → First try Register B with a real-person screenshot inside the phone. If that won't work, fall back to Register C with caution.

What killed the bloom-investing-myths v1 assets: **metaphor mash-ups** (hourglass + tree, dollar + seedling, MYTH-stamp baked into roller-coaster), **grids of 6 too cramped to be hero assets**, **6× tiny avatars in one image** when we needed 3 hero characters, and **mixing all three registers in one video** without clear intent.

## The Bloom premium 3D block (always include)

Append to every prompt that targets Register A (app-icon 3D-lite):

> Chunky 3D-lite iOS app-icon aesthetic — soft rounded forms, toy-like squishy proportions (exaggerated, simplified, never sharp angles), gradient shading across surfaces, soft realistic studio lighting from upper-left, soft drop shadows underneath. Saturated vibrant palette: warm yellow, soft pink, saturated red, electric Bloom blue #1658FF, mint green #01CD74. Premium Apple-Keynote-product-shot polish, like a polished App Store featured-app icon. NO line-art outlines, NO flat fills, NO grunge or distressed textures, NO badges, NO stamps, NO text labels, NO speech bubbles, NO embedded captions. Background is uniform pure magenta #FF00FF (255,0,255) flat for chroma keying — no gradient, no noise, no shadow on the magenta. Magenta MUST NOT appear inside the subject.

## Pattern 1 — Sprite sheet of 3 single-subject objects (DEFAULT)

**Default to 3 per sheet, not 6.** Vertical canvas (1080×1920) splits cleaner with 3 columns; each cell ends up roughly portrait (16:27), the right shape for hero objects or full-body characters. Going to 6 makes each cell a narrow strip, drops quality, and forces the model to crowd subjects together.

```
A clean product sheet layout: 3 separate single-subject 3D objects, arranged in a single horizontal row with generous empty space between each object, on a uniform pure magenta #FF00FF background. From left to right: (1) <object 1>; (2) <object 2>; (3) <object 3>. Each object is fully isolated and centered in its own zone, NO overlap, NO grouping, NO labels, NO text, NO badges. Treat each object as a standalone asset that could be cut out separately.

[Bloom premium 3D block]
```

Then split:

```bash
python split-sheet.py "<URL>" --bg magenta --names item1 item2 item3
```

**Single-subject hard rule:** Each cell must be ONE object. No "X with Y on top" or "X holding Y" compounds — those get baked into a single asset and lose their narrative use. If you need to show "money grows over time," that's animation work (scale-up, elastic bounce, sparkline draw), not asset work.

**Examples that work:**
- `(1) a single crisp folded $1 bill, viewed from a slight angle; (2) a glossy 3D vault door with circular dial; (3) a cute 3D piggy bank in vibrant blue`
- `(1) a clean modern smartphone with dark screen; (2) a classic red aluminum soda can; (3) a white athletic sneaker viewed from the side`

**Examples that DON'T work** (compound mash-ups — animate the relationship instead):
- ❌ "A dollar bill with a green seedling growing through it"
- ❌ "An hourglass with a tree growing inside the lower bulb"
- ❌ "A roller coaster with a MYTH stamp next to it"

## Pattern 2 — Sprite sheet of 3 hero characters

For "users / customers / people" beats, generate **3 separate hero characters** in one call, then animate them in sequence. Never use a 4×3 grid of tiny avatars — that reads as a contact sheet, not a hero illustration.

```
A clean character sheet: 3 separate full-body young people in casual confident poses, arranged in a single horizontal row with generous empty space between each character, on a uniform pure magenta #FF00FF background. From left to right: (1) <character 1 — age, look, prop, pose>; (2) <character 2>; (3) <character 3>. Each character is fully isolated and centered in its own zone, NO overlap, NO grouping, NO crowd, NO speech bubbles. Treat each character as a standalone asset that could be cut out separately.

[Bloom premium 3D block — emphasize Pixar-quality 3D character render]
```

**Animate them in separately** (entrance per character, staggered around the keyword they reinforce). Don't position them in a static row — give each its own beat.

## Pattern 3 — 3D iPhone with custom Bloom UI inside (i2i)

For payoff/portfolio/CTA scenes. Use **image-to-image** with 2-3 captured Bloom mockups as style refs.

```
The reference images show the Bloom app's photorealistic 3D iPhone mockup style with deep electric blue UI inside. Use this 3D mockup style as inspiration.

OUTPUT FORMAT (strict):
- Vertical 9:16 canvas
- The ENTIRE BACKGROUND outside the iPhone must be a uniform bright pure magenta #FF00FF (255,0,255). Flat, no gradient, no noise, no shadow on the magenta. This magenta will be chroma-keyed out — it must NEVER appear inside the iPhone or anywhere on its screen content.
- A photorealistic 3D iPhone Pro mockup centered on the magenta canvas, tilted at a casual perspective angle similar to the reference images. Titanium silver frame. Realistic glass reflection. Soft realistic drop shadow underneath. The phone fills approx 75-80% of the canvas vertically.

INSIDE THE PHONE SCREEN — Bloom <SCREEN PURPOSE> UI:
- Background: deep electric blue #1658FF
- Status bar at top: '9:41' on the left, white wifi/signal/battery icons on the right
- Header below status: '<HEADER COPY>' in white Inter Tight 800 italic uppercase, ~80px, left-aligned with padding
- <Body content description with specific data, e.g. 4 cards with logo + ticker + percent>

Sharp pixel-perfect text rendering inside the screen. Crisp UI. Photorealistic device. Premium product photography feel.
```

Pass these refs as `--input-files`:
- `hyperframes/videos/bloomapp-promo/capture/assets/690ba8a8c56264654608fd99-mock-cta-p-1080.png`
- `hyperframes/videos/bloomapp-promo/capture/assets/690ba188fa21cc9a599feb66-mockup-safe-p-8.png`

## Pattern 4 — Single illustration cutout (one-off)

For one-off single objects when 3 isn't enough variety to justify a sheet. Same single-subject rule.

```
A single <SUBJECT DESCRIPTION>, centered on a pure magenta #FF00FF background. The subject occupies ~75% of the frame. No other elements, no text, no embedded labels.

[Bloom premium 3D block]
```

## Pattern 5 — Mini chart / candlestick / line graph

Use **inline SVG** for charts, not Kie generation. SVG is sharper, animatable via stroke-dashoffset, and consistent with Bloom's vector aesthetic.

```html
<svg viewBox="0 0 720 220">
  <path class="chart-line" d="M 20 170 L 90 150 L 160 175 L 230 130 L 300 145 L 370 110 L 440 85 L 510 105 L 580 60 L 650 40 L 700 25"
        stroke="#01cd74" stroke-width="6" fill="none"
        stroke-linecap="round" stroke-linejoin="round"
        style="stroke-dasharray:1400; stroke-dashoffset:1400;"/>
</svg>
```

```js
tl.to(".chart-line", { strokeDashoffset: 0, duration: 1.6, ease: "power2.inOut" }, ANIM_START);
```

## Common pitfalls

- **Don't strip functional features when avoiding text.** "No numerals or hands on the clock" → got a clock with no hands → no longer reads as a clock. Hands are geometric shapes, not text. Be specific: "no numerals (only dot indicators), but include clear clock hands". Apply the same rule to any functional object — keep the shapes that make it recognizably the thing it is, only strip actual *letterforms*.
- **Don't compound metaphors into one asset.** "Dollar with seedling growing through it" feels stock-illustration cheesy. Show a clean dollar, animate growth via scale + sparkline.
- **Don't go to 6 subjects per sheet.** 3 is the sweet spot for premium quality and clean splitting. 6 = cramped, lower quality, items merge.
- **Don't make a contact sheet of avatars** when you need a hero crowd. Generate 3 distinct hero characters and animate each in separately.
- **Don't say "EXACTLY preserve" in i2i** — diffusion regenerates the whole image. Use refs as style inspiration only.
- **Don't request white background for chroma keying** — many subjects have white in them, and the model often adds subtle gradients. Magenta is uniform and absent from real objects.
- **Don't render brand text or logos via Kie** — the model misspells or invents brand marks. Use the captured logo PNG and overlay via HTML/CSS.
- **Don't bake decorative metadata into assets** — no MYTH stamps inside images, no FACT badges, no labels. Use pure HTML/CSS for stamps and badges so they're animatable, recolorable, and don't lock visual treatment per image.
- **Don't put bloom-logo.png inside the dark `#1C2329` company-stock orb.** That orb is for non-Bloom companies (AAPL, NFLX, etc.) where the white-on-transparent ticker logo needs a dark backdrop to be visible. Bloom's blue flower icon stands on its own — show it natively without a wrapper.
- **Don't overload the prompt** — 200-400 words max. The Bloom premium 3D block is the constant; the subject description is the variable.

## Cost / time

- ~$0.04 per Kie call × 2 calls = $0.08 for 6 assets
- ~30-90s per call
- Compared to per-asset: 3× faster, 3× cheaper, much more consistent visual style across a video (one model state generates all assets in a sheet)
