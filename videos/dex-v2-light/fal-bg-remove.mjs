/**
 * Remove image background via fal.ai Bria (clean matting -> transparent PNG).
 * Usage: FAL_KEY=... node fal-bg-remove.mjs <inUrlOrPath> <out.png>
 *   - inUrlOrPath: https URL (passed directly) or local file (sent as data URI)
 */
import { writeFileSync, readFileSync } from "node:fs";

const KEY = process.env.FAL_KEY;
const [, , input, outPath] = process.argv;
if (!KEY) { console.error("Missing FAL_KEY"); process.exit(1); }
if (!input || !outPath) { console.error("Usage: node fal-bg-remove.mjs <inUrlOrPath> <out.png>"); process.exit(1); }

const image_url = /^https?:/.test(input)
  ? input
  : `data:image/png;base64,${readFileSync(input).toString("base64")}`;

const res = await fetch("https://fal.run/fal-ai/bria/background/remove", {
  method: "POST",
  headers: { Authorization: `Key ${KEY}`, "Content-Type": "application/json" },
  body: JSON.stringify({ image_url }),
});

if (!res.ok) {
  console.error("fal error", res.status, await res.text());
  process.exit(1);
}

const data = await res.json();
const url = data?.image?.url || data?.images?.[0]?.url || data?.image_url;
if (!url) { console.error("No output URL in response:", JSON.stringify(data).slice(0, 500)); process.exit(1); }

const buf = Buffer.from(await (await fetch(url)).arrayBuffer());
writeFileSync(outPath, buf);
console.log(`Saved ${outPath} (${(buf.length / 1024).toFixed(1)} KB) from ${url}`);
