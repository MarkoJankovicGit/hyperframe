#!/usr/bin/env node
/**
 * audit-timeline.mjs — static analysis of a HyperFrames composition timeline.
 *
 * Usage:
 *   node audit-timeline.mjs <path-to-index.html> [--gap=1.5]
 *
 * What it does (no browser, no deps — just regex + eval):
 *   1. Reads the HTML
 *   2. Extracts the inlined `W` array (VO word timing) and `B<N>` beat constants
 *   3. Greps all `tl.fromTo(...)` / `tl.to(...)` / `tl.set(...)` calls
 *   4. For each, resolves the position arg (landOn("...", N), landAfter("...", N),
 *      B<N> + offset, BURST_AT + offset, plain numbers, etc.) to a numeric time
 *   5. Reads `duration:`, `repeat:`, `yoyo:` from the vars to compute end times
 *   6. Sorts chronologically, prints the event log + dead-air gaps
 *
 * Why static: the position args are deterministic — they evaluate to the same
 * numeric times whether GSAP runs or not. Loading a browser to introspect is
 * overkill for inspection. See references/animation-patterns.md for guidance
 * on dwell-time + dead-air rules.
 */
import { readFileSync, existsSync } from "node:fs";
import { resolve, basename } from "node:path";

// ── Args ────────────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const htmlArg = args.find((a) => !a.startsWith("--"));
const gapArg = args.find((a) => a.startsWith("--gap=")) ?? "--gap=1.5";
const gapThreshold = parseFloat(gapArg.split("=")[1]);

if (!htmlArg) {
  console.error("Usage: node audit-timeline.mjs <path-to-index.html> [--gap=1.5]");
  process.exit(1);
}
const htmlPath = resolve(htmlArg);
if (!existsSync(htmlPath)) {
  console.error(`File not found: ${htmlPath}`);
  process.exit(1);
}
const src = readFileSync(htmlPath, "utf-8");

// ── Strip comments so the regex doesn't catch tl.to(...) inside a comment ──
const code = src
  .replace(/\/\*[\s\S]*?\*\//g, "")        // /* … */
  .replace(/(^|[^:])\/\/[^\n]*/g, "$1");   // // … (avoid http://)

// ── 1. Extract W array (VO word timing) ────────────────────────────────────
const wMatch = code.match(/const\s+W\s*=\s*(\[[\s\S]*?\])\s*;/);
if (!wMatch) {
  console.error("Could not find `const W = [...]` (VO word timing). Is this a HyperFrames composition?");
  process.exit(1);
}
const W = JSON.parse(wMatch[1]);

// ── 2. Extract beat constants (B1=0, B2=10.25, …) ──────────────────────────
const scope = {};
const beatBlocks = code.matchAll(/const\s+B\d+[^;]*;/g);
for (const block of beatBlocks) {
  for (const [, name, val] of block[0].matchAll(/(B\d+)\s*=\s*([\d.]+)/g)) {
    scope[name] = parseFloat(val);
  }
}

// ── 3. Phrase-anchored time helpers (mirror the script) ─────────────────────
function _norm(s) { return s.toLowerCase().replace(/[^\p{L}\p{N}'-]/gu, ""); }
function _findPhrase(phrase) {
  const tokens = phrase.toLowerCase().split(/\s+/).map(_norm).filter(Boolean);
  const hits = [];
  for (let i = 0; i <= W.length - tokens.length; i++) {
    let ok = true;
    for (let j = 0; j < tokens.length; j++) {
      if (_norm(W[i + j].w) !== tokens[j]) { ok = false; break; }
    }
    if (ok) hits.push(i);
  }
  if (hits.length === 0) throw new Error(`phrase "${phrase}" not found`);
  if (hits.length > 1) throw new Error(`phrase "${phrase}" matches ${hits.length} times`);
  return { startIdx: hits[0], endIdx: hits[0] + tokens.length - 1 };
}
const at         = (p)        => W[_findPhrase(p).startIdx].s;
const landOn     = (p, d = 0) => at(p) - d;
const landAfter  = (p, d = 0) => W[_findPhrase(p).endIdx].e - d;

// ── 4. Resolve a position expression to a number ───────────────────────────
function evalPos(expr) {
  let s = expr.trim();
  // Resolve landOn / landAfter / at calls
  s = s.replace(
    /(landOn|landAfter|at)\s*\(\s*"([^"]+)"\s*(?:,\s*([\d.]+))?\s*\)/g,
    (_, fn, phrase, dur) => {
      const f = { landOn, landAfter, at }[fn];
      return String(f(phrase, parseFloat(dur || "0")));
    },
  );
  // Substitute scope (B1, B2, …, BURST_AT, etc.)
  for (const [name, val] of Object.entries(scope)) {
    s = s.replace(new RegExp(`\\b${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "g"), String(val));
  }
  // Eval the remaining numeric expression
  return Function(`"use strict"; return (${s});`)();
}

// ── 5. Pre-resolve any const X = <position-like expr>; into scope ──────────
// This catches things like `const BURST_AT = landAfter("one million");`
const namedConstRe = /const\s+([A-Z_][A-Z0-9_]*)\s*=\s*([^;]+);/g;
for (const m of code.matchAll(namedConstRe)) {
  const name = m[1];
  const expr = m[2].trim();
  if (scope[name] !== undefined) continue;
  if (/^[\[{]/.test(expr)) continue;        // skip arrays/objects
  if (/function\s*\(/.test(expr)) continue;  // skip functions
  try { scope[name] = evalPos(expr); } catch { /* skip */ }
}

// ── 6. Find all tl.fromTo / tl.to / tl.set calls ───────────────────────────
function findCalls(src) {
  const out = [];
  const startRe = /\btl\.(fromTo|to|set)\s*\(/g;
  let m;
  while ((m = startRe.exec(src)) !== null) {
    const method = m[1];
    const open = m.index + m[0].length;
    // Walk forward, balanced parens, ignore strings/template literals
    let depth = 1, i = open, q = null, esc = false;
    while (i < src.length && depth > 0) {
      const ch = src[i];
      if (esc) esc = false;
      else if (q) { if (ch === "\\") esc = true; else if (ch === q) q = null; }
      else if (ch === '"' || ch === "'" || ch === "`") q = ch;
      else if (ch === "(") depth++;
      else if (ch === ")") depth--;
      if (depth > 0) i++;
    }
    if (depth !== 0) continue;
    out.push({ method, body: src.slice(open, i), index: m.index });
  }
  return out;
}

function splitArgs(s) {
  const parts = [];
  let depth = 0, q = null, esc = false, start = 0;
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (esc) { esc = false; continue; }
    if (q) { if (ch === "\\") esc = true; else if (ch === q) q = null; continue; }
    if (ch === '"' || ch === "'" || ch === "`") { q = ch; continue; }
    if ("([{".includes(ch)) depth++;
    else if (")]}".includes(ch)) depth--;
    else if (ch === "," && depth === 0) { parts.push(s.slice(start, i).trim()); start = i + 1; }
  }
  parts.push(s.slice(start).trim());
  return parts;
}

function parseVars(text) {
  const out = {};
  const d = text.match(/\bduration\s*:\s*([\d.]+)/);    if (d)  out.duration = parseFloat(d[1]);
  const r = text.match(/\brepeat\s*:\s*(-?\d+)/);       if (r)  out.repeat   = parseInt(r[1], 10);
  const y = text.match(/\byoyo\s*:\s*true\b/);          if (y)  out.yoyo     = true;
  return out;
}

// ── 7. Build event list ────────────────────────────────────────────────────
const events = [];
const skipped = [];
for (const call of findCalls(code)) {
  const args = splitArgs(call.body);
  const target = (args[0] || "").replace(/^["']|["']$/g, "");
  let varsArg, posArg;
  if (call.method === "fromTo")     { varsArg = args[2]; posArg = args[3]; }
  else /* "to" or "set" */          { varsArg = args[1]; posArg = args[2]; }

  let start;
  try { start = evalPos(posArg ?? "0"); }
  catch (err) { skipped.push({ target, posArg, reason: err.message }); continue; }

  const vars   = parseVars(varsArg || "");
  const dur    = vars.duration ?? 0;
  const repeat = vars.repeat   ?? 0;
  const yoyo   = !!vars.yoyo;
  const total  = repeat < 0 ? dur : dur * (repeat + 1);

  events.push({
    method: call.method,
    target,
    start: +start.toFixed(3),
    duration: +dur.toFixed(3),
    repeat,
    yoyo,
    end: +(start + total).toFixed(3),
  });
}
events.sort((a, b) => a.start - b.start || a.end - b.end);

// ── 8. Dead-air gap analysis (union of [start,end] intervals) ──────────────
const intervals = events.filter((e) => e.end >= e.start).map((e) => [e.start, e.end]);
intervals.sort((a, b) => a[0] - b[0]);
const merged = [];
for (const [a, b] of intervals) {
  if (!merged.length || a > merged[merged.length - 1][1]) merged.push([a, b]);
  else merged[merged.length - 1][1] = Math.max(merged[merged.length - 1][1], b);
}
const totalDuration = W.length ? W[W.length - 1].e + 1 : (merged[merged.length - 1]?.[1] ?? 0);

const gaps = [];
let cursor = 0;
for (const [a, b] of merged) {
  if (a - cursor > 0) gaps.push({ from: +cursor.toFixed(3), to: +a.toFixed(3), duration: +(a - cursor).toFixed(3) });
  cursor = b;
}
if (cursor < totalDuration) {
  gaps.push({ from: +cursor.toFixed(3), to: +totalDuration.toFixed(3), duration: +(totalDuration - cursor).toFixed(3) });
}
const flagged = gaps.filter((g) => g.duration >= gapThreshold);

// ── 9. Reporting ────────────────────────────────────────────────────────────
const isTTY = process.stdout.isTTY;
const c = isTTY
  ? { gray: (s) => `\x1b[90m${s}\x1b[0m`, bold: (s) => `\x1b[1m${s}\x1b[0m`,
      red:  (s) => `\x1b[31m${s}\x1b[0m`, yellow: (s) => `\x1b[33m${s}\x1b[0m`,
      green: (s) => `\x1b[32m${s}\x1b[0m`, cyan: (s) => `\x1b[36m${s}\x1b[0m` }
  : new Proxy({}, { get: () => (s) => s });

console.log("");
console.log(c.bold(`Source: ${basename(htmlPath)}`));
console.log(c.gray(`VO duration: ${totalDuration.toFixed(2)}s · animation calls: ${events.length}` +
                   (skipped.length ? ` · skipped: ${skipped.length}` : "")));
console.log("");

console.log(c.bold(`Dead-air gaps (≥ ${gapThreshold.toFixed(1)}s)`));
if (flagged.length === 0) {
  console.log(c.green("  none — every window has at least one animation firing ✓"));
} else {
  for (const g of flagged) {
    const color = g.duration >= 3 ? c.red : g.duration >= 2 ? c.yellow : c.cyan;
    console.log(color(`  ⚠ ${g.from.toFixed(2)}s → ${g.to.toFixed(2)}s   (${g.duration.toFixed(2)}s)`));
  }
}
console.log("");

console.log(c.bold("Event log"));
for (const e of events) {
  const repeatNote = e.repeat > 0 ? c.gray(` ×${e.repeat + 1}${e.yoyo ? " yoyo" : ""}`) : "";
  console.log(`  ${e.start.toFixed(2).padStart(6)}s → ${e.end.toFixed(2).padStart(6)}s   ${e.target}${repeatNote}`);
}
console.log("");

if (skipped.length) {
  console.log(c.yellow(`Skipped ${skipped.length} call(s) — could not resolve position:`));
  for (const s of skipped.slice(0, 5)) console.log(c.gray(`  ${s.target}: "${s.posArg}" (${s.reason})`));
  if (skipped.length > 5) console.log(c.gray(`  …and ${skipped.length - 5} more`));
  console.log("");
}

if (flagged.some((g) => g.duration >= 3)) process.exit(2);
process.exit(0);
