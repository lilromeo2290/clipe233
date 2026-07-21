#!/usr/bin/env bash
# ============================================================
# CLEAN SLATE REINSTALL — wipe rasmuta app dir and rebuild from GitHub
# This removes all local patches/changes and starts fresh from origin/main
# ============================================================
set -e

APP_DIR="/home/clipe233/public_html/rasmutafoundation.org"
APP_NAME="rasmuta"
DOMAIN="rasmutafoundation.org"
PUBLIC_IP="153.75.247.4"
PORT="3000"
GIT_REMOTE="https://github.com/lilromeo2290/rasmutafoundation.org.git"
# Alternative remotes to try if the above fails:
GIT_REMOTE_ALT="git@github.com:lilromeo2290/rasmutafoundation.org.git"

echo "============================================================"
echo "  CLEAN SLATE REINSTALL — rasmuta"
echo "============================================================"
echo ""
echo "  WARNING: This will WIPE the entire app directory:"
echo "    ${APP_DIR}"
echo "  And clone fresh from GitHub:"
echo "    ${GIT_REMOTE}"
echo ""
echo "  Press Ctrl+C within 10 seconds to abort..."
sleep 10
echo "  Proceeding..."
echo ""

# ------------------------------------------------------------
# Step 1: Detect existing git remote (so we use the right URL)
# ------------------------------------------------------------
echo "[1/8] Detecting existing git remote..."
if [ -d "${APP_DIR}/.git" ]; then
  EXISTING_REMOTE=$(su - clipe233 -c "cd '${APP_DIR}' && git remote get-url origin" 2>/dev/null || echo "")
  if [ -n "$EXISTING_REMOTE" ]; then
    echo "  Existing remote: ${EXISTING_REMOTE}"
    GIT_REMOTE="$EXISTING_REMOTE"
  fi
else
  echo "  No existing .git — will clone fresh from ${GIT_REMOTE}"
fi
echo ""

# ------------------------------------------------------------
# Step 2: Stop PM2 process
# ------------------------------------------------------------
echo "[2/8] Stopping PM2 process..."
su - clipe233 -c "pm2 stop ${APP_NAME} 2>/dev/null || true"
su - clipe233 -c "pm2 delete ${APP_NAME} 2>/dev/null || true"
echo "  ✓ Stopped and deleted"
echo ""

# ------------------------------------------------------------
# Step 3: Backup .env (we want to preserve DB connection strings)
# ------------------------------------------------------------
echo "[3/8] Backing up .env and any other config files..."
BACKUP_DIR="/home/clipe233/rasmuta-backup-$(date +%Y%m%d-%H%M%S)"
mkdir -p "${BACKUP_DIR}"

for f in .env .env.local .env.production prisma/dev.db prisma/database.db db/rasmuta.db public/ras-muta-logo.jpg; do
  if [ -e "${APP_DIR}/${f}" ]; then
    mkdir -p "${BACKUP_DIR}/$(dirname "${f}")"
    cp -r "${APP_DIR}/${f}" "${BACKUP_DIR}/${f}"
    echo "  ✓ Backed up: ${f}"
  fi
done

# Also backup the entire public folder (in case there are uploaded images)
if [ -d "${APP_DIR}/public" ]; then
  cp -r "${APP_DIR}/public" "${BACKUP_DIR}/public-full"
  echo "  ✓ Backed up entire public/ folder"
fi

echo "  Backup at: ${BACKUP_DIR}"
echo ""

# ------------------------------------------------------------
# Step 4: Wipe the app directory
# ------------------------------------------------------------
echo "[4/8] Wiping app directory..."
# Move it aside first (safer than rm -rf in case we need to recover)
if [ -d "${APP_DIR}" ]; then
  WIPE_PATH="${APP_DIR}.wiped-$(date +%Y%m%d-%H%M%S)"
  mv "${APP_DIR}" "${WIPE_PATH}"
  echo "  ✓ Moved old dir to: ${WIPE_PATH}"
  echo "    (delete manually once confirmed working: rm -rf ${WIPE_PATH})"
fi
echo ""

# ------------------------------------------------------------
# Step 5: Clone fresh from GitHub
# ------------------------------------------------------------
echo "[5/8] Cloning fresh from GitHub..."
echo "  Repository: ${GIT_REMOTE}"
echo ""

su - clipe233 -c "git clone '${GIT_REMOTE}' '${APP_DIR}'" || {
  echo "  Clone failed with primary remote. Trying alternative: ${GIT_REMOTE_ALT}"
  su - clipe233 -c "git clone '${GIT_REMOTE_ALT}' '${APP_DIR}'" || {
    echo "  ✗ Both clones failed. Restoring from backup..."
    mv "${APP_DIR}.wiped-"* "${APP_DIR}" 2>/dev/null || true
    exit 1
  }
}
echo "  ✓ Cloned successfully"
echo ""

# Verify the clone
if [ ! -f "${APP_DIR}/package.json" ]; then
  echo "  ✗ package.json not found in cloned repo — restoring from backup..."
  rm -rf "${APP_DIR}"
  mv "${WIPE_PATH}" "${APP_DIR}"
  exit 1
fi
echo "  ✓ package.json present"
ls -la "${APP_DIR}" | head -15 | sed 's/^/    /'
echo ""

# ------------------------------------------------------------
# Step 6: Restore backed-up files (.env, db, public assets)
# ------------------------------------------------------------
echo "[6/8] Restoring backed-up files..."
for f in .env .env.local .env.production prisma/dev.db prisma/database.db db/rasmuta.db; do
  if [ -e "${BACKUP_DIR}/${f}" ]; then
    mkdir -p "${APP_DIR}/$(dirname "${f}")"
    cp -r "${BACKUP_DIR}/${f}" "${APP_DIR}/${f}"
    chown clipe233:clipe233 "${APP_DIR}/${f}" 2>/dev/null || true
    echo "  ✓ Restored: ${f}"
  fi
done

# Restore public folder contents (merge — don't overwrite repo's public files)
if [ -d "${BACKUP_DIR}/public-full" ]; then
  echo "  Merging backed-up public/ files with repo's public/..."
  cp -rn "${BACKUP_DIR}/public-full/"* "${APP_DIR}/public/" 2>/dev/null || true
  chown -R clipe233:clipe233 "${APP_DIR}/public" 2>/dev/null || true
  echo "  ✓ Public files merged"
fi
echo ""

# ------------------------------------------------------------
# Step 7: Install + build + start
# ------------------------------------------------------------
echo "[7/8] Installing dependencies + building..."
echo ""
echo "  -> npm install..."
su - clipe233 -c "cd '${APP_DIR}' && npm install 2>&1 | tail -15"
echo ""

echo "  -> prisma generate..."
su - clipe233 -c "cd '${APP_DIR}' && npx prisma generate 2>&1 | tail -10"
echo ""

echo "  -> npm run build..."
su - clipe233 -c "cd '${APP_DIR}' && npm run build 2>&1 | tail -40"
echo ""

echo "  -> pm2 start (using package.json start script)..."
# Detect the start command
START_CMD=$(python3 -c "import json; d=json.load(open('${APP_DIR}/package.json')); print(d.get('scripts',{}).get('start','next start'))")
echo "  Start command: ${START_CMD}"

# Start with PM2 — use ecosystem.config.js if it exists, otherwise use npm start
if [ -f "${APP_DIR}/ecosystem.config.js" ]; then
  su - clipe233 -c "cd '${APP_DIR}' && pm2 start ecosystem.config.js --name ${APP_NAME}"
elif [ -f "${APP_DIR}/ecosystem.config.cjs" ]; then
  su - clipe233 -c "cd '${APP_DIR}' && pm2 start ecosystem.config.cjs --name ${APP_NAME}"
else
  # Use the start script from package.json
  su - clipe233 -c "cd '${APP_DIR}' && pm2 start npm --name '${APP_NAME}' -- start"
fi
echo ""
sleep 5

# ------------------------------------------------------------
# Step 8: Verify
# ------------------------------------------------------------
echo "[8/8] Verifying..."
echo ""
echo "  PM2 status:"
su - clipe233 -c 'pm2 list' 2>/dev/null | grep -E "name|rasmuta|online|errored|stopped" | sed 's/^/    /'
echo ""

echo "  Port ${PORT} listener:"
ss -tlnp 2>/dev/null | grep ":${PORT} " | sed 's/^/    /' || echo "    ✗ Nothing listening"
echo ""

echo "  Direct curl to Next.js (bypassing Nginx):"
curl -sI --max-time 10 "http://${PUBLIC_IP}:${PORT}/" 2>&1 | head -5 | sed 's/^/    /'
echo ""

echo "  Public HTTPS curl through Nginx:"
curl -sI --max-time 10 "https://${DOMAIN}/" 2>&1 | head -5 | sed 's/^/    /'
echo ""

echo "  Body sanity check:"
BODY=$(curl -s --max-time 10 "https://${DOMAIN}/")
echo "    Body length: $(echo "$BODY" | wc -c) chars"
echo "    Contains 'Edem Divine': $(echo "$BODY" | grep -c 'Edem Divine')"
echo "    Contains 'opacity:0' inline: $(echo "$BODY" | grep -o 'style="[^"]*opacity:0[^"]*"' | wc -l)"
echo ""

echo "  PM2 logs (last 20 lines):"
su - clipe233 -c 'pm2 logs rasmuta --lines 20 --nostream' 2>&1 | tail -25 | sed 's/^/    /'
echo ""

echo "============================================================"
echo "  CLEAN SLATE REINSTALL — DONE"
echo "============================================================"
echo ""
echo "  App directory: ${APP_DIR}"
echo "  Backup at:     ${BACKUP_DIR}"
echo "  Wiped old dir: ${WIPE_PATH:-none}"
echo ""
echo "  Test in browser (incognito): https://${DOMAIN}/"
echo ""
echo "  If still broken, paste:"
echo "    1. The PM2 status (errored?)"
echo "    2. The PM2 logs (errors)"
echo "    3. A new screenshot"
