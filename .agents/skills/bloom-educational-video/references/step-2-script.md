# Step 2 — Write the Narration Script + Assemble Beats

This is the most important step. The output is a finalized **script** + a **proposed beat sequence** that passes composition rules. Step 4 (storyboard) will use both.

MANDATORY: Read references/beat-library.md to know how to write this script

## Outputs

```
videos/bloom-<slug>/SCRIPT.md          # human-readable creative doc with beats + intent notes
videos/bloom-<slug>/narration.txt      # exact TTS input — pronunciation substitutions applied, one paragraph, no markdown
scripts/bloom-<slug>.json              # input for generate-vo.mts (wraps narration.txt)
```

`SCRIPT.md` is for humans reviewing the creative shape. `narration.txt` is for the TTS pipeline. They diverge — `SCRIPT.md` keeps `$380,000` because that's what humans read; `narration.txt` says "three hundred and eighty thousand dollars". Keep them separate so regenerating audio with a different voice never requires re-deriving substitutions.

## Pacing & tone

**Pacing**
- ElevenLabs v3 reads at ~2.5 words/second
- 15s = ~37 words · 30s = ~75 words · 45s = ~110 words · 60s = ~150 words · 90s = ~225 words
- Leave room for pauses. Silence between sentences is a feature, not dead air. Total script should feel SHORTER than the video — visual breathing room matters.

**Tone**
- Write like a person, not a brochure. Use contractions: `it's`, `you'll`, `that's`, `we've`
- Vary sentence length — short punchy phrases mixed with longer flowing ones
- **Read it out loud.** If it sounds robotic or like marketing copy, rewrite it
- Bloom register: warm, energetic, confident — Gen-Z trusted-older-sibling. Not corporate fintech, not cringe-cool, not influencer pitch. Confident but warm.

## Opening-line patterns

The first sentence is the most important in the video. It must create tension, curiosity, or surprise in the first 3 seconds — Reels viewers swipe in 2-3s if nothing's hooking them.

Patterns that work:
- **A bold claim** — "Investing is your superpower."
- **A question that provokes** — "Did you know you can make money while you sleep?"
- **A contrast** — "Saving makes you safe. Investing makes you free."
- **A number that shocks** (use sparingly — not every video) — "Thirty bucks a month. Three hundred and eighty thousand dollars by sixty-five."
- **Cultural acknowledgment** — "You've heard about investing from friends, family, social media. Most of it's wrong."

**If the opening is generic** ("Welcome to Bloom" / "Today let's talk about ETFs" / "Hi! Let's learn about investing"), **start over.** Generic openers test the swipe button.

## Workflow

### 1. Read the source text
The user gives you a topic or a draft script. Read it once for content.

### 2. Strip emojis
Source text may have emojis as punctuation. **Remove every one.** Don't translate them, don't preserve them. They never go to TTS, they never become visuals, they never appear in any output of this skill.

### 3. Apply pronunciation substitutions
Numbers and abbreviations need to be expanded for TTS clarity:

| Source | Substitute |
|---|---|
| `135+` | more than one hundred thirty five |
| `$1.9T` | nearly two trillion dollars |
| `$380,000` | three hundred and eighty thousand dollars |
| `$30/month` | thirty dollars a month |
| `$1` | a dollar |
| `99.99%` | ninety-nine point nine percent |
| `10%` | ten percent |
| `10x` | ten times |
| `API` | A P I |
| `ETF` | E T F |
| `S&P 500` | S and P five hundred |
| `200M+` | over two hundred million |
| `AAPL` | apple |
| `NFLX` | netflix |
| `bloom.com` | bloom dot com |

Tickers always read as company names in narration. The visual shows the ticker symbol.

### 4. Scan for beat triggers

Read the cleaned text line-by-line and detect signals from [beat-library.md](beat-library.md). For each match, propose the matching beat:

| Trigger pattern | Proposed beat |
|---|---|
| Question opener / friction word in first sentence | **Hook** |
| "But / actually / surprisingly" pivot | **Reframe** |
| `X is / X means / X = Y` definitional | **Concept** |
| Comma-list of 2-4 nouns | **Examples** |
| "List / pick / guess / imagine" prompt | **Try-it** |
| Brand-name list following Try-it | **Brand-reveal** |
| Dollar amount / percentage / "X million" | **Stat-reveal** |
| Two contrasting numbers | **Stat-comparison** (= 2 Stat-reveal beats) |
| "On Bloom / with Bloom" + verb | **Payoff** |
| Single emphatic word | **Insight** (1-word) |
| 2-3 word emphatic phrase ("time, patience, discipline") | **Insight** (3-word) |
| "First / second / third" or "X, Y, Z" enumeration | **Breakdown** |
| "Step / one of two" | **Bridge** |
| "Next: / coming up: / Bloom will teach" | **Tease** |
| "Get Bloom / try Bloom" imperative | **CTA-close** |

### 5. Patch missing required beats

Per [composition-rules.md](composition-rules.md), every lesson MUST have:
- Hook as first beat
- Tease or CTA-close as last beat

If the source script doesn't open with a Hook signal, **write a Hook line yourself** before the existing first sentence. Same for the close — if there's no natural Tease/CTA, **write a closing line**.

Example: Source "Investing means buying things that grow." Add Hook: "Did you know you can make money while you sleep?" before it.

### 6. Validate against composition rules

Walk through the [composition-rules.md](composition-rules.md) checklist:

- [ ] Starts with Hook
- [ ] Ends with Tease or CTA-close
- [ ] No two consecutive same-bg
- [ ] No two consecutive same-scaffold (except Stat-comparison's pair)
- [ ] Every Try-it has a paired Reveal
- [ ] Total duration / beat count between 4-7s
- [ ] No individual beat outside 2-9s
- [ ] Beat count 4-13
- [ ] No emojis
- [ ] No light-bg logo containers

If any rule fails, swap or restructure. Common fixes:
- Two same-bg in a row → switch one beat to its alt-bg variant (Concept, Stat-reveal, Insight all have alts)
- Try-it without Reveal → either add a Brand-reveal/Stat-reveal or drop the Try-it
- Beat count too high → merge two adjacent beats into one (e.g. compress Reframe into Concept)
- Beat count too low / pacing too slow → split a long beat into two

### 7. Write SCRIPT.md

Format with beat names + VO lines + intent notes per beat:

```markdown
# SCRIPT — Bloom Lesson <N>: <Topic>

**Target:** ~<X>s, portrait 1080×1920, ElevenLabs v3.
**Word count:** ~<N> spoken words.
**Beat count:** <N> beats.
**VO direction:** Warm, energetic, Gen-Z trusted-older-sibling. Short sentences, clear pauses.

---

## Beat 1 — Hook
> <line>
*Bg:* `#1658FF` blue. *Why:* opens with friction.

## Beat 2 — Concept
> <line>
*Bg:* `#FFFFFF` white. *Why:* states central idea.

## Beat 3 — Examples
> <line>
*Bg:* `#1658FF` blue. *Why:* 3 concrete instances of the concept.

...etc...

---

## Spoken text (saved as `narration.txt`):

```
<entire script as one paragraph for TTS>
```
```

### 8. Write narration.txt and scripts/bloom-<slug>.json

`narration.txt` is the exact text passed to TTS, one paragraph, no markdown:

```
<full script with substitutions applied>
```

`scripts/bloom-<slug>.json`:

```json
[
  {
    "id": "scene-01",
    "text": "<full text>"
  }
]
```

## Worked example: "make money while you sleep"

Source (with emojis) — paste into your scratch space:

> Did you know that you can make money while you're sleeping?
> Well, say hi to investing! 👋
> Investing = buying anything that can increase in value over time
> like sneakers, houses, or stocks 🤑
> It's hard to get rich only by saving... 😥
> But by investing, your money can work for you 📈
> For example, $30/month from age 18 = $16,000 by 65 👀
> Investing $30/month into stocks = $380,000 by 65! 🤯
> * assuming 10% annual return
> Investing takes time, patience and discipline 🌳
> Bloom will teach you how to invest like a pro 🤝

**Step 2 — strip emojis. Step 3 — substitutions** ($380,000 → "three hundred and eighty thousand dollars", 10% → "ten percent").

**Step 4 — scan triggers:**

| Source line | Trigger | Beat |
|---|---|---|
| "Did you know you can make money while you're sleeping?" | question + intrigue | **Hook** |
| "Investing = buying anything that grows in value" | `X = Y` | **Concept** |
| "like sneakers, houses, or stocks" | comma-list of 3 nouns | **Examples** |
| "Saving alone won't get you rich, but investing makes your money work for you" | "but" pivot | **Reframe** |
| "$30/month saved = $16,000 by 65" | dollar amount | **Stat-reveal** A (gray) |
| "$30/month invested = $380,000 by 65" | dollar amount + emphasis | **Stat-reveal** B (blue) — Stat-comparison |
| "time, patience and discipline" | 3-word emphatic phrase | **Insight** (3-word) |
| "Bloom will teach you how to invest like a pro" | "Bloom will…" | **Tease** |

**Step 5 — patches:** Hook is present ✓, Tease is present ✓. No patches needed.

**Step 6 — validate:** initial sequence:

```
blue → white → blue → white → gray → blue → blue (Insight) → blue (Tease)
```

3 consecutive blue at the end. Fix: switch Insight to white. New sequence:

```
blue → white → blue → white → gray → blue → white → blue
```

All rules pass. **8 beats, ~44s.**

**Step 7 — write SCRIPT.md** with beat names. **Step 8 — narration.txt and scripts JSON.**

Done. Move to Step 3 (VO).

## Gate

Before Step 3:
- [ ] All beats listed in `SCRIPT.md` with name + VO line + bg color
- [ ] Composition rules pass (run through the checklist)
- [ ] Word count 100-200 (45-90s of speech)
- [ ] Source emojis stripped
- [ ] Pronunciation substitutions applied to `narration.txt` and `scripts/bloom-<slug>.json`
- [ ] Tone read out-loud test passed (sounds like a person, not a brochure)
