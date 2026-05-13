"""Chroma-key the new 1024x1024 chrome Intel logo render to transparent.

The logo has chrome reflections that pick up cyan; tune the alpha falloff
so we keep specular highlights without leaving a cyan halo.
"""

from PIL import Image
import numpy as np
from pathlib import Path

SRC = Path("storyboards/intel-logo-raw.png")
OUT = Path("assets/intel-logo.png")

CYAN = np.array([3, 188, 220])  # actual cyan from corners of the raw render
img = np.array(Image.open(SRC).convert("RGBA")).astype(np.int16)
h, w = img.shape[:2]
print(f"Source: {w}x{h}")

rgb = img[:, :, :3]
diff = np.linalg.norm(rgb - CYAN, axis=2)

# Soft alpha: pixels VERY close to cyan -> 0, pixels far -> 255
# Tighter falloff than v1 since the chrome edges are sharper here
alpha = np.clip((diff - 25) * 5, 0, 255).astype(np.uint8)

# Despill: subtract cyan tint from edges where alpha is partial
# (reduces the green/cyan halo around chrome highlights)
partial = (alpha > 0) & (alpha < 230)
rgb_out = rgb.copy()
# Wherever the pixel is mostly cyan-tinted in chrome (high G+B vs R), pull G and B down toward R
g_excess = np.maximum(rgb_out[:, :, 1] - rgb_out[:, :, 0], 0)
b_excess = np.maximum(rgb_out[:, :, 2] - rgb_out[:, :, 0], 0)
mask3 = partial[:, :, None]
rgb_out[:, :, 1] = np.where(partial, rgb_out[:, :, 1] - g_excess * 0.6, rgb_out[:, :, 1])
rgb_out[:, :, 2] = np.where(partial, rgb_out[:, :, 2] - b_excess * 0.6, rgb_out[:, :, 2])

out = np.zeros((h, w, 4), dtype=np.uint8)
out[:, :, :3] = np.clip(rgb_out, 0, 255).astype(np.uint8)
out[:, :, 3] = alpha

# Trim to opaque bbox with a small pad
opaque = alpha > 20
ys, xs = np.where(opaque)
pad = 12
y0, y1 = max(0, ys.min() - pad), min(h, ys.max() + pad)
x0, x1 = max(0, xs.min() - pad), min(w, xs.max() + pad)
out = out[y0:y1, x0:x1]
print(f"Trimmed to: {out.shape[1]}x{out.shape[0]}")

Image.fromarray(out, mode="RGBA").save(OUT)
print(f"Wrote {OUT}")
