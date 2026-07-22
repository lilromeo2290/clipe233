#!/usr/bin/env bash
# ============================================================
# Fix rasmuta subpage 404s — find app dir, inspect routes, rebuild
# ============================================================
set -e

APP_NAME="rasmuta"
DOMAIN="rasmutafoundation.org"

echo "============================================================"
echo "  FIX RASMUTA SUBPAGE 404s"
echo "============================================================"
echo ""

# ------------------------------------------------------------
# Step 1: Find the actual rasmuta app directory from PM2
# ------------------------------------------------------------
echo "[1/6] Finding rasmuta app directory via PM2..."
PM2_DESC=$(su - clipe233 -c 'pm2 describe rasmuta' 2>/dev/null)
APP_DIR=$(echo "$PM2_DESC" | grep -E "script path|cwd|exec cwd" | head -1 | awk -F': ' '{print $2}' | sed 's/^[[:space:]]*//;s/[[:space:]]*$//')

if [ -z "$APP_DIR" ] || [ ! -d "$APP_DIR" ]; then
  echo "  pm2 describe didn't reveal a usable cwd. Trying pm2 jlist..."
  APP_DIR=$(su - clipe233 -c 'pm2 jlist' 2>/dev/null | python3 -c "import sys, json; data=json.load(sys.stdin); print(next((p.get('pm2_env',{}).get('pm_cwd') for p in data if p.get('name')=='rasmuta'), ''))" 2>/dev/null)
fi

if [ -z "$APP_DIR" ] || [ ! -d "$APP_DIR" ]; then
  echo "  Still no luck. Searching filesystem..."
  APP_DIR=$(find /home -maxdepth 4 -name "package.json" -path "*rasmuta*" -not -path "*/node_modules/*" 2>/dev/null | head -1 | xargs dirname 2>/dev/null)
fi

if [ -z "$APP_DIR" ] || [ ! -d "$APP_DIR" ]; then
  echo "  ✗ ERROR: Cannot find rasmuta app directory"
  echo ""
  echo "  PM2 describe output:"
  echo "$PM2_DESC" | head -30
  exit 1
fi

echo "  ✓ App directory: ${APP_DIR}"
echo ""

# ------------------------------------------------------------
# Step 2: Show package.json name + start script
# ------------------------------------------------------------
echo "[2/6] package.json info..."
if [ -f "${APP_DIR}/package.json" ]; then
  echo "  name:    $(python3 -c "import json; d=json.load(open('${APP_DIR}/package.json')); print(d.get('name','?'))")"
  echo "  version: $(python3 -c "import json; d=json.load(open('${APP_DIR}/package.json')); print(d.get('version','?'))")"
  echo "  scripts.start: $(python3 -c "import json; d=json.load(open('${APP_DIR}/package.json')); print(d.get('scripts',{}).get('start','?'))")"
  echo "  scripts.build: $(python3 -c "import json; d=json.load(open('${APP_DIR}/package.json')); print(d.get('scripts',{}).get('build','?'))")"
else
  echo "  ✗ No package.json at ${APP_DIR}"
  exit 1
fi
echo ""

# ------------------------------------------------------------
# Step 3: List existing routes in src/app or app/
# ------------------------------------------------------------
echo "[3/6] Existing Next.js routes..."
if [ -d "${APP_DIR}/src/app" ]; then
  APP_ROUTES="${APP_DIR}/src/app"
elif [ -d "${APP_DIR}/app" ]; then
  APP_ROUTES="${APP_DIR}/app"
else
  APP_ROUTES=""
  echo "  ✗ No app directory found at ${APP_DIR}/src/app or ${APP_DIR}/app"
fi

if [ -n "$APP_ROUTES" ]; then
  echo "  Routes directory: ${APP_ROUTES}"
  echo ""
  echo "  Page routes (page.tsx/page.ts/page.js/page.jsx files):"
  find "${APP_ROUTES}" -type f \( -name "page.tsx" -o -name "page.ts" -o -name "page.js" -o -name "page.jsx" \) 2>/dev/null | sed "s|${APP_ROUTES}||" | sed 's|^/|    /|' | sed 's|/page\.tsx$||' | sed 's|/page\.ts$||' | sed 's|/page\.js$||' | sed 's|/page\.jsx$||' || echo "    (none found)"
  echo ""
fi
echo ""

# ------------------------------------------------------------
# Step 4: Check the .next build folder
# ------------------------------------------------------------
echo "[4/6] Existing .next build..."
if [ -d "${APP_DIR}/.next" ]; then
  echo "  .next exists, last modified: $(stat -c '%y' "${APP_DIR}/.next" 2>/dev/null | cut -d'.' -f1)"
  echo "  Build manifest routes:"
  if [ -f "${APP_DIR}/.next/routes-manifest.json" ]; then
    python3 -c "
import json
with open('${APP_DIR}/.next/routes-manifest.json') as f:
    d = json.load(f)
print('    Static routes (HTML prerendered):')
for r in d.get('staticRoutes', [])[:20]:
    print(f'      {r.get(\"route\")} → {r.get(\"page\")}')
print('    Dynamic routes:')
for r in d.get('dynamicRoutes', [])[:10]:
    print(f'      {r.get(\"route\")} → {r.get(\"page\")}')
" 2>/dev/null || echo "    (couldn't parse routes-manifest.json)"
  else
    echo "    (no routes-manifest.json — build may be incomplete)"
  fi
else
  echo "  ✗ .next folder does not exist — app needs full rebuild"
fi
echo ""

# ------------------------------------------------------------
# Step 5: Rebuild the app
# ------------------------------------------------------------
echo "[5/6] Rebuilding Next.js app (this may take 1-2 minutes)..."
echo "  -> cd ${APP_DIR} && npm install && npm run build"
echo ""

su - clipe233 -c "cd '${APP_DIR}' && npm install 2>&1 | tail -10"
echo ""
echo "  --- Building ---"
su - clipe233 -c "cd '${APP_DIR}' && npm run build 2>&1 | tail -60"
echo ""

# ------------------------------------------------------------
# Step 6: Restart PM2 and verify
# ------------------------------------------------------------
echo "[6/6] Restarting PM2 + verifying..."
su - clipe233 -c "pm2 restart ${APP_NAME} --update-env 2>&1" | head -10
echo ""
sleep 5

echo "  Verifying subpages:"
for path in / /about /events /gallery /news /contact; do
  printf "    %-15s " "${path}"
  CODE=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 "https://${DOMAIN}${path}")
  echo "HTTP ${CODE}"
done
echo ""

echo "============================================================"
echo "  DONE"
echo "============================================================"
echo ""
echo "If subpages are still 404 after rebuild:"
echo "  → The Next.js app genuinely doesn't have those routes defined."
echo "  → The homepage nav buttons are <button> elements, not <a> links."
echo "  → You'd need to create actual route files like:"
echo "      ${APP_ROUTES}/about/page.tsx"
echo "      ${APP_ROUTES}/events/page.tsx"
echo "      ${APP_ROUTES}/gallery/page.tsx"
echo "      etc."
echo ""
echo "  → OR change the homepage buttons to scroll to sections instead of routing."
