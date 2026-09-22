/**
 * Image-to-video via fal.ai (queue API). Saves the rendered MP4 locally.
 * Usage:
 *   node --env-file=.env scripts/fal-i2v.mjs <image: path-or-url> <out.mp4> ["motion prompt"] [model] [duration]
 * Env: FAL_KEY
 * Default model: fal-ai/kling-video/v1/standard/image-to-video (duration "5" or "10")
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, extname } from "node:path";

const KEY = process.env.FAL_KEY;
if (!KEY) { console.error("Missing FAL_KEY"); process.exit(1); }

const [, , imageArg, outPath, promptArg, modelArg, durationArg] = process.argv;
if (!imageArg || !outPath) {
  console.error('Usage: node --env-file=.env scripts/fal-i2v.mjs <image path-or-url> <out.mp4> ["prompt"] [model] [duration]');
  process.exit(1);
}

const model = modelArg || "fal-ai/kling-video/v1/standard/image-to-video";
const prompt = promptArg || "subtle cinematic motion, slow push-in, gentle parallax, realistic";
const duration = durationArg || "5";

// URLs pass through; local files are inlined as a base64 data URI for image_url.
function toImageUrl(src) {
  if (/^https?:\/\//i.test(src)) return src;
  const buf = readFileSync(src);
  const ext = extname(src).toLowerCase();
  const mime = ext === ".png" ? "image/png" : ext === ".webp" ? "image/webp" : "image/jpeg";
  return `data:${mime};base64,${buf.toString("base64")}`;
}

const body = { prompt, image_url: toImageUrl(imageArg), duration };

const submit = await fetch(`https://queue.fal.run/${model}`, {
  method: "POST",
  headers: { Authorization: `Key ${KEY}`, "Content-Type": "application/json" },
  body: JSON.stringify(body),
});
if (!submit.ok) { console.error("fal submit error", submit.status, await submit.text()); process.exit(1); }
const { request_id, status_url, response_url } = await submit.json();
console.log("Queued:", request_id);

const statusUrl = status_url || `https://queue.fal.run/${model}/requests/${request_id}/status`;
const resultUrl = response_url || `https://queue.fal.run/${model}/requests/${request_id}`;

let status = "IN_QUEUE";
for (let i = 0; i < 150 && status !== "COMPLETED"; i++) {
  await new Promise((r) => setTimeout(r, 5000));
  const s = await fetch(statusUrl, { headers: { Authorization: `Key ${KEY}` } });
  if (!s.ok) { console.error("status error", s.status, await s.text()); process.exit(1); }
  const sj = await s.json();
  status = sj.status;
  console.log("status:", status);
  if (status === "FAILED" || status === "ERROR") {
    console.error("Generation failed:", JSON.stringify(sj).slice(0, 800));
    process.exit(1);
  }
}
if (status !== "COMPLETED") { console.error("Timed out waiting for render"); process.exit(1); }

const r = await fetch(resultUrl, { headers: { Authorization: `Key ${KEY}` } });
const data = await r.json();
const url = data?.video?.url || data?.video_url || data?.output?.video?.url || data?.videos?.[0]?.url;
if (!url) { console.error("No video URL in response:", JSON.stringify(data).slice(0, 800)); process.exit(1); }

mkdirSync(dirname(outPath), { recursive: true });
const buf = Buffer.from(await (await fetch(url)).arrayBuffer());
writeFileSync(outPath, buf);
console.log(`Saved ${outPath} (${(buf.length / 1024 / 1024).toFixed(2)} MB) from ${url}`);
