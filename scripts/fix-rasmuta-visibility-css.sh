#!/usr/bin/env bash
# ============================================================
# Comprehensive fix: force visibility of all motion elements
# Adds CSS override so any element with inline opacity:0 is forced visible
# This guarantees content shows even if framer-motion fails to hydrate
# ============================================================
set -e

APP_DIR="/home/clipe233/public_html/rasmutafoundation.org"
GLOBALS_CSS="${APP_DIR}/src/app/globals.css"

echo "============================================================"
echo "  COMPREHENSIVE VISIBILITY FIX"
echo "============================================================"
echo ""

# ------------------------------------------------------------
# 1. Backup globals.css
# ------------------------------------------------------------
BACKUP="${GLOBALS_CSS}.bak.$(date +%Y%m%d-%H%M%S)"
cp "${GLOBALS_CSS}" "${BACKUP}"
echo "[1/4] Backed up globals.css to: ${BACKUP}"
echo ""

# ------------------------------------------------------------
# 2. Show end of globals.css (so we know where to append)
# ------------------------------------------------------------
echo "[2/4] Current globals.css (last 30 lines):"
echo "  ----------------------------------------"
tail -30 "${GLOBALS_CSS}" | sed 's/^/    /'
echo "  ----------------------------------------"
echo ""

# ------------------------------------------------------------
# 3. Append the visibility override CSS
# ------------------------------------------------------------
echo "[3/4] Appending visibility override CSS to globals.css..."
echo ""

cat >> "${GLOBALS_CSS}" <<'CSS_EOF'

/* ============================================================ */
/* SSR VISIBILITY SAFETY NET                                    */
/* ============================================================ */
/* Problem: framer-motion renders motion elements with inline   */
/* style="opacity:0" during SSR. If JS is slow or fails to      */
/* hydrate, content stays invisible forever.                    */
/*                                                              */
/* Solution: Force opacity:1 for any element whose inline style */
/* contains "opacity:0;" (the SSR initial state). This overrides*/
/* framer-motion's initial inline style. Once JS hydrates and   */
/* framer-motion starts animating, it sets opacity to decimals  */
/* like 0.5 — those don't match "opacity:0;" so they're not     */
/* affected, and animations work normally.                      */
/*                                                              */
/* This is a progressive enhancement: no JS = content visible,  */
/* JS = content visible + animations.                           */
/* ============================================================ */

[style*="opacity:0;"] {
  opacity: 1 !important;
}

[style*="opacity: 0;"] {
  opacity: 1 !important;
}

/* Also neutralize the initial translateY transform that pairs  */
/* with opacity:0 in framer-motion's default initial state.     */
[style*="opacity:0;"] {
  transform: none !important;
}

[style*="opacity: 0;"] {
  transform: none !important;
}

/* Specific high-priority override for the page-level motion.div */
main [style*="opacity:0"] {
  opacity: 1 !important;
  transform: none !important;
}
CSS_EOF

echo "  ✓ Appended visibility override CSS"
echo ""
echo "  New end of globals.css:"
echo "  ----------------------------------------"
tail -40 "${GLOBALS_CSS}" | sed 's/^/    /'
echo "  ----------------------------------------"
echo ""

# ------------------------------------------------------------
# 4. Rebuild + restart
# ------------------------------------------------------------
echo "[4/4] Rebuilding + restarting..."
echo ""
echo "  -> npm run build (as clipe233 user)..."
su - clipe233 -c "cd '${APP_DIR}' && npm run build 2>&1 | tail -25"
echo ""

echo "  -> pm2 restart rasmuta..."
su - clipe233 -c "pm2 restart rasmuta --update-env 2>&1" | head -10
echo ""

sleep 5

# ------------------------------------------------------------
# 5. Verify
# ------------------------------------------------------------
echo "============================================================"
echo "  VERIFICATION"
echo "============================================================"
echo ""

BODY=$(curl -s --max-time 10 "https://rasmutafoundation.org/")
echo "  Body length: $(echo "$BODY" | wc -c) chars"
echo "  Contains 'Edem Divine': $(echo "$BODY" | grep -c 'Edem Divine')"
echo ""

# Count actual occurrences of opacity:0 in inline styles
OPACITY_ZERO_COUNT=$(echo "$BODY" | grep -o 'style="[^"]*opacity:0[^"]*"' | wc -l)
echo "  Number of elements with inline opacity:0: ${OPACITY_ZERO_COUNT}"
echo ""

if [ "${OPACITY_ZERO_COUNT}" -gt 0 ]; then
  echo "  These elements still have opacity:0 in HTML, but our CSS !important"
  echo "  rule will override them and force opacity:1. Content will be visible."
  echo ""
  echo "  Sample elements with opacity:0:"
  echo "$BODY" | grep -oE '<[a-z]+[^>]*style="[^"]*opacity:0[^"]*"[^>]*>' | head -5 | sed 's/^/    /'
  echo ""
fi

echo "  Checking if CSS override is in the built CSS..."
CSS_URL=$(echo "$BODY" | grep -oE 'href="(/_next/static/chunks/[^"]*\.css)"' | head -1 | sed 's/href="//' | sed 's/"$//')
if [ -n "$CSS_URL" ]; then
  echo "  Found CSS file: ${CSS_URL}"
  CSS_CONTENT=$(curl -s --max-time 10 "https://rasmutafoundation.org${CSS_URL}")
  echo "  CSS file size: $(echo "$CSS_CONTENT" | wc -c) chars"
  echo "  Contains 'opacity:0;' override: $(echo "$CSS_CONTENT" | grep -c 'opacity:0;')"
  echo "  Contains '!important': $(echo "$CSS_CONTENT" | grep -c '!important') (total in file)"
fi
echo ""

echo "============================================================"
echo "  DONE — Test in browser (incognito) now"
echo "============================================================"
echo ""
echo "  The CSS !important rule will force all motion elements visible."
echo "  Open https://rasmutafoundation.org/ in a fresh incognito window."
echo ""
echo "  If still blank → there's a different issue, paste the new screenshot."
