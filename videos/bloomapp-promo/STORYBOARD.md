# STORYBOARD — Bloom Promotional Reel (15s)

**Format:** 1080×1920 portrait @ 30fps (Instagram Reels)
**Audio:** ElevenLabs voiceover (voice `JZ3e95uoTACVf6tXaaEi`, model `eleven_multilingual_v2`) + minimal SFX. No underscore — narration should own the sonic space at 15s.
**VO direction:** Warm, energetic, confident — Gen-Z trusted-older-sibling register. Short sentences, clear pauses between beats. Contractions natural.
**Style basis:** DESIGN.md (Bloom brand — bright blue `#1658FF` / black `#1C2329` / white / green `#01CD74`, Inter + Inter Tight italic bold caps, black rounded-rect headline badges).

## Global Guardrails

- **Signature motif:** Every beat has at least one **black rounded-rect headline badge** with white Inter-Tight 800 italic caps — this is Bloom's recognizable visual handshake.
- **8-10 visual elements per beat:** background + phone mockup + signature badge + supporting copy + accent icon + yellow star + brand logo + ambient motion.
- **2-3 techniques per beat** from `references/techniques.md`: per-word kinetic typography, perspective tilt / Ken Burns on mockups, SVG path drawing, Canvas 2D procedural ambient motion, counter animation, CSS 3D.
- **Color dominance:** Beat 1 and Beat 4 use hero blue `#1658FF`. Beat 2 and Beat 3 use white / `#F8F8F9`. The blue-white-white-blue sandwich brackets the piece.
- **Motion rule:** No static frame. If something isn't entering/exiting, it's breathing (scale 1→1.03 drift, y ±6px yoyo, or opacity shimmer).

---

## Asset Audit

| Asset | Type | Assign to Beat | Role |
|-------|------|----------------|------|
| `695f5099208b94c9b420571c-bloom-star.png` | PNG (313KB) | Beat 1, Beat 4 | Yellow star decorative motif, slow rotation |
| `690abdf36629486dfb606b59-learn-screen-1.png` | Phone screenshot | Beat 2 | Learn feature mockup, perspective tilt |
| `690acfe6dcc7de5c86148956-ask-screen-1.png` | Phone screenshot | Beat 2 | Bloomie AI mockup, opposite tilt |
| `690ba188fa21cc9a599feb66-mockup-safe-p-8.png` | Phone mockup | Beat 3 | Trusted-app mockup, Ken Burns float |
| `690ad285c2e9d81397a85ab8-sipc.png` | SIPC badge | Beat 3 | Insurance credibility mark |
| `690ba8a8c56264654608fd99-mock-cta-p-1080.png` | Hero CTA phones | Beat 4 | Final-beat mockup beside logo |
| `../../assets/bloom-logo.png` | Project-root logo | Beat 4 (+ Beat 2 subtle) | Brand anchor, always shown when Bloom is named |
| `favicon.png` | Favicon | SKIP | Too small for 1080×1920 |
| `image-0.svg` | Generic SVG | SKIP | Unknown content, risky |
| Feature icons (`icon-learning.png`, `icon-bloomie.png`, `icon-mirror.png`, `icon-portfolio.png`) | Small PNG | Optional Beat 2 accent | Tiny supporting chips, not focal |

**Utilization check:**
- Hero blue appears in 2/4 beats ✓
- Bloom logo in Beat 4 finale ✓ (per memory `feedback_bloom_logo`)
- Phone mockups in 3/4 beats ✓ (proof of product)
- Signature black headline badge in every beat ✓

---

## BEAT 1 — THE HOOK (≈0.0 → 3.6s)

**VO:** "Wall Street shouldn't feel like a secret club."

### Concept
Open in Bloom's territory — the saturated `#1658FF` blue hero. Canvas feels **owned** before any words land. Behind/below a slow vertical scroll of financial jargon (tickers, percentages, trendlines) suggests the old Wall Street noise. Then the signature black badge **SLAMS** in with "WALL STREET" — brand asserts itself. The follow-up "SHOULDN'T FEEL LIKE A SECRET CLUB" appears below as a smaller stacked badge, punching the contrast.

### Visual
- **BG:** Solid `#1658FF`. A Canvas 2D layer drifts behind everything — a vertical ticker tape of faded monochrome financial tokens (`SPY +0.34%`, `AAPL`, `NVDA -2.1%`, candlestick pips) at ~8% white opacity, scrolling up at 40 px/s. Deterministic hash-based placement.
- **MG:** Yellow Bloom star (`bloom-star.png`) behind the first badge, scale 0.9, rotating clockwise 12° total across the beat, opacity 0.45.
- **FG:** Two stacked black rounded-rect badges. Badge 1: `WALL STREET` (Inter Tight 800 italic caps, 180px, white) — slams in at word "Wall" onset, scale 1.25→1 + y:-40→0 in 0.35s power3.out, then micro settle. Badge 2: `SHOULDN'T FEEL LIKE A SECRET CLUB` (Inter Tight 800 italic caps, ~72px, white) — appears at word "shouldn't", wipe-in left→right 0.45s power3.out.

### Mood
Cinematic opener — big, confident, slightly defiant. Think a sports-brand tease that refuses to introduce itself politely. NOT corporate-fintech.

### Animation choreography
| Element | Verb + timing |
|---|---|
| `#1658FF` panel | CRASHES in (scale 1.05 → 1 over 0.3s, power3.out) — scene starts in motion |
| Canvas ticker tape | DRIFTS upward continuously, no entrance needed |
| Yellow star | ROTATES slowly, scales in from 0 to 0.9 (0.5s back.out) at 0.4s |
| Badge "WALL STREET" | SLAMS in at ~0.1s (VO onset of "Wall") |
| Badge "SHOULDN'T FEEL LIKE A SECRET CLUB" | WIPES in L→R at ~1.4s (VO onset of "shouldn't") — character-by-character stagger, 0.02s per char |
| All FG elements | BREATHE — subtle scale ±1% yoyo after entrance |

### Transition OUT
**Cross-Warp Morph shader transition**, 0.5s, power2.inOut, into the white Beat 2. This is the centerpiece reveal — blue→white with an organic ripple carries the "unlock" feeling.

### Depth layers
- **BG:** solid blue + canvas ticker
- **MG:** yellow star (behind badges)
- **FG:** black headline badges

### SFX
- Subtle muted low-rumble bed at t=0 (0.5s fade in/out) to add weight to the opening
- Soft percussive "thump" at badge 1 slam
- Paper-shuffle whisper at badge 2 wipe

---

## BEAT 2 — THE FEATURE (≈3.8 → 7.8s)

**VO:** "Bloom turns it into bite-size lessons. Real stocks. Zero jargon."

### Concept
Cut to bright white. The answer to Beat 1's problem. The viewer sees Bloom's actual product — a phone running the Learn screen — flanked by three percussive black-badge callouts that SYNC to each spoken phrase: "BITE-SIZE LESSONS" / "REAL STOCKS" / "ZERO JARGON". This beat is the feature moment, rhythmic and tight.

### Visual
- **BG:** White `#FFFFFF`. Faint radial green glow (`#01CD74` at 4%) behind the phone mockup — success/growth undertone without shouting.
- **MG:** Phone mockup `690abdf36629486dfb606b59-learn-screen-1.png` center-right, rotated -8°, `transformPerspective: 1200`, soft ambient shadow `#19213D1A`. Enters with y:+120→0 + rotation -15°→-8° in 0.6s power2.out. Ken Burns zoom 1.0→1.03 over the 4s beat.
- Secondary smaller phone `690acfe6dcc7de5c86148956-ask-screen-1.png` left, rotated +10°, 70% scale, enters 0.3s after first phone with y:+150→0.
- **FG:** Three black headline badges cascade vertically on the left side, each syncs to its VO word:
  1. `BITE-SIZE LESSONS` — slams at word "bite-size"
  2. `REAL STOCKS` — slams at word "Real"
  3. `ZERO JARGON` — slams at word "Zero"
- **Brand anchor:** small Bloom logo top-left corner (fade-in 0.3s at beat start).

### Mood
Product proof. Clean, bright, percussive. Think an Apple product page that suddenly learned how to punch.

### Animation choreography
| Element | Verb + timing |
|---|---|
| White bg | HARD cut in (from shader transition) |
| Green radial glow | PULSES slowly (opacity 0.02↔0.05, 1.5s sine.inOut yoyo) |
| Phone mockup 1 (learn) | SLIDES up + TILTS into rest at 0.0s |
| Phone mockup 2 (ask) | SLIDES up at 0.3s (offset stagger) |
| Badge "BITE-SIZE LESSONS" | SLAMS in at VO "bite-size" (~1.2s), x:-80→0 + scale 1.15→1, 0.3s power3.out |
| Badge "REAL STOCKS" | SLAMS in at VO "Real" (~2.4s) |
| Badge "ZERO JARGON" | SLAMS in at VO "Zero" (~3.0s) |
| Phone mockups | Both continue Ken Burns scale 1→1.03 through the beat |
| Bloom logo corner | Floats ±4px y sine.inOut throughout |

### Transition OUT
**Velocity-matched upward** — exit y:-150, blur:30px, opacity:0.3, 0.33s power2.in. Next beat enters from below with matching velocity.

### Depth layers
- **BG:** white + green radial glow
- **MG:** two phone mockups at different z (main larger, secondary smaller)
- **FG:** three cascaded black badges + corner logo

### SFX
- Soft digital "click" on each badge slam (3 clicks total)
- Subtle whoosh on phone entrance

---

## BEAT 3 — THE PROOF (≈8.0 → 12.0s)

**VO:** "Two million downloads. Money protected up to five hundred thousand."

### Concept
Credibility beat. We shift to the soft-gray surface `#F8F8F9`, where the big numbers live. "2,000,000+" counts up from 0 like an odometer spinning, in enormous Inter Tight black. Then the protection stat locks in with the SIPC badge beside it — a quiet reassurance after the loud feature moment. The trusted-app phone mockup floats in the lower half as visual proof that money is real.

### Visual
- **BG:** Solid `#F8F8F9` (soft gray). A very subtle Canvas 2D particle field (20 gentle floating dots at 15% black, slow sine drift) gives the frame ambient life.
- **MG:** Big stat centered upper half: `2,000,000+` counter animation from 0→2,000,000 over 1.2s using `Easing.out(Easing.quad)` (per memory `project_bloom` — no spring overshoot on money counters). Label beneath, small muted: `DOWNLOADS`. 180px Inter Tight 800 numerals.
- Then at VO "money protected", a transition: the big number **morphs** (scale 0.9 + blur) and is replaced with a black headline badge: `$500,000 PROTECTED`. SIPC badge (`690ad285c2e9d81397a85ab8-sipc.png`) appears beside it at 80×80.
- **FG:** A green SVG checkmark path-draws itself (`strokeDasharray` technique from techniques.md #1) beside the protected stat — ~0.5s draw duration, `#01CD74`.
- **Lower half:** Phone mockup `690ba188fa21cc9a599feb66-mockup-safe-p-8.png` floats up from below, rotated -4°, Ken Burns 1→1.04.

### Mood
Reassurance. Confident. The "we're real" moment. Quieter than Beats 1-2, deliberately paced.

### Animation choreography
| Element | Verb + timing |
|---|---|
| Background | HARD cut in (from velocity-matched entry, y:+150→0 + blur clear) |
| Canvas particles | DRIFT continuously, no entrance |
| `2,000,000+` numeral | COUNTS UP from 0→2M at 0.1s, `Easing.out(Easing.quad)`, 1.2s duration |
| `DOWNLOADS` label | FADES in at 0.8s as counter lands |
| Old stat → new stat | SWAP at ~2.4s: counter blurs+scales out, `$500,000 PROTECTED` badge slams in |
| SIPC badge | POPS in beside protected stat (scale 0→1, 0.3s back.out) at ~2.7s |
| Green checkmark | DRAWS itself SVG-style, 0.5s power2.out, at ~2.9s |
| Trusted phone mockup | RISES from bottom (y:+200→0, 0.8s power2.out) at ~0.2s, Ken Burns through beat |

### Transition OUT
**Zoom through** — scale 1→1.2, blur:20px, opacity:0.3, 0.25s power3.in. Next beat enters with scale 0.75→1 + blur clear — reads as camera punching into the logo.

### Depth layers
- **BG:** `#F8F8F9` + faint particle field
- **MG:** big stat / replacement badge + SIPC + checkmark
- **FG:** phone mockup floating in lower third

### SFX
- Soft odometer tick (low-pitched) syncing with counter, 6-8 ticks
- Gentle chime on checkmark draw completion
- Barely-there paper sound on badge swap

---

## BEAT 4 — THE CTA (≈12.2 → 14.7s)

**VO:** "Learn. Invest. Automate. Get Bloom."

### Concept
Close the loop. Return to hero `#1658FF` blue — we're back home. The Bloom logo scales in dead-center, giant, bouncy. Three verbs stack and slam in rhythm on each spoken word: `LEARN.` `INVEST.` `AUTOMATE.` — each its own black badge, each percussive. Then the final reveal: `GET BLOOM.` appears as the biggest badge of the video, with the Bloom logo beside it. Yellow star rotates behind — callback to Beat 1. End card.

### Visual
- **BG:** Solid `#1658FF` (callback to Beat 1 — brackets the piece). Canvas ticker from Beat 1 does NOT return — this beat is clean.
- **MG:** Yellow Bloom star (`bloom-star.png`) dead center behind logo, rotating clockwise 20° across beat, scale 1.1, opacity 0.5. Audio-reactive scale pulse: micro-scale bump (±2%) on each beat-syncing badge slam.
- **FG (entrance sequence):**
  1. `LEARN.` badge — slams in from top at VO onset of "Learn" (~0.1s), y:-100→0 + scale 1.2→1, 0.28s power3.out, top-third position
  2. `INVEST.` badge — center position, slams at VO "Invest" (~0.8s)
  3. `AUTOMATE.` badge — bottom-third position, slams at VO "Automate" (~1.4s)
  4. At VO "Get Bloom" (~2.0s): the three verb badges collapse together (y-ease toward center + slight scale down) while the Bloom logo SCALES IN from 0 to full size at center with a satisfying bounce (back.out(1.7), 0.5s) — bloom-logo.png 420×420.
  5. A final black pill `GET BLOOM.` badge (Inter Tight 800 italic caps) slides in beneath the logo at ~2.3s.

### Mood
Triumphant, rhythmic, brand close. Like the last chord of a song that started on Beat 1.

### Animation choreography
| Element | Verb + timing |
|---|---|
| Blue bg | HARD cut (from zoom-through entry: scale 0.75→1 + blur 20→0, 0.4s expo.out) |
| Yellow star | ROTATES + scales in (0→1.1 in 0.4s back.out), stays rotating |
| `LEARN.` badge | SLAMS top at ~0.1s |
| `INVEST.` badge | SLAMS center at ~0.8s |
| `AUTOMATE.` badge | SLAMS bottom at ~1.4s |
| Three badges | COLLAPSE toward center at ~2.0s (y converge + opacity 1→0.15, 0.25s power2.in) |
| Bloom logo | BLOOMS in center at ~2.0s (scale 0→1.0, back.out(1.7), 0.5s), then breathes (scale 1↔1.02 sine.inOut) |
| `GET BLOOM.` pill | SLIDES up from below at ~2.3s (y:+80→0, 0.3s power2.out) |
| Star | PULSES audio-reactively (±2% scale on each badge slam) |

### Transition OUT
None — this is the final beat. Hold on the logo + `GET BLOOM.` pill + star for the last ~0.5s of the 15s total, letting the viewer rest on the brand.

### Depth layers
- **BG:** blue `#1658FF`
- **MG:** yellow star (behind logo)
- **FG:** verb badges → logo + pill

### SFX
- Three sharp staccato hits on LEARN/INVEST/AUTOMATE slams
- Soft bloom-chime on logo reveal (single clean tone)
- Tail silence on final hold

---

## Production Architecture

```
hyperframes/videos/bloomapp-promo/
├── index.html                    root — narration audio + 4 scene slots
├── DESIGN.md                     brand reference (Step 2)
├── SCRIPT.md                     narration text (Step 3)
├── STORYBOARD.md                 THIS FILE — creative north star
├── narration.txt                 exact text sent to TTS
├── narration.wav                 TTS audio (Step 5)
├── transcript.json               word-level timestamps (Step 5)
├── capture/                      captured bloomapp.com data (Step 1)
│   ├── screenshots/
│   ├── assets/ (55 assets)
│   └── extracted/
└── compositions/
    ├── beat-1-hook.html          (0.0-3.6s, blue)
    ├── beat-2-feature.html       (3.8-7.8s, white)
    ├── beat-3-proof.html         (8.0-12.0s, soft gray)
    └── beat-4-cta.html           (12.2-14.7s, blue)
```

## Beat Timings (from `transcript.json`)

Real word timings from ElevenLabs. Total narration: **17.079s** (slightly longer than the 15s estimate — TTS ran natural, no re-generate needed).

| Beat | VO cue | data-start | data-duration | Words (first → last) |
|------|--------|------------|---------------|----------------------|
| 1 — Hook | "Wall Street shouldn't feel like a secret club." | `0.000` | `2.600` | Wall (0.00s) → club. ends 2.09s |
| 2 — Feature | "Bloom turns it into bite-size lessons. Real stocks. Zero jargon." | `2.600` | `5.280` | Bloom (2.69s) → jargon. ends 7.67s |
| 3 — Proof | "Two million downloads. Money protected up to five hundred thousand." | `7.880` | `4.775` | Two (7.88s) → thousand. ends 12.05s |
| 4 — CTA | "Learn. Invest. Automate. Get Bloom." | `12.655` | `4.424` | Learn. (12.66s) → Bloom. ends 16.58s |

**Total composition duration:** 17.079s. Root `<template>` `data-duration="17.079"`.

### Key word onsets (for syncing per-element animations inside each beat)

- Beat 1 — "Wall" 0.00 · "shouldn't" 0.546 · "secret" 1.277 · "club" 1.614
- Beat 2 — "Bloom" 2.694 · "bite-size" 3.762 · "lessons" 4.331 · "Real" 5.677 · "stocks" 5.968 · "Zero" 6.780 · "jargon" 7.163
- Beat 3 — "Two million" 7.883-8.115 · "downloads" 8.464 · "Money" 9.845 · "protected" 10.124 · "five hundred thousand" 10.879-11.459
- Beat 4 — "Learn" 12.655 · "Invest" 13.166 · "Automate" 13.990 · "Get Bloom" 15.546-15.894

Each composition file reads these in its own beat-local timeline (subtracting its `data-start` so local t=0 is the beat's first frame).
