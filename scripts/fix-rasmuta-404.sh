#!/usr/bin/env bash
# ============================================================
# Fix rasmutafoundation.org 404 — rebuild & restart rasmuta app
# Runs as clipe233 user (since rasmuta PM2 daemon runs as that user)
# ============================================================
set -e

DOMAIN="rasmutafoundation.org"
APP_DIR="/home/clipe233/rasmuta"
APP_NAME="rasmuta"
PORT="3000"
PUBLIC_IP="153.75.247.4"

echo "============================================================"
echo "  FIX rasmutafoundation.org 404"
echo "============================================================"
echo ""

# ------------------------------------------------------------
# Step 1: Diagnose current state
# ------------------------------------------------------------
echo "[1/6] Current PM2 status (as clipe233 user)..."
su - clipe233 -c 'pm2 list' 2>/dev/null | grep -E "rasmuta|name|status" || echo "  (no rasmuta process found in clipe233 PM2)"
echo ""

echo "[2/6] Checking what's listening on port ${PORT}..."
ss -tlnp 2>/dev/null | grep ":${PORT} " || echo "  (nothing listening on port ${PORT})"
echo ""

echo "[3/6] Local curl test (directly to Next.js, bypassing Nginx)..."
echo "  -> curl -sI http://${PUBLIC_IP}:${PORT}/ | head -5"
su - clipe233 -c "curl -sI --max-time 10 http://${PUBLIC_IP}:${PORT}/" 2>&1 | head -5 || true
echo ""

# ------------------------------------------------------------
# Step 2: Verify the app directory exists
# ------------------------------------------------------------
echo "[4/6] Verifying app directory exists..."
if [ ! -d "${APP_DIR}" ]; then
  echo "  ✗ ERROR: ${APP_DIR} does not exist!"
  echo "  Looking for rasmuta in other locations..."
  find /home -maxdepth 3 -type d -name "rasmuta" 2>/dev/null
  exit 1
fi
echo "  ✓ ${APP_DIR} exists"
ls -la "${APP_DIR}" | head -20
echo ""

# ------------------------------------------------------------
# Step 3: Rebuild the Next.js app as clipe233 user
# ------------------------------------------------------------
echo "[5/6] Rebuilding Next.js app (this may take 1-2 minutes)..."
echo "  -> cd ${APP_DIR} && npm install && npm run build"
echo ""

su - clipe233 -c "cd ${APP_DIR} && npm install 2>&1 | tail -20"
echo ""
echo "  --- Building ---"
su - clipe233 -c "cd ${APP_DIR} && npm run build 2>&1 | tail -40"
echo ""

# ------------------------------------------------------------
# Step 4: Restart PM2 (as clipe233 user)
# ------------------------------------------------------------
echo "[6/6] Restarting PM2 process..."
su - clipe233 -c "pm2 restart ${APP_NAME} --update-env 2>&1" || {
  echo "  pm2 restart failed — trying delete + start"
  su - clipe233 -c "pm2 delete ${APP_NAME} 2>/dev/null || true"
  su - clipe233 -c "cd ${APP_DIR} && pm2 start npm --name ${APP_NAME} -- start"
}
echo ""

# Wait for app to come up
sleep 5
echo "  Waiting 5s for app to come up..."
echo ""

# ------------------------------------------------------------
# Step 5: Final verification
# ------------------------------------------------------------
echo "============================================================"
echo "  VERIFICATION"
echo "============================================================"

echo ""
echo "  PM2 status (clipe233 user):"
su - clipe233 -c 'pm2 list' 2>/dev/null | grep -E "rasmuta|name|status"
echo ""

echo "  Local direct curl (Next.js on port ${PORT}):"
su - clipe233 -c "curl -sI --max-time 10 http://${PUBLIC_IP}:${PORT}/" 2>&1 | head -5
echo ""

echo "  Public curl through Nginx:"
curl -sI --max-time 10 "https://${DOMAIN}/" 2>&1 | head -5
echo ""

echo "  Page title:"
curl -s --max-time 10 "https://${DOMAIN}/" 2>&1 | grep -oP '<title>[^<]+</title>' | head -1
echo ""

echo "============================================================"
echo "  DONE"
echo "============================================================"
echo ""
echo "If still 404:"
echo "  1. Check PM2 logs:  su - clipe233 -c 'pm2 logs rasmuta --lines 50 --nostream'"
echo "  2. Verify the .next folder was built:  ls -la ${APP_DIR}/.next"
echo "  3. Check the start command in ecosystem.config.js or package.json"
