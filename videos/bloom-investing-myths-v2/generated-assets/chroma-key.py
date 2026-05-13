"""
Magenta chroma key — replace bright magenta background with transparency.
"""
import sys
from PIL import Image
import numpy as np


def chroma_key_magenta(in_path: str, out_path: str, threshold: int = 60):
    img = Image.open(in_path).convert("RGBA")
    arr = np.array(img)

    r, g, b = arr[..., 0].astype(np.int32), arr[..., 1].astype(np.int32), arr[..., 2].astype(np.int32)
    is_magenta = (r > 200) & (b > 200) & (g < threshold)

    soft_band = (r > 180) & (b > 180) & (g < threshold + 40) & ~is_magenta
    alpha = arr[..., 3].copy()
    alpha[is_magenta] = 0
    g_soft = g[soft_band]
    falloff = np.clip(((g_soft - threshold) * 4).astype(np.int32), 0, 255).astype(np.uint8)
    alpha[soft_band] = falloff

    desaturate = is_magenta | soft_band
    arr[desaturate, 0] = np.minimum(arr[desaturate, 0], 200)
    arr[desaturate, 2] = np.minimum(arr[desaturate, 2], 200)

    arr[..., 3] = alpha

    out = Image.fromarray(arr, mode="RGBA")
    bbox = out.getbbox()
    if bbox:
        out = out.crop(bbox)
    out.save(out_path)
    print(f"Saved {out_path} — {out.size[0]}x{out.size[1]}")


if __name__ == "__main__":
    chroma_key_magenta(sys.argv[1], sys.argv[2])
