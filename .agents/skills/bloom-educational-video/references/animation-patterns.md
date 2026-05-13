# Animation Patterns — timing, motion, validation

This file captures the patterns that make Bloom video animations feel alive vs. dead. Read it before writing GSAP timelines, and re-check it when something feels "off".

## The first principle: every visible asset has motion

If an illustration is on screen for more than ~2 seconds with nothing animating on it, it stops feeling like video and starts feeling like a static slide. Every illustrated asset needs the **entrance → idle → reaction** triad.

## The entrance / idle / reaction triad

```
[ entrance ] ─── [ idle motion (loops) ] ─── [ reaction ] ─── [ idle continues ] ─── [ exit ]
```

1. **Entrance** — the asset slides/scales/pops into frame. Lands on a **topic word**, not the punchline. Duration 0.5-0.7s, with an `ease: "back.out(1.5-1.7)"` for spring-feel.

2. **Idle motion** — between entrance and reaction, run a slow `sine.inOut yoyo: true, repeat: 1+` ambient animation so the asset is never frozen. Match the idle to the asset's character:
   - Confident / calm subject → gentle `y: -8` bob (1.5-2.5s cycle)
   - Object that should rock → `rotation: 2` yoyo (the piggy bank's idle)
   - Living/breathing feel → `scale: 1.04` yoyo (CTAs, hero objects)
   - Stressed / chaotic subject → faster `x: ±6` micro-jitter

3. **Reaction** — on the punchline word, fire a short sharp animation (0.18-0.3s) for emphasis: pulse, shake, wobble. Then the asset returns to its idle. Common patterns:
   - `scale: 1.05` pulse (general affirmation)
   - `x: -8` repeat 5 shake (stress, alarm)
   - `rotation: 2` repeat 5 wobble (instability, "uh oh")

**Canonical reference:** scene 9 piggy bank in bloom-investing-myths. Entrance on "safer investments" → 2.8s `rotation: 2` yoyo idle that overlaps the whole middle of the scene → continues until fade-out. The asset is *gently rocking the entire time it's visible*. That's the gold standard.

## Entrance anchor: topic word, not punchline word

If you anchor the entrance to the FINAL keyword of a beat, the asset has no time to be appreciated before the scene cuts. We hit this badly in bloom-investing-myths v1:

| Scene | Anchor word | Word time | Scene end | Dwell |
|-------|-------------|-----------|-----------|-------|
| Myth 1 | "Boomers" (final) | 15.3s | 16.55s | **1.17s ❌** |
| Myth 3 | "later" (final) | 41.1s | 41.62s | **0.46s 🚨** |

Fixed by anchoring to the topic word ("Myth one", "Myth three") with a small REACTION pulse on the punchline. Result: 2.88s and 3.85s dwell, respectively.

**Rule:** asset entrance lands on the *topic announcement* (e.g. "Myth N:", "On Bloom", "You can choose"). Use the punchline word for the SECONDARY reaction.

## Dwell-time minimum: 3-5 seconds

After the entrance lands, the asset must be visible for at least **3 seconds**. Less than 2s reads as a flash. 5+ is comfortable. If you can't get 3s, the scene probably has too much content — split it or trim VO.

## Dead-air audit (run on every scene before validation)

For each scene, list every animation event chronologically (entrance, reaction, idle starts/ends, transitions) and find the longest gap with **nothing firing**. Use the `audit-timeline.mjs` tool described in [step-7-validate.md](./step-7-validate.md).

**Gap interpretation:**
- 0–1.5s — fine, normal pacing
- 1.5–2s — review; may be OK if VO is mid-phrase
- 2s+ — red flag

If a scene has a gap > 3s and you can't fill it with idle motion or another sub-beat, **the scene needs an additional beat**. Don't pad with empty space.

**Where dead-air fixes can come from:**
- Add an idle motion to an asset that's currently frozen (cheapest fix)
- Add a sub-element entrance (e.g. a sparkline drawing in mid-scene)
- Split the scene into two beats with a transition between
- Insert a NEW scene that handles the under-served VO portion (this is what the iMessage cascade did for the bloom-investing-myths hook — 5.2s of dead air at scene 1 start became its own scene-pre with three beats)

> **Don't reach for the iMessage pattern as a template.** It worked because it fit "you might have heard from friends, family, social media" — three sources of advice. The point isn't "use chat bubbles", it's "look at what the VO is *enumerating* and give each one its own visual beat". Other VO might call for a phone scrolling, a series of icons popping, a grid of objects, a comic-strip-style sequence — be creative per beat.

## `landOn` phrase uniqueness

The `landOn(phrase, dur)` helper throws when the phrase matches multiple positions in the VO transcript. We hit this twice in one session:
- `landOn("lot of money")` matched both "need a lot of money" (Myth 2) and "lose a lot of money" (Myth 4) → throws
- `landOn("invest,")` matched 4 places ("Anybody can invest", "I don't have time to invest", "let you learn and invest", "what to invest in") → throws

**Rule:** use unique multi-word phrases. Mental check before writing the call: would the phrase be unique if I scanned the whole VO?

**Reliable anchor patterns:**
- Title cards ("Myth one", "Myth two", "Myth three", "Myth four") — almost always unique
- 3-word noun phrases with at least one distinctive word ("here to make", "money to start", "Bloom will teach")
- Distinctive single words that only appear once ("Boomers", "complicated", "later", "easy!", "Misconceptions")

**Anti-pattern phrases (likely to repeat):** "of", "the", "with", "and", "we're", "to invest", "to start", "Bloom" (appears 5+ times).

## Visual rhymes — sometimes, never forced

Reusing the same asset in different states across scenes can create a narrative beat. Example from bloom-investing-myths:
- Scene 8 (Myth 4 — "you'll lose your money") shows a **broken** piggy bank with coins spilling
- Scene 9 (Bust 4 — "safer investments") shows the same blue piggy bank, **healthy and intact**

The viewer subconsciously connects the two and gets a payoff: "the broken piggy got fixed". That's strong storytelling.

**When this works:**
- The two states are clearly the SAME thing (same color, same proportions)
- The script naturally has a problem→solution structure that maps to the two states
- The states are visually unambiguous (broken vs. whole, locked vs. unlocked, falling vs. rising)

**When NOT to force it:**
- The script doesn't have a natural pair
- The asset would need to be twisted to fit ("our wallet is empty in Myth 2, full in Bust 2" — feels manufactured if the VO doesn't say so)
- You're adding an extra Higgsfield generation just to make it happen

Default is: each beat gets its own fresh visual treatment. Visual rhymes are a happy accident when they fit, not a checkbox.

## Hook scene needs foreground motion in the first 3 seconds

Reels viewers swipe in 2-3 seconds if nothing's hooking them. The first scene must have foreground motion landing within ~3 seconds of `t=0`. Bg patterns (ticker tape, gradients, ambient drift) alone don't count.

**Good first-3-seconds:**
- Word-by-word reveal of the opening line
- An asset entering on the first noun
- A dramatic typography pop on a curiosity word
- A multi-card cascade (like the iMessage scene we built)

**Bad first-3-seconds:**
- Silent ticker scrolling for 5 seconds while the eyebrow waits to slam in
- A single asset that doesn't move until the keyword hits at second 6

## Quick reference: timing values that work

```js
// Entrances
{ duration: 0.5-0.7, ease: "back.out(1.5-1.7)" }

// Idles (sine.inOut yoyo)
{ duration: 1.4-2.6, ease: "sine.inOut", yoyo: true, repeat: 1+, overwrite: "auto" }

// Reactions (short, sharp)
{ duration: 0.06-0.18, ease: "power1.inOut" or "power2.out", yoyo: true, repeat: 1-5 }

// Scene transitions (fade)
fade-out: { opacity: 0, duration: 0.18, ease: "power2.in" } at B(N+1) - 0.18
fade-in:  { opacity: 1, duration: 0.22, ease: "power2.out" } at B(N+1) - 0.08

// Visibility hide (after exit)
tl.set("#sceneN", { visibility: "hidden" }, B(N+1) + 0.2)
```
