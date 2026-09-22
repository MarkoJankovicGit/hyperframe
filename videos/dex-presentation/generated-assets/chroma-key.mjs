/**
 * Magenta chroma-key using sharp (transitive dep of hyperframes).
 * Usage: node chroma-key.mjs <in.png> <out.png>
 * Replaces bright magenta/pink background with transparency, feathers the
 * soft band, desaturates magenta fringe, then trims to the object bbox.
 */
import sharp from "sharp";

const [, , inPath, outPath] = process.argv;
if (!inPath || !outPath) {
  console.error("Usage: node chroma-key.mjs <in.png> <out.png>");
  process.exit(1);
}

const { data, info } = await sharp(inPath)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width, height, channels } = info; // channels = 4

for (let i = 0; i < data.length; i += channels) {
  const r = data[i], g = data[i + 1], b = data[i + 2];
  const magentaness = Math.min(r, b) - g; // high when green is suppressed vs red+blue
  const bright = r > 175 && b > 135;
  if (bright && magentaness > 75 && g < 95) {
    data[i + 3] = 0; // core magenta -> transparent
  } else if (bright && magentaness > 40 && g < 140) {
    // soft edge band: partial alpha + desaturate the magenta fringe
    const fall = Math.max(0, Math.min(255, (95 - g) * 5));
    data[i + 3] = Math.min(data[i + 3], 255 - fall);
    data[i] = Math.min(r, 190);
    data[i + 2] = Math.min(b, 190);
  }
}

const keyed = await sharp(data, { raw: { width, height, channels } })
  .png()
  .toBuffer();

await sharp(keyed)
  .trim({ threshold: 10 })
  .png()
  .toFile(outPath);

const meta = await sharp(outPath).metadata();
console.log(`Saved ${outPath} — ${meta.width}x${meta.height}`);
