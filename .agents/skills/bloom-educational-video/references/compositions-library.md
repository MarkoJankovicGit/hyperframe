# Compositions Library (growing)

A growing catalog of **scene compositions** (not beat types). A "composition" is a specific visual treatment for a moment — *how* the frame is staged, not *what kind* of beat it is. Multiple compositions can serve the same beat type; the same composition can serve different beat types.

## How to use this file (the evolution mechanism)

When you write the storyboard (Step 4), for each beat:

1. **Scan this library first.** Find a composition that fits the moment. If one fits, use it as-is. Note its `name` in the storyboard's per-beat block. Step 6 will lift the HTML/CSS sketch from here.
2. **If nothing fits, INVENT.** Don't force a bad fit just because something exists.
3. **To invent:** call Higgsfield gpt_image_2 with a 9:16 prompt describing the moment in editorial-frame language (see "Invention flow" below). Get a visual reference back. Translate that reference into HTML/CSS/SVG/GSAP for the beat.
4. **Document the new composition back here** when delivering the lesson. Add it as a new entry below with name, when-to-use, sketch, and notes. The library grows by exactly one composition each time a lesson calls for something new.

**Never limit yourself to existing entries.** This library is a starting point and a memory, not a constraint. Half the entries below were retroactively documented from the v1 lesson — every new lesson should add at least one entry that would have been "INVENT" the first time it appeared.

## Invention flow (when no existing composition fits)

```python
mcp__higgsfield__generate_image({
  model: "gpt_image_2",
  aspect_ratio: "9:16",
  resolution: "1k",
  quality: "low",
  prompt: """
    Vertical 1080x1920 frame for a short-form Bloom in-app educational video.
    Scene: {one-sentence describing the moment — e.g. "iPhone lock-screen showing
    three message notifications stacked from FRIEND, FAMILY, and INSTAGRAM, each
    with bad investing advice"}.
    Aesthetic: clean, designed, in-app polish — Bloom blue #1658FF accent, warm
    cream surfaces, near-black ink, subtle paper grain. Typography is editorial
    Inter Tight italic 700 for headlines. No glow on type. No status pills. No
    SaaS feature-card grids.
    Mood: {trusted-older-sibling, confident, slightly playful, never alarmist}.
  """
})
```

Use the returned image as a **visual reference**, not a final asset. Translate the layout into native HTML/CSS/SVG/GSAP. You may also pass the reference image (via `medias`) when generating supporting illustrations so styling stays consistent.

After the video ships, write a new entry in this file describing the composition: what it visualizes, the layout zones, the entrance choreography, and the HTML/CSS skeleton.

---

## Entry template (use when adding a new composition)

```markdown
### <Composition name>

**When to use:** <one-line trigger — what moment does this serve>
**Beat types this fits:** <Hook / Concept / Stat-reveal / etc.>
**Bg:** <Bloom blue / cream / white / gray>

**Visual:** <2-3 sentence description of what the viewer SEES — the staging, not the CSS>

**Layout zones:**
- <where the hero lives>
- <where supporting copy lives>
- <where brand mark lives>

**Choreography:**
- <element>: <verb> on <keyword phrase>
- <element idle>: <yoyo motion>

**HTML sketch:**
```html
<!-- minimal markup -->
```

**CSS notes:** <any non-obvious rules>

**First seen:** <lesson slug, beat #>
```

---

## Seed entries

These are the strongest patterns from the v2 build (and a few worth borrowing). Each is a starting point — feel free to reskin per topic.

### Hero typographic stat (`hero-stat`)

**When to use:** A single number or 1–2-word phrase IS the moment. The number must dominate the frame.
**Beat types this fits:** Stat-reveal, Hook (with a curiosity number), Bust answer ("$1")
**Bg:** Bloom blue (emphatic) or cream (clinical)

**Visual:** One enormous numeral or word centered, taking 60–70% of the vertical frame. Tiny eyebrow above ("START WITH JUST") names what the number means. A small Bloom mark in a corner anchors the brand. Nothing else competes.

**Layout zones:**
- Center: hero text (font-size 480–600px for a single-character number, 200–280px for a word)
- 380–460px from top: tiny editorial eyebrow (32–48px Inter mono caps, letter-spacing 0.22em)
- Corner: 110px Bloom logo orb (dark `#1C2329`)

**Choreography:**
- Hero: scale 2.0→1.0 + opacity 0→1, `settle` ease, 0.7s, lands ON the spoken number
- Eyebrow: y -20→0 + opacity 0→1, `snapIn` ease, 0.4s, lands 0.3s before the number
- Hero idle: `scale 1.025` yoyo over 1.5s for breath

**CSS notes:** `font-variant-numeric: tabular-nums` mandatory. NO text-shadow. Hero color is `#FFF1E5` cream on blue bg, or `#1658FF` blue on cream bg.

**First seen:** bloom-investing-myths-v2 beat 5 (`$1`)

---

### Counter ramp ON stat reveal (`counter-ramp`)

**When to use:** A stat that needs the *animation* to do work — "1 million users" feels much bigger when the digits roll up.
**Beat types this fits:** Stat-reveal, Bust (proof point)
**Bg:** Bloom blue (emphatic) or gray (subdued)

**Visual:** A counter starts at 0 and ramps to the target value, landing ON the spoken phrase. A green `+` modifier sits next to the number to show "and growing." A small label below names the unit ("USERS LEARNING ON BLOOM").

**Layout zones:**
- Center: counter (200–280px Inter Tight italic 700) + green `+` (same size, color `#01CD74`)
- Below: label (48–64px caps, mono or Inter)
- Top: small "WRONG" or "PROOF" pill (optional)

**Choreography:**
- Counter: `gsap.to(proxy, { v: <target>, duration: 1.4, ease: "settle" })` landing at `landAfter("phrase")`
- Counter readout uses `Math.round` and short suffix (`K+` / `M+`) to avoid ugly long-tail digits
- Counter pulses scale 1.08 yoyo on landing

**CSS notes:** `font-variant-numeric: tabular-nums` non-negotiable.

**First seen:** bloom-investing-myths-v2 beat 3

---

### Brand-bookend (`brand-bookend`)

**When to use:** Final CTA / opening brand-set. The Bloom mark IS the frame.
**Beat types this fits:** CTA-close, Hook (brand-led)
**Bg:** Bloom blue

**Visual:** Bloom logo center-frame in a white rounded-rect (60px radius, soft elevation shadow), 280px square. A `GET BLOOM` (or topic) pill below, full-pill rounded. Optional faint star/sparkle behind the logo (low opacity 0.3).

**Layout zones:**
- Vertical center: logo card (280×280)
- Below logo: black pill button (font 96px italic 700, padding 36×64px)
- Below pill: tagline at 44px caps mono, letter-spacing 0.22em

**Choreography:**
- Logo: scale 0→1 + opacity 0→1, `settle`, 0.55s
- Logo idle: `scale 1.05` yoyo
- Pill: y 60→0 + opacity 0→1, `snapIn`, 0.45s, lands on phrase
- Particle burst (Canvas2D) fires on closing word — yellow + cream sparks radiating from logo

**CSS notes:** No glow on the logo card. Use box-shadow for elevation only (`0 30px 80px rgba(0,0,0,0.35)`).

**First seen:** bloom-investing-myths-v2 beat 10

---

### Editorial myth-claim card (`myth-claim`) — REPLACES the v2 `MYTH 01 — SPECIMEN` pattern

**When to use:** Naming the wrong belief that the lesson will bust.
**Beat types this fits:** Myth setup
**Bg:** cream (`#F8F4ED`) or white

**Visual:** A serif italic pull-quote dominates the upper half — large Playfair-Display-style italic 700 at 110–140px, set in quotation marks. A small Inter-mono attribution underneath says where the myth was "heard" (`— overheard at thanksgiving`, `— TikTok comment, 2024`). A faint hand-drawn red strikethrough sweeps diagonally across the quote on the punchline word, growing via `stroke-dashoffset`. **No black headline badge. No `MYTH 01` pill.**

**Layout zones:**
- Top 60%: italic serif quote (centered, 80% width)
- Bottom of quote: small attribution (44–48px Inter, ink-mute)
- Diagonal SVG: red marker stroke (stroke-width 18, color `#fe566b`, stroke-linecap "round")

**Choreography:**
- Quote: word-by-word reveal via SplitText, 0.12s stagger, `snapIn`, lands on opening words
- Attribution: y 12→0 + opacity 0→1 after quote completes
- Strikethrough: `stroke-dashoffset` full→0, 0.55s, `settle`, lands ON the punchline word

**CSS notes:** Quote font: `"Playfair Display", "Inter Tight", serif; font-style: italic; font-weight: 700;`. Use cream bg with subtle paper grain.

**First seen:** TBD (this is the proposed rebuild for v2 myth scenes — seeded so first lesson to use it gets a reference)

---

### Bust reveal with checkmark + insight (`bust-checkmark`) — REPLACES v2 shield+glow pattern

**When to use:** Direct rebuttal of a stated myth, with a single-sentence insight.
**Beat types this fits:** Bust answer (post-Myth)
**Bg:** Bloom blue

**Visual:** Top of frame: a green check-circle (140px) draws itself in with a stroke-dashoffset reveal, alongside a `WRONG.` black-pill. Center of frame: a single italic-700 sentence in cream — the actual bust ("Anybody can invest"). Bottom: a small Bloom mark + sub-line ("Bloom shows you how").

**Layout zones:**
- Top quarter: WRONG pill + check-circle, horizontally aligned, gap 28px
- Center: cream italic sentence, 96–110px, max-width 900px
- Bottom: Bloom mark corner + small caption

**Choreography:**
- WRONG pill: y -40→0 + scale 0.8→1, `snapIn`, lands on "Wrong"
- Check stroke: dashoffset 100→0, `settle`, 0.45s
- Sentence: word-reveal, 0.12s stagger, `snapIn`
- Caption: y 12→0 + opacity 0→1 after sentence

**CSS notes:** No `box-shadow` glow on the check-circle. No radial-gradient bg. Just solid Bloom blue with grain overlay.

**First seen:** TBD (proposed rebuild)

---

### Conversation cascade (`convo-cascade`)

**When to use:** The script enumerates 2-4 sources of input ("from a friend, family, or social media").
**Beat types this fits:** Hook (problem-source enumeration), Examples (when items are conversational)
**Bg:** Bloom blue or cream

**Visual:** 2-4 chat-bubble cards cascading in from alternating sides. Each card has a small "FROM ___" label in tiny caps + a quoted line in italic 700. The cards visually overlap slightly (rotation -2deg / +2deg) so the stack reads as a chat log, not a grid. After all land, they shake-exit on a transitional word ("misconceptions") and the headline reveals.

**Layout zones:**
- 3 stacked cards centered vertically, 760px wide each, alternating `align-self: flex-start / flex-end` with 80px margin
- Bottom: headline appears after cards exit

**Choreography:**
- Card 1: x -800→0, opacity 0→1, rotation -6→-2, `snapIn`, lands on first source word
- Card 2: x +800→0, mirrored, lands on second source
- Each card idles with `y -8` yoyo over 1.5s
- All cards exit via x ±1100 + rotation, `snapOut`, 0.55s, on transitional word

**CSS notes:** Cards bg `#FFF1E5` cream (NOT pure white). Border-radius 38px asymmetric (`border-bottom-left-radius: 12px` to suggest chat-bubble tail). No drop-shadow glow — just `box-shadow: 0 24px 60px rgba(6,10,30,0.32)` for elevation.

**First seen:** bloom-investing-myths-v2 beat 1 (rebuild target — was using `#fff` flat cards)

---

### Growth curve with milestones (`growth-curve`)

**When to use:** Time-vs-value visualization. "$1 today → big later" type beats.
**Beat types this fits:** Bust (time = growth), Concept (compounding)
**Bg:** Bloom blue

**Visual:** A horizontal SVG path draws itself across the lower half — starts low-left at a small `$1` milestone, sweeps up through a middle `$$$` milestone, ends at a large `BIG` milestone in the top-right. A moving dot follows the curve. The whole chart sits below a 50–60px caption ("TIME = GROWTH"). Headline below the chart.

**Layout zones:**
- Mid: SVG chart 960×600 (centered with overflow allowed)
- Above chart: caption (mono caps 48–56px)
- Below chart: black headline pill ("Start Earlier")

**Choreography:**
- Curve: `stroke-dashoffset` full→0, 1.2s, `settle`, lands ON the topic phrase
- Dot: motion-tween along the curve via two `attr: { cx, cy }` segments
- Milestones: pop in (scale 0.5→1, `snapIn`) staggered as the dot passes each
- Final milestone pulses scale 1.08 yoyo

**CSS notes:** Curve color `#01CD74` (success green). Milestone fills `#fff` with green stroke. NO glow on stroke.

**First seen:** bloom-investing-myths-v2 beat 7

---

(Additional entries are added below by future lessons. Use the entry template above.)
