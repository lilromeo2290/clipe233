#!/usr/bin/env bash
# ============================================================
# Inspect rasmuta Navbar to understand nav button behavior
# ============================================================

APP_DIR="/home/clipe233/public_html/rasmutafoundation.org"

echo "============================================================"
echo "  INSPECT RASMUTA NAVBAR + HOMEPAGE SECTIONS"
echo "============================================================"
echo ""

# ------------------------------------------------------------
# 1. Find Navbar component
# ------------------------------------------------------------
echo "[1/4] Finding Navbar component..."
NAVBAR_FILE=$(find "${APP_DIR}/src" -type f \( -name "Navbar.tsx" -o -name "Navbar.ts" -o -name "navbar.tsx" \) 2>/dev/null | head -1)
if [ -z "$NAVBAR_FILE" ]; then
  echo "  Searching for any file containing 'Navbar'..."
  find "${APP_DIR}/src" -type f -name "*.tsx" 2>/dev/null | xargs grep -l "navbar\|Navbar\|navigation" 2>/dev/null | head -5
fi
echo ""

if [ -n "$NAVBAR_FILE" ]; then
  echo "[2/4] Navbar component: ${NAVBAR_FILE}"
  echo "  ----------------------------------------"
  cat "$NAVBAR_FILE" | head -200
  echo "  ----------------------------------------"
  echo ""
fi

# ------------------------------------------------------------
# 2. Find homepage
# ------------------------------------------------------------
HOMEPAGE="${APP_DIR}/src/app/page.tsx"
if [ ! -f "$HOMEPAGE" ]; then
  HOMEPAGE="${APP_DIR}/src/app/page.ts"
fi
if [ ! -f "$HOMEPAGE" ]; then
  HOMEPAGE="${APP_DIR}/src/app/page.js"
fi
if [ ! -f "$HOMEPAGE" ]; then
  HOMEPAGE="${APP_DIR}/src/app/page.jsx"
fi

echo "[3/4] Homepage: ${HOMEPAGE}"
if [ -f "$HOMEPAGE" ]; then
  echo "  File size: $(wc -l < "$HOMEPAGE") lines"
  echo ""
  echo "  Searching for section IDs (id=\"...\")..."
  grep -oP 'id="[^"]+"' "$HOMEPAGE" | sed 's/^/    /'
  echo ""
  echo "  Searching for imported section components..."
  grep -E "^import|^const.*=.*\(\)" "$HOMEPAGE" | head -30 | sed 's/^/    /'
  echo ""
  echo "  First 80 lines of homepage:"
  echo "  ----------------------------------------"
  head -80 "$HOMEPAGE" | sed 's/^/    /'
  echo "  ----------------------------------------"
else
  echo "  ✗ Homepage file not found"
fi
echo ""

# ------------------------------------------------------------
# 3. List all section/component files
# ------------------------------------------------------------
echo "[4/4] All component files in src/components/..."
find "${APP_DIR}/src/components" -type f -name "*.tsx" 2>/dev/null | sed "s|${APP_DIR}/||" | sed 's/^/    /' || echo "  (no components dir)"
echo ""

echo "============================================================"
echo "  ANALYSIS"
echo "============================================================"
echo ""
echo "Look at the Navbar component above. Are the nav items:"
echo "  <button onClick={...}>  → JS handler that should scroll (may be broken)"
echo "  <a href=\"#about\">      → Anchor link (will work if section has id=\"about\")"
echo "  <Link href=\"/about\">   → Tries to navigate to /about route (will 404)"
echo ""
echo "Look at homepage section IDs. If Navbar uses href=\"#about\" but homepage"
echo "has no element with id=\"about\", the link won't scroll anywhere."
