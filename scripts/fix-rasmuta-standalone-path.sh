#!/usr/bin/env bash
# ============================================================
# Fix rasmuta — standalone server.js not in expected location
# Root cause: stray /home/clipe233/package-lock.json causes Next.js
# to use /home/clipe233 as workspace root, so .next/standalone/
# gets written there instead of inside the app directory.
# ============================================================
set -e

APP_DIR="/home/clipe233/public_html/rasmutafoundation.org"
APP_NAME="rasmuta"
DOMAIN="rasmutafoundation.org"
PUBLIC_IP="153.75.247.4"
PORT="3000"
STRAY_LOCKFILE="/home/clipe233/package-lock.json"
STRAY_NEXT_DIR="/home/clipe233/.next"

echo "============================================================"
echo "  FIX RASMUTA — STANDALONE SERVER.JS PATH"
echo "============================================================"
echo ""

# ------------------------------------------------------------
# 1. Confirm the stray lockfile is the cause
# ------------------------------------------------------------
echo "[1/6] Checking for stray lockfile..."
if [ -f "${STRAY_LOCKFILE}" ]; then
  echo "  ✗ Found stray: ${STRAY_LOCKFILE}"
  ls -la "${STRAY_LOCKFILE}" | sed 's/^/    /'
else
  echo "  ✓ No stray lockfile at ${STRAY_LOCKFILE}"
fi
echo ""

echo "  Checking for stray .next dir at workspace root..."
if [ -d "${STRAY_NEXT_DIR}" ]; then
  echo "  ✗ Found stray: ${STRAY_NEXT_DIR}"
  ls -la "${STRAY_NEXT_DIR}/standalone/" 2>/dev/null | head -10 | sed 's/^/    /' || echo "    (no standalone/ subdir)"
  if [ -f "${STRAY_NEXT_DIR}/standalone/server.js" ]; then
    echo "  ✓ Found server.js in stray location: ${STRAY_NEXT_DIR}/standalone/server.js"
    echo "  This confirms our diagnosis."
  fi
else
  echo "  No stray .next at ${STRAY_NEXT_DIR}"
fi
echo ""

echo "  App's own .next dir:"
ls -la "${APP_DIR}/.next/" 2>/dev/null | head -10 | sed 's/^/    /'
echo ""
echo "  App's .next/standalone/ dir (should exist but might be empty):"
ls -la "${APP_DIR}/.next/standalone/" 2>/dev/null | head -10 | sed 's/^/    /' || echo "    (does not exist)"
echo ""

# ------------------------------------------------------------
# 2. Stop PM2
# ------------------------------------------------------------
echo "[2/6] Stopping PM2..."
su - clipe233 -c "pm2 stop ${APP_NAME} 2>/dev/null || true"
su - clipe233 -c "pm2 delete ${APP_NAME} 2>/dev/null || true"
echo "  ✓ Stopped"
echo ""

# ------------------------------------------------------------
# 3. Remove stray lockfile + stray .next dir
# ------------------------------------------------------------
echo "[3/6] Removing stray lockfile and stray .next dir..."
if [ -f "${STRAY_LOCKFILE}" ]; then
  mv "${STRAY_LOCKFILE}" "${STRAY_LOCKFILE}.bak.$(date +%Y%m%d-%H%M%S)"
  echo "  ✓ Moved stray lockfile aside"
fi
if [ -d "${STRAY_NEXT_DIR}" ]; then
  mv "${STRAY_NEXT_DIR}" "${STRAY_NEXT_DIR}.bak.$(date +%Y%m%d-%H%M%S)"
  echo "  ✓ Moved stray .next dir aside"
fi
echo ""

# ------------------------------------------------------------
# 4. Clean and rebuild
# ------------------------------------------------------------
echo "[4/6] Cleaning and rebuilding..."
echo ""
echo "  -> rm -rf .next node_modules (clean state)"
su - clipe233 -c "cd '${APP_DIR}' && rm -rf .next"
echo "  ✓ Cleaned .next"
echo ""

echo "  -> npm run build..."
su - clipe233 -c "cd '${APP_DIR}' && npm run build 2>&1 | tail -40"
echo ""

echo "  Verify .next/standalone/server.js now exists in the app dir:"
if [ -f "${APP_DIR}/.next/standalone/server.js" ]; then
  echo "  ✓ FOUND: ${APP_DIR}/.next/standalone/server.js"
  ls -la "${APP_DIR}/.next/standalone/server.js" | sed 's/^/    /'
else
  echo "  ✗ STILL NOT FOUND"
  echo "  Contents of .next/standalone/:"
  ls -la "${APP_DIR}/.next/standalone/" 2>/dev/null | head -20 | sed 's/^/    /'
  echo ""
  echo "  Falling back to 'next start' (doesn't need standalone)..."
  # Modify the start approach: use next start directly
  su - clipe233 -c "cd '${APP_DIR}' && pm2 start 'npx next start -H ${PUBLIC_IP} -p ${PORT}' --name ${APP_NAME} --cwd ${APP_DIR}"
  sleep 5
  # Skip to verification
  echo "  Skipping standalone approach, using 'next start' instead"
  echo ""
  # Jump to step 6 verification
  echo "============================================================"
  echo "  VERIFICATION (using next start fallback)"
  echo "============================================================"
  echo ""
  echo "  PM2 status:"
  su - clipe233 -c 'pm2 list' 2>/dev/null | grep -E "name|rasmuta|online|errored" | sed 's/^/    /'
  echo ""
  echo "  Port ${PORT} listener:"
  ss -tlnp 2>/dev/null | grep ":${PORT} " | sed 's/^/    /' || echo "    ✗ Nothing listening"
  echo ""
  echo "  Direct curl:"
  curl -sI --max-time 10 "http://${PUBLIC_IP}:${PORT}/" 2>&1 | head -5 | sed 's/^/    /'
  echo ""
  echo "  Public HTTPS:"
  curl -sI --max-time 10 "https://${DOMAIN}/" 2>&1 | head -5 | sed 's/^/    /'
  echo ""
  exit 0
fi
echo ""

# ------------------------------------------------------------
# 5. Start PM2 with the package.json start script (bun + standalone)
# ------------------------------------------------------------
echo "[5/6] Starting PM2 with bun + standalone server..."
echo ""
echo "  Checking if bun is installed..."
if command -v bun >/dev/null 2>&1; then
  echo "  ✓ bun is available: $(which bun)"
else
  echo "  ✗ bun NOT installed"
  echo "  Installing bun..."
  su - clipe233 -c 'curl -fsSL https://bun.sh/install | bash' 2>&1 | tail -10
  # Source bun env
  export BUN_INSTALL="$HOME/.bun"
  export PATH="$BUN_INSTALL/bin:$PATH"
  su - clipe233 -c 'source ~/.bashrc && which bun' 2>&1 | tail -3
fi
echo ""

# Start with PM2 using the start script
echo "  Starting PM2..."
su - clipe233 -c "cd '${APP_DIR}' && pm2 start npm --name '${APP_NAME}' -- start" 2>&1 | head -10
echo ""
sleep 8

# ------------------------------------------------------------
# 6. Verify
# ------------------------------------------------------------
echo "[6/6] Verifying..."
echo ""
echo "  PM2 status:"
su - clipe233 -c 'pm2 list' 2>/dev/null | grep -E "name|rasmuta|online|errored" | sed 's/^/    /'
echo ""

echo "  PM2 logs (last 15 lines):"
su - clipe233 -c 'pm2 logs rasmuta --lines 15 --nostream' 2>&1 | tail -20 | sed 's/^/    /'
echo ""

echo "  Port ${PORT} listener:"
ss -tlnp 2>/dev/null | grep ":${PORT} " | sed 's/^/    /' || echo "    ✗ Nothing listening"
echo ""

echo "  Direct curl to Next.js (bypassing Nginx):"
curl -sI --max-time 10 "http://${PUBLIC_IP}:${PORT}/" 2>&1 | head -5 | sed 's/^/    /'
echo ""

echo "  Public HTTPS curl:"
curl -sI --max-time 10 "https://${DOMAIN}/" 2>&1 | head -5 | sed 's/^/    /'
echo ""

BODY=$(curl -s --max-time 10 "https://${DOMAIN}/")
echo "  Body length: $(echo "$BODY" | wc -c) chars"
echo "  Contains 'Edem Divine': $(echo "$BODY" | grep -c 'Edem Divine')"
echo "  Contains 'opacity:0' inline: $(echo "$BODY" | grep -o 'style=\"[^\"]*opacity:0[^\"]*\"' | wc -l)"
echo ""

echo "============================================================"
echo "  DONE"
echo "============================================================"
echo ""
echo "  If PM2 status is 'online' and curl returns HTTP 200 →"
echo "  open https://${DOMAIN}/ in incognito."
