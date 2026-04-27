"""
Download a Kie image URL and split it into N transparent PNG assets
by detecting whitespace columns.

Usage: python split.py <url> [--out-dir .] [--white-threshold 240] [--min-width 60]
"""

import argparse
import io
import os
import sys
import urllib.request

from PIL import Image
import numpy as np


def download(url: str) -> Image.Image:
    print(f"Downloading {url}", file=sys.stderr)
    req = urllib.request.Request(
        url,
        headers={
            "User-Agent": (
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                "AppleWebKit/537.36 (KHTML, like Gecko) "
                "Chrome/124.0.0.0 Safari/537.36"
            )
        },
    )
    with urllib.request.urlopen(req) as r:
        data = r.read()
    return Image.open(io.BytesIO(data)).convert("RGBA")


def white_to_transparent(img: Image.Image, threshold: int = 240, soft: int = 18) -> Image.Image:
    """
    Turn near-white pixels transparent with a soft alpha falloff for clean edges.
    - Pixels with min(R,G,B) >= threshold          → alpha 0
    - Pixels with min(R,G,B) in [threshold-soft, threshold) → interpolated alpha
    - Everything else → alpha 255
    """
    arr = np.array(img)
    rgb_min = arr[..., :3].min(axis=-1)
    alpha = np.full(rgb_min.shape, 255, dtype=np.uint8)
    ramp = (threshold - rgb_min.astype(np.int32)) * (255 / max(soft, 1))
    ramp = np.clip(ramp, 0, 255).astype(np.uint8)
    mask_soft = (rgb_min >= threshold - soft) & (rgb_min < threshold)
    mask_hard = rgb_min >= threshold
    alpha[mask_soft] = ramp[mask_soft]
    alpha[mask_hard] = 0
    arr[..., 3] = alpha
    return Image.fromarray(arr, mode="RGBA")


def split_columns(img: Image.Image, min_width: int = 60, pad: int = 20):
    """
    Find vertical groups of columns with non-transparent pixels and crop each.
    Returns list of PIL images.
    """
    arr = np.array(img)
    has_content_by_col = (arr[..., 3] > 8).any(axis=0)

    groups = []
    in_group = False
    start = 0
    for x, has in enumerate(has_content_by_col):
        if has and not in_group:
            start = x
            in_group = True
        elif not has and in_group:
            groups.append((start, x))
            in_group = False
    if in_group:
        groups.append((start, len(has_content_by_col)))

    # Filter out tiny groups (noise)
    groups = [g for g in groups if g[1] - g[0] >= min_width]

    crops = []
    for (x0, x1) in groups:
        col = arr[:, x0:x1]
        row_has = (col[..., 3] > 8).any(axis=1)
        ys = np.where(row_has)[0]
        if not len(ys):
            continue
        y0, y1 = ys[0], ys[-1] + 1
        cropped = col[y0:y1]

        # Add uniform transparent padding
        h, w = cropped.shape[:2]
        padded = np.zeros((h + 2 * pad, w + 2 * pad, 4), dtype=np.uint8)
        padded[pad:pad + h, pad:pad + w] = cropped
        crops.append(Image.fromarray(padded, mode="RGBA"))

    return crops


def main():
    parser = argparse.ArgumentParser(description="Split a Kie asset-sheet into transparent PNGs")
    parser.add_argument("url")
    parser.add_argument("--out-dir", default=".")
    parser.add_argument("--names", nargs="+", help="Per-asset filenames (without extension)")
    parser.add_argument("--white-threshold", type=int, default=240)
    parser.add_argument("--soft", type=int, default=18)
    parser.add_argument("--min-width", type=int, default=60)
    parser.add_argument("--pad", type=int, default=20)
    args = parser.parse_args()

    os.makedirs(args.out_dir, exist_ok=True)

    img = download(args.url)
    print(f"Image: {img.size[0]}x{img.size[1]}", file=sys.stderr)

    img_rgba = white_to_transparent(img, threshold=args.white_threshold, soft=args.soft)
    img_rgba.save(os.path.join(args.out_dir, "_full_transparent.png"))

    crops = split_columns(img_rgba, min_width=args.min_width, pad=args.pad)
    print(f"Found {len(crops)} asset(s)", file=sys.stderr)

    for i, crop in enumerate(crops):
        if args.names and i < len(args.names):
            name = args.names[i]
        else:
            name = f"asset_{i + 1}"
        out_path = os.path.join(args.out_dir, f"{name}.png")
        crop.save(out_path)
        print(f"  {name}.png ({crop.size[0]}x{crop.size[1]})")


if __name__ == "__main__":
    main()
