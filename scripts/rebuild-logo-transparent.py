#!/usr/bin/env python3
"""
Rebuild logo.png:
  1. Remove white background (transparent, smooth alpha edges)
  2. Crop tightly to the design (logo appears "bigger" relative to canvas)
  3. Dilate the design (logo text appears "bolder")
  4. Save as RGBA PNG with alpha channel

The previous logo.png was RGB on a white background — when placed on dark
navbars / dark splash screens the white box showed through. This script
produces a transparent version with bolder, larger-feeling design.
"""
from PIL import Image, ImageFilter, ImageChops
import numpy as np
from pathlib import Path

SRC = Path("/home/z/my-project/public/logo.png")
DST = Path("/home/z/my-project/public/logo.png")
BACKUP = Path("/home/z/my-project/download/logo-before-bold-transparent.png")

# ── 1. Load original (RGB) ────────────────────────────────────────────────
im = Image.open(SRC).convert("RGB")
W, H = im.size
print(f"Loaded: {SRC}  ({W}x{H}, mode={im.mode})")

# Backup the source before overwriting
BACKUP.parent.mkdir(parents=True, exist_ok=True)
im.save(BACKUP)
print(f"Backup: {BACKUP}")

arr = np.array(im)  # (H, W, 3)

# ── 2. Build alpha mask from "non-whiteness" ──────────────────────────────
# Pure white → alpha 0. Dark colors → alpha 255. Smooth gradient between.
# This gives anti-aliased edges instead of hard jagged cuts.
r, g, b = arr[:, :, 0].astype(np.int16), arr[:, :, 1].astype(np.int16), arr[:, :, 2].astype(np.int16)

# "Whiteness" = how close to (255,255,255). 0 = white, 255 = black.
max_chan = np.maximum(np.maximum(r, g), b)
min_chan = np.minimum(np.minimum(r, g), b)
brightness = max_chan  # 0..255
# alpha = how non-white the pixel is. White → 0, dark → 255.
# Use a smooth curve so anti-aliased edges get partial alpha.
# Threshold: anything above 245 brightness is treated as background.
alpha = np.clip((245 - brightness) * 8, 0, 255).astype(np.uint8)

# Slight color bleed fix: for partially-transparent pixels, the underlying
# color should be the design color (not white) so blending on dark backgrounds
# doesn't look washed out. Replace white-ish pixels with the nearest non-white
# design color (a deep navy from the design).
design_mask = alpha > 32
if design_mask.any():
    # Sample a representative dark pixel from the design center
    design_pixels = arr[design_mask]
    # Pick the darkest 25% pixels and average them for the "base" color
    darkness = design_pixels.sum(axis=1)
    cutoff = np.percentile(darkness, 25)
    base_color = design_pixels[darkness <= cutoff].mean(axis=0).astype(np.uint8)
    print(f"Base design color (for edge de-whitening): {tuple(base_color)}")
else:
    base_color = np.array([1, 14, 82], dtype=np.uint8)

# Build RGBA
rgba = np.dstack([arr, alpha])

# For pixels that are partially transparent (anti-alias edges), replace the
# white-ish RGB with the base design color so blending looks clean.
partial = (alpha > 0) & (alpha < 255) & (brightness > 180)
if partial.any():
    rgba_rgb = rgba[:, :, :3]
    rgba_rgb[partial] = base_color
    rgba[:, :, :3] = rgba_rgb

im_rgba = Image.fromarray(rgba, "RGBA")

# ── 3. Crop tightly to the design bbox + small padding ────────────────────
# Use the alpha channel to find where the design actually is.
# Use a stricter threshold (>64) so anti-aliased edge noise doesn't fool the bbox.
alpha_arr = np.array(im_rgba)[:, :, 3]
strong_mask = alpha_arr > 64
rows = np.any(strong_mask, axis=1)
cols = np.any(strong_mask, axis=0)
rmin, rmax = np.where(rows)[0][[0, -1]]
cmin, cmax = np.where(cols)[0][[0, -1]]
print(f"Design bbox (alpha>64): rows {rmin}-{rmax} ({rmax-rmin}px), cols {cmin}-{cmax} ({cmax-cmin}px)")

# Crop with a small symmetric padding
PAD_X = 24
PAD_Y = 16
cropped = im_rgba.crop((
    max(0, cmin - PAD_X),
    max(0, rmin - PAD_Y),
    min(W, cmax + PAD_X),
    min(H, rmax + PAD_Y),
))
cw, ch = cropped.size
print(f"Cropped: {cw}x{ch}")

# ── 4. Bold the design (morphological dilation of the alpha channel) ─────
# Dilation thickens the visible design. We dilate the alpha mask, then
# composite the original design on top so colors are preserved.
bold_radius = 2  # px — controls how much thicker
alpha_channel = cropped.split()[3]

# Convert alpha to binary mask, dilate, then blend back with original alpha
# for smooth edges.
mask_binary = alpha_channel.point(lambda p: 255 if p > 16 else 0)
mask_dilated = mask_binary.filter(ImageFilter.MaxFilter(bold_radius * 2 + 1))

# Smooth the dilated mask edges
mask_smooth = mask_dilated.filter(ImageFilter.GaussianBlur(radius=1))

# New alpha = max(original, dilated) so we keep original anti-aliasing AND
# add the dilated thickness.
import numpy as np
orig_a = np.array(alpha_channel)
new_a = np.array(mask_smooth)
combined_alpha = np.maximum(orig_a, new_a).astype(np.uint8)

# Build the bolded RGBA: use the original RGB (so colors are preserved),
# and the combined alpha.
cropped_arr = np.array(cropped)
bolded = np.dstack([cropped_arr[:, :, :3], combined_alpha])
bolded_im = Image.fromarray(bolded, "RGBA")

# ── 5. Resize to a final logo size ────────────────────────────────────────
# Target: 800x300 — wider than tall, ideal for navbar. The tight crop + scale
# makes the design fill more of the canvas, so it looks "bigger".
TARGET_W = 800
TARGET_H = 300
final = bolded_im.resize((TARGET_W, TARGET_H), Image.LANCZOS)

# ── 6. Save ───────────────────────────────────────────────────────────────
final.save(DST, "PNG", optimize=True)
print(f"\nFinal: {DST}  ({TARGET_W}x{TARGET_H}, mode={final.mode})")
print(f"File size: {DST.stat().st_size} bytes")

# ── 7. Verify transparency ────────────────────────────────────────────────
verify = Image.open(DST)
print(f"Verification: mode={verify.mode}, has_alpha={verify.mode in ('RGBA', 'LA')}")
v_arr = np.array(verify)
corner_pixels = [
    v_arr[0, 0],
    v_arr[0, -1],
    v_arr[-1, 0],
    v_arr[-1, -1],
]
print(f"Corner pixels (should have alpha=0):")
for i, p in enumerate(corner_pixels):
    pos = ["top-left", "top-right", "bottom-left", "bottom-right"][i]
    print(f"  {pos}: RGBA={tuple(p)}")
alpha_zeros = (v_arr[:, :, 3] == 0).sum()
alpha_total = v_arr.shape[0] * v_arr.shape[1]
print(f"Transparent pixels: {alpha_zeros}/{alpha_total} ({100*alpha_zeros/alpha_total:.1f}%)")
