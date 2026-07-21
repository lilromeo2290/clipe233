"""
Replace logo image files in /public/ with the new 'CLIPE CONSULT' logo.

Strategy:
1. Backup current logo files
2. Replace /logo.png with new PNG logo (web-optimized 800x400)
3. Replace /logo.jpg with new JPG version (for legacy references)
4. Replace /clipe233eng-Logo.jpg with new JPG version (SplashScreen uses this)
5. Leave /logo.svg alone (388 bytes - probably just a favicon icon, not the full logo)
"""
from PIL import Image
import shutil
import os
from pathlib import Path
from datetime import datetime

PUBLIC_DIR = Path('/home/z/my-project/public')
NEW_LOGO_PNG = Path('/home/z/my-project/download/logo-clipe-consult.png')  # 1440x720, high-res
NEW_LOGO_PNG_WEB = Path('/home/z/my-project/download/logo-clipe-consult-web.png')  # 800x400, web-optimized

BACKUP_DIR = Path(f'/home/z/my-project/.backups/rebrand-{datetime.now().strftime("%Y%m%d-%H%M")}/public-logos')
BACKUP_DIR.mkdir(parents=True, exist_ok=True)

# Files to replace and their replacement strategy
LOGO_FILES = [
    # (target_file, source_file, format, max_width)
    ('logo.png', NEW_LOGO_PNG_WEB, 'PNG', 800),       # Primary logo - web-optimized PNG
    ('logo.jpg', NEW_LOGO_PNG_WEB, 'JPEG', 800),       # Legacy JPG version
    ('clipe233eng-Logo.jpg', NEW_LOGO_PNG_WEB, 'JPEG', 800),  # SplashScreen logo
]

print("=" * 60)
print("LOGO REPLACEMENT")
print("=" * 60)

for target_name, source_file, fmt, max_width in LOGO_FILES:
    target_path = PUBLIC_DIR / target_name

    if not source_file.exists():
        print(f"❌ Source not found: {source_file}")
        continue

    # Backup original if it exists
    if target_path.exists():
        backup_path = BACKUP_DIR / target_name
        shutil.copy2(target_path, backup_path)
        original_size = target_path.stat().st_size
        print(f"\n📁 {target_name}")
        print(f"   Backed up original ({original_size:,} bytes) → {backup_path}")
    else:
        print(f"\n📁 {target_name} (new file)")

    # Open new logo
    img = Image.open(source_file)
    print(f"   Source: {source_file.name} - {img.size[0]}x{img.size[1]} {img.format}")

    # Resize if wider than max_width
    if img.size[0] > max_width:
        ratio = max_width / img.size[0]
        new_size = (max_width, int(img.size[1] * ratio))
        img = img.resize(new_size, Image.LANCZOS)
        print(f"   Resized to: {new_size[0]}x{new_size[1]}")

    # Convert mode if needed
    if fmt == 'JPEG':
        if img.mode != 'RGB':
            img = img.convert('RGB')
    elif fmt == 'PNG':
        if img.mode not in ('RGB', 'RGBA'):
            img = img.convert('RGB')

    # Save with optimization
    if fmt == 'JPEG':
        img.save(target_path, 'JPEG', quality=85, optimize=True, progressive=True)
    elif fmt == 'PNG':
        img.save(target_path, 'PNG', optimize=True)

    new_size = target_path.stat().st_size
    print(f"   ✅ Saved: {target_path} ({new_size:,} bytes, {fmt})")

print("\n" + "=" * 60)
print("FINAL LOGO FILES IN /public/:")
print("=" * 60)
for f in sorted(PUBLIC_DIR.glob('logo*')):
    print(f"  {f.name}: {f.stat().st_size:,} bytes")
for f in sorted(PUBLIC_DIR.glob('clipe233*')):
    print(f"  {f.name}: {f.stat().st_size:,} bytes")

print(f"\n📁 Backups saved to: {BACKUP_DIR}")
