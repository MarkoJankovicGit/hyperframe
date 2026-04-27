# Bloom Style References — canonical visual anchors

These PNGs are the **canonical examples** of Bloom's two on-brand visual registers. When generating new assets, view these first to internalize the look. If a freshly-generated asset doesn't share these traits, regenerate.

## Register A — App-icon 3D-lite (METAPHORS)

For abstract concepts: competition, learning, safety, growth, time, money.

| File | Subject | Why it works |
|------|---------|--------------|
| `podium.png` | Tournament podium with star | Saturated red/pink/blue blocks, soft yellow star, perfect toy-like proportions, gradient shading |
| `grad-cap-book.png` | Graduation cap on open book with red ribbon medallion | Multi-object scene composed as ONE asset (cap + book + ribbon + tassel), squiggle "text" reads as handwriting without spelling actual words |
| `wallet-chart.png` | Tan leather wallet with chart card peeking out + green checkmark | Multi-object scene: wallet body + chart card + checkmark badge grouped as one composition |
| `piggy-bank.png` | Vibrant blue 3D piggy bank | Single subject, on-brand blue, classic Bloom symbol |
| `shield.png` | Gold-trim deep blue shield | Single subject, no checkmark inside (clean silhouette) |
| `vault.png` | Steel/blue vault with circular dial, slightly ajar | Single subject with detail (dial, hinge, glow inside) |

## Register B — Photorealistic iPhone mockup (PRODUCT)

For showing actual Bloom app screens.

| File | Subject | Why it works |
|------|---------|--------------|
| `safe-chart.png` | iPhone showing $24,231 portfolio with rising green chart | Photorealistic device, sharp UI, proper status bar, realistic glass reflection, on-brand deep blue UI |

## What to copy from these references

- **Saturated palette**: warm yellow, soft pink, saturated red, electric blue (#1658FF), mint green (#01CD74), gold-yellow accents
- **Toy-like proportions**: never sharp angles, always soft rounded forms, slightly exaggerated/squishy geometry
- **Soft directional lighting**: from upper-left, with soft drop shadows underneath
- **Gradient shading does all the work**: no outlines, no flat fills, no grunge textures
- **Single subject OR cleanly composed multi-object scene** (wallet has 3 elements but reads as ONE composition)
- **No text inside the asset**: squiggles can suggest writing, but never actual letters/words

## What NOT to do (anti-patterns we hit and fixed)

- ❌ "Hourglass with tree growing inside" — metaphor mash-up
- ❌ "Dollar bill with seedling growing through it" — metaphor mash-up
- ❌ "Roller coaster with red MYTH stamp baked in" — decorative metadata baked into image
- ❌ Grid of 12 small avatars in one image — contact sheet, not a hero asset
- ❌ X/Twitter logo or other brand icons used as decorative tag — counts as emoji-equivalent

## When generating new Register A assets

Use Pattern 1 in `../kie-prompts.md` (3-per-sheet, single-subject) and **always include the Bloom premium 3D block**. View these references first to ground the model output. If the result drifts toward stock-illustration cheesy or photorealistic-but-soulless, regenerate with stronger style cues.
