# Bloom Daily Market Update — Phase 1 Leftover

> **Status as of 2026-04-26.** Gold bar reveal proof established as the V1 cinematic recipe. Time to move on to the other components.

---

## Where we are

**Phase 1 of the [original plan](C:\Users\User\.claude\plans\here-s-your-daily-market-eager-gem.md) is functionally complete.** We built and proved a cinematic 3D pipeline for a single beat (Commodities Reel — gold bar reveal). Spent ~30 iterations dialing in the look. Current state is "pretty good" — visually acceptable, well within Bloom-brand range, ready to lock as the V1 recipe and apply to other components.

We are NOT chasing perfect anymore. Robinhood-Gold-ad-quality is achievable but takes a dedicated 3D artist + offline renderer. Three.js draft-quality has a ceiling we've effectively hit.

---

## What's locked (proven recipe — reuse for other components)

### Pipeline
1. **`nano-banana` (Kie)** generates a photoreal reference image with strict prompts (no text, no labels, dark BG, single softbox lighting)
2. **Meshy image-to-3D** with `--ai-model meshy-6 --should-texture` produces the geometry
3. **Meshy retexture** with `--enable-pbr true --remove-lighting true --enable-original-uv false` and a SIMPLE prompt (e.g. "polished mirror-finish 24k gold metal") returns full PBR maps (basecolor + metallic + roughness + normal + emission)
4. **Three.js 0.137** loads the GLB, applies HDRi via `RGBELoader` + `PMREMGenerator`, lights with 2 lights (key DirectionalLight + rim SpotLight), trusts the Meshy PBR maps with only `envMapIntensity` as a runtime knob

### Tweaker tool — keep using this
- File: [`tweaker.html`](tweaker.html)
- Serve via `npx http-server -p 8080 -c-1 --silent` from this directory
- URL: http://localhost:8080/tweaker.html
- Real-time `lil-gui` controls for tone mapping, exposure, lights, material multipliers, bloom, floor, fog, environment rotation, auto-rotate, HDRi-as-bg
- "📋 Export settings to clipboard" button dumps paste-ready JS for the production composition
- **Lesson:** never iterate visual quality via `npx hyperframes render` (~1.5min/render). Use the tweaker.

### Composition decisions
- **Bloom postprocessing: DISABLED in production** (`bloom.enabled = false`). Three.js's UnrealBloomPass tends to blow out metallic highlights. PBR alone is enough.
- **Floor plane: HIDDEN in production** (`ground.visible = false`). Plane geometry creates visible horizon lines unless you also add fog. Fog adds complexity. Easier to skip the floor.
- **HDRi: `studio_small_03`** is the current pick (single bright softbox + dark walls). Alternatives in `assets/`:
  - `studio-photostudio01.hdr` (single softbox, softer)
  - `studio-softboxes-cluttered.hdr` (multiple softboxes — too busy for metals)
  - `studio-warm-photostudio-02.hdr` (warm + even — works for non-metal subjects)
- **Tone mapping: Cineon @ exposure 1.0** is the current pick. ACES gives "burnt highlights" on gold; Cineon mimics film negative response and is gentler. Reinhard @ 2.5 also works.
- **Lights: 2 lights only** (no hemi, no fill, no kicker). Key DirectionalLight @ 4.0 from upper-front-right, rim SpotLight @ 2.5 from upper-back-left.
- **Bar material override: only `envMapIntensity` and `emissiveIntensity`** — let the Meshy PBR maps drive metalness/roughness per-pixel. Don't override.

### CLI flag bugs we learned the hard way
- **`--enable-pbr` requires explicit value `true`** — bare flag is treated as undefined (silent failure). Same for all the `args.X === "true"` style flags in `meshy.mjs`.
- Without `--enable-pbr true`, Meshy returns only basecolor — no metallic/roughness/normal maps even with the right prompt.

### Brand register
- **We dropped the strict Bloom-blue background** for the gold bar reveal. Final register is "deep navy/black with subtle warm radial behind subject." Brand identity lives in: typography (Inter Tight 800 italic caps), gold accent color on $ symbol and "↑ FORECAST" text, COMMODITIES tag styling, the black GOLD badge.
- **Gold accents replace green** in the bottom tag (`#FFC847` instead of `#01CD74`) — keeps the warm gold-on-dark palette cohesive.
- This is a **deviation from the educational skill's brand defaults** (which use bright `#1658FF` blue). Document it as the "Daily Market Update visual register" when we eventually scaffold the skill.

---

## What's still open (decisions for next session)

### About the gold bar specifically
- **Lock current state OR push further?** Current bar reads as gold but isn't Sherwood-News-grade premium. Options if we want to push:
  1. Layer PolyHaven CC0 PBR material maps for added micro-scratch detail
  2. Try a different reference image with more explicit "scratched, used bullion" language
  3. Source a CC0 hand-authored gold bar GLB from PolyHaven/Sketchfab (skip Meshy entirely)
  4. Render at `-q high` to confirm we've hit the actual ceiling
- **Decision required from user before next push.** Otherwise lock current and proceed.

### About the production composition (`index.html`)
- The current production composition uses settings from before the tweaker work. **Should reconcile** with the tweaker's current "good" state via the export button. Specifically: HDRi, tone mapping, exposure, light intensities, material `envMapIntensity`.
- **Action:** in the next session, open the tweaker, get to a final-good state, click Export, paste into production `index.html`, render once at `-q draft` to confirm.

### About skipped features
- **Material contrast sliders** (in tweaker) were skipped — would need `onBeforeCompile` shader patches that are brittle. Add later if needed.
- **`scene.environmentRotation`** isn't native in Three.js 0.137. We faked it via `worldGroup` rotation. Works but isn't the same as rotating the env map directly. Could revisit if we upgrade Three.js.

---

## What's next (other components per the [plan](C:\Users\User\.claude\plans\here-s-your-daily-market-eager-gem.md))

Per the original Phase 2 scope, build these components — **all reuse the same Cinema3DReveal recipe established above**:

| # | Component | Type | Hero asset | Notes |
|---|---|---|---|---|
| 1 | **Oil Barrel** | 3D | nano-banana ref → Meshy image-to-3D → PBR retexture | Proves the recipe generalizes to a different metal/material. Likely the next test. |
| 2 | **Fed Pillar / Column** | 3D | Architectural geometry | Pillar/podium for the FedSpeak beat. Test recipe on non-metal. |
| 3 | **IndexCard** | 2D HTML/CSS | None | S&P + Nasdaq cards with sparklines. Pure HTML/CSS/SVG. |
| 4 | **MoverCard** | 2D HTML/CSS | Logo orbs | Top movers with PercentPill. Reuses LogoOrb pattern from educational skill. |
| 5 | **PercentPill** | 2D HTML/CSS | None | Atom — `+0.1%` / `-X%` indicator. |
| 6 | **QuoteCard** | 2D HTML/CSS | None | Fed quote display with attribution. |
| 7 | **TickerTape** | 2D Canvas | None | Reuse from educational skill (`techniques.md`). |
| 8 | **Sparkline** | 2D SVG | None | SVG path animated via `stroke-dashoffset`. Reuse from educational skill. |
| 9 | **MarketPulseOpen** | Composite | TickerTape + DateBadge + BloomLogo | The recurring intro beat. |
| 10 | **SignOff** | Composite | BloomLogo + host name + tagline | The recurring close beat. |

**Suggested next move:** start with **Oil Barrel** — it's the most direct test of "does the Cinema3DReveal recipe generalize?" If oil works, we know the gold bar wasn't a special case. Then move to 2D components (cheaper, no Meshy budget needed).

---

## Files to know

| File | Purpose |
|---|---|
| `index.html` | Production composition — what gets rendered to MP4 |
| `tweaker.html` | Live tweaking UI for visual iteration |
| `narration.mp3` + `transcript.json` | ElevenLabs VO + word timing |
| `assets/gold-bar.glb` | Current bar (alias to `gold-bar-v2-pbr.glb`) |
| `assets/gold-bar-v2-pbr.glb` | Latest PBR-textured bar (cleaner ref image) |
| `assets/gold-bar-v1-pbr.glb` | Earlier PBR bar (preserved for A/B) |
| `assets/studio.hdr` | Current HDRi (`studio_small_03`) |
| `assets/refs/` | Original nano-banana reference images |
| `assets/refs2/` | Newer cleaner nano-banana reference |
| `renders/proof.mp4` | Last rendered output |
| `snapshots/` | ffmpeg-extracted comparison frames from each iteration |
| `LEFTOVER.md` | This document |

External:
- [`C:\Users\User\.claude\plans\here-s-your-daily-market-eager-gem.md`](C:\Users\User\.claude\plans\here-s-your-daily-market-eager-gem.md) — original 5-phase plan
- [`C:\Users\User\git\bloom-hyperframes\.agents\skills\bloom-educational-video\`](../../.agents/skills/bloom-educational-video/) — reference skill to model the daily-market-update skill on (NOT YET BUILT — Phase 3 deliverable)

---

## Key learnings (so next session doesn't re-discover)

1. **`--enable-pbr` needs explicit `true` value** in meshy.mjs CLI. Bare flag silently fails.
2. **Meshy retexture default doesn't return PBR maps** — texture_urls only has `base_color` unless `enable_pbr=true`.
3. **Meshy image-to-3D output has only POSITION attribute** (no normals, no UVs, no materials). Always call `geometry.computeVertexNormals()` after load. After a retexture pass with PBR, the GLB gains NORMAL + TEXCOORD_0 + materials + 4 textures.
4. **Three.js draft renders fall back to software WebGL** — slower than expected. The "Automatic fallback to software WebGL" warning is normal.
5. **Bloom + metalness=1 + roughness<0.2 = blown white highlights.** Either disable bloom or keep metalness/roughness tuned.
6. **Snapshot tool crops portrait → landscape** by design — use `ffmpeg -ss <t> -i renders/proof.mp4 -frames:v 1 out.png` for proper 1080×1920 portrait extraction.
7. **`scene.environmentRotation` requires Three.js r150+.** We're on 0.137. Workaround: rotate a `worldGroup` containing bar + lights against the fixed HDRi.
8. **HyperFrames `lint` errors on `tl.set` for visibility on `class="clip"` elements** — the framework manages clip visibility itself. Don't manual visibility-kill clips.
9. **Sub-compositions via `data-composition-src` complicate Three.js setup** — the linter flags missing `<script>` tags it can't see in the parent. Single-file compositions (matching `market-time/index.html` pattern) avoid this. Trade off architectural cleanliness for simpler validation.
10. **Cineon tone mapping > ACES for metallic gold.** ACES has documented "burnt highlights, crushed shadows" on warm metals.

---

## Open questions for the next session

1. Lock the current gold bar look or push further (Polyhaven layered maps / Sketchfab CC0 / `-q high` test)?
2. Reconcile production `index.html` with tweaker's final "good" state via export?
3. Start Phase 2 with **Oil Barrel** (3D test, validates the recipe generalizes) or with **IndexCard** (2D, no Meshy budget)?
4. Should we eventually build out the full `bloom-daily-market-update` skill (per Phase 3 of plan) or just keep iterating on this one project?
5. Today's full ~60s video render still pending — was Phase 4 in the plan. Defer or tackle?

---

## Quick re-spin commands

```bash
# Serve tweaker
cd C:/Users/User/git/bloom-hyperframes/videos/bloom-market-2026-04-26-proof
npx http-server -p 8080 -c-1 --silent
# open http://localhost:8080/tweaker.html

# Lint production
npx hyperframes lint

# Render production (draft, ~1.5min)
npx hyperframes render -q draft -o renders/proof.mp4

# Extract portrait frames from MP4
ffmpeg -y -ss 4.5 -i renders/proof.mp4 -frames:v 1 snapshots/check.png
```
