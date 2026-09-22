/**
 * Mux VO + dense sound design + driving music into the rendered v2 video.
 * Usage: node mux-audio.mjs <inVideo.mp4> <outVideo.mp4>   (needs ffmpeg on PATH)
 */
import { spawnSync } from "node:child_process";
import { readFileSync, existsSync } from "node:fs";

const [, , inV, outV] = process.argv;
if (!inV || !outV) { console.error("Usage: node mux-audio.mjs <in.mp4> <out.mp4>"); process.exit(1); }

const VO = "assets/voiceover/dex-v2";
const SFXDIR = "../../sound-effects";
const MUSIC = "assets/music/underscore-v2.wav";
const timing = JSON.parse(readFileSync(`${VO}/timing.json`, "utf8"));

const HIT = "Hit 3.mp3", WHOOSH = "flash-whoosh-swoosh-3-SBA-300463407.mp3", SW = "micro-air-swoosh_G18j6H4u.mp3";
const GL = "Fast Glitch 1.mp3", TYPE = "Typewriter Sound Effect.mp3", CLICK = "Ni Sound - SciTech Game - Pop Up Menu Click.aac";
const DING = "digital-bell-ding-demo-309885.mp3", DATA = "data-reveal-sound-6460.mp3", BEEP = "digital-beeping-151921.mp3", TICK = "Tick - Sound Effect (HD) - 128.mp3";

// { f, at, v, trim? }
const SFX = [
  { f: HIT, at: 0.12, v: 0.30, trim: 0.8 },
  { f: WHOOSH, at: 3.70, v: 0.30 },
  { f: HIT, at: 3.90, v: 0.42, trim: 0.8 },
  { f: HIT, at: 4.515, v: 0.42, trim: 0.8 },
  { f: HIT, at: 5.049, v: 0.46, trim: 0.9 },
  { f: SW, at: 6.45, v: 0.22 },
  { f: TYPE, at: 6.80, v: 0.22, trim: 2.4 },
  { f: WHOOSH, at: 9.30, v: 0.26 },
  { f: HIT, at: 10.0, v: 0.38, trim: 0.8 },
  { f: SW, at: 12.25, v: 0.20 },
  { f: CLICK, at: 13.10, v: 0.25 },
  { f: CLICK, at: 13.50, v: 0.25 },
  { f: CLICK, at: 13.90, v: 0.25 },
  { f: DING, at: 14.35, v: 0.32 },
  { f: GL, at: 15.18, v: 0.28 },
  { f: HIT, at: 15.20, v: 0.40, trim: 0.8 },
  { f: GL, at: 16.03, v: 0.28 },
  { f: HIT, at: 16.05, v: 0.42, trim: 0.8 },
  { f: DATA, at: 18.30, v: 0.22 },
  { f: SW, at: 19.40, v: 0.16 },
  { f: HIT, at: 21.20, v: 0.40, trim: 0.8 },
  { f: HIT, at: 22.246, v: 0.40, trim: 0.8 },
  { f: HIT, at: 23.209, v: 0.44, trim: 0.9 },
  { f: DATA, at: 25.00, v: 0.22 },
  { f: WHOOSH, at: 27.80, v: 0.26 },
  { f: TICK, at: 27.90, v: 0.24 },
  { f: TICK, at: 28.806, v: 0.24 },
  { f: TICK, at: 29.885, v: 0.24 },
  { f: TICK, at: 31.081, v: 0.24 },
  { f: SW, at: 33.05, v: 0.20 },
  { f: CLICK, at: 33.40, v: 0.26 },
  { f: CLICK, at: 34.20, v: 0.26 },
  { f: DING, at: 35.00, v: 0.30 },
  { f: HIT, at: 36.00, v: 0.40, trim: 0.8 },
  { f: HIT, at: 36.70, v: 0.44, trim: 0.9 },
  { f: BEEP, at: 39.00, v: 0.20, trim: 1.5 },
  { f: WHOOSH, at: 40.90, v: 0.30 },
  { f: HIT, at: 41.30, v: 0.46, trim: 1.0 },
  { f: WHOOSH, at: 45.50, v: 0.32 },
  { f: HIT, at: 45.65, v: 0.40, trim: 1.2 },
  { f: DING, at: 45.75, v: 0.40 },
];

const inputs = [], filt = [], labels = [];
let idx = 1, off = 0;
for (const s of timing) {
  const mp3 = `${VO}/${s.sceneId}.mp3`;
  if (!existsSync(mp3)) { console.error(`Missing ${mp3}`); process.exit(1); }
  const ms = Math.round(off * 1000);
  inputs.push("-i", mp3);
  filt.push(`[${idx}:a]volume=0.95,adelay=${ms}|${ms},aformat=channel_layouts=stereo[m${idx}]`);
  labels.push(`[m${idx}]`); idx++; off += s.durationFrames / 30;
}
for (const x of SFX) {
  const p = `${SFXDIR}/${x.f}`;
  if (!existsSync(p)) { console.error(`Missing SFX ${p}`); process.exit(1); }
  const ms = Math.round(x.at * 1000);
  const trim = x.trim ? `atrim=0:${x.trim},asetpts=PTS-STARTPTS,` : "";
  inputs.push("-i", p);
  filt.push(`[${idx}:a]${trim}volume=${x.v},adelay=${ms}|${ms},aformat=channel_layouts=stereo[m${idx}]`);
  labels.push(`[m${idx}]`); idx++;
}
if (existsSync(MUSIC)) {
  inputs.push("-i", MUSIC);
  filt.push(`[${idx}:a]volume=0.16,afade=t=in:st=0:d=1.0,afade=t=out:st=44:d=3,aformat=channel_layouts=stereo[m${idx}]`);
  labels.push(`[m${idx}]`); idx++;
}

const N = idx - 1;
const fc = `${filt.join(";")};${labels.join("")}amix=inputs=${N}:normalize=0,alimiter=limit=0.95[aout]`;
const args = ["-y", "-i", inV, ...inputs, "-filter_complex", fc, "-map", "0:v", "-map", "[aout]", "-c:v", "copy", "-c:a", "aac", "-b:a", "200k", outV];

console.log(`Muxing ${timing.length} VO + ${SFX.length} SFX + music into ${outV} ...`);
const r = spawnSync("ffmpeg", args, { stdio: "inherit" });
process.exit(r.status ?? 1);
