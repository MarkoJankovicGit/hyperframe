# Step 5 — Generate Missing Assets via Higgsfield

For any beat that needs a custom illustration not in the logo library, use the Higgsfield MCP (`mcp__higgsfield__generate_image`) with the `gpt_image_2` model.

## Reuse before regenerating

Before generating a new subject, check whether it already exists:
- Stock logos in `videos/bloom-<slug>/logos/` (downloaded ticker marks)
- 3D-lite cutouts from prior videos — `bloomapp-promo/generated-assets/`, `bloom-investing-myths/generated-assets/` (piggy-bank, vault, shield, briefcase, money-stack, etc. — copy-able)
- Bloom marks (`bloom-logo.png`, `bloom-star.png`)
- Inline SVGs (heart/star/chart icons drawn in markup)
- Captured Bloom UI mockups (`videos/bloomapp-promo/capture/assets/...`)

If a piggy bank or iPhone or shield already exists on disk, copy it. Don't regenerate something we have.

## Generation is a creative tool — go by feel

You should always strive to generate assets for each scene, where something is said that can be better supported visually, instead of by text or graph. For example, if a voiceover is talking about how datacenters are growing to support ai use, a picture of a datacenter or server stack would work great in this scenario. If the voiceover is talking about for example market hours, like "In other countries, stock market hours are different & based on their own time zones 🌍", generating an image of a globe, would be a great way to visually represent that. In other cases, if the topic of the scene is a quote by a specific person, then that person's face would be a great asset to generate and use in that scene. 

Never represent something with an svg if it would more benefit from being an image asset.

Generation is **not** rationed. If you think a fresh illustration will fill out the scene, make it more engaging, or land the metaphor harder than typography alone, generate it. Empty asset slots are also fine when a giant `$1` headline or sparkline draw is louder — neither extreme is a default. Brainstorm 3-5 visual candidates per beat (typography / SVG / generated illustration / reused cutout / Bloom UI mockup) and pick whichever is loudest for that VO line.

The only hard rule: **don't generate something we already have.** Beyond that, follow the script's energy.

## Three generation patterns

### Pattern A — Sprite sheet of N objects (chunky 3D-lite)

For Beat 4 "examples" — generate 3-6 everyday objects in one call, then split with `split-sheet.py`.

Use **`gpt_image_2` text-to-image** at `16:9` landscape, `1k` `low` (cheap iteration), or bump to `2k` once the prompt is locked. Magenta `#FF00FF` background for chroma keying.

See [higgsfield-prompts.md](higgsfield-prompts.md) for the prompt template.

```json
{
  "tool": "mcp__higgsfield__generate_image",
  "params": {
    "model": "gpt_image_2",
    "aspect_ratio": "16:9",
    "resolution": "1k",
    "quality": "low",
    "prompt": "<sprite-sheet prompt with N items>"
  }
}
```

Poll with `mcp__higgsfield__job_status` (sync mode), grab `results.rawUrl`, then split:

```bash
cd hyperframes/videos/bloom-<slug>/generated-assets
python split-sheet.py "<rawUrl>" --names item1 item2 item3 --bg magenta
```

(`split-sheet.py` does magenta key + bbox crop per cell. See the script in `references/split-sheet.py`.)

### Pattern B — 3D iPhone with Bloom UI inside (i2i + chroma-key)

For Beat 6 payoff — use **`gpt_image_2` image-to-image** with captured Bloom mockups as style references. Always specify magenta background outside the device.

Upload the refs first to get reusable UUIDs:

```bash
mcp__higgsfield__media_upload --path hyperframes/videos/bloomapp-promo/capture/assets/690ba8a8c56264654608fd99-mock-cta-p-1080.png
mcp__higgsfield__media_upload --path hyperframes/videos/bloomapp-promo/capture/assets/690ba188fa21cc9a599feb66-mockup-safe-p-8.png
```

Then generate:

```json
{
  "tool": "mcp__higgsfield__generate_image",
  "params": {
    "model": "gpt_image_2",
    "aspect_ratio": "9:16",
    "resolution": "1k",
    "quality": "medium",
    "prompt": "<Bloom 3D iPhone prompt with topic-specific UI inside>",
    "medias": [
      { "value": "<uuid-1>", "role": "image" },
      { "value": "<uuid-2>", "role": "image" }
    ]
  }
}
```

Then chroma-key the magenta on the downloaded raw:

```bash
cd hyperframes/videos/bloom-<slug>/generated-assets
python chroma_key.py portfolio-phone-raw.png portfolio-phone.png
```

Result is a transparent PNG of a 3D iPhone with the requested Bloom UI inside.

### Pattern C — Single illustration cutout

For one-off symbolic illustrations (e.g., a magnifying-glass-with-sparks). Use text-to-image with magenta bg, then chroma-key.

```json
{
  "tool": "mcp__higgsfield__generate_image",
  "params": {
    "model": "gpt_image_2",
    "aspect_ratio": "1:1",
    "resolution": "1k",
    "quality": "low",
    "prompt": "<single-object prompt with magenta background>"
  }
}
```

## Critical rules

1. **Always magenta `#FF00FF` background**, never white. Magenta never appears in subjects, so chroma-keying is clean.
2. **Pass Bloom UI references** when generating Bloom UI mockups — refs from `videos/bloomapp-promo/capture/assets/` ground the model in Bloom's actual style.
3. **Don't ask the model to "preserve EXACTLY"** in i2i — it can't. The model will regenerate the whole image. Ask it to use refs as STYLE inspiration, not pixel reference.
4. **Don't generate text inside images** unless absolutely necessary — TTS/captions render text in HTML, much sharper. Only generate text in i2i UI mockups (Bloom phone screens).
5. **Save raw + processed** — keep `<file>-raw.png` (downloaded original) AND `<file>.png` (chroma-keyed). The raw is debug; the processed is what compositions reference.

## Style consistency

Every Higgsfield call must include the Bloom **style block** (in [higgsfield-prompts.md](higgsfield-prompts.md)):

> Chunky 3D-lite illustration style — soft rounded forms, subtle gradient shading, saturated vibrant colors with bright blue #1658FF and green #01CD74 accents. No hard flat fills, no line-art outlines, soft ambient shadows. Centered subject. Playful but sophisticated, iOS-style 3D object rendering aesthetic.

This paragraph is the consistency lock. Drop it into every prompt.

## Gate

- [ ] Checked existing assets (logos, prior `generated-assets/`, captures) — copied any that already exist instead of regenerating
- [ ] All generated images have magenta background
- [ ] Chroma-keyed transparent PNGs saved to `videos/bloom-<slug>/generated-assets/`
- [ ] Each beat that calls for an asset (vs. typography / SVG) has one ready
