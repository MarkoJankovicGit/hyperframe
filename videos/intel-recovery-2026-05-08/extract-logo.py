"""Extract the chrome Intel logo from the cyan asset panel of scene-01.png.

Strategy:
1. Find the cyan rectangle (#00B8D4 ± tolerance) in the storyboard.
2. The cyan panel is divided into two cells side-by-side; the LEFT cell holds
   the Intel logo. Crop that cell.
3. Chroma-key out cyan pixels (replace with transparent), keeping the logo.
4. Auto-trim to the logo's bounding box.
5. Save as assets/intel-logo.png with alpha.
"""

from PIL import Image
import numpy as np
from pathlib import Path

SRC = Path("storyboards/scene-01.png")
OUT_DIR = Path("assets")
OUT_DIR.mkdir(exist_ok=True)

CYAN = np.array([0, 184, 212])
CYAN_TOL = 60  # generous — JPEG/WEBP-style compression bleeds the cyan

img = Image.open(SRC).convert("RGBA")
arr = np.array(img)
h, w = arr.shape[:2]
print(f"Source: {w}x{h}")

# 1. Find cyan mask
rgb = arr[:, :, :3].astype(np.int16)
diff = np.abs(rgb - CYAN).max(axis=2)
cyan_mask = diff < CYAN_TOL
print(f"Cyan pixels: {cyan_mask.sum()} ({100*cyan_mask.sum()/(h*w):.1f}%)")

# 2. Bounding box of cyan region
ys, xs = np.where(cyan_mask)
if len(xs) == 0:
    raise SystemExit("No cyan region found")
y0, y1 = ys.min(), ys.max()
x0, x1 = xs.min(), xs.max()
print(f"Cyan bbox: ({x0},{y0}) -> ({x1},{y1})  size {x1-x0}x{y1-y0}")

# 3. Left cell = left half of cyan bbox
mid_x = (x0 + x1) // 2
left_cell = arr[y0:y1, x0:mid_x].copy()
print(f"Left cell: {left_cell.shape[1]}x{left_cell.shape[0]}")

# 4. Chroma-key cyan -> alpha 0
cell_rgb = left_cell[:, :, :3].astype(np.int16)
cell_diff = np.abs(cell_rgb - CYAN).max(axis=2)
# soft alpha: pixels close to cyan -> 0, pixels far -> 255
alpha = np.clip((cell_diff - 20) * 6, 0, 255).astype(np.uint8)
left_cell[:, :, 3] = np.minimum(left_cell[:, :, 3], alpha)

# 5. Trim to non-transparent bbox
opaque = left_cell[:, :, 3] > 20
ys2, xs2 = np.where(opaque)
if len(xs2) > 0:
    pad = 8
    yy0 = max(0, ys2.min() - pad)
    yy1 = min(left_cell.shape[0], ys2.max() + pad)
    xx0 = max(0, xs2.min() - pad)
    xx1 = min(left_cell.shape[1], xs2.max() + pad)
    left_cell = left_cell[yy0:yy1, xx0:xx1]
    print(f"Trimmed: {left_cell.shape[1]}x{left_cell.shape[0]}")

out = Image.fromarray(left_cell, mode="RGBA")
out_path = OUT_DIR / "intel-logo.png"
out.save(out_path)
print(f"Wrote {out_path}  ({out.size[0]}x{out.size[1]})")

# Also save a 2x upscaled version for crisp display at hero size
out2x = out.resize((out.size[0] * 2, out.size[1] * 2), Image.LANCZOS)
out2x.save(OUT_DIR / "intel-logo-2x.png")
print(f"Wrote {OUT_DIR/'intel-logo-2x.png'}  ({out2x.size[0]}x{out2x.size[1]})")
