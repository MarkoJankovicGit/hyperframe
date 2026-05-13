# STORYBOARD — Bloom Lesson: Investing Myths (V2)

**Format:** 1080×1920 portrait @ 30fps
**Duration:** ~67s (from VO)
**Audio:** ElevenLabs v3 (`JZ3e95uoTACVf6tXaaEi`)
**Style:** DESIGN.md (Bloom brand)
**Beat sequence:** Hook → Myth1 → Bust1 → Myth2 → Bust2($1) → Myth3 → Bust3 → Myth4 → Bust4 → CTA-close

## Beat plan (real timings from transcript)

| # | Beat type | Bg | Start | End | Dur | VO summary | Key topic anchor |
|---|---|---|---|---|---|---|---|
| 1 | Hook | blue | 0.00 | 9.50 | 9.50 | "You might have heard…facts." | "give you the" |
| 2 | Myth1 | white | 9.50 | 15.50 | 6.00 | "Myth one: investing is hard…Boomers." | "Myth one" |
| 3 | Bust1 | blue | 15.50 | 24.40 | 8.90 | "Wrong. Anybody can invest…on Bloom." | "Anybody can" / "one million" |
| 4 | Myth2 | white | 24.40 | 28.50 | 4.10 | "Myth two: you need a lot of money to start." | "Myth two" |
| 5 | Bust2 | blue | 28.50 | 36.40 | 7.90 | "Wrong. On Bloom…just one dollar. Even small amounts grow big over time." | "one dollar" |
| 6 | Myth3 | gray | 36.40 | 42.00 | 5.60 | "Myth three: I don't have time…I'll start later." | "Myth three" |
| 7 | Bust3 | blue | 42.00 | 50.10 | 8.10 | "Wrong. Bloom lets you learn and invest at your own pace. The earlier you start, the more time…grow." | "your own pace" / "earlier you start" |
| 8 | Myth4 | white | 50.10 | 56.30 | 6.20 | "Myth four: I'll lose all my money. Investing is super risky." | "Myth four" |
| 9 | Bust4 | gray | 56.30 | 62.40 | 6.10 | "Wrong. You can always choose safer investments, and Bloom teaches you exactly what to pick." | "safer investments" |
| 10 | CTA-close | blue | 62.40 | 67.00 | 4.60 | "Stop guessing. Get Bloom and start investing today." | "Get Bloom" |

bg sequence: blue → white → blue → white → blue → gray → blue → white → gray → blue ✓ (no consecutive same)

## Asset inventory

| Asset | Type | Beat | Role |
|---|---|---|---|
| `bloom-logo.png` | Brand mark | 1, 3, 5, 7, 9, 10 | Anchor + close-out hero |
| `bloom-star.png` | Brand accent | 10 | CTA particle accent |
| Inline SVG checkmark `#01CD74` | icon | 3, 5, 7, 9 | "Bust" reveal mark |
| Inline SVG cross `#fe566b` (red, allowed for myth/error) | icon | 2, 4, 6, 8 | "Myth" stamp |
| Inline SVG sparkline | accent | 5, 7 | "$1 → big" growth |
| Inline SVG shield | accent | 9 | "safer" |
| Inline SVG message bubbles | hook | 1 | "friends/family/social" cascade |

No Higgsfield generations needed — typography + Bloom marks + inline SVG carry this.

---

## Per-beat direction

### BEAT 1 — Hook (t = 0 → 9.50)

**VO:** "You might have heard things about investing from friends, family, or social media. There are a lot of misconceptions out there. So we're here to give you the facts."

**Concept:** We open inside a noisy informational world. Three sources of advice — phone-message-style cards labelled FRIEND / FAMILY / SOCIAL — cascade in left/right/left as the narrator names each source. Then the cards SLAM offscreen and the brand badge "MYTH BUSTERS" punches in for the payoff line "give you the facts." The viewer feels: "I've heard this stuff — and now Bloom is going to set the record straight."

**Mood anchor:** iMessage thread aesthetic mixed with TV myth-busting opener.

**Sub-comp file:** `compositions/beat-1-hook.html`
**Techniques:** #2 Canvas 2D ticker noise (very faint white dots) + #4 per-word kinetic typography on the badge

**Layers:**
- z=0: Bloom blue bg + faint Canvas noise particles
- z=1: 3 chat-bubble cards (FRIEND, FAMILY, SOCIAL) cascading
- z=2: Top eyebrow "BLOOM SAYS"
- z=3: Final black headline badge "GIVE YOU THE FACTS"

**Choreography:**
- Card 1 (FRIEND) SLIDES in from left lands on "friends" — `landOn("friends", 0.45)`
- Card 2 (FAMILY) SLIDES in from right lands on "family" — `landOn("family", 0.45)`
- Card 3 (SOCIAL) SLIDES in from left lands on "social media" — `landOn("social media", 0.45)`
- Cards SHAKE-EXIT on "misconceptions" (scatter outward)
- Eyebrow "BLOOM SAYS" fades in at `landOn("So we're", 0.4)`
- Big headline badge "GIVE YOU THE FACTS" SLAMS on `landOn("give you the", 0.5)`
- Bloom-logo small in top-left lights up at `at("Bloom") - 0` (during "Bloom says")
- Idle: each card y-bobs gently while alive

**Transition out:** crossfade at 9.30; `tl.set("#beat1", { visibility: "hidden" }, 9.50)`

---

### BEAT 2 — Myth1 (t = 9.50 → 15.50)

**VO:** "Myth one: investing is hard and complicated, and it's only for Boomers."

**Concept:** Clinical, almost-textbook frame. A red diagonal "MYTH" stamp slams down over a black headline badge that types out the claim. The viewer feels: "this is the thing people SAY — let's pin it like a specimen."

**Mood anchor:** Vintage textbook diagram with a red rejection stamp.

**Sub-comp file:** `compositions/beat-2-myth1.html`
**Techniques:** #4 per-word kinetic typography + SVG stamp

**Layers:**
- z=0: White bg, faint hairline grid (subtle, 4% opacity)
- z=1: "MYTH 01" eyebrow top
- z=2: Black headline badge multi-line: "INVESTING IS HARD AND ONLY FOR BOOMERS"
- z=3: Red diagonal "MYTH" stamp SVG (ring + text inside, `#fe566b`)

**Choreography:**
- "MYTH 01" eyebrow slides down on `landOn("Myth one", 0.35)`
- Badge SLAMS in (scale 0.7→1, back.out 1.7) on `landOn("Myth one", 0.45)`
- Sub-lines reveal per-word ("hard and complicated" lands on "complicated")
- Red stamp ROTATES + SCALES in on `landOn("Boomers", 0.35)` — punchline reaction
- Idle: badge gently breathes (scale 1.005 yoyo)

**Transition out:** crossfade at 15.30; visibility hidden at 15.50.

---

### BEAT 3 — Bust1 (t = 15.50 → 24.40)

**VO:** "Wrong. Anybody can invest, and Bloom makes it easy. Over one million users are already learning and investing on Bloom."

**Concept:** The myth gets BUSTED. A green checkmark sweeps in alongside "WRONG" — then we transition to a giant stat counter that ramps from 0 → 1,000,000+ users, with the Bloom logo orbiting. Confident, celebratory.

**Mood anchor:** Apple keynote stat-reveal — clean number commands silence.

**Sub-comp file:** `compositions/beat-3-bust1.html`
**Techniques:** #2 particle burst + counter animation + SVG draw on checkmark

**Layers:**
- z=0: Bloom blue bg + ambient particles
- z=1: Green checkmark SVG (path-draws in)
- z=2: Top headline "WRONG" black badge (then morph-replaces with stat)
- z=3: Counter "1,000,000+" giant italic, "USERS LEARNING ON BLOOM" eyebrow below
- z=4: Bloom logo top-left

**Choreography:**
- Green checkmark draws in on `landOn("Wrong", 0.3)` (path-stroke 0→full)
- "WRONG" badge SLAMS in concurrently
- Eyebrow "EVERYONE'S DOING IT" slides in on `landOn("Anybody can", 0.35)`
- Sub-text "Bloom makes it easy" fades in on `landOn("makes it", 0.4)`
- Counter ramps `0 → 1000000` lands at `landAfter("one million", 0)` — `power3.out`, dur 1.4
- "USERS" label fades in at the same moment
- Particle burst fires at `landAfter("one million", 0)`
- Bloom logo breathes (scale 1.04 yoyo)
- Reaction pulse on `landOn("on Bloom.", 0)` — counter scales 1.06 yoyo

**Transition out:** crossfade at 24.20; visibility hidden at 24.40.

---

### BEAT 4 — Myth2 (t = 24.40 → 28.50)

**VO:** "Myth two: you need a lot of money to start."

**Concept:** Same clinical specimen frame as Myth1 — the recurring scaffold becomes a familiar visual contract. Stamp slams again.

**Sub-comp file:** `compositions/beat-4-myth2.html`
**Techniques:** #4 per-word + SVG stamp

**Layers / choreography:** Same scaffold as Beat 2. Eyebrow "MYTH 02", badge "YOU NEED A LOT OF MONEY", red MYTH stamp on `landOn("money to", 0.35)`.

**Anchors:**
- Eyebrow on `landOn("Myth two", 0.35)`
- Badge slam on `landOn("Myth two", 0.45)`
- Stamp on `landOn("money to", 0.35)`

---

### BEAT 5 — Bust2 (t = 28.50 → 36.40)

**VO:** "Wrong. On Bloom, you can start investing with just one dollar. Even small amounts can grow big over time."

**Concept:** A giant "$1" STAMPS into the frame — owning the screen, audacious. A green sparkline RIPPLES out from the dollar sign rising upward as the narrator says "grow big over time," ending in a tiny burst at the top-right. Bloom blue bg amplifies it.

**Mood anchor:** Streetwear drop countdown — sharp typographic snap.

**Sub-comp file:** `compositions/beat-5-bust2.html`
**Techniques:** #1 SVG path drawing (sparkline) + counter-style "$1" stamp + #2 particle burst

**Layers:**
- z=0: Bloom blue + faint particles
- z=1: Top eyebrow "START WITH"
- z=2: Giant "$1" hero (white, 600px, italic)
- z=3: Green sparkline SVG (rising curve to top-right)
- z=4: Sub-text "GROW IT BIG OVER TIME" badge below
- z=5: Bloom logo bottom-right

**Choreography:**
- "WRONG" tiny badge corner slides in at `landOn("Wrong", 0.3)` (small + top-left)
- "START WITH" eyebrow slides in on `landOn("On Bloom", 0.35)`
- "$1" STAMPS down (scale 1.6 → 1, opacity 0 → 1, blur 20→0) on `landOn("one dollar", 0.5)`
- Sparkline path-draws on `landOn("grow big", 0.7)` (stroke-dashoffset full → 0)
- Particle burst at end of sparkline on `landAfter("over time", 0)`
- "GROW IT BIG OVER TIME" badge slides in at `landOn("over time", 0.4)`
- "$1" idle: gentle scale 1.02 yoyo

---

### BEAT 6 — Myth3 (t = 36.40 → 42.00)

**VO:** "Myth three: I don't have time to invest now, so I'll start later."

**Concept:** Same scaffold (myth specimen frame) — but on `#F8F8F9` soft gray background to create the third bg-color in the sequence and break up the white myth pattern.

**Sub-comp file:** `compositions/beat-6-myth3.html`
**Techniques:** #4 per-word + SVG stamp + ticking clock SVG accent

**Layers:** Same as Myth1/2 + a small hand-of-clock SVG (rotating slowly idle).

**Anchors:**
- Eyebrow "MYTH 03" on `landOn("Myth three", 0.35)`
- Badge "NO TIME TO INVEST" slam on `landOn("Myth three", 0.45)`
- Sub "I'll start later" fades in on `landOn("start later", 0.35)`
- Stamp on `landOn("start later", 0.35)`
- Clock idle: SVG hand rotation +360 over 6s (one revolution, sine.inOut)

---

### BEAT 7 — Bust3 (t = 42.00 → 50.10)

**VO:** "Wrong. Bloom lets you learn and invest at your own pace. The earlier you start, the more time your money has to grow."

**Concept:** A horizontal timeline DRAWS itself across the frame, with three milestone dots — small at left ("$"), medium at middle, big at right ("BIG"). A coin/dot moves along the timeline as the narrator says "earlier you start", ending at a glowing endpoint. The viewer feels TIME = GROWTH viscerally.

**Mood anchor:** Apple keynote chart reveal.

**Sub-comp file:** `compositions/beat-7-bust3.html`
**Techniques:** #1 SVG path drawing (timeline + dot trail) + #9 MotionPathPlugin (dot along timeline)

**Layers:**
- z=0: Bloom blue + ambient particles
- z=1: Top "WRONG" small corner badge
- z=2: Eyebrow "TIME = GROWTH"
- z=3: SVG timeline horizontal stroke + 3 milestone circles (small/med/big) + curve rising
- z=4: Black badge "EARLIER YOU START" appears under timeline
- z=5: Bloom logo top-right

**Choreography:**
- "WRONG" corner badge slides in on `landOn("Wrong", 0.3)`
- Eyebrow on `landOn("at your own", 0.35)`
- Timeline path draws stroke-dashoffset full → 0 on `landOn("earlier you start", 0.9)`
- Dot motion-path along timeline on `landOn("earlier you start", 0.9)`
- 3 milestone circles pop in staggered (0.15s apart) following the dot
- "EARLIER YOU START" badge slides up on `landAfter("earlier you start", 0.4)`
- "MORE TIME, MORE GROWTH" small caption fades in on `landOn("more time", 0.4)`
- Bloom logo breathes idle

---

### BEAT 8 — Myth4 (t = 50.10 → 56.30)

**VO:** "Myth four: I'll lose all my money. Investing is super risky."

**Concept:** Specimen frame again. The badge text reads "I'LL LOSE ALL MY MONEY" with a small red downward sparkline scribbling under it (the "loss" connotation is the only place red is allowed). Stamp slams on "super risky."

**Sub-comp file:** `compositions/beat-8-myth4.html`
**Techniques:** #1 SVG path drawing (red downward sparkline) + #4 per-word + SVG stamp

**Anchors:**
- Eyebrow "MYTH 04" on `landOn("Myth four", 0.35)`
- Badge slam on `landOn("Myth four", 0.45)`
- Sub-line "INVESTING IS SUPER RISKY" fades in on `landOn("super risky", 0.4)`
- Red downward sparkline draws in on `landOn("lose all my money", 0.7)`
- Stamp on `landOn("super risky", 0.35)`

---

### BEAT 9 — Bust4 (t = 56.30 → 62.40)

**VO:** "Wrong. You can always choose safer investments, and Bloom teaches you exactly what to pick."

**Concept:** A blue SHIELD SVG draws in (stroke-dashoffset reveal) with a green checkmark settling into its center. Behind the shield: a soft radial glow. Calm, protective, confident.

**Mood anchor:** Insurance-ad reassurance — but Gen-Z fintech, never corporate.

**Sub-comp file:** `compositions/beat-9-bust4.html`
**Techniques:** #1 SVG path drawing (shield + checkmark) + radial glow

**Layers:**
- z=0: Soft gray `#F8F8F9` bg + radial blue glow center
- z=1: Big SVG shield (blue stroke, draws in)
- z=2: Green checkmark inside shield (pops in after shield)
- z=3: Headline badge "CHOOSE SAFER" below
- z=4: Sub-line "BLOOM SHOWS YOU HOW"
- z=5: Bloom logo top-right

**Choreography:**
- "WRONG" tiny corner badge on `landOn("Wrong", 0.3)`
- Shield path-draws on `landOn("safer investments", 0.9)`
- Green check pops in (scale 0 → 1, back.out) on `landAfter("safer investments", 0)`
- "CHOOSE SAFER" badge slides up on `landOn("safer investments", 0.45)`
- "BLOOM SHOWS YOU HOW" sub-line fades in on `landOn("Bloom teaches", 0.4)`
- Shield idle: gentle scale 1.02 yoyo
- Reaction pulse on `landOn("what to pick", 0)`

---

### BEAT 10 — CTA-close (t = 62.40 → 67.00)

**VO:** "Stop guessing. Get Bloom and start investing today."

**Concept:** Bloom logo center-frame, scale-bounces in with breathe loop. Black pill "GET BLOOM" punches in. Yellow Bloom star spins behind softly. Final affirmation moment.

**Mood anchor:** Mobile-game level-complete burst — joyful.

**Sub-comp file:** `compositions/beat-10-cta.html`
**Techniques:** #2 Canvas particle burst + bloom-logo scale-in + #1 SVG draw on tagline underline

**Layers:**
- z=0: Bloom blue + ambient particles
- z=1: Spinning yellow bloom-star (40% opacity, slow rotate)
- z=2: Bloom logo center (200px)
- z=3: Black pill "GET BLOOM" below
- z=4: Tagline "INVEST WITH CONFIDENCE" smallest below

**Choreography:**
- Star fades in immediately + slow rotate (sine.inOut, 8s)
- Bloom logo scale-bounces in on `landOn("Stop guessing", 0.5)` (scale 0 → 1, back.out 2)
- Pill "GET BLOOM" punches in on `landOn("Get Bloom", 0.4)`
- Tagline fades in on `landOn("start investing", 0.4)`
- Particle burst on `landAfter("today", 0)`
- Bloom logo breathes (scale 1.04 yoyo, repeat)
- Pill idle: subtle 1.03 scale yoyo

**Transition out:** crossfade at 66.80; visibility hidden at 67.00.
