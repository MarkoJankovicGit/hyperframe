# Step 7 — Validate, Snapshot, Render

## Audit the timeline (dead-air gaps + dwell)

```bash
node ~/.claude/skills/bloom-educational-video/references/audit-timeline.mjs \
  hyperframes/videos/bloom-<slug>/index.html
```

Static parse of the composition — finds every `tl.fromTo/to/set` call, resolves its `landOn`/`landAfter`/`B<N>` position arg numerically, and prints:

- **Dead-air gaps** flagged with severity (≥1.5s yellow, ≥2s yellow, ≥3s red)
- **Event log** — every animation in chronological order with start/end times

A clean run has zero gaps ≥3s. Yellow gaps (1.5–3s) are review-worthy: most are scene-transition handoffs and OK, but if a 2s+ gap sits inside a single scene with the asset frozen, that's a problem.

**For each ≥3s gap**, decide:
- **Add an idle motion** to whichever asset is on screen but frozen
- **Add a sub-element entrance** (badge, label, sparkline draw)
- **Split the scene** into two beats with a transition
- **Insert a NEW beat** that handles the under-served VO portion

See [animation-patterns.md § Dead-air audit](animation-patterns.md) for the full rules. **Do not deliver a video with red gaps.**

## Lint

```bash
cd hyperframes/videos/bloom-<slug>
npx hyperframes lint
```

Expect 0 errors. A few `overlapping_gsap_tweens` warnings are OK if all transitions have `overwrite: "auto"`. The `duplicate_media_discovery_risk` is OK for shared assets like `bloom-logo.png` used in multiple scenes — copy to a different filename for the second use only if it actually causes render issues.

Fix any **errors** before snapshot.

## Inspect

```bash
cd hyperframes/videos/bloom-<slug>
npx hyperframes inspect
```

Expect 0 errors or warnings and adress everything you see.

Fix any errors before the snapshot

## Validate

```bash
cd hyperframes/videos/bloom-<slug>
npx hyperframes validate
```

**Required gate — never skip.** `lint` is a static-AST check; `validate` loads the composition in headless Chrome and catches an entirely different class of bugs that lint cannot see:

- **Ambiguous `landOn()` phrases** — when a 1-2 word anchor matches multiple positions in `W`, the helper throws at runtime. The throw blocks every later tween in that beat (counter never ramps, badges never slam, etc.) but produces no visible error in the rendered MP4 — the scene just looks "static." `validate` surfaces these as hard errors with both match positions, e.g. `landOn: phrase "dollars" matches 2 occurrences at [2.787s, 4.950s]`. Fix by using a longer disambiguating phrase or switching to `at("nextWord") - small_offset` if you want a specific occurrence.
- **Runtime JS errors** — script-load exceptions (typos, missing globals, async timing bugs) that lint can't see.
- **Asset 404s** — failed network requests for `<img src>` references, including paths broken during a sub-comp → monolith conversion (e.g. stale `../bloom-logo.png` references after flattening).
- **WCAG AA contrast warnings** — text-on-bg contrast computed against actual rendered pixels at 5 timestamps. Most show up at sample times where the element is mid-`from()` tween (opacity 0 → ~1:1 ratio against bg, false-positive). Real contrast issues do appear in this list — review and fix anything that's still low-contrast at its peak-visibility moment.

Expect **0 errors**. Warnings are reviewable; the hard error count must be zero before moving on.

If `validate` reports ambiguous landOn phrases, also run a quick check for the same patterns yourself: search the project for every `landOn("...")` and `landAfter("...")` call, mentally validate that each phrase is unique in its beat's `W` slice. Common offenders: `"dollars"` (often appears twice in stat beats), `"over"` (in "over and over" type phrases), `"the"`, `"of"`. Always prefer 2-3 word multi-word anchors.

## Snapshot key beats

```bash
cd hyperframes
npx hyperframes snapshot videos/bloom-<slug> --at <comma-separated-mid-times>
```

Pick the midpoint of each beat from STORYBOARD.md. Snapshots render at 1920×1080 landscape (CLI default) — they crop the bottom of portrait compositions. Use snapshots to check **horizontal layout** (no overflow, all elements visible) and **content presence** (logos load, text readable, no white-on-white). Don't trust snapshot vertical layout — preview/render is authoritative for that.

**CLI quirks to know:**
- `--at` takes **comma-separated** timestamps (`--at 13,18,22`), NOT space-separated. Wrong syntax silently uses only the first value.
- Snapshots auto-name as `snapshots/frame-NN-at-Ts.png`. The `snapshots/` prefix is fixed; `-o <path>` doesn't always control the final filename. Plan around that — don't expect to redirect snapshot output.
- Anything positioned at `top > 1080px` (e.g. characters at `bottom: 0` with height 880px → top=1040px) only shows their TOP edges. **Don't troubleshoot "missing content"** — first check whether the missing element is in the bottom half of the portrait. If yes, the snapshot is just clipping it; verify via studio (`npx hyperframes preview`) or MP4 (`npx hyperframes render -q draft`).

**View every snapshot carefully.** Don't glance and move on. Run through this checklist for each frame:

**Visibility**
- Is there visible content? All-white or all-black frames mean the composition isn't rendering — check the timeline registration and `data-start`/`data-duration` on the beat's root template
- Can you read ALL text? White text on white-ish bg is invisible; dark text on dark bg is invisible. Every text element needs contrast against what's directly behind it
- Are images and assets showing? Empty space where an asset should be = path issue or missing file. Verify `../bloom-logo.png`, `../logos/<TICKER>.png`, `../generated-assets/*.png` all resolve from the beat's location

**Positioning & layout**
- Are elements where the storyboard says they should be? Compare snapshot to the beat's `Concept` description
- Is there too much dead space? If >40% of the frame is flat solid color with nothing on it, the beat is sparse — likely needs a sub-element entrance or a Kie illustration assigned
- Are elements overlapping incorrectly? Text-over-text, content bleeding past 1080px width edge, badge overlapping the logo
- Headlines fit within 1080px width (no horizontal overflow)
- Logo orbs use `#1C2329` dark fill (white-on-transparent ticker logos vanish on light bg)

**Visual quality**
- Are overlays too heavy? If a generated illustration is barely visible through a dark scrim, reduce overlay opacity
- Is the visual hierarchy clear? One dominant element per frame, supporting elements secondary
- Do the colors match DESIGN.md? Bloom blue is `#1658FF` exactly — paste the HEX, don't approximate
- No accidental ghosting from previous beats (visibility kill working — `tl.set("#beat<N>", { visibility: "hidden" }, <DUR>)`)

**Code-vs-rendered verification**
- For each beat, does the snapshot show the assets you referenced in the HTML? If the composition has `<img src="../generated-assets/piggy-bank.png">` but the snapshot shows no piggy bank → image isn't loading, path is wrong, or hidden behind another element
- If a snapshot shows nothing at the chosen timestamp, **try +1-2s later**. Compositions may still be in entrance animations at the midpoint. Snapshot is fast, run it again with adjusted times.

If any frame has issues, go back to the beat's sub-comp file in `compositions/` and fix that one before moving on.

## Preview the studio

```bash
cd hyperframes/videos/bloom-<slug>
npx hyperframes preview
```

Opens at `http://localhost:3003` (or next available port). Scrub every beat. Check:
- Animation sync — does each slam land on the keyword?
- Beat crossfades feel smooth, no flashes or stuck content
- Typography sizing reads at the actual portrait aspect
- Audio plays end-to-end without gaps

Iterate by editing index.html — studio hot-reloads.

## Render draft

```bash
cd hyperframes
npx hyperframes render videos/bloom-<slug> -q draft -o videos/bloom-<slug>/renders/bloom-<slug>-draft.mp4
```

~1 minute render. Watch end-to-end. The MP4 is the source of truth for vertical layout — anything cut off in snapshots should now be visible.

## Render high quality (only on user request)

```bash
npx hyperframes render videos/bloom-<slug> -q high -o videos/bloom-<slug>/renders/bloom-<slug>.mp4
```

Don't auto-render high — wait for explicit user request ("render it high", "make the final", "I'm happy"). High render takes the same time as draft but produces a 10MB+ file.

**Always pass `--output renders/bloom-<slug>.mp4`** (or `-o`) so the final file has a predictable, human-readable name. The CLI default is timestamped (`bloom-<slug>_2026-04-25_19-03-12.mp4`) which is unwieldy to reference from docs, social posts, or later iterations.

## Common fixes after preview

| Symptom | Fix |
|---|---|
| Logo invisible (white-on-white) | Change orb/slot bg to `#1C2329` |
| Headline text overflows | Reduce font-size or shorten the word |
| Animation feels late | Confirm entrance scheduled at `wordStart - duration` (not `wordStart`) |
| Scene ghosts behind next scene | Confirm `tl.set("#sceneN", { visibility: "hidden" }, exitEnd)` is present |
| Asset 404s in render output | Asset path uses `../..` — copy file into project-local folder |
| Ticker tape jitters | Round canvas y-coords to integers, slow scroll to 20 px/s |

## Final delivery

When the user says it's done:
- Path to final MP4: `videos/bloom-<slug>/renders/bloom-<slug>.mp4`
- 1080×1920 portrait @ 30fps
- Embedded ElevenLabs v3 narration
- ~45-90s
