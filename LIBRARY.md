# Local Asset Library

Curated, **offline**, license-clean assets to pull from when building videos.
**Rule: always check `library/` first before fetching anything from the web.**

## Icons & brand logos (`library/`) — ✅ bulk-downloaded, repo-safe

| Folder | Count | Source | License | Use for |
| --- | --- | --- | --- | --- |
| `library/brand-logos/` | 3446 | [Simple Icons](https://simpleicons.org/) | **CC0** (public domain) | Brand/tech/social logos: "trusted by", tech stack, social icons |
| `library/icons-lucide/` | 1993 | [Lucide](https://lucide.dev/) | **ISC** | Clean line UI icons: arrows, check, play, etc. |
| `library/icons-tabler/outline/` | 5093 | [Tabler](https://tabler.io/icons) | **MIT** | UI icons (outline), dashboards, data |
| `library/icons-tabler/filled/` | 1053 | [Tabler](https://tabler.io/icons) | **MIT** | UI icons (filled) |

~11,500 SVGs · ~30 MB · all monochrome (single-path, `currentColor`-friendly).

**How these are used in a composition:** pick the needed SVGs, copy them into the video's
`assets/` folder (e.g. `assets/icons/`), and recolor via CSS (`fill`/`color`) to match the
brand. They are mono → recolor to the silver/white mono palette as needed. Inline the SVG
or reference as `<img>`. Brand logos: trademark-safe to use truthfully (e.g. "we worked
with X"); do not imply false endorsement.

> Installed via npm (`simple-icons`, `lucide-static`, `@tabler/icons`) into a temp dir, then
> the SVG sets copied here. To refresh: re-run the install + copy.

## Animated components (`library/`) — ✅ MIT, repo-safe

| Folder / file | Source | License | Use for |
| --- | --- | --- | --- |
| `library/anim-css/animate.min.css` | [animate.css](https://animate.style/) | **MIT** | Ready `@keyframes` (fade/slide/zoom/bounce/flip) — building blocks |
| `library/anim-css/hover-min.css` | [Hover.css](https://ianlunn.github.io/Hover/) | **MIT** | Interaction animations (reference) |
| `library/loaders/*.svg` (46) | [SVG Spinners](https://github.com/n3r4zzurr0/svg-spinners) | **MIT** | Animated loaders/spinners for "processing" UI mockups |

**Video caveat:** ready animated components are usually `:hover`-triggered and/or infinite-loop
(`animation: … infinite`). In a deterministic render there is no mouse and `repeat:-1` is banned.
So these are **raw material** — the visual/keyframes are reused, but the trigger is re-driven by
the GSAP timeline and loops are made finite. Still a time-saver, not literal drop-in.

**Best fit for video = Lottie.** A Lottie player can be driven frame-by-frame from the
composition time (`goToAndStop(frame)`) → fully deterministic/seekable, and the animations look
premium (animated checkmark, success, loading, confetti, animated icons). License is per-asset
(some open MIT sets exist). Pipeline not yet set up — send LottieFiles links or ask to grab an
open MIT pack, and a seekable wrapper gets added.

## Media (video / music / SFX) — ⚠️ curated, NOT bulk-scraped

Stock sites (Mixkit, Pixabay, Pexels…) forbid bulk/automated downloading in their ToS —
"keeping it local" does not make scraping them compliant. So media is **curated**: download
only what a video uses, into `assets/`.

**Bulk is OK only from explicitly-open sources (CC0 / public domain):**

| Source | Type | Bulk | How |
| --- | --- | --- | --- |
| [Freesound](https://freesound.org/) (filter **CC0**) | SFX | ✅ via API | needs a free API key |
| [Internet Archive](https://archive.org/) | music + SFX (public domain) | ✅ | direct / API |
| [Musopen](https://musopen.org/) | classical music (public domain) | ✅ | direct |
| [Free Music Archive](https://freemusicarchive.org/) | music (CC0/CC-BY) | ✅ for CC0 | per-license |

Existing local SFX: `sound-effects/` (already in project). Music currently a placeholder
(synthwave) — replace with a licensed/public-domain track before publishing.

## On-demand sources (send a link, the code is pulled in) — for one-off picks

- **UI components / mockups:** [Uiverse](https://uiverse.io/) (MIT), [HyperUI](https://www.hyperui.dev/) (MIT), [CodePen](https://codepen.io/)
- **GSAP / CSS animations:** [CodePen](https://codepen.io/search/pens?q=gsap)
- **Lottie:** [LottieFiles](https://lottiefiles.com/) (per-asset license)
- **Shaders (backgrounds/transitions):** [Shadertoy](https://www.shadertoy.com/) — ⚠️ many CC-BY-NC (no commercial); check per shader. Also `@hyperframes/shader-transitions` (already license-clean).
- **Fonts:** [Google Fonts](https://fonts.google.com/) — just name it; the compiler embeds it.

**Send-me rule:** code/SVG/shaders/fonts → a **link** is enough (I pull + adapt). Video/music/SFX → must be an actual **file** (or a direct download URL I can `curl`).
