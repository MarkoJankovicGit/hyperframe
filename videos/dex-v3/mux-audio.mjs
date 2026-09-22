/**
 * Mux VO + warm cinematic SFX + music into the rendered v3 video.
 * Usage: node mux-audio.mjs <inVideo.mp4> <outVideo.mp4>   (needs ffmpeg on PATH)
 */
import { spawnSync } from "node:child_process";
import { readFileSync, existsSync } from "node:fs";

const [, , inV, outV] = process.argv;
if (!inV || !outV) { console.error("Usage: node mux-audio.mjs <in.mp4> <out.mp4>"); process.exit(1); }

const VO = "assets/voiceover/dex-v3";
const SFXDIR = "../../sound-effects";
const MUSIC = "assets/music/underscore-v3.wav";
const timing = JSON.parse(readFileSync(`${VO}/timing.json`, "utf8"));

const HIT = "Hit 3.mp3", WHOOSH = "flash-whoosh-swoosh-3-SBA-300463407.mp3", SW = "micro-air-swoosh_G18j6H4u.mp3";
const DING = "digital-bell-ding-demo-309885.mp3", DATA = "data-reveal-sound-6460.mp3", TYPE = "Typewriter Sound Effect.mp3";

const SFX = [
  { f: DATA, at: 0.20, v: 0.18 },
  { f: SW, at: 3.00, v: 0.20 },
  { f: WHOOSH, at: 8.05, v: 0.24 },
  { f: HIT, at: 11.00, v: 0.30, trim: 0.9 },
  { f: SW, at: 12.25, v: 0.20 },
  { f: TYPE, at: 15.20, v: 0.20, trim: 2.2 },
  { f: SW, at: 17.45, v: 0.20 },
  { f: DATA, at: 18.20, v: 0.16 },
  { f: WHOOSH, at: 22.00, v: 0.22 },
  { f: DING, at: 24.10, v: 0.24 },
  { f: SW, at: 27.20, v: 0.20 },
  { f: SW, at: 31.75, v: 0.20 },
  { f: HIT, at: 34.00, v: 0.34, trim: 1.0 },
  { f: WHOOSH, at: 35.50, v: 0.26 },
  { f: HIT, at: 35.70, v: 0.34, trim: 1.2 },
  { f: DING, at: 35.85, v: 0.36 },
];

const inputs = [], filt = [], labels = [];
const VO_OFFSETS = [3.0, 8.6, 12.8, 18.0, 22.6, 27.8, 32.3, 35.5]; // must match index.html audio data-start
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
  filt.push(`[${idx}:a]volume=0.20,afade=t=in:st=0:d=1.2,afade=t=out:st=39.5:d=2.5,aformat=channel_layouts=stereo:sample_rates=48000[m${idx}]`);
  labels.push(`[m${idx}]`); idx++;
}

const N = idx - 1;
const fc = `${filt.join(";")};${labels.join("")}amix=inputs=${N}:normalize=0,alimiter=limit=0.96[aout]`;
const args = ["-y", "-i", inV, ...inputs, "-filter_complex", fc, "-map", "0:v", "-map", "[aout]", "-c:v", "copy", "-c:a", "aac", "-b:a", "200k", "-ar", "48000", "-shortest", outV];

console.log(`Muxing ${timing.length} VO + ${SFX.length} SFX + music into ${outV} ...`);
const r = spawnSync("ffmpeg", args, { stdio: "inherit" });
process.exit(r.status ?? 1);
