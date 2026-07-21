"""
Replace standalone 'Clipe233' references with 'CLIPE CONSULT' in user-visible text,
while preserving technical references like:
- clipe233-theme (localStorage key)
- clipe233_admin (sessionStorage key)
- clipe233eng.net / clipe233eng@gmail.com (email addresses)
- clipe233@2025 (admin password)
- clipe233.com (email placeholder)
- /clipe233eng-Logo.jpg (file path)
"""
import re
import os
from pathlib import Path

SRC_DIR = Path('/home/z/my-project/src')

# Files to process
EXTENSIONS = {'.tsx', '.ts', '.js'}

# Pattern: "Clipe233" NOT followed by characters that would make it part of an identifier
# Negative lookahead for: lowercase letter, digit, _, @, ., -
# This ensures we match standalone "Clipe233" but skip "clipe233eng", "clipe233-theme", etc.
# Case-insensitive match for: "Clipe233" or "clipe233" (not "clipe233eng", etc.)
PATTERN = re.compile(r'\bClipe233\b(?![a-zA-Z0-9_@.\-])', re.IGNORECASE)

# Also handle URL-encoded "Clipe233%20Engineers" → "CLIPE%20CONSULT"
URL_PATTERN = re.compile(r'Clipe233%20Engineers', re.IGNORECASE)

def replace_in_file(filepath):
    """Replace standalone Clipe233 references in a single file."""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        return 0

    original = content

    # Replace URL-encoded variant first (preserve URL encoding)
    content = URL_PATTERN.sub('CLIPE%20CONSULT', content)

    # Replace standalone "Clipe233" with "CLIPE CONSULT"
    # But preserve "Clipe233 Admin" → "CLIPE CONSULT Admin" (keep "Admin" suffix)
    content = PATTERN.sub('CLIPE CONSULT', content)

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        # Count replacements
        count = len(PATTERN.findall(original)) + len(URL_PATTERN.findall(original))
        return count
    return 0

# Walk through all source files
total_replacements = 0
files_changed = []

for root, dirs, files in os.walk(SRC_DIR):
    for filename in files:
        ext = Path(filename).suffix
        if ext in EXTENSIONS:
            filepath = Path(root) / filename
            count = replace_in_file(filepath)
            if count > 0:
                files_changed.append((str(filepath), count))
                total_replacements += count

print(f"\n✓ Total replacements: {total_replacements}")
print(f"✓ Files changed: {len(files_changed)}")
print("\nFiles modified:")
for filepath, count in files_changed:
    rel_path = filepath.replace('/home/z/my-project/', '')
    print(f"  {rel_path}: {count} replacement(s)")
