#!/usr/bin/env python3
"""
Process the user-supplied transparent logo:
  1. Tight-crop to the design bbox (remove the small transparent padding)
  2. Slight dilation to make the design appear bolder
  3. Save as /home/z/my-project/public/logo.png (800x265, RGBA)

Source: /home/z/my-project/upload/review-removebg-preview.png (866x288, RGBA,
        already transparent — no white background to remove)
"""
from PIL import Image, ImageFilter
import numpy as np
from pathlib import Path

SRC = Path("/home/z/my-project/upload/review-removebg-preview.png")
DST = Path("/home/z/my-project/public/logo.png")
BACKUP = Path("/home/z/my-project/download/logo-before-user-upload.png")

# Load
im = Image.open(SRC).convert("RGBA")
W, H = im.size
print(f"Source: {SRC}  ({W}x{H}, mode={im.mode})")

# Backup the current logo before overwriting
BACKUP.parent.mkdir(parents=True, exist_ok=True)
if DST.exists():
    import shutil
    shutil.copy2(DST, BACKUP)
    print(f"Backup of previous logo: {BACKUP}")

arr = np.array(im)
alpha = arr[:, :, 3]

# Find design bbox with strict threshold
strong_mask = alpha > 64
rows = np.any(strong_mask, axis=1)
cols = np.any(strong_mask, axis=0)
rmin, rmax = np.where(rows)[0][[0, -1]]
cmin, cmax = np.where(cols)[0][[0, -1]]
print(f"Design bbox (alpha>64): rows {rmin}-{rmax} ({rmax-rmin}px), cols {cmin}-{cmax} ({cmax-cmin}px)")

# Crop with tiny symmetric padding (just 6px so dilation has room to expand)
PAD = 6
cropped = im.crop((
    max(0, cmin - PAD),
    max(0, rmin - PAD),
    min(W, cmax + PAD),
    min(H, rmax + PAD),
))
cw, ch = cropped.size
print(f"Cropped: {cw}x{ch}")

# Dilation for bolder appearance
bold_radius = 2
alpha_channel = cropped.split()[3]
mask_binary = alpha_channel.point(lambda p: 255 if p > 16 else 0)
mask_dilated = mask_binary.filter(ImageFilter.MaxFilter(bold_radius * 2 + 1))
mask_smooth = mask_dilated.filter(ImageFilter.GaussianBlur(radius=1))

orig_a = np.array(alpha_channel)
new_a = np.array(mask_smooth)
combined_alpha = np.maximum(orig_a, new_a).astype(np.uint8)

cropped_arr = np.array(cropped)
bolded = np.dstack([cropped_arr[:, :, :3], combined_alpha])
bolded_im = Image.fromarray(bolded, "RGBA")

# Resize to a navbar-friendly aspect ratio (preserve original ratio ~3:1)
# 800x265 keeps the design crisp
TARGET_W = 800
TARGET_H = 265
final = bolded_im.resize((TARGET_W, TARGET_H), Image.LANCZOS)

# Save
final.save(DST, "PNG", optimize=True)
print(f"\nFinal: {DST}  ({TARGET_W}x{TARGET_H}, mode={final.mode})")
print(f"File size: {DST.stat().st_size} bytes")

# Verify
verify = Image.open(DST)
v_arr = np.array(verify)
print(f"\nVerification:")
print(f"  mode: {verify.mode}, size: {verify.size}")
print(f"  Corners (should be alpha=0):")
for label, (y, x) in [("TL", (0, 0)), ("TR", (0, -1)), ("BL", (-1, 0)), ("BR", (-1, -1))]:
    print(f"    {label}: RGBA={tuple(v_arr[y, x])}")
alpha_zeros = (v_arr[:, :, 3] == 0).sum()
alpha_total = v_arr.shape[0] * v_arr.shape[1]
print(f"  Transparent: {alpha_zeros}/{alpha_total} ({100*alpha_zeros/alpha_total:.1f}%)")
