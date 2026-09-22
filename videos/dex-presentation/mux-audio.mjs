/**
 * Mux VOICEOVER + SOUND EFFECTS into a rendered DEX video.
 * HyperFrames render does not mux <audio> into the MP4, so this attaches the
 * full audio bed (VO from timing.json offsets + curated SFX) via ffmpeg.
 *
 * Usage:  node mux-audio.mjs <inVideo.mp4> <outVideo.mp4>
 * Needs ffmpeg on PATH.
 */
import { spawnSync } from "node:child_process";
import { readFileSync, existsSync } from "node:fs";

const [, , inV, outV] = process.argv;
if (!inV || !outV) { console.error("Usage: node mux-audio.mjs <inVideo.mp4> <outVideo.mp4>"); process.exit(1); }

const VO = "assets/voiceover/dex-presentation";
const SFXDIR = "../../sound-effects";
const timing = JSON.parse(readFileSync(`${VO}/timing.json`, "utf8"));

// Sound effects: { f: file, at: seconds, v: volume }
const SFX = [
  // transition whooshes
  { f: "flash-whoosh-swoosh-3-SBA-300463407.mp3", at: 8.55, v: 0.30 }, // into logo reveal
  { f: "micro-air-swoosh_G18j6H4u.mp3",           at: 11.25, v: 0.20 },
  { f: "micro-air-swoosh_G18j6H4u.mp3",           at: 20.85, v: 0.20 },
  { f: "micro-air-swoosh_G18j6H4u.mp3",           at: 28.90, v: 0.20 },
  { f: "micro-air-swoosh_G18j6H4u.mp3",           at: 35.90, v: 0.20 },
  { f: "micro-air-swoosh_G18j6H4u.mp3",           at: 41.45, v: 0.20 },
  { f: "flash-whoosh-swoosh-3-SBA-300463407.mp3", at: 47.20, v: 0.28 }, // into outro logo
  // logo chimes (the key reveal accents)
  { f: "digital-bell-ding-demo-309885.mp3",       at: 9.20,  v: 0.40 },
  { f: "digital-bell-ding-demo-309885.mp3",       at: 51.05, v: 0.40 },
  // heritage data reveal
  { f: "data-reveal-sound-6460.mp3",              at: 13.40, v: 0.22 },
  // product card ticks (on each card lift / VO onset)
  { f: "Tick - Sound Effect (HD) - 128.mp3",      at: 22.10, v: 0.20 },
  { f: "Tick - Sound Effect (HD) - 128.mp3",      at: 24.18, v: 0.20 },
  { f: "Tick - Sound Effect (HD) - 128.mp3",      at: 26.35, v: 0.20 },
  { f: "Tick - Sound Effect (HD) - 128.mp3",      at: 27.62, v: 0.20 },
  // RPA mechanical whir + "runs itself" confirm
  { f: "bicycle-gear-45545.mp3",                  at: 30.50, v: 0.15 },
  { f: "digital-bell-ding-demo-309885.mp3",       at: 33.20, v: 0.22 },
  // stat count-ups
  { f: "Digital Counting Sound Effect.mp3",       at: 36.70, v: 0.22 },
  { f: "Digital Counting Sound Effect.mp3",       at: 37.90, v: 0.22 },
  { f: "Digital Counting Sound Effect.mp3",       at: 38.70, v: 0.22 },
  // leadership underline sweep
  { f: "micro-air-swoosh_G18j6H4u.mp3",           at: 44.00, v: 0.16 },
];

const inputs = [], filt = [], labels = [];
let idx = 1, off = 0;

// voiceover
for (const s of timing) {
  const mp3 = `${VO}/${s.sceneId}.mp3`;
  if (!existsSync(mp3)) { console.error(`Missing ${mp3}`); process.exit(1); }
  const ms = Math.round(off * 1000);
  inputs.push("-i", mp3);
  filt.push(`[${idx}:a]volume=0.95,adelay=${ms}|${ms},aformat=channel_layouts=stereo[m${idx}]`);
  labels.push(`[m${idx}]`);
  idx++; off += s.durationFrames / 30;
}
// sfx
for (const x of SFX) {
  const p = `${SFXDIR}/${x.f}`;
  if (!existsSync(p)) { console.error(`Missing SFX ${p}`); process.exit(1); }
  const ms = Math.round(x.at * 1000);
  inputs.push("-i", p);
  filt.push(`[${idx}:a]volume=${x.v},adelay=${ms}|${ms},aformat=channel_layouts=stereo[m${idx}]`);
  labels.push(`[m${idx}]`);
  idx++;
}

// background music bed — full length, quiet, fade in/out (resolves before the outro logo)
const MUSIC = "assets/music/underscore.wav";
const MUSIC_VOL = 0.14;
if (existsSync(MUSIC)) {
  inputs.push("-i", MUSIC);
  filt.push(`[${idx}:a]volume=${MUSIC_VOL},afade=t=in:st=0:d=1.5,afade=t=out:st=44.5:d=2.5,aformat=channel_layouts=stereo[m${idx}]`);
  labels.push(`[m${idx}]`);
  idx++;
}

const N = idx - 1;
const fc = `${filt.join(";")};${labels.join("")}amix=inputs=${N}:normalize=0,alimiter=limit=0.97[aout]`;
const args = ["-y", "-i", inV, ...inputs, "-filter_complex", fc, "-map", "0:v", "-map", "[aout]", "-c:v", "copy", "-c:a", "aac", "-b:a", "192k", outV];

console.log(`Muxing ${timing.length} VO + ${SFX.length} SFX into ${outV} ...`);
const r = spawnSync("ffmpeg", args, { stdio: "inherit" });
process.exit(r.status ?? 1);
