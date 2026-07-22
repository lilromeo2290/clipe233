#!/usr/bin/env bash
# ============================================================
# Diagnose rasmuta hydration failure — blank main content area
# ============================================================

APP_DIR="/home/clipe233/public_html/rasmutafoundation.org"

echo "============================================================"
echo "  DIAGNOSE RASMUTA HYDRATION FAILURE"
echo "============================================================"
echo ""

# ------------------------------------------------------------
# 1. Read the Zustand store file
# ------------------------------------------------------------
echo "[1/4] Zustand store file..."
STORE_FILE="${APP_DIR}/src/lib/store.ts"
if [ ! -f "$STORE_FILE" ]; then
  STORE_FILE="${APP_DIR}/src/lib/store.tsx"
fi
if [ ! -f "$STORE_FILE" ]; then
  echo "  Searching for store file..."
  find "${APP_DIR}/src" -name "store.*" -not -path "*/node_modules/*" 2>/dev/null | sed 's/^/    /'
  STORE_FILE=$(find "${APP_DIR}/src" -name "store.ts" -not -path "*/node_modules/*" 2>/dev/null | head -1)
fi

if [ -n "$STORE_FILE" ] && [ -f "$STORE_FILE" ]; then
  echo "  Found: ${STORE_FILE}"
  echo "  ----------------------------------------"
  cat "$STORE_FILE"
  echo "  ----------------------------------------"
else
  echo "  ✗ No store file found"
fi
echo ""

# ------------------------------------------------------------
# 2. Read the Header component (nav buttons)
# ------------------------------------------------------------
echo "[2/4] Header component..."
HEADER_FILE="${APP_DIR}/src/components/layout/header.tsx"
if [ -f "$HEADER_FILE" ]; then
  echo "  Found: ${HEADER_FILE}"
  echo "  ----------------------------------------"
  cat "$HEADER_FILE"
  echo "  ----------------------------------------"
else
  echo "  ✗ Header file not found at expected path"
  find "${APP_DIR}/src" -name "header.*" -not -path "*/node_modules/*" 2>/dev/null
fi
echo ""

# ------------------------------------------------------------
# 3. Read one of the view components to check for issues
# ------------------------------------------------------------
echo "[3/4] One view component (home-view.tsx)..."
HOME_VIEW="${APP_DIR}/src/components/views/home-view.tsx"
if [ -f "$HOME_VIEW" ]; then
  echo "  Found: ${HOME_VIEW}"
  echo "  File size: $(wc -l < "$HOME_VIEW") lines"
  echo "  ----------------------------------------"
  head -100 "$HOME_VIEW"
  echo "  ... (showing first 100 lines only)"
  echo "  ----------------------------------------"
fi
echo ""

# ------------------------------------------------------------
# 4. Check page.tsx and layout.tsx for hydration issues
# ------------------------------------------------------------
echo "[4/4] layout.tsx and page.tsx..."
LAYOUT_FILE="${APP_DIR}/src/app/layout.tsx"
if [ -f "$LAYOUT_FILE" ]; then
  echo "  layout.tsx:"
  echo "  ----------------------------------------"
  cat "$LAYOUT_FILE"
  echo "  ----------------------------------------"
fi
echo ""

# ------------------------------------------------------------
# 5. Check PM2 logs for any runtime errors
# ------------------------------------------------------------
echo "[bonus] Last 50 lines of PM2 logs for rasmuta..."
su - clipe233 -c 'pm2 logs rasmuta --lines 50 --nostream' 2>&1 | tail -60
echo ""

echo "============================================================"
echo "  WHAT TO LOOK FOR"
echo "============================================================"
echo ""
echo "1. Zustand store:"
echo "   - If it uses create() without persist + skipHydration, you get hydration mismatch"
echo "   - Fix: add 'skipHydration: true' to persist options, then manually rehydrate"
echo "   - OR use 'useStore' with a selector that handles SSR"
echo ""
echo "2. Header component:"
echo "   - Are nav buttons <button onClick={() => setView(...)}>?"
echo "   - If yes, clicking should work — issue is initial render hydration"
echo "   - If they're <a href> then they try to navigate to /about (404)"
echo ""
echo "3. Home-view component:"
echo "   - Check for any use of window/document/localStorage at module level"
echo "   - Check for Date.now() or Math.random() at render time"
echo "   - Check for useStore with non-deterministic initial state"
echo ""
echo "4. layout.tsx:"
echo "   - Check if ThemeProvider suppressHydrationWarning is set"
echo "   - Check for any client-only logic at root level"
echo ""
echo "5. PM2 logs:"
echo "   - Look for 'Hydration failed' or 'Text content does not match'"
echo "   - Look for any runtime JS errors"
