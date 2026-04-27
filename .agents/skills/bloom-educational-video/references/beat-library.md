# Beat Library

A library of discrete beat types. Each Bloom lesson assembles 4-13 beats from this library based on what the script signals. **No fixed arc** — the beats compose to fit the script.

## How to use this file

1. **Read the script.** Find trigger signals (specific words/patterns, listed below per beat).
2. **Each match → propose that beat.** A script may match 6 beats, or 13.
3. **Always include a Hook (first) and a Tease/CTA-close (last).** If the script doesn't naturally start with friction, write a Hook line for it. Same for the close.
4. **Validate against [composition-rules.md](composition-rules.md).** Reject/swap beats that violate the rules (no two consecutive same-bg, no orphan Try-it, etc.).
5. **Map each beat to its slice of VO timing.** First-word-to-last-word per beat from `transcript.json`.

---

## The 14 beat types

### 1. Hook
**Intent:** Open with friction, intrigue, or a provocative question.
**Trigger signals:**
- First sentence is a question ("Did you know…?", "Ever wonder…?")
- Friction word in first sentence ("intimidating", "boring", "scary", "confusing", "expensive")
- Surprising-claim opener ("you can make money while you sleep")
**Bg:** `#1658FF` Bloom blue
**Scaffold:** Canvas 2D ticker tape (subtle, ~50% opacity) + dark translucent eyebrow pill + black headline badge with 1-3 word friction/intrigue word
**Duration:** 2-4s
**Mandatory:** Yes — every lesson starts here.

### 2. Reframe
**Intent:** Pivot from problem to solution.
**Trigger signals:**
- "But you / But it's / But actually / Surprisingly / However…" pivot
- Contrast between negative and positive framing in adjacent sentences
**Bg:** `#FFFFFF` white
**Scaffold:** Big italic-caps headline (132px Inter Tight) with clip-path wipe + blue accent line under headline animates in on the second-half keyword
**Duration:** 2-3s
**Mandatory:** No — drop if Hook + Concept already pivots.

### 3. Concept
**Intent:** State the central idea declaratively.
**Trigger signals:**
- "X is / X means / X = Y" definitional phrasing
- Single clear claim that summarizes the lesson
**Bg:** `#FFFFFF` white (or `#1658FF` if previous beat was white)
**Scaffold:** Center 2-line big italic-caps headline (line 1 dark, line 2 in `#1658FF` blue, larger). Optional: 4 logo orbs scattered around (DARK `#1C2329` containers).
**Duration:** 3-5s
**Mandatory:** Yes — every lesson has a central idea.

### 4. Examples
**Intent:** 2-4 concrete instances of the concept.
**Trigger signals:**
- Comma-list of 2-4 nouns ("sneakers, houses, or stocks")
- "The X / the Y / the Z" parallel structure ("the phone in your hand, the shoes on your feet, the drink in your fridge")
**Bg:** `#1658FF` Bloom blue
**Scaffold:** 2-4 vertically-stacked rows. Each row = glassmorphic asset card (320×320, 8% white bg) + italic-caps question/label text. Each row slides in from right LANDING on its noun keyword.
**Duration:** 4-7s (1.5-2s per row)
**Mandatory:** No — drop if topic is purely abstract.

### 5. Try-it
**Intent:** Pause-and-think prompt for the viewer.
**Trigger signals:**
- "List / pick / guess / imagine / count X" prompts
- Rhetorical question that expects the viewer to mentally answer
**Bg:** `#F8F8F9` soft gray
**Scaffold:** Black "YOUR TURN" / "TRY IT" / "GUESS" badge top + N numbered slots (each slot: blue circle number + dotted line) cascading in
**Duration:** 3-5s
**Mandatory:** No — only when script signals.
**Pairs with:** Brand-reveal or Stat-reveal (if script answers the prompt). If it's purely rhetorical, can stand alone but should be brief.

### 6. Brand-reveal
**Intent:** Fill in the slots from a Try-it with named brands.
**Trigger signals:**
- Comma-separated brand list following a Try-it ("Maybe you thought of Apple. Starbucks. Nike. Or Netflix.")
- Always follows a Try-it beat
**Bg:** Same as Try-it (continues the same scene visually — `#F8F8F9`)
**Scaffold:** Logo + ticker pops into each slot ON the spoken brand-name keyword (back.out ease, optional sparkle burst)
**Duration:** 3-5s (1s per logo reveal)
**Mandatory:** No — must be paired with Try-it if used.
**Note:** This is NOT a separate scene from Try-it — it's a continuation in the same `<div class="scene">`. The Try-it+Brand-reveal pair counts as one scene block, two beats.

### 7. Stat-reveal
**Intent:** Counter animation for a key number.
**Trigger signals:**
- Dollar amount ("$30", "$380,000")
- Percentage ("10%", "200%")
- "X million / billion / thousand" + duration noun
**Bg:** `#F8F8F9` soft gray (subdued/neutral) OR `#1658FF` Bloom blue (emphatic/wow)
**Scaffold:** Big numeric counter (180-220px Inter Tight 800 italic, animates 0 → number) + small uppercase label below + optional Bloom logo corner. Optional: green check mark for protection / SIPC type stats.
**Duration:** 3-5s

### 8. Stat-comparison
**Intent:** Two stats side-by-side or sequential — the second is the punchline.
**Trigger signals:**
- Two numbers in adjacent sentences with contrast ("$16,000 by 65… but $380,000 by 65")
- "Save vs invest", "old vs new", "without vs with"
**Bg:** Switch between scenes — first stat on `#F8F8F9` gray (neutral), second on `#1658FF` blue (emphatic) or vice versa. The bg shift carries the emotional reveal.
**Scaffold:** Two consecutive Stat-reveal beats. The second has additional emphasis: confetti / spark burst / color shift / emoji-free "WOW" pulse on the number.
**Duration:** 6-9s combined (3-4s + 3-5s)
**Counts as:** TWO beats in the count, even though they read as one comparison moment.

### 9. Payoff
**Intent:** Show Bloom delivering the result.
**Trigger signals:**
- "On Bloom / in Bloom / right on Bloom / with Bloom"
- "Bloom can / Bloom shows / Bloom does"
- Brand reveal followed by "you can [verb] all of them"
**Bg:** `#1658FF` Bloom blue
**Scaffold:** 3D iPhone (Kie i2i + chroma-key) showing the Bloom UI with the relevant content (portfolio, chart, lesson plan, dividend calendar, etc.) + soft green radial glow + black CTA pill at bottom ("INVEST ON BLOOM" / "SEE IT ON BLOOM")
**Duration:** 3-5s
**Asset:** Generate via Step 5 with i2i, OR build the iPhone UI in HTML/CSS over a captured Bloom phone-frame PNG.

### 10. Insight
**Intent:** Single emotional payoff word(s) — the lesson's mantra.
**Trigger signals:**
- A single emphatic word ("superpower", "edge", "freedom", "discipline")
- A 2-3 word emphatic phrase ("time, patience, discipline" / "smart, simple, strong")
- "The most powerful / the secret / the trick is X"
**Bg:** `#1658FF` Bloom blue
**Scaffold:** Spinning yellow Bloom star (opacity 0.4, slow rotation) + small white eyebrow ("YOUR INSIGHT IS A" / "THE SECRET IS") + giant single-word badge OR 2-3 sequential mini-badges + Canvas particle burst on the keyword
**Duration:** 2-4s
**Variants:**
- 1-word: single 200px badge, particle burst
- 3-word: three 100-130px badges sequentially slamming in (each on its word), particles fire on third word

### 11. Breakdown
**Intent:** 3 supporting reasons / dimensions stagger in.
**Trigger signals:**
- "First / second / third" enumeration
- "You know X, you know Y, you know Z" parallel "you know"
- "It's about X, Y, and Z" final triplet
**Bg:** `#FFFFFF` white
**Scaffold:** 3 black cards stacked vertically. Each = small inline-SVG icon (heart `#fe566b`, star `#efc42c`, up-chart `#01cd74`, etc) + 2-line italic-caps text. Each lands on its keyword.
**Duration:** 5-7s (1.5-2s per card)

### 12. Bridge
**Intent:** Progress / part-N indicator for series content.
**Trigger signals:**
- "Step / first half / one of two / part 1"
- Explicit lesson numbering
- "But that's just the beginning / the foundation"
**Bg:** `#FFFFFF` white
**Scaffold:** Small uppercase eyebrow ("YOU'VE FINISHED") + giant "STEP 1<br/>OF 2" Inter Tight italic + animated progress bar fills 50% on "step" or "one" keyword + small subtitle
**Duration:** 2-3s
**Mandatory:** No — only for explicit series lessons.

### 13. Tease
**Intent:** Next-lesson preview + Bloom logo close.
**Trigger signals:**
- "Next: / Coming up: / Lesson 2"
- "Bloom will teach you" + future verb
- Forward-pointing summary that names the next topic
**Bg:** `#1658FF` Bloom blue
**Scaffold:** Bloom logo center (200px, scale-bounce entrance + breathe) + "NEXT LESSON" eyebrow + black headline badge with next-topic copy + animated SVG candlestick/line chart drawing in via stroke-dashoffset
**Duration:** 3-5s
**Mandatory:** Yes if part of a series. Otherwise use CTA-close.

### 14. CTA-close
**Intent:** Standalone-lesson close with Bloom CTA.
**Trigger signals:**
- "Get Bloom / Try Bloom / Start now / Sign up"
- Imperative-verb close
- Standalone (not series) lesson
**Bg:** `#1658FF` Bloom blue
**Scaffold:** Bloom logo center (with breathe) + black pill "GET BLOOM" / "TRY BLOOM" + tagline below
**Duration:** 2-3s
**Mandatory:** Yes if not using Tease.

---

## Worked example: "make money while you sleep" script

Walking through the example script signal-by-signal:

| Line | Trigger | Beat |
|---|---|---|
| "Did you know you can make money while you're sleeping?" | provocative question opener | **Hook** |
| "Investing = buying anything that can increase in value over time" | `X = Y` definitional | **Concept** |
| "like sneakers, houses, or stocks" | comma-list of 3 nouns | **Examples** |
| "It's hard to get rich only by saving... But by investing..." | "but" pivot | **Reframe** |
| "$30/month from 18 = $16,000 by 65" | dollar amount | **Stat-reveal** (gray, neutral) |
| "but $30/month invested = $380,000 by 65" | dollar amount + contrast | **Stat-reveal** (blue, emphatic) — counts as Stat-comparison continuation |
| "Investing takes time, patience and discipline" | 3-word emphatic phrase | **Insight** (3-word variant) |
| "Bloom will teach you how to invest like a pro" | "Bloom will…" close | **Tease** |

**8 beats total. ~44s.** Different shape from Lesson 1's 11 beats; uses the same library.

## Topic-mapping cheat sheet

When the user gives a new topic, scan their source script and look for:

- **Friction word** in opening → Hook
- **"But / actually" pivot** → Reframe
- **`X is / X means`** → Concept
- **Comma-list of nouns** → Examples
- **"List / pick / guess"** → Try-it
- **Brand-name list after a prompt** → Brand-reveal
- **Dollar amount / percentage** → Stat-reveal
- **Two contrasting numbers** → Stat-comparison
- **"On Bloom / with Bloom"** → Payoff
- **Single emotional word** → Insight (1-word variant)
- **3-word emphatic phrase** → Insight (3-word variant)
- **"First / second / third"** or **"X, Y, Z"** triplets → Breakdown
- **"Step / part / one of two"** → Bridge
- **"Next: / coming up"** → Tease
- **"Get Bloom / try Bloom"** → CTA-close

If the script doesn't naturally start with friction, **write the Hook line yourself**. Same for the close. Hooks and closes are non-negotiable.
