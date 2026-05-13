"""Chroma-key the SoftBank and Nvidia logos to transparent PNGs."""

from PIL import Image
import numpy as np
from pathlib import Path

CYAN = np.array([3, 188, 220])  # actual cyan from gpt_image_2 corners

def chroma_key(src_path: Path, out_path: Path) -> None:
    img = np.array(Image.open(src_path).convert("RGBA")).astype(np.int16)
    h, w = img.shape[:2]
    rgb = img[:, :, :3]
    diff = np.linalg.norm(rgb - CYAN, axis=2)
    # Soft alpha: pixels close to cyan -> 0, pixels far -> 255
    alpha = np.clip((diff - 25) * 5, 0, 255).astype(np.uint8)
    # Despill: pull cyan tint out of partial-alpha pixels
    partial = (alpha > 0) & (alpha < 230)
    rgb_out = rgb.copy()
    g_excess = np.maximum(rgb_out[:, :, 1] - rgb_out[:, :, 0], 0)
    b_excess = np.maximum(rgb_out[:, :, 2] - rgb_out[:, :, 0], 0)
    rgb_out[:, :, 1] = np.where(partial, rgb_out[:, :, 1] - g_excess * 0.6, rgb_out[:, :, 1])
    rgb_out[:, :, 2] = np.where(partial, rgb_out[:, :, 2] - b_excess * 0.6, rgb_out[:, :, 2])
    out = np.zeros((h, w, 4), dtype=np.uint8)
    out[:, :, :3] = np.clip(rgb_out, 0, 255).astype(np.uint8)
    out[:, :, 3] = alpha
    # Trim to opaque bbox with pad
    opaque = alpha > 20
    ys, xs = np.where(opaque)
    if len(xs):
        pad = 20
        y0, y1 = max(0, ys.min() - pad), min(h, ys.max() + pad)
        x0, x1 = max(0, xs.min() - pad), min(w, xs.max() + pad)
        out = out[y0:y1, x0:x1]
    Image.fromarray(out, mode="RGBA").save(out_path)
    print(f"  {out_path}  ({out.shape[1]}x{out.shape[0]})")

ROOT = Path(".")
chroma_key(ROOT / "storyboards/softbank-raw.png", ROOT / "assets/softbank-logo.png")
chroma_key(ROOT / "storyboards/nvidia-raw.png",   ROOT / "assets/nvidia-logo.png")
print("Done.")
