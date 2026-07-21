"""Convert JPEG-with-png-extension to a proper PNG, with optimizations for web."""
from PIL import Image
import os

TEMP = '/home/z/my-project/download/logo-clipe-consult-raw.jpg'
OUTPUT = '/home/z/my-project/download/logo-clipe-consult.png'

# Read the JPEG (saved by image-edit API) and convert to true PNG with white bg
img = Image.open(TEMP)
print(f"✓ Opened source: {img.format} {img.size[0]}x{img.size[1]} mode={img.mode}")

# Add white background (since JPEG doesn't support transparency)
if img.mode != 'RGB':
    img = img.convert('RGB')
# Composite onto white
bg = Image.new('RGB', img.size, (255, 255, 255))
if img.mode == 'RGBA':
    bg.paste(img, mask=img.split()[3])
else:
    bg.paste(img)
img = bg

# Save as optimized PNG
img.save(OUTPUT, 'PNG', optimize=True)
print(f"✓ Converted JPEG → PNG with white background")

# Show final file info
img = Image.open(OUTPUT)
print(f"  Format:  {img.format}")
print(f"  Mode:    {img.mode}")
print(f"  Size:    {img.size[0]}x{img.size[1]}")
print(f"  Bytes:   {os.path.getsize(OUTPUT):,}")
print(f"  Path:    {OUTPUT}")

# Also create a smaller web-optimized version (max 800px wide for typical WordPress logo use)
MAX_WIDTH = 800
if img.size[0] > MAX_WIDTH:
    ratio = MAX_WIDTH / img.size[0]
    new_size = (MAX_WIDTH, int(img.size[1] * ratio))
    web_img = img.resize(new_size, Image.LANCZOS)
    web_path = '/home/z/my-project/download/logo-clipe-consult-web.png'
    web_img.save(web_path, 'PNG', optimize=True)
    print(f"\n✓ Web-optimized version: {web_path}")
    print(f"  Size: {web_img.size[0]}x{web_img.size[1]}, {os.path.getsize(web_path):,} bytes")
