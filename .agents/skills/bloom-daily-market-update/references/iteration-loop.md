# Iteration Loop

How we work after the script and assets are ready. The discipline below is what made the 04-28 video land.

## The cardinal rule

**Snapshots, not renders, during iteration.** A render is 60–90s of compute and a 4–6 MB MP4 on disk. A snapshot is 5–10s and shows you a single frame.

Only render when the user explicitly says "render," "render the final," "render v2," or similar. Words that DO NOT mean render: "build it", "make it", "do it", "let me see", "show me." Those mean snapshot.

```bash
# CORRECT during iteration
npx hyperframes snapshot videos/bloom-market-<date> --at 12.5,15.2,21.6 --timeout 8000

# CORRECT only on explicit "render"
npx hyperframes render videos/bloom-market-<date> -q draft -o videos/bloom-market-<date>/renders/v1.mp4
```

This is also recorded in project memory: `Never render hyperframes videos unless the user explicitly asks for it.`

## Read the snapshot

The snapshot tool outputs a 1080×1920 portrait PNG into `snapshots/frame-NN-at-XX.Xs.png`. Read it via the `Read` tool — your IDE renders the image and you can SEE it.

After every meaningful CSS / JS change, take 1–3 snapshots at the most informative timestamps (use the VO timing.json to pick word-anchored moments).

Three snapshots per beat is usually enough:
- One mid-entrance (the prop is settling)
- One at the keyword payoff
- One at the exit / hold

## Lint before snapshot

```bash
npx hyperframes lint videos/bloom-market-<date>
```

Track 0 errors, 0 critical warnings. The track-density warnings (`timeline_track_too_dense`) are informational — ignore unless cleanup is the goal.

If you ever see a `landOn ambiguous` error or a runtime selector error, fix before snapshotting.

## The AI-reference loop (for hard beats)

When a beat feels weak or you're not sure what "good" looks like for it, run the **reference-first loop**:

1. Generate a Higgsfield reference of the IDEAL look:
   ```
   mcp__higgsfield__generate_image with model "gpt_image_2", aspect_ratio "9:16", resolution "1k", quality "low"
   ```
   Prompt with the AE-motion-design vocabulary: "Vertical 9:16 motion design explainer frame, After Effects authentic look, Instagram-feed energy. Premium fintech motion design, broadcast-grade like a Bloomberg redesign by Apple. NO real people, NO photo elements."

2. Download via `mcp__higgsfield__job_status` (sync mode), save into `videos/bloom-market-<date>/refs/`

3. Read the ref image — what's it doing differently from your current implementation?

4. Diff in your head: typography weight? layout density? element scale? color accents? spacing?

5. Edit CSS to match, snapshot, compare.

This loop is OPTIONAL but recommended for non-trivial beats (e.g. comparison shots, divergence charts, hero asset shots). For obvious moves (rich ticker card, signal slam), skip it.

## The asset-pipeline loop (for 3D-style hero moments)

When the script names a real-world concept (oil, gold, the Fed building, a chip, a globe):

1. Check existing assets first:
   - `assets/logos/*.png` — 30 ticker logos
   - `videos/bloom-market-<prior-date>/generated-assets/*.png` — yesterday's assets
   - Repo `compositions/components/` — registry components
   - `assets/models/*.glb` — Three.js models
2. If nothing fits, generate via Higgsfield:
   - Background: pure magenta `#FF00FF`
   - Style: chunky 3D-lite iOS app-icon, soft rounded forms, gradient shading, soft studio lighting (per brand block in `../bloom-educational-video/references/higgsfield-prompts.md`)
3. Download to `videos/bloom-market-<date>/generated-assets/<name>-raw.png`
4. Chroma-key:
   ```bash
   ffmpeg -y -i <name>-raw.png -vf "colorkey=0xff00ff:0.40:0.30,format=rgba" <name>.png
   ```
   Tolerances: `0.30:0.18` for clean subjects, `0.40:0.30` for subjects with glow / specular. Test in HTML, re-key with broader tolerance if you see magenta fringe.
5. Drop into HTML as `<img src="generated-assets/<name>.png" alt=""/>` with absolute positioning.

## Feedback handling

When the user gives feedback on a snapshot, classify the feedback:

| Type | Action |
|---|---|
| **Crop / clipping** ("element clipped", "got cut off") | Reduce element size or move position. Re-snapshot. |
| **Scale** ("too small", "too big", "fill the frame") | Bump CSS sizes (chart `height`, font `size`, card `width`). |
| **Position** ("off position", "not where I'd expect") | Move via CSS `top`/`left` or absolute repositioning. Don't argue — they have the eye. |
| **Style direction** ("not vertically capturing", "feels empty", "feels generic") | Step BACK. Don't iterate the same component. Either generate an AI ref to confirm direction or propose 2–3 alternative approaches. |
| **Pattern reuse** ("use the X we did in the other video") | Read the prior file, port the pattern. |
| **Roll back** ("not a fan", "didn't like that") | Revert. Don't try to defend or twist. The prior version was probably closer. |
| **Cut something** ("remove X", "drop Y") | Simple edit. No argument. |

**The key behavior:** when feedback is style-level ("feels weak", "not capturing"), don't tweak — re-think. Often the layout is wrong, not the polish.

## Cross-cut beats need extra verification

For 5–7s cross-cut beats, snapshot at multiple moments to confirm the choreography flows:

- t = +0.5s (first subject entering)
- t = +1.5s (first subject + accent in)
- t = +2.5s (transition — first exiting, second entering)
- t = +4.0s (second subject + accent)
- t = +5.5s (third subject + accents)

Watch for empty frames at transition moments — overlap entries by 0.1–0.2s with the prior exit.

## When to STOP iterating

You are done iterating a beat when:
- ✓ Lint clean
- ✓ Snapshots at all key moments look right
- ✓ User has explicitly approved or signaled "next"
- ✓ All hard rules pass (1.5s min duration, 20px min text, continuous animation)

Stop fiddling. Move to the next beat or the final render.

## Rendering — the only acceptable trigger

Only when user says some variation of:
- "Render it"
- "Render v2"
- "Final render"
- "Make the MP4"
- "Output the video"

Render command:
```bash
cd <repo>
npx hyperframes render videos/bloom-market-<date> -q draft -o videos/bloom-market-<date>/renders/v<N>.mp4
```

Run in BACKGROUND if more than one render is in flight. Notify user when it lands and offer to extract a specific frame for review:

```bash
ffmpeg -y -i videos/bloom-market-<date>/renders/v<N>.mp4 -ss <time> -frames:v 1 \
  -vf scale=540:960 videos/bloom-market-<date>/renders/v<N>_frame.png
```
