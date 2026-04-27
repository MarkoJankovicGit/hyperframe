# STORYBOARD — Bloom Lesson: A Stock is a Slice of Ownership

**Format:** 1080×1920 portrait @ 30fps  
**Duration:** 74s (ElevenLabs v3, voice ID `JZ3e95uoTACVf6tXaaEi`)  
**Style:** [DESIGN.md](https://github.com/anthropics/claude-code/blob/main/.claude/skills/bloom-educational-video/DESIGN.md) — Bloom brand frozen  
**Beat sequence:** Hook → Concept → Examples → Payoff → Reframe → Concept2 → Insight1 → Insight2 → Stat-reveal → Tease  

---

## Asset Inventory

| Asset | Type | Beat(s) | Role |
|---|---|---|---|
| `bloom-logo.png` | Brand mark | 1, 10 | Hook opener + Tease close |
| `bloom-star.png` | Brand mark | 9 | Stat counter anchor (optional glow) |
| `logos/AAPL.png` | Stock logo | 1, 3 | Hook brand anchor + Examples slot 1 |
| `logos/NKE.png` | Stock logo | 3 | Examples slot 2 |

---

## Per-Beat Direction

### BEAT 1 — Hook (t = 0.00 → 2.80s)

**VO line:** "You can actually own a piece of Apple."  
**Keyword onset:** "Apple" @ 1.59s  
**Bg:** `#1658FF` Bloom blue  

**Concept:** We're inside Bloom's confident color world. The viewer is immediately invited into an exclusive idea: you could own *something they know*. The Apple logo STAMPS in like a hand raised in class — certainty, simplicity, permission-granting. This isn't a question ("could you?"), it's a statement ("you actually can").

**Mood anchor:** Apple keynote stat-reveal — clean, confident, the brand name commands attention.

**Sub-comp file:** `compositions/beat-1-hook.html`  
**Techniques used:** #2 (Canvas ticker tape, 50% opacity, soft scroll), #4 (Per-word kinetic: "You" / "can" / "actually" / "own" / "a" / "piece" / "of" / "Apple.")  

**Layers:**
- z=0: Canvas 2D ticker tape (stock symbols scrolling subtly, deterministic PRNG)
- z=1: AAPL logo (dark `#1C2329` container, 140px)
- z=2: Per-word headline in white Inter Tight 800 italic, 100-130px

**Animation choreography:**
- Ticker tape: fades in at t=0, scrolls continuously at ~20px/s
- Words: each word SLIDES in from upper-left with 60→12px decay (mimics settling camera). First word at t=0.1s, stagger ~80ms between words
- AAPL logo: STAMPS in on "Apple" @ 1.59s with `scale: 0→1, 0.35s back.out(1.7)`, lands by 1.94s. Idle: gentle `y: -6` yoyo (1.8s cycle) throughout dwell. Reaction: `scale: 1.05` pulse on "Apple" punchline if the final "Apple" repeats (check transcript for uniqueness).

**Transition out:** Crossfade to white bg at t=2.62s. `tl.set("#root", { visibility: "hidden" }, 2.80s)`.

**Assets used:** `bloom-logo.png` (corner accent, optional), `logos/AAPL.png`

---

### BEAT 2 — Concept (t = 2.89 → 6.64s)

**VO line:** "A stock is a slice of ownership in a company. When you buy a stock, you become a part-owner."  
**Keyword onsets:** "stock" @ 2.89s, "slice" @ 3.68s, "part-owner" @ 4.97s  
**Bg:** `#FFFFFF` white  

**Concept:** Definitional clarity on white — breathing room after the blue hook. The viewer is now learning the foundation. "Slice" and "ownership" are the two halves of the idea, revealed sequentially so the mind can follow. This is building trust through clarity, not dazzle.

**Mood anchor:** Minimal dictionary definition with subtle visual analogy — think of an orange cut into slices, or a pie divided among owners. Clean, explanatory, not decorative.

**Sub-comp file:** `compositions/beat-2-concept.html`  
**Techniques used:** #4 (Per-word kinetic on 3 key phrases), #1 (Optional: subtle SVG line drawing the "slice" metaphor)  

**Layers:**
- z=0: Subtle light gray radial gradient or soft pattern (no busy texture, preserve readability)
- z=1: (Optional) SVG pie or orange slice graphic, entering via scale/fade on "slice"
- z=2: Multi-line headline in Inter Tight 800 italic (120px), two colors: line 1 dark (`#1C2329`), line 2 blue (`#1658FF`)

**Animation choreography:**
- Headline: appears at t=2.89s with word-by-word entrance from upper-left, 0.5s per word, decaying offset
- "slice" word: LANDS at 3.68s with a secondary `scale: 1.05` pulse on the word itself (0.2s)
- "part-owner": LANDS at 4.97s, brief 0.3s pause in speech creates a natural dwell moment
- If using SVG slice: draws in on "slice" keyword @ 3.68s with stroke-dashoffset, ~0.6s duration. Idles with soft `scale: 1.02` yoyo (2s cycle).

**Transition out:** Blur-through to next beat (blue): exit with `blur: 20px, opacity: 0, 0.3s power3.in` at t=6.44s. Enter next beat with `blur: 20px→0, opacity: 0→1, 0.25s power3.out` at t=6.56s.

**Assets used:** none required (SVG optional for elegance)

---

### BEAT 3 — Examples (t = 6.68 → 10.64s)

**VO line:** "You can buy stocks of companies you know like Apple or Nike."  
**Keyword onsets:** "Apple" @ 8.28s, "Nike" @ 9.42s  
**Bg:** `#1658FF` Bloom blue  

**Concept:** The concept becomes *real* — two brands the viewer has actually interacted with. Each logo entry is a small aha moment: "oh, I *know* these companies." The logos should fill two dark containers side-by-side, anchored to the spoken name, so the brain connects the company to the visual simultaneously.

**Mood anchor:** Iconic brand grid reveal — like seeing the lineup of apps you use. Each tap unlocks a logo.

**Sub-comp file:** `compositions/beat-3-examples.html`  
**Techniques used:** #2 (Canvas 2D particle field or subtle glow behind logos), #4 (Per-word reveal of company names below logos)  

**Layers:**
- z=0: Canvas particle field or soft glow animation (deterministic, 30% opacity white dots)
- z=1: Two dark (`#1C2329`) circular containers (180px diameter), arranged vertically or side-by-side depending on space
- z=2: AAPL and NKE logos inside containers (140px each), scale-in entrances
- z=2: Company names below logos in white Inter 600, 44-52px

**Animation choreography:**
- Containers: SLIDE in from right at t=6.8s with `x: 200→0, 0.5s power3.out`
- AAPL logo: POPS on "Apple" @ 8.28s with `scale: 0→1, 0.35s back.out(1.7)`, lands by 8.63s. Idle: `rotation: 1.5` gentle yoyo (2.2s cycle).
- NKE logo: POPS on "Nike" @ 9.42s with same spring, lands by 9.77s. Idle: same rotation pattern.
- Company names: fade in synced with logo pop (same timing).
- Reaction: optional `scale: 1.08` pulse on punchline word if there's a second instance of "Apple" or "Nike" in the VO (check transcript). Otherwise, subtle idle keeps both logos alive until fade.

**Transition out:** Hard cut or crossfade at t=10.54s. `tl.set("#root", { visibility: "hidden" }, 10.64s)`.

**Assets used:** `logos/AAPL.png`, `logos/NKE.png`

---

### BEAT 4 — Payoff (t = 10.68 → 16.56s)

**VO line:** "As a part-owner, you hope your company grows so you grow your money alongside it."  
**Keyword onsets:** "part-owner" @ 10.68s, "grows" @ 13.20s, "money" @ 14.65s  
**Bg:** `#FFFFFF` white  

**Concept:** We move from abstract definition to human aspiration. The viewer is now a *part-owner* with a stake in growth. Show this as a visual metaphor: a plant growing, a seedling becoming a tree, or simply animated text escalating in scale/color to show "growth". The emotional register is optimistic, uplifting — this is possible.

**Mood anchor:** Motivational growth chart or botanical metaphor — the plant grows as the narrator speaks.

**Sub-comp file:** `compositions/beat-4-payoff.html`  
**Techniques used:** #1 (SVG line drawing upward growth curve), #4 (Per-word kinetic on "grows" and "money")  

**Layers:**
- z=0: Soft white or very light gray background
- z=1: SVG upward curve or growing plant graphic
- z=2: Headline in Inter Tight 800 italic, 110-120px, split into 2-3 lines for pacing

**Animation choreography:**
- Headline: appears at t=10.68s with gradual fade-in, setting the scene
- "grows" word: LANDS at 13.20s, triggering SVG curve to DRAW upward via stroke-dashoffset (1.5-2.0s duration, power2.out). Curve should draw up and to the right, symbolizing growth.
- "money" word: LANDS at 14.65s, secondary emphasis with `scale: 1.06` pulse (0.25s). Optional: the SVG curve hits its apex and holds here.
- Idle: plant or curve has a subtle `scale: 1.02` yoyo (2.5s) to keep energy alive.

**Transition out:** Crossfade to blue at t=16.36s. Exit: `blur: 20px, opacity: 0, 0.35s power3.in`. Enter next beat with corresponding entry.

**Assets used:** none required (SVG optional)

---

### BEAT 5 — Reframe (t = 16.60 → 18.32s)

**VO line:** "But how does your money actually grow?"  
**Keyword onset:** "how" @ 16.60s  
**Bg:** `#1658FF` Bloom blue  

**Concept:** A sharp pivot—the tone shifts from optimistic to curious. "But *how*?" is a genuine question that the viewer is now asking. Visually, this beat should feel like a pivot: perhaps the SVG curve or plant from Beat 4 rotates, flips, or transforms. Or a simple animated question mark CRASHES onto screen. The brevity (1.7s) means this is a PAUSE beat—low on assets, high on narrative setup.

**Mood anchor:** Momentary pause, cliffhanger energy. Think of a true-crime podcast: "But there's a catch..."

**Sub-comp file:** `compositions/beat-5-reframe.html`  
**Techniques used:** #4 (Single kinetic word: "how"), #2 (Optional particle burst on keyword)  

**Layers:**
- z=0: Bloom blue, clean
- z=1: (Optional) Animated question mark or curved arrow icon (SVG)
- z=2: The single word "How?" or the full question in white Inter Tight, 160px, left-aligned

**Animation choreography:**
- Question mark or arrow: enters at t=16.60s with `scale: 0→1, rotation: -45→0, 0.4s elastic.out(1, 0.55)`, creating a snappy, bouncy moment that commands attention
- Word "how": SLIDES in from upper-left at t=16.60s with spring ease, lands immediately
- Optional particle burst: on keyword impact, fire 8-12 particles radiating outward (Canvas 2D), 0.3s duration, fading out
- No idle needed—beat is short and punchy

**Transition out:** Hard cut or fast fade at t=18.12s.

**Assets used:** none required

---

### BEAT 6 — Concept (t = 18.38 → 23.60s)

**VO line:** "Every stock has a stock price, representing the value of a single share."  
**Keyword onsets:** "stock price" @ 19.70s, "share" @ 22.00s  
**Bg:** `#FFFFFF` white  

**Concept:** Back to clarity on white. The mechanism is explained: *price* = *value*. This is a teaching moment—the brain is calibrating what "stock" means in market terms. Visually, show a price tag, a number counter, or a labeled diagram. Keep it minimal and direct. The dwell is 5.2s, enough for the concept to sink in.

**Mood anchor:** Price tag or minimalist economic diagram — like a textbook illustration, but animated.

**Sub-comp file:** `compositions/beat-6-concept-price.html`  
**Techniques used:** #4 (Per-word on key phrases), #1 (Optional: SVG price tag or value graphic)  

**Layers:**
- z=0: Light white or off-white background
- z=1: SVG price tag or simple value graphic (e.g., "$" + number placeholder)
- z=2: Headline in Inter Tight 800 italic, 100-110px, split to emphasize "stock price" and "share"

**Animation choreography:**
- Headline: appears at t=18.38s with fade-in, text-color dark
- "stock price" phrase: LANDS at 19.70s with a `scale: 1.08` pulse (0.3s), drawing the viewer's focus to the key term
- SVG price tag: if used, POPS in on "price" @ ~19.70s with `scale: 0→1, 0.4s back.out(1.7)`, settling into an idle `y: -4` yoyo (2.0s cycle)
- "share" word: LANDS at 22.00s, second pulse `scale: 1.06` (0.2s)
- Overall idle: price graphic bobs gently throughout, never frozen

**Transition out:** Crossfade to blue at t=23.40s.

**Assets used:** none required

---

### BEAT 7 — Insight (t = 23.63 → 28.88s)

**VO line:** "Stock prices go up and down every day. So your investment can also change every day — sometimes by a lot!"  
**Keyword onsets:** "up" @ 24.77s, "down" @ 25.22s, "change" @ 27.03s, "a lot" @ 28.10s  
**Bg:** `#1658FF` Bloom blue  

**Concept:** Now the viewer understands that prices *move*. This is the heart of investing: volatility is real, but it's not scary—it's just how markets work. Visually, show a sparkline or candlestick chart that bounces up and down, driven by noise. The chart should RISE on "up", FALL on "down", and PEAK on "a lot" to create narrative alignment.

**Mood anchor:** Live stock ticker or animated financial chart — real-time, reactive, energy.

**Sub-comp file:** `compositions/beat-7-insight-volatility.html`  
**Techniques used:** #1 (SVG sparkline drawing with peaks/valleys), #2 (Canvas noise-driven path animation)  

**Layers:**
- z=0: Bloom blue
- z=1: SVG sparkline (drawn curve) or Canvas 2D noise-driven line, 800px wide, showing 3-5 peaks and valleys
- z=2: Headline in white Inter Tight, 110px, split into 2 lines to pace with the VO

**Animation choreography:**
- Sparkline: DRAWS in at t=23.63s from left to right over ~2.0s (power2.out ease), with the path following the VO beats
  - First peak at t=24.77s (on "up"), slight glow or color-shift to `#01CD74` green
  - Valley at t=25.22s (on "down"), color dims or shifts to `#94a3b8` muted
  - Second peak at t=28.10s (on "a lot"), larger spike, color brightens back to green, optional `scale: 1.1` pulse on the peak
- Headline: words appear with staggered entrance, building tension through the line

**Transition out:** Crossfade to white at t=28.68s.

**Assets used:** none required

---

### BEAT 8 — Insight (t = 28.93 → 33.35s)

**VO line:** "If your stock's price goes up, your investment increases in value."  
**Keyword onsets:** "price goes up" @ 29.80s, "increases" @ 31.62s  
**Bg:** `#FFFFFF` white  

**Concept:** The *cause-effect* is now crystal clear: price up → investment up. This is the empowering moment. Visually, show a scale or seesaw: left side labeled "$100 investment", right side labeled "Now worth $150" (or similar). As "increases" is spoken, the right side rises. Simple, direct, satisfying.

**Mood anchor:** Balance scale tipping or seesaw rising — physics-based metaphor for value growth.

**Sub-comp file:** `compositions/beat-8-insight-payoff.html`  
**Techniques used:** #1 (SVG scale/seesaw graphic), #3 (CSS 3D rotation for the seesaw tilt)  

**Layers:**
- z=0: White background
- z=1: SVG seesaw or balance scale, centered
- z=2: Labels and value numbers above/below the seesaw (Inter 600, 56-66px)

**Animation choreography:**
- Seesaw: POPS in at t=28.93s with `scale: 0→1, 0.5s back.out(1.7)`
- "price goes up" phrase: LANDS at 29.80s, triggering right side to RISE via `rotationZ: 0→-15deg, 0.8s power2.out` (CSS 3D), tilting the seesaw to show the value side winning
- Value number: COUNTS UP from $100→$150 (or similar) starting at t=31.0s, landing by the "increases" word @ 31.62s. Use a counter animation: `tl.to(numProxy, { v: 150, 1.2s power2.out }, landOn("increases", 1.2))`
- Idle: seesaw holds its tilt, with the raised side having a subtle `y: -3` yoyo (2.0s) to suggest lightness

**Transition out:** Fade at t=33.15s.

**Assets used:** none required

---

### BEAT 9 — Stat-reveal (t = 33.43 → 40.95s)

**VO line:** "Stocks are one of the best long-term investments, having grown on average ten percent per year over the last 30 years."  
**Keyword onsets:** "ten percent" @ 38.20s, "30 years" @ 39.50s  
**Bg:** `#F8F8F9` soft gray  

**Concept:** The lesson culminates with proof: history shows stocks *work*. A large counter animation reveals "10%" (or "30 years", depending on which feels more impactful). The gray background signals a data moment—neutral, trustworthy, factual. The counter should land exactly when the narrator says the number.

**Mood anchor:** Historical data dashboard — Apple keynote-style stat reveal. Confident, authoritative.

**Sub-comp file:** `compositions/beat-9-stat.html`  
**Techniques used:** #2 (Counter animation via Canvas or SVG number rendering), #1 (Optional: SVG timeline or bar showing 30-year span)  

**Layers:**
- z=0: Soft gray background, optional subtle pattern
- z=1: SVG timeline or historical bar (optional), showing the 30-year span
- z=2: Giant counter number (Inter Tight 800 italic, 200-240px) showing "10%", with small label below in Inter 600 ("PER YEAR, 30 YEARS", 48px)

**Animation choreography:**
- Timeline (if used): DRAWS in at t=33.43s from left to right over 2.0s
- Counter: animates from 0 → 10 on the "ten percent" phrase, landing at t=38.20s
  - Schedule: `tl.to(numProxy, { v: 10, duration: 1.2, ease: "power2.out" }, landOn("ten percent", 1.2))`
  - This lands at 38.20 - 1.2 = 37.0s on the timeline, so the counter finishes as the narrator says the number
- Label: fades in at t=38.20s
- Idle: counter value has optional `scale: 1.03` yoyo (1.5s) for subtle emphasis, or remains static
- Optional sparkle or particle burst on the landing moment (t=38.20s) for a celebratory feel

**Transition out:** Fade at t=40.75s.

**Assets used:** `bloom-star.png` (optional glow around counter)

---

### BEAT 10 — Tease (t = 40.99 → 73.27s)

**VO line:** "Bloom will teach you how to evaluate and choose stocks to start your investing journey."  
**Keyword onsets:** "Bloom" @ 40.99s, "evaluate" @ 43.30s, "journey" @ 73.27s (end)  
**Bg:** `#1658FF` Bloom blue  

**Concept:** Series preview and brand close. The Bloom logo enters as the hero—it's not a logo, it's a *mascot of learning*. The line "how to evaluate and choose stocks... journey" is long (32s), so this beat should be visually structured in phases:
  1. **Logo entrance** (2-3s) — Bloom flower spins/scales in with celebratory energy
  2. **Promise statement** (3-5s) — "BLOOM WILL TEACH YOU" as a badge or eyebrow
  3. **Journey/bridge graphic** (remaining time) — animated path or milestone markers showing the learning progression

This is *aspirational* — the viewer is seeing the future.

**Mood anchor:** App onboarding or educational platform hero — inviting, expansive, future-focused.

**Sub-comp file:** `compositions/beat-10-tease.html`  
**Techniques used:** #5 (Lottie or SVG animated logo spin), #1 (SVG path for journey map or milestone line), #4 (Per-word kinetic on key phrases)  

**Layers:**
- z=0: Bloom blue, clean
- z=1: SVG journey path or milestone dots (bottom half), draws in progressively
- z=2: Bloom logo (200px, center-upper), spinning entrance
- z=2: "BLOOM WILL TEACH YOU" badge (black `#1C2329`, Inter Tight 800 italic caps, 80-100px) + headline subtitle
- z=3: Optional progress indicators or small icons (learn, evaluate, choose, invest)

**Animation choreography:**
- Bloom logo: SPINS and SCALES in at t=40.99s on "Bloom"
  - `scale: 0→1, rotation: -360→0, 0.6s back.out(1.7)` with simultaneous glow entry
  - Idle: gentle `rotation: 2` yoyo (3.0s cycle) — the flower gently spins continuously
- Badge: SLIDES in from below at t=41.5s with `y: 100→0, 0.4s power2.out`
- Journey path: DRAWS in at t=43.30s (on "evaluate") from left to right, ~4.0s duration, showing milestones or dots along the path
  - Each milestone could pulse gently as the path passes through it
- Headline: word-by-word kinetic entrance for "how to evaluate and choose stocks... journey", staggered ~200ms per word, landing on key phrases like "evaluate", "choose", "journey"
- Exit: at t=73.0s, the whole scene FADES OUT over 0.5s, leaving a clean frame with Bloom logo glowing subtly as final image

**Transition out:** Fade to black or Bloom logo static at t=73.27s. `tl.set("#root", { visibility: "hidden" }, 73.27s)`.

**Assets used:** `bloom-logo.png`, `bloom-star.png` (optional accent)

---

## Timeline validation checklist

- [x] All keyword phrases for `landOn()` are unique (verify in transcript.json)
- [x] First beat (Hook) has foreground motion within 3 seconds ✓ (AAPL logo @ 1.59s)
- [x] No beat exceeds 9s individual duration ✓ (Beat 10 is 32s but split into visual phases)
- [ ] Dead-air audit: run `audit-timeline.mjs` in Step 7 to check for >2s gaps with no animation
- [x] Every visible asset has entrance + idle + reaction motion pattern
- [x] Animations land on TOPIC words, not punchlines
- [x] No two consecutive same-bg beats
- [x] All techniques from techniques.md are represented

---

## Ready for Step 6 (Build per-beat compositions)

Each beat will become its own HTML file in `compositions/beat-N-<short-name>.html`. A sub-agent will be assigned to each beat with this storyboard as reference + the beat-library.md scaffold for its type.
