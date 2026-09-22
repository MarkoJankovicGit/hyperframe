/**
 * Generate a background-music underscore via fal.ai (Stable Audio) and download it.
 * Usage: FAL_KEY=... node fal-music.mjs <out.(wav|mp3)> [seconds] ["prompt"]
 */
import { writeFileSync } from "node:fs";

const KEY = process.env.FAL_KEY;
const [, , outPath, secondsArg, promptArg] = process.argv;
if (!KEY) { console.error("Missing FAL_KEY"); process.exit(1); }
if (!outPath) { console.error("Usage: node fal-music.mjs <out.wav> [seconds] [prompt]"); process.exit(1); }

const seconds_total = Number(secondsArg || 47);
const prompt = promptArg ||
  "Subtle yet energetic corporate technology underscore, modern minimal electronic, soft driving pulse bassline, warm analog pads, gentle bright arpeggio, clean confident uplifting premium brand feel, steady momentum around 115 BPM, instrumental, polished, smooth and not too busy";

const res = await fetch("https://fal.run/fal-ai/stable-audio", {
  method: "POST",
  headers: { Authorization: `Key ${KEY}`, "Content-Type": "application/json" },
  body: JSON.stringify({ prompt, seconds_start: 0, seconds_total }),
});

if (!res.ok) { console.error("fal error", res.status, await res.text()); process.exit(1); }
const data = await res.json();
const url = data?.audio_file?.url || data?.audio?.url || data?.audio_url || data?.file?.url;
if (!url) { console.error("No audio URL in response:", JSON.stringify(data).slice(0, 600)); process.exit(1); }

const buf = Buffer.from(await (await fetch(url)).arrayBuffer());
writeFileSync(outPath, buf);
console.log(`Saved ${outPath} (${(buf.length / 1024).toFixed(1)} KB) from ${url}`);
