# Phrase-Anchored Timing Helpers

Drop these into every Bloom lesson's `<script>` block. They replace per-keyword `const KW_X = 1.234` lookups with phrase-anchored calls that resolve at runtime against the inlined transcript.

**Why this exists:** when the script changes, hardcoded constants drift silently. With these helpers, a script change re-resolves automatically — and an ambiguous phrase throws a loud error instead of silently picking the wrong word.

## The helpers (copy as-is)

```js
// ── VO WORD TIMING (inline transcript.json's words array) ──────────
const W = [/* paste compact words JSON here — see "Inlining" below */];

// ── PHRASE-ANCHORED TIMING ────────────────────────────────────────
// landOn(phrase, dur)   → tween of `dur` seconds ENDS at start of phrase
// landAfter(phrase, dur) → tween of `dur` seconds ENDS at end of phrase
// at(phrase)            → start time of phrase (raw seconds)
// Throws if the phrase is empty, missing, or matches >1 places.
function _norm(s) { return s.toLowerCase().replace(/[^\p{L}\p{N}'-]/gu, ""); }
function _findPhrase(phrase) {
  const tokens = phrase.toLowerCase().split(/\s+/).map(_norm).filter(Boolean);
  if (!tokens.length) throw new Error(`landOn: empty phrase`);
  const hits = [];
  for (let i = 0; i <= W.length - tokens.length; i++) {
    let ok = true;
    for (let j = 0; j < tokens.length; j++) {
      if (_norm(W[i + j].w) !== tokens[j]) { ok = false; break; }
    }
    if (ok) hits.push(i);
  }
  if (hits.length === 0) {
    throw new Error(`landOn: phrase "${phrase}" not found in transcript`);
  }
  if (hits.length > 1) {
    const times = hits.map(i => W[i].s.toFixed(3) + "s").join(", ");
    throw new Error(`landOn: phrase "${phrase}" matches ${hits.length} occurrences at [${times}]. Use a longer phrase to disambiguate.`);
  }
  return { startIdx: hits[0], endIdx: hits[0] + tokens.length - 1 };
}
function at(phrase)                       { return W[_findPhrase(phrase).startIdx].s; }
function landOn(phrase, duration = 0)     { return at(phrase) - duration; }
function landAfter(phrase, duration = 0)  { return W[_findPhrase(phrase).endIdx].e - duration; }
```

## Inlining the transcript

The `W` array is the words from `transcript.json`, compacted. Generate it once:

```bash
cd hyperframes/videos/bloom-<slug>
node -e "
const fs = require('fs');
const t = JSON.parse(fs.readFileSync('transcript.json','utf8'));
const compact = t.words.map(w => ({w:w.word, s:Number(w.start.toFixed(3)), e:Number(w.end.toFixed(3))}));
fs.writeFileSync('vo-words.json', JSON.stringify(compact));
console.log('OK', compact.length, 'words');
"
```

Then paste the contents of `vo-words.json` into `const W = [...]` in `index.html`. ~5KB inline; no async fetch races at composition load.

If the script changes (re-run TTS), regenerate `vo-words.json` and replace the inline array.

## API

### `landOn(phrase, duration = 0)` — most common
Schedules a tween so its **end** (the slam impact) lines up with the **start** of the spoken phrase.

```js
tl.fromTo("#headline", { scale: 0.7 }, { scale: 1, duration: 0.4, ease: "back.out(1.7)" },
  landOn("sleeping", 0.4));
// = at("sleeping") - 0.4 = 1.889 - 0.4 = 1.489s on the timeline
// At t=1.889 (when narrator says "sleeping"), the slam lands.
```

### `landAfter(phrase, duration = 0)` — counters and stat reveals
Schedules a tween so its end lines up with the **end** of the spoken phrase. Use for counters that should land *as the narrator finishes saying the number*.

```js
const counterLand = landAfter("eighty thousand dollars");  // = 40.695s (end of "dollars")
tl.to(counter, { v: 380000, duration: 1.8, ease: "power3.out" }, counterLand - 1.8);
```

### `at(phrase)` — raw timestamp
Returns just the start time. Use it when you need to add a positive offset, or for canvas closures that compare the timeline `t` against a reference moment.

```js
tl.to("#divider", { scaleX: 1, ... }, at("saving") + 0.35);  // 0.35s AFTER "saving" begins
const burstAt = landAfter("eighty thousand dollars");        // resolve once for canvas IIFE
```

## Disambiguation patterns

When a single word matches multiple times, the helper throws with all match positions. The fix is always: use a longer phrase. **Never** silently pick `nth: N` — the listener doesn't track "the third 'but'" either; they track phrases.

| If you have… | Use… | Why |
|---|---|---|
| `"investing"` matches 3× | `"investing Investing"` | adjacent words + capitalization is irrelevant after `_norm` |
| `"stocks"` appears in Examples and Stat-B | `"stocks. It's"` | next sentence's first word disambiguates |
| `"But"` opens 3 different sentences | `"But by"` / `"But invest"` / `"But it's"` | one unique 2-gram per occurrence |
| `"time"` in "over time" + "time, patience" | `"time patience"` | uses next word |
| `"dollars"` appears in 3 spots | anchor a multi-word phrase containing it | e.g. `landAfter("eighty thousand dollars")` |

Punctuation and capitalization are stripped before matching — `"sleeping"` matches `"sleeping?"`, `"investing"` matches `"Investing,"`. So you write the phrase as it sounds, not as it appears.

## When the helper is the wrong tool

- **Beat boundaries (scene starts/ends).** Keep these as `const B1 = 0, B2 = 2.54, ...` constants — they're cosmetic gaps between scenes, not anchored to specific spoken words.
- **Pure visual timings** (e.g. divider wipes 0.35s after a previous animation) — use raw arithmetic like `at("saving") + 0.35`. Don't force a phrase that doesn't exist.
- **Canvas closures that loop on a moving `t`** — resolve the anchor once with `const burstAt = landAfter(...)` outside the closure, then use `burstAt` inside.

## Failure modes (by design)

| Error | Meaning | Fix |
|---|---|---|
| `phrase "X" not found in transcript` | typo, or word is not actually spoken | check `narration.txt`; the helper matches lowercase, alpha-only |
| `phrase "X" matches N occurrences at [...]` | ambiguous | add 1-2 surrounding words to make it unique |
| `landOn: empty phrase` | passed `""` or whitespace-only | obvious — supply a phrase |

These failures throw at composition load, before the timeline is registered. The HyperFrames preview will show a blank `#root` and the browser console reveals the error. **Read the console first** when a scene refuses to render.
