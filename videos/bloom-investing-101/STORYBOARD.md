# STORYBOARD — Bloom Lesson 1: What Is Investing?

**Format:** 1080×1920 portrait @ 30fps
**Duration:** 55.84s
**Audio:** ElevenLabs v3 (`JZ3e95uoTACVf6tXaaEi`)
**Beat sequence:** Hook → Concept → Examples → Reframe → Stat-reveal A → Stat-reveal B → Insight → Tease

## Asset inventory
- `bloom-logo.png`, `bloom-star.png`
- `logos/NKE.png` — sneakers example
- `logos/SPY.png` — stocks example
- House: inline SVG (no logo needed)

## Beat plan (real timings from transcript)

| # | Beat | Bg | Start | End | Dur | Keywords |
|---|---|---|---|---|---|---|
| 1 | Hook | blue | 0.00 | 2.54 | 2.54s | sleeping @ 1.889 |
| 2 | Concept | white | 2.54 | 9.65 | 7.11s | investing. @ 3.978, Investing @ 4.746 |
| 3 | Examples | blue | 9.65 | 12.57 | 2.92s | sneakers @ 9.979, houses @ 11.004, stocks @ 11.745 |
| 4 | Reframe | white | 12.57 | 24.10 | 11.53s | saving @ 14.201, But @ 19.281, work @ 21.565 |
| 5 | Stat-reveal A | gray | 24.10 | 32.56 | 8.46s | sixteen @ 29.406 |
| 6 | Stat-reveal B | blue | 32.56 | 45.00 | 12.44s | dollars(380k) @ 40.275 |
| 7 | Insight | white | 45.00 | 49.22 | 4.22s | time @ 46.764, patience @ 47.491, discipline @ 48.510 |
| 8 | Tease | blue | 49.22 | 55.84 | 6.62s | wealth @ 51.798, Bloom @ 52.700 |

Bg sequence: blue → white → blue → white → gray → blue → white → blue ✅

---

### BEAT 1 — Hook (t = 0.00 → 2.54)

**VO:** "Did you know you can make money while you're sleeping?"
**Keywords:** sleeping @ 1.889
**Bg:** `#1658FF`

**Layers:**
- z=0: Canvas 2D ticker tape (mulberry32 seed=2024, 6 cols, 20px/s scroll, 12-34% opacity)
- z=1: Eyebrow pill "DID YOU KNOW?"
- z=2: Black badge "MONEY WHILE / YOU SLEEP" (110px Inter Tight 800 italic)

**Choreography:**
- Eyebrow: fade+slide in at 0.20
- Badge: `back.out(1.7)` scale bounce at 1.889 - 0.4 = **1.489**

---

### BEAT 2 — Concept (t = 2.54 → 9.65)

**VO:** "Well, say hi to investing. Investing means buying anything that can increase in value over time."
**Keywords:** investing. @ 3.978, Investing @ 4.746
**Bg:** `#FFFFFF`

**Layers:**
- z=1: Eyebrow "SAY HI TO" (muted dark)
- z=2: Black badge "INVESTING" (130px)
- z=3: Definition body "Buying anything that can **increase in value** over time."

**Choreography:**
- Eyebrow: fade+slide at 2.54 + 0.20 = 2.74
- Badge: `back.out(2)` at 3.978 - 0.45 = **3.528**
- Definition: fade+slide at 4.746 - 0.30 = **4.446**

---

### BEAT 3 — Examples (t = 9.65 → 12.57)

**VO:** "Like sneakers, houses, or stocks."
**Keywords:** sneakers @ 9.979, houses @ 11.004, stocks @ 11.745
**Bg:** `#1658FF`

**Layers:**
- z=1: Eyebrow "LIKE…"
- z=2–4: 3 rows, each: [dark icon card 140×140] + label text 80px

**Choreography (each row slides from x:+180 → 0):**
- Row 1 (NKE + "SNEAKERS"): slide+icon bounce at 9.979 - 0.50 = **9.479**
- Row 2 (house SVG + "HOUSES"): slide+icon bounce at 11.004 - 0.50 = **10.504**
- Row 3 (SPY + "STOCKS"): slide+icon bounce at 11.745 - 0.50 = **11.245**

---

### BEAT 4 — Reframe (t = 12.57 → 24.10)

**VO:** "It's hard to get rich by saving alone… But by investing, your money can work for you and grow on its own."
**Keywords:** saving @ 14.201, But @ 19.281, work @ 21.565
**Bg:** `#FFFFFF`

**Two-phase layout (both sections visible simultaneously after phase 2 enters):**
- Phase 1 top: eyebrow "HARD TO GET RICH BY" + muted badge "SAVING ALONE"
- Divider bar
- Phase 2 bottom: eyebrow "BUT BY INVESTING" + black badge "YOUR MONEY / WORKS FOR YOU" + blue accent line

**Choreography:**
- P1 eyebrow: fade at 12.82
- P1 badge: `back.out(1.7)` at 14.201 - 0.45 = **13.751**
- Divider: scaleX wipe at 14.501
- P2 eyebrow: fade at 19.281 - 0.30 = **18.981**
- P2 badge: `back.out(2)` at 21.565 - 0.50 = **21.065**
- Blue accent line: expo.out scaleX at **21.565**

---

### BEAT 5 — Stat-reveal A (t = 24.10 → 32.56)

**VO:** "For example, if you save thirty dollars a month from age eighteen, you would have sixteen thousand dollars by age sixty-five."
**Keywords:** sixteen @ 29.406
**Bg:** `#F8F8F9`

**Layers:**
- z=1: Eyebrow "SAVING $30 / MONTH FROM AGE 18"
- z=2: Counter `$0 → $16,000` (200px Inter Tight 800 italic, ink `#1C2329`)
- z=3: Label "BY AGE 65" (letter-spaced uppercase)
- z=4: Context "That's saving alone."

**Choreography:**
- Eyebrow + context: fade at 24.40
- Counter: `power2.out`, 1.5s duration, **lands at 29.406** → start at 27.906
- Label: fade+slide at 29.406

---

### BEAT 6 — Stat-reveal B / Stat-comparison (t = 32.56 → 45.00)

**VO:** "But invest that same thirty dollars… become three hundred and eighty thousand dollars… assuming a ten percent annual return."
**Keywords:** dollars(380k) @ 40.275
**Bg:** `#1658FF`

**Layers:**
- z=0: Canvas particle burst (white + yellow + green, 60 particles, fires at 40.275)
- z=1: Eyebrow "INVESTING $30 / MONTH FROM AGE 18"
- z=2: Counter `$0 → $380,000` (180px white)
- z=3: Label "BY AGE 65"
- z=4: Green chip "24× MORE THAN SAVING"
- z=5: Footnote "* assuming 10% annual return"

**Choreography:**
- Eyebrow + footnote: fade at 32.86
- Counter: `power3.out`, 1.8s, **lands at 40.275** → start at 38.475
- Label: fade at 40.275
- Green chip: `back.out(1.7)` at 40.375
- Particles: Canvas draw from 40.275 → 42.075 (1.8s fade)

---

### BEAT 7 — Insight 3-word (t = 45.00 → 49.22)

**VO:** "Investing takes time, patience, and discipline."
**Keywords:** time @ 46.764, patience @ 47.491, discipline @ 48.510
**Bg:** `#FFFFFF`

**Layers:**
- z=0: Bloom star (500px, 12% opacity, slow rotation 0 → 180°)
- z=1: Eyebrow "INVESTING TAKES"
- z=2–4: Three badges: "TIME", "PATIENCE", "DISCIPLINE" (112px each)

**Choreography:**
- Star rotation: none ease over 4.22s
- Eyebrow: fade at 45.20
- TIME badge: `back.out(2)` at 46.764 - 0.40 = **46.364**
- PATIENCE badge: `back.out(2)` at 47.491 - 0.40 = **47.091**
- DISCIPLINE badge: `back.out(2)` at 48.510 - 0.40 = **48.110**

---

### BEAT 8 — Tease (t = 49.22 → 55.84)

**VO:** "But it's the best way to build long-term wealth, and Bloom will teach you how to invest like a pro."
**Keywords:** wealth @ 51.798, Bloom @ 52.700
**Bg:** `#1658FF`

**Layers:**
- z=1: Bloom logo 200px (scale bounce entrance)
- z=2: Eyebrow "THE BEST WAY TO BUILD"
- z=3: Badge "LONG-TERM WEALTH"
- z=4: Tagline "Bloom will teach you how to **invest like a pro**"
- z=5: SVG line chart (stroke-dashoffset draw-in)

**Choreography:**
- Logo: `back.out(1.7)` at 49.42
- Eyebrow: fade at 49.70
- Badge: `back.out(1.7)` at 51.798 - 0.50 = **51.298**
- Tagline: fade at 52.700 - 0.30 = **52.400**
- Chart: strokeDashoffset 1400 → 0, 1.6s power2.inOut, at 53.10
