/**
 * Mux the DEX voiceover clips into a rendered video at their scene offsets.
 * HyperFrames render currently does not mux the <audio> clips into the MP4,
 * so run this after `hyperframes render` to attach the VO.
 *
 * Usage:  node mux-vo.mjs <inVideo.mp4> <outVideo.mp4>
 * Needs ffmpeg on PATH. Offsets are derived from timing.json, so this stays
 * correct even if the VO is regenerated with a different voice.
 */
import { spawnSync } from "node:child_process";
import { readFileSync, existsSync } from "node:fs";

const [, , inV, outV] = process.argv;
if (!inV || !outV) { console.error("Usage: node mux-vo.mjs <inVideo.mp4> <outVideo.mp4>"); process.exit(1); }

const VO = "assets/voiceover/dex-presentation";
const timing = JSON.parse(readFileSync(`${VO}/timing.json`, "utf8"));

let off = 0;
const inputs = [], filters = [], labels = [];
timing.forEach((s, i) => {
  const mp3 = `${VO}/${s.sceneId}.mp3`;
  if (!existsSync(mp3)) { console.error(`Missing ${mp3}`); process.exit(1); }
  const ms = Math.round(off * 1000);
  inputs.push("-i", mp3);
  filters.push(`[${i + 1}:a]adelay=${ms}|${ms}[a${i}]`);
  labels.push(`[a${i}]`);
  off += s.durationFrames / 30;
});

const fc = `${filters.join(";")};${labels.join("")}amix=inputs=${timing.length}:normalize=0[aout]`;
const args = ["-y", "-i", inV, ...inputs, "-filter_complex", fc, "-map", "0:v", "-map", "[aout]", "-c:v", "copy", "-c:a", "aac", "-b:a", "192k", outV];

console.log(`Muxing ${timing.length} VO clips into ${outV} ...`);
const r = spawnSync("ffmpeg", args, { stdio: "inherit" });
process.exit(r.status ?? 1);
