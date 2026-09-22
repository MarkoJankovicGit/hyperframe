/**
 * Mux VO + sound design + bright music into the rendered v2.1b (light) video.
 * Usage: node mux-audio.mjs <inVideo.mp4> <outVideo.mp4>   (needs ffmpeg on PATH)
 */
import { spawnSync } from "node:child_process";
import { readFileSync, existsSync } from "node:fs";

const [, , inV, outV] = process.argv;
if (!inV || !outV) { console.error("Usage: node mux-audio.mjs <in.mp4> <out.mp4>"); process.exit(1); }

const VO = "assets/voiceover/dex-v2-light";
const SFXDIR = "../../sound-effects";
const MUSIC = "assets/music/underscore-v21.wav";
const timing = JSON.parse(readFileSync(`${VO}/timing.json`, "utf8"));

const HIT = "Hit 3.mp3", WHOOSH = "flash-whoosh-swoosh-3-SBA-300463407.mp3", SW = "micro-air-swoosh_G18j6H4u.mp3";
const DING = "digital-bell-ding-demo-309885.mp3", DATA = "data-reveal-sound-6460.mp3", TYPE = "Typewriter Sound Effect.mp3";
const CLICK = "Ni Sound - SciTech Game - Pop Up Menu Click.aac", TICK = "Tick - Sound Effect (HD) - 128.mp3";

const VO_OFFSETS = [0, 3.4, 5.6, 9.7, 14.7, 18.0, 20.5, 24.1, 27.9, 32.0, 36.3, 39.5, 43.2]; // match index.html

const SFX = [
  { f: DATA, at: 0.15, v: 0.16 },
  { f: HIT, at: 1.70, v: 0.32, trim: 0.8 },
  { f: WHOOSH, at: 3.35, v: 0.28 },
  { f: HIT, at: 3.40, v: 0.40, trim: 0.8 },
  { f: HIT, at: 4.05, v: 0.40, trim: 0.8 },
  { f: HIT, at: 4.70, v: 0.44, trim: 0.9 },
  { f: SW, at: 5.55, v: 0.20 },
  { f: TYPE, at: 5.90, v: 0.20, trim: 2.6 },
  { f: WHOOSH, at: 9.60, v: 0.24 },
  { f: HIT, at: 9.80, v: 0.34, trim: 0.8 },
  { f: SW, at: 14.60, v: 0.20 },
  { f: TICK, at: 15.00, v: 0.18 },
  { f: TICK, at: 15.32, v: 0.18 },
  { f: TICK, at: 15.64, v: 0.18 },
  { f: TICK, at: 15.96, v: 0.18 },
  { f: TICK, at: 16.28, v: 0.18 },
  { f: DING, at: 16.70, v: 0.30 },
  { f: WHOOSH, at: 17.90, v: 0.24 },
  { f: HIT, at: 18.00, v: 0.38, trim: 0.8 },
  { f: DATA, at: 19.15, v: 0.20 },
  { f: HIT, at: 19.45, v: 0.42, trim: 0.9 },
  { f: DATA, at: 20.50, v: 0.18 },
  { f: SW, at: 21.60, v: 0.16 },
  { f: WHOOSH, at: 24.00, v: 0.24 },
  { f: CLICK, at: 24.74, v: 0.32 },
  { f: TICK, at: 27.95, v: 0.22 },
  { f: TICK, at: 28.85, v: 0.22 },
  { f: TICK, at: 29.75, v: 0.22 },
  { f: TICK, at: 30.65, v: 0.22 },
  { f: SW, at: 31.90, v: 0.20 },
  { f: DATA, at: 32.20, v: 0.16 },
  { f: HIT, at: 36.30, v: 0.38, trim: 0.8 },
  { f: WHOOSH, at: 39.40, v: 0.24 },
  { f: HIT, at: 39.50, v: 0.40, trim: 0.9 },
  { f: WHOOSH, at: 43.20, v: 0.26 },
  { f: HIT, at: 43.30, v: 0.36, trim: 1.0 },
  { f: DING, at: 43.45, v: 0.34 },
];

const inputs = [], filt = [], labels = [];
let idx = 1;
timing.forEach((s, i) => {
  const mp3 = `${VO}/${s.sceneId}.mp3`;
  if (!existsSync(mp3)) { console.error(`Missing ${mp3}`); process.exit(1); }
  const ms = Math.round(VO_OFFSETS[i] * 1000);
  inputs.push("-i", mp3);
  filt.push(`[${idx}:a]volume=0.98,adelay=${ms}|${ms},aformat=channel_layouts=stereo:sample_rates=48000[m${idx}]`);
  labels.push(`[m${idx}]`); idx++;
});
for (const x of SFX) {
  const p = `${SFXDIR}/${x.f}`;
  if (!existsSync(p)) { console.error(`Missing SFX ${p}`); process.exit(1); }
  const ms = Math.round(x.at * 1000);
  const trim = x.trim ? `atrim=0:${x.trim},asetpts=PTS-STARTPTS,` : "";
  inputs.push("-i", p);
  filt.push(`[${idx}:a]${trim}volume=${x.v},adelay=${ms}|${ms},aformat=channel_layouts=stereo:sample_rates=48000[m${idx}]`);
  labels.push(`[m${idx}]`); idx++;
}
if (existsSync(MUSIC)) {
  inputs.push("-i", MUSIC);
  filt.push(`[${idx}:a]volume=0.17,afade=t=in:st=0:d=1.0,afade=t=out:st=42:d=3,aformat=channel_layouts=stereo:sample_rates=48000[m${idx}]`);
  labels.push(`[m${idx}]`); idx++;
}

const N = idx - 1;
const fc = `${filt.join(";")};${labels.join("")}amix=inputs=${N}:normalize=0,alimiter=limit=0.96[aout]`;
const args = ["-y", "-i", inV, ...inputs, "-filter_complex", fc, "-map", "0:v", "-map", "[aout]", "-c:v", "copy", "-c:a", "aac", "-b:a", "200k", "-ar", "48000", "-shortest", outV];

console.log(`Muxing ${timing.length} VO + ${SFX.length} SFX + music into ${outV} ...`);
const r = spawnSync("ffmpeg", args, { stdio: "inherit" });
process.exit(r.status ?? 1);
