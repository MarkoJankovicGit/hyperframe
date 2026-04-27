# Visual Techniques Reference

11 proven techniques for HyperFrames compositions. Use these in your storyboard and per-beat compositions to create visually rich, professional output. Each technique includes a minimal code pattern you can adapt.

These are NOT advanced — they're standard motion design patterns that every Bloom beat should use at least 2-3 of.

This file mirrors the techniques.md in `/website-to-hyperframes` so the dispatch pattern is identical across both skills.

---

## 1. SVG Path Drawing

A path draws itself in real-time, like someone tracing with a pen. Use for revealing diagrams, arrows, connector lines, sparklines, brand marks, candlestick traces.

```html
<svg viewBox="0 0 400 200">
  <path
    class="draw-path"
    d="M 50 100 L 200 50 L 350 100"
    stroke="#1658FF"
    stroke-width="6"
    fill="none"
    stroke-linecap="round"
  />
</svg>
<style>
  .draw-path {
    stroke-dasharray: 280;
    stroke-dashoffset: 280;
  }
</style>
<script>
  tl.to(".draw-path", { strokeDashoffset: 0, duration: 0.7, ease: "power2.out" }, landOn("growth", 0.7));
</script>
```

Use `path.getTotalLength()` to calculate the dasharray value dynamically. For Bloom: candlestick lines, sparklines, "$1 → $24,231" growth curves all use this.

---

## 2. Canvas 2D Procedural Art

Animated noise, particle fields, ticker tapes, data visualizations — anything that evolves frame-by-frame. Drive it with a GSAP proxy.

```html
<canvas id="proc-canvas" width="1080" height="1920"></canvas>
<script>
  const canvas = document.getElementById("proc-canvas");
  const ctx = canvas.getContext("2d");

  function mulberry32(seed) {
    return function () {
      let t = (seed += 0x6d2b79f5);
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  const rand = mulberry32(2024);

  function drawFrame(t) {
    ctx.clearRect(0, 0, 1080, 1920);
    for (let i = 0; i < 200; i++) {
      const x = rand() * 1080, y = rand() * 1920;
      ctx.fillStyle = "rgba(255,255,255,0.6)";
      ctx.beginPath(); ctx.arc(x, y, 2, 0, Math.PI * 2); ctx.fill();
    }
  }

  const proxy = { time: 0 };
  tl.to(proxy, { time: 5, duration: 5, ease: "none", onUpdate: () => drawFrame(proxy.time) }, 0);
</script>
```

The seeded PRNG is deterministic — same frame renders identically every time. Required for HyperFrames. **Never use `Math.random()`.**

For Bloom: Hook ticker-tape canvas, "SUPERPOWER" particle burst, ambient noise particles all use this.

---

## 3. CSS 3D Transforms

Perspective rotations create depth. Use for product showcases, card flips, phone mockups tilting in.

```html
<div class="stage" style="perspective: 900px;">
  <div class="card-3d" style="transform-style: preserve-3d;">
    <div class="face front">$1</div>
    <div class="face back" style="transform: rotateY(180deg);">$24,231</div>
  </div>
</div>
<script>
  tl.to(".card-3d", { rotationY: 360, rotationX: 15, duration: 1.2, ease: "sine.inOut" }, 0);
</script>
```

Always set `perspective` on the parent, `transform-style: preserve-3d` on the animated element.

---

## 4. Per-Word Kinetic Typography

Words appear one-by-one, synced to transcript timing. The core technique for narration-driven videos.

```html
<div class="headline">
  <span class="word">Investing</span>
  <span class="word">is</span>
  <span class="word">your</span>
  <span class="word">superpower.</span>
</div>
<style>
  .word { display: inline-block; opacity: 0; margin: 0 0.12em; }
</style>
<script>
  // Word phrases from VO; landOn resolves each against the inlined W array
  const WORDS = ["Investing", "is", "your", "superpower"];
  document.querySelectorAll(".word").forEach((el, i) => {
    tl.from(el, { x: 60 - i * 12, y: 14, opacity: 0, duration: 0.35, ease: "power2.out" },
      landOn(WORDS[i], 0.35));
  });
</script>
```

The slide distance DECAYS per word (60→12px) — mimics a camera settling. Bloom uses this for headlines that read with the narrator.

---

## 5. Lottie Animation

Vector animations that play inside a composition. Use for icons, character animations.

```html
<script src="https://cdn.jsdelivr.net/npm/@dotlottie/player-component@2.7.12/dist/dotlottie-player.js"></script>
<dotlottie-player class="lottie" src="../generated-assets/spark.json"
  autoplay loop speed="1.5" style="width:500px;height:500px;"></dotlottie-player>
<script>
  gsap.set(".lottie", { scale: 0.3, opacity: 0 });
  tl.to(".lottie", { scale: 1, opacity: 1, duration: 0.35, ease: "back.out(1.6)" }, landOn("Bloom", 0.35));
</script>
```

For Bloom, prefer the Kie-generated 3D-lite assets over Lottie unless you have a specific reason — the visual register is more consistent.

---

## 6. Video Compositing

Embed real video footage inside compositions. Videos must be `muted` with `playsinline`.

```html
<div class="video-frame" style="width:680px;height:840px;border-radius:16px;overflow:hidden;">
  <video src="../generated-assets/clip.mp4" muted playsinline
    style="width:100%;height:100%;object-fit:cover;"></video>
</div>
<script>
  tl.from(".video-frame", { scale: 0.9, opacity: 0, duration: 0.3, ease: "power2.out" }, 0);
</script>
```

The HyperFrames runtime handles video seeking and playback. Don't call `.play()` manually.

---

## 7. Character-by-Character Typing

Terminal typing or "you typed it yourself" feel. Useful for "type your password", search-bar interactions, code reveals.

```html
<div class="terminal-line">
  <span class="prompt">›</span>
  <span class="typed" id="typed-text"></span>
  <span class="cursor" style="width:11px;height:22px;background:#1658ff;display:inline-block;"></span>
</div>
<script>
  const CMD = "buy AAPL $5";
  const typed = document.getElementById("typed-text");
  tl.to(".cursor", { opacity: 0, duration: 0.12, yoyo: true, repeat: 20, ease: "steps(1)" }, 0);
  for (let i = 0; i < CMD.length; i++) {
    tl.call((idx => () => { typed.textContent = CMD.substring(0, idx + 1); })(i), null,
      0.4 + (i / CMD.length) * 1.2);
  }
</script>
```

Use `ease: "steps(1)"` for cursor blink — creates discrete on/off.

---

## 8. Variable Font Axis Animation

Animate `font-variation-settings` to reshape glyphs in real-time. Works with variable fonts that have axes like optical size (opsz), weight (wght), softness (SOFT). Use sparingly — Bloom's primary font is Inter Tight, which doesn't ship variable axes by default.

```html
<style>
  .wordmark {
    --wght: 440;
    font-family: "InterTight", system-ui, sans-serif;
    font-variation-settings: "wght" var(--wght);
    font-size: 200px;
  }
</style>
<script>
  tl.to(".wordmark", { "--wght": 900, duration: 0.45, ease: "power2.out" }, landOn("Bloom", 0.45));
</script>
```

---

## 9. GSAP MotionPathPlugin

Animate an element along an arbitrary SVG path. Use for sliders following curves, particles along trajectories, "your money grows" arrows along a curve.

```html
<script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/MotionPathPlugin.min.js"></script>
<div class="dot" style="width:20px;height:20px;background:#1658ff;border-radius:50%;"></div>
<script>
  gsap.registerPlugin(MotionPathPlugin);
  tl.to(".dot", {
    motionPath: { path: "M 12 300 C 280 280 520 80 820 50 S 1200 48 1308 38" },
    duration: 1.5, ease: "power2.out",
  }, landOn("growth", 1.5));
</script>
```

---

## 10. Velocity-Matched Transitions

Exit one beat and enter the next with matched velocities — creates perceived continuous motion across the seam. The fastest point of both curves meets at the cut, the viewer perceives a smooth camera move.

```javascript
// EXIT (in outgoing beat composition): accelerating with blur
tl.to(".content", { y: -150, filter: "blur(30px)", opacity: 0, duration: 0.33, ease: "power2.in" },
   beatDuration - 0.33);

// ENTRY (in incoming beat composition): decelerating from blur
gsap.set(".content", { y: 150, filter: "blur(30px)" });
tl.to(".content", { y: 0, filter: "blur(0px)", duration: 1.0, ease: "power2.out" }, 0);
```

Match ease families: `.in` for exits, `.out` for entries.

For Bloom, the simpler crossfade pattern is usually right (overlap `data-start` of beats by 0.2s) — velocity-matched is a "wow this transition is intentional" tool, used sparingly.

---

## 11. Audio-Reactive Animation

Drive any GSAP-tweenable property from the playing audio. For Bloom: `narration.mp3` doesn't have musical beats, but it has loud/quiet moments — you can use that to pulse a logo or breathe a background subtly.

**When to use:** dramatic-narration moments where the VO is loud. Skip for calm/tutorial pacing.

```js
// audio-data.json: { fps: 30, totalFrames: 900, frames: [{ bands: [0.82, 0.45, 0.31, ...] }, ...] }
for (let f = 0; f < AUDIO_DATA.totalFrames; f++) {
  tl.call(((frame) => () => {
    const bass = frame.bands[0]; // 0–1
    gsap.set(".logo", { scale: 1 + bass * 0.04 }); // 3–4% pulse on loud moments
  })(AUDIO_DATA.frames[f]), [], f / AUDIO_DATA.fps);
}
```

Pre-extract via the gsap skill's `extract-audio-data.py` script. Keep intensity subtle (≤5% scale) — audio-reactive motion on tiny elements reads as jitter.

**Never do:** equalizer bars, spectrum analyzers, waveform displays, strobing, rainbow color cycling. Audio gives _timing and intensity_; the visual vocabulary stays Bloom.

---

## When to Use What (Bloom-flavored)

| Beat type                          | Techniques to combine                                                       |
| ---------------------------------- | --------------------------------------------------------------------------- |
| **Hook**                           | Canvas 2D ticker tape (#2) + per-word kinetic typography (#4)              |
| **Concept / definition**           | Per-word kinetic typography (#4) + SVG path underline (#1)                 |
| **Examples** (3 rows of nouns)     | Staggered card entrances + 3D tilt (#3) on each example asset              |
| **Stat-reveal / counter**          | SVG path drawing (#1) for sparkline + counter animation                    |
| **Stat-comparison A vs B**         | Counter + SVG path drawing on B side; A side is static for contrast        |
| **Try-it + Brand-reveal**          | Logo grid fill-in via stagger + scale-in-with-rotate (`back.out(1.7)`)     |
| **Insight / superpower**           | Canvas 2D particle burst (#2) anchored at the keyword                      |
| **Tease / CTA-close**              | SVG path drawing (#1) + bloom-logo scale-in + gentle audio-reactive pulse  |

---

## Hard rules across all techniques

These exist because the HyperFrames runtime renders deterministically frame-by-frame.

- **No `Math.random()`** — use a seeded mulberry32 PRNG for any stochastic visuals
- **No `Date.now()`, no `performance.now()`** — drive all motion via the GSAP timeline proxy
- **No `repeat: -1`** — calculate exact repeat count from beat duration
- **Synchronous timeline construction** — no `async/await` wrapping the timeline registration
- **Register every timeline**: `window.__timelines["bloom-<slug>-beat-<N>"] = tl`
- **Never use CSS `transform: translate(-50%,-50%)` for centering** — GSAP overwrites the transform property; use flexbox
- **Anchor entrances on the topic word, not the punchline** — use `landOn(phrase, dur)` from `timing-helpers.md`
