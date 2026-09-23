// Mixes a cue sheet of sound effects onto an existing (silent) MP4 without re-encoding video.
// Usage: node scripts/mix-sfx.mjs <cues.json> <input.mp4> <output.mp4>
import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { join } from "node:path";

const [cuesPath, input, output] = process.argv.slice(2);
if (!cuesPath || !input || !output) {
  console.error("Usage: node scripts/mix-sfx.mjs <cues.json> <input.mp4> <output.mp4>");
  process.exit(1);
}
const { duration, dir, cues } = JSON.parse(readFileSync(cuesPath, "utf8"));

const args = ["-hide_banner", "-loglevel", "error", "-y", "-i", input];
const chains = [];
cues.forEach((c, i) => {
  args.push("-i", join(dir, c.file));
  const trim = c.len ? `atrim=0:${c.len},` : "";
  const fade = c.len && c.fade ? `afade=t=out:st=${(c.len - c.fade).toFixed(3)}:d=${c.fade},` : "";
  const delay = Math.round(c.t * 1000);
  chains.push(
    `[${i + 1}:a]aformat=sample_rates=48000:channel_layouts=stereo,${trim}asetpts=PTS-STARTPTS,${fade}volume=${c.gain}dB,adelay=${delay}:all=1[c${i}]`
  );
});
const mixIn = cues.map((_, i) => `[c${i}]`).join("");
chains.push(
  `${mixIn}amix=inputs=${cues.length}:normalize=0:dropout_transition=0,apad=whole_dur=${duration},atrim=0:${duration},alimiter=limit=0.89:level=false[aout]`
);

args.push(
  "-filter_complex", chains.join(";"),
  "-map", "0:v", "-map", "[aout]",
  "-c:v", "copy", "-c:a", "aac", "-b:a", "192k", "-ar", "48000",
  "-shortest", "-movflags", "+faststart", output
);

const r = spawnSync("ffmpeg", args, { stdio: "inherit" });
process.exit(r.status ?? 1);
