# Step 4 — Write the Storyboard

Per-beat creative direction with real timings. Save as `videos/bloom-<slug>/STORYBOARD.md`.

**MANDATORY pre-reads:**
- [compositions-library.md](compositions-library.md) — pick or invent a composition per beat
- [editorial-baseline.md](editorial-baseline.md) — process rules that apply to every beat
- [composition-rules.md](composition-rules.md) — sequence-level rules (no consecutive same-bg, etc.)

HARD GATE: Validate the sequence against the rules in composition-rules.md AND the no-verbatim-repetition rule in editorial-baseline.md.

## Inputs

- `SCRIPT.md` (from Step 2) — the assembled beat list with names + VO lines + bg colors
- `transcript.json` (from Step 3) — word-level timestamps
- [beat-library.md](beat-library.md) — beat TYPES (Hook / Concept / Stat-reveal / etc.)
- [compositions-library.md](compositions-library.md) — beat COMPOSITIONS (specific visual treatments — `hero-stat`, `convo-cascade`, `growth-curve`, etc.)
- [editorial-baseline.md](editorial-baseline.md) — process-level rules (grain, no `#FFF`/`#000`, camera drift, no overshoot, no glows, etc.)
- [composition-rules.md](composition-rules.md) — sequence-level rules
- [techniques.md](techniques.md) — 11 generic visual techniques (path-draw, kinetic typo, etc.) — pick 2-3 per beat as building blocks
- [DESIGN.md](../DESIGN.md) — brand cheat sheet

## Composition selection — the evolution mechanism

For each beat in the storyboard, you MUST do one of two things:

### Path A — use an EXISTING composition
1. Scan [compositions-library.md](compositions-library.md).
2. Find an entry whose "When to use" matches this beat's moment.
3. Note its `name` (e.g. `hero-stat`, `convo-cascade`) in the beat block's **Composition** field.
4. Reskin per topic (different copy, different supporting elements) — but keep the layout zones, choreography pattern, and CSS notes from the library entry.

### Path B — INVENT a new composition
If nothing in the library fits the beat's moment, invent. Do NOT force a bad fit.

1. Write a one-sentence visual hypothesis ("iPhone lock-screen with three notification banners stacked, each from a different source of bad advice").
2. Generate a visual reference via Higgsfield gpt_image_2:
   ```
   mcp__higgsfield__generate_image({
     model: "gpt_image_2",
     aspect_ratio: "9:16",
     resolution: "1k",
     quality: "low",
     prompt: "Vertical 1080x1920 frame for a short-form Bloom in-app educational video.
       Scene: <one-sentence>. Aesthetic: clean, designed, in-app polish — Bloom blue
       #1658FF accent, warm cream surfaces, near-black ink, subtle paper grain.
       Editorial Inter Tight italic 700 typography. No glow on type. No status pills.
       No SaaS feature-card grids. Mood: trusted-older-sibling, confident."
   })
   ```
3. Use the returned image as a **visual reference** (not a final asset). In the beat block, mark the **Composition** field as `INVENT: <provisional-name>` and link to the generated image.
4. In Step 6, translate the layout to native HTML/CSS/SVG/GSAP.
5. **After the lesson ships, document the new composition** back into [compositions-library.md](compositions-library.md) using the entry template at the top of that file. The library grows by ≥1 entry per lesson when invention is needed.

### No verbatim composition repetition

After picking compositions for all beats, audit the storyboard. If two beats use the same composition AND the same gestalt (same hero element in the same screen position), redesign one. Reskinning the same composition for two different beats is fine when the gestalt visibly differs (different palette, different supporting layout, different framing) — verbatim re-use is not.

> **Output reminder:** the lesson is built as a SINGLE `index.html` (no `compositions/` folder). Pick a `<short-name>` per beat anyway (e.g. `hook`, `myth1`, `bust1`, `cta`) — Step 6 uses it as the `<div id="beatN">` suffix and as the `makeBeat` id.

## Format

```markdown
# STORYBOARD — Bloom Lesson <N>: <Topic>

**Format:** 1080×1920 portrait @ 30fps
**Duration:** <total>s (from VO)
**Audio:** ElevenLabs v3 (`JZ3e95uoTACVf6tXaaEi`)
**Style:** DESIGN.md (Bloom brand)
**Beat sequence:** <list>, e.g. `Hook → Concept → Examples → Reframe → Stat-reveal → Stat-reveal (emphatic) → Insight → Tease`

## Asset inventory
- `bloom-logo.png`
- `logos/<TICKERS>.png` — list which logos are used
- `generated-assets/<files>.png` — list any Higgsfield-generated assets
- `mcp__higgsfield__generate_image` — generate any needed assets missing from our asset library

## Beat plan (real timings from transcript)

| # | Beat type | Bg | Start | Dur | VO | Keyword onset(s) |
|---|---|---|---|---|---|---|
| 1 | Hook | blue | 0.00 | 2.62 | "..." | intimidating @ 1.498 |
| 2 | Concept | white | 2.62 | 2.93 | "..." | already @ 3.242 |
... etc

## Per-beat direction

(One block per beat — see template below)
```

## Each beat is a WORLD, not a layout

The single biggest quality lever in this entire workflow. Before you write CSS specs and GSAP timing, **describe what the viewer EXPERIENCES.** The pixel decisions follow from that.

**Mediocre (don't):** "Blue background. `$1` headline in white, 220px. Sparkline below. Bloom-logo top-left."

**Great (do):** "We're inside Bloom's color world — vibrant blue confidence. The dollar sign STAMPS in like a stamp on a hand, owning the frame. A sparkline RIPPLES across underneath, drawing itself in real-time, ending in a tiny spark. The viewer feels: 'one dollar can become something.'"

The first describes pixels. The second describes a moment a viewer remembers. Write the second, then derive the pixels.

**Apply this to every beat's `Concept` field.** If you can't describe the moment without using CSS terms, you haven't designed it yet.

---

## Mood direction (cultural anchors, not hex codes)

Bloom's brand is locked (DESIGN.md), but each beat still has its own emotional register. Anchor it with a cultural reference, not a list of colors. Examples:

- "Apple keynote stat-reveal — clean, confident, the number commands silence."
- "Mobile-game level-complete burst — joyful, percussive, dopamine."
- "iMessage thread aesthetic — familiar, casual, scroll-y."
- "Vintage textbook chart — authoritative, hand-drawn-feeling sparkline."
- "Streetwear drop countdown — anticipation, sharp typographic snap."

These anchors guide the sub-agent's micro-decisions (easing curve, particle density, idle motion shape) far better than any spec list.

---

## Asset Audit (do this BEFORE writing per-beat blocks)

Inventory every asset that *could* appear in this lesson and assign each one a beat + role. Print this table at the top of STORYBOARD.md before the per-beat blocks:


Here is an example but dont be biased by it.
| Asset | Type | Assign to Beat | Role |
|---|---|---|---|
| `bloom-logo.png` | Brand mark | Beat 1 + Beat N (last) | Opener corner-mark + close-out hero |
| `logos/AAPL.png` | Stock logo | Beat 5 (Brand-reveal) | Slot 1 fill, dark `#1C2329` orb |
| `logos/NFLX.png` | Stock logo | Beat 5 (Brand-reveal) | Slot 4 fill |
| `generated-assets/piggy-bank.png` | Higgsfield 3D-lite | Beat 3 (Reframe) | Hero illustration, idle yoyo rotation |
| `generated-assets/broken-piggy.png` | Higgsfield 3D-lite | Beat 2 (Myth) | Problem-state hero, replaced by piggy-bank visually rhyming in Beat 3 |
| `generated-assets/iphone-bloom.png` | Higgsfield i2i | Beat 6 (Payoff) | Bloom UI proof |
| `generated-assets/tiny-icon.png` | Higgsfield cutout | SKIP | Doesn't add value, would clutter |

**Minimum utilization rules**:
- **`bloom-logo.png` MUST appear in the FIRST and LAST beats** — opener and close-out
- **Opening beat must contain a visual asset** — not text-only-on-color (typography hero is fine if it's a giant `$1` or counter, but bare bg+text fails)
- **Max 2 consecutive text-only beats** — the 3rd must contain an illustration, mockup, logo, sparkline, or particle field
- **Generated illustrations should pair across beats when the script supports a visual rhyme** — e.g. broken-piggy in the problem beat, healthy-piggy in the solution beat (only when natural — don't force)
- **Cut weak assets** — if you'd describe an asset's role as "decorative" or "fills space," skip it and let typography breathe

---

## Per-beat direction template

For each beat, fill in this template using the matching scaffold from [beat-library.md](beat-library.md):

```markdown
### BEAT N — <BeatType> (t = <start> → <end>)

**VO line:** "<full sentence(s) for this beat>"
**Keyword onset(s):** <word @ time>
**Bg:** `#1658FF` / `#FFFFFF` / `#F8F8F9`

**Concept:** <2-3 sentences describing the EXPERIENCE — what world are we in, what does the viewer feel, what's the metaphor. Not pixels.>

**Mood anchor:** <cultural reference — e.g. "Apple keynote stat-reveal", "iMessage thread", "vintage textbook chart">

**Composition (from [compositions-library.md](compositions-library.md)):** `<library-name>` (e.g. `hero-stat`, `convo-cascade`, `growth-curve`) **OR** `INVENT: <provisional-name>` with link to Higgsfield reference image
**Beat short-name:** `<short-name>` (e.g. `hook`, `myth1`, `bust1`, `cta`) — used as `#beat<N>-<shortname>` selector prefix in Step 6
**Techniques used (from [techniques.md](techniques.md)):** e.g. "#2 Canvas 2D ticker tape + #4 per-word kinetic typography"

**Layers:**
- z=0: <background, glow, ticker, or particles>
- z=1: <midground — phone/illustration/orbs>
- z=2-N: <foreground — headlines, badges, CTAs>

**Animation choreography:**
Every element gets a VERB. If you can't name the verb, the element is not yet designed.

| Energy | Verbs you can use |
|---|---|
| **High impact** (Hook, Stat-reveal punchline, Insight slam) | SLAMS, STAMPS, PUNCHES, CRASHES, SHATTERS, BURSTS |
| **Medium** (Concept, Examples row entrances, Brand-reveal logos) | CASCADE, SLIDES, DROPS, FILLS, DRAWS, RIPPLES |
| **Low / ambient** (idle motion, supporting elements) | drifts, FLOATS, breathes, COUNTS UP, types on, fades in |

- <element>: <VERB + entrance> at <time> — `tl.fromTo(...)` with `landOn("phrase", dur)`
- All keyword-synced entrances: anchored via `landOn(phrase, duration)` so they LAND on the topic word

**Transition out:** crossfade to next scene at <time>; `tl.set(visibility:hidden, exitEnd)`

**Assets used:** <filenames>
```

## Pulling scaffolds from the library

Each beat type in [beat-library.md](beat-library.md) has a defined visual scaffold. **Copy the scaffold into the per-beat block, then customize the topic-specific copy/assets.** Don't re-invent the wheel.

For example, if Step 2 proposed a `Stat-reveal` beat for "$30/month → $16,000", look up Stat-reveal in beat-library.md → copy its scaffold (counter animation, big numeric, label below) → fill in the actual numbers and bg.

## Animation choreography rules (universal)

These apply to every beat:

1. **Land entrances on TOPIC word, not punchline** — anchoring entrance to the FINAL keyword leaves <1s dwell before scene cut. Land on the topic announcement (e.g. "Myth N", "On Bloom", "You can choose"); use the punchline word for the SECONDARY reaction pulse. See [animation-patterns.md § entrance/idle/reaction triad](animation-patterns.md).
2. **Every visible asset has motion** — entrance + idle (`sine.inOut yoyo`) + reaction. Static images on screen >2s feel like a dead slide. The piggy-bank's 2.8s `rotation: 2` yoyo idle is the canonical example.
3. **`landOn(phrase, dur)` phrases must be unique** — multi-match throws. Use 2-3 word phrases (`"Myth two"`, `"here to make"`), not single common words. Mental check before each call: "is this phrase unique in the VO?"
4. **Vary easing** — at least 3 different eases per scene (`power3.out`, `back.out(1.7)`, `elastic.out(1, 0.55)`, `expo.out`, `sine.inOut`)
5. **First entrance offset** — start at 0.05-0.3s into the scene, never at scene-relative t=0
6. **Crossfade between scenes** — exit at `nextSceneStart - 0.18`, enter at `nextSceneStart - 0.08`, hide previous scene at `nextSceneStart + 0.2` via `tl.set({ visibility: "hidden" })`. Educational lessons stick to crossfade — no shader transitions, they fight the rhythm. Acceptable CSS-transition variants for special moments (use sparingly):
   - **Blur-through** — exit `blur:20px, opacity:0, 0.3s power3.in` → entry `blur:20px→0, opacity:0→1, 0.25s power3.out`. Good between Concept and Examples.
   - **Velocity-matched upward** — exit `y:-150, blur:30px, 0.33s power2.in` → entry `y:150→0, blur:30px→0, 1.0s power2.out`. Good between a stat-reveal A and B for a "kicked up a level" feel.
   - **Hard cut** — no exit, no entry. Good for percussive enumerations (3 examples cutting hard each on their VO word).
7. **Try-it + Brand-reveal share one scene** — no transition between them; the reveal is a continuation
8. **Text sizing applies to SVG `<text>` and stroke widths too** — the 36px-minimum rule isn't just for CSS `font-size`. SVG `<text font-size="22">` renders at 22 actual pixels when viewBox width matches display width — that reads as unreadable on phone. For SVG: scale up viewBox + matching values (font-size 42+, dot radius 22-26+, stroke-width 8-12) rather than lowering values to "fit." If you can't fit content readably, cut/simplify/move to another beat — don't shrink. Single-word labels (`Start`/`Time`/`Growth`) often unblock layouts that won't fit `Start Early`/`More Time`/`More Growth`.

## Look for dead air during storyboarding

Before locking the storyboard, walk through each scene mentally:

- Plot the scene start, every animation entrance, every reaction, and the scene end on a number line.
- **Find the longest gap with no animation firing.** If it's >2s with the asset frozen, plan an idle motion for that asset OR add a sub-element entrance OR split the beat.
- Hook scenes especially: the first foreground beat must land within 3 seconds of `t=0`. Reels viewers swipe in 2-3s if nothing's hooking them.

You'll formally run [`audit-timeline.mjs`](audit-timeline.mjs) in Step 7, but catching dead air at storyboard time avoids reworking GSAP later. **The audit is a check, not a discovery tool — design the timeline to pass it.**

## Don't reach for templates

Each video opens fresh. The script's wording dictates what visuals fit best — be creative per beat:

- An enumeration ("from X, Y, or Z") might call for cascading message cards, a scrolling phone feed, sequential icons popping in, a comic-strip sequence, etc.
- A myth-busting structure naturally suggests a problem→solution visual rhyme (broken→intact piggy bank, locked→open vault) but only when the SCRIPT supports it. Forced rhymes feel manufactured.
- The first beat is whatever best hooks this specific topic — there is no mandatory opening pattern.

Reference the past videos for *inspiration*, never as templates to copy. The strongest beats in production were one-off creative responses to specific lines.

## Worked example: a Stat-comparison block

Source beat: "$30 a month saved becomes $16,000. But $30 invested becomes $380,000."
Step 2 proposed: Stat-reveal A (gray) → Stat-reveal B (blue).

```markdown
### BEAT 5 — Stat-reveal A (t = 16.40 → 20.10)

**VO line:** "$30 a month saved from age 18 becomes $16,000 by age 65."
**Keyword onset:** "$16,000" @ 18.50
**Bg:** `#F8F8F9` soft gray (neutral)

**Concept:** Show the savings-only outcome. Subdued, almost disappointing.

**Layers:**
- z=0: faint Canvas 2D particle field (deterministic)
- z=2: big italic-caps numeral counter `0 → 16,000+`, label "BY AGE 65" below
- z=3: small gray "SAVING ALONE" eyebrow

**Animation choreography:**
- Counter: `tl.to(numProxy, { v: 16000, ... })` lands at 18.50, dur 1.25s power2.out → schedule at 17.25
- Label fades in at 18.50 (counter lands)

**Transition out:** crossfade to Beat 6 at 20.10

**Assets used:** none (pure HTML/CSS/JS)

---

### BEAT 6 — Stat-reveal B (t = 20.10 → 24.30)

**VO line:** "But $30 a month invested becomes $380,000."
**Keyword onset:** "$380,000" @ 22.30
**Bg:** `#1658FF` Bloom blue (emphatic — Stat-comparison contrast)

**Concept:** The PUNCHLINE. Same input, dramatically different output. Color shift + particle burst signals the magnitude.

**Layers:**
- z=0: particle burst Canvas 2D (white + yellow sparks fire on `$380,000` keyword)
- z=2: giant italic-caps counter `0 → 380,000+` (220px Inter Tight 800), green positive trail
- z=3: small white "INVESTING" eyebrow + small "* assuming 10% annual return" footnote
- z=4: optional Bloom logo corner

**Animation choreography:**
- Counter ramps up 17,000 → 380,000 from 21.05 → 22.30 (lands AT keyword), `power3.out`
- Particle burst fires AT 22.30, fades over 1.6s
- Eyebrow + footnote fade in at 21.0

**Transition out:** crossfade to next beat at 24.30

**Assets used:** none
```

## Gate

- [ ] Every beat in `SCRIPT.md` has a matching `### BEAT N` block in `STORYBOARD.md`
- [ ] Real beat timings from `transcript.json` plugged in (not estimates)
- [ ] Keyword onsets recorded for back-timing entrance animations
- [ ] Each beat references its scaffold from [beat-library.md](beat-library.md)
- [ ] Composition rules still pass after timing adjustments (re-walk the checklist if you tweaked anything)
- [ ] Asset inventory matches what's actually generated/copied
