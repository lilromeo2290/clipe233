#!/usr/bin/env bash
# ============================================================
# Diagnose + fix the /index.js browser navigation issue
# Server returns 200 for /, but browser ends up at /index.js (404)
# ============================================================
set -e

DOMAIN="rasmutafoundation.org"
APP_DIR="/home/clipe233/public_html/rasmutafoundation.org"
CONF_FILE="/var/webuzo-data/nginx/custom/domains/${DOMAIN}.conf"

echo "============================================================"
echo "  /index.js BROWSER REDIRECT DIAGNOSIS"
echo "============================================================"
echo ""

# ------------------------------------------------------------
# 1. Check next.config.ts for redirects/rewrites
# ------------------------------------------------------------
echo "[1/5] Checking next.config.ts for redirects/rewrites..."
if [ -f "${APP_DIR}/next.config.ts" ]; then
  echo "  Contents of ${APP_DIR}/next.config.ts:"
  echo "  ----------------------------------------"
  cat "${APP_DIR}/next.config.ts" | sed 's/^/    /'
  echo "  ----------------------------------------"
else
  echo "  ✗ next.config.ts not found"
  ls -la "${APP_DIR}"/next.config.* 2>/dev/null | sed 's/^/    /'
fi
echo ""

# ------------------------------------------------------------
# 2. Grep the homepage HTML for any client-side redirect code
# ------------------------------------------------------------
echo "[2/5] Checking homepage HTML for redirect triggers..."
HTML=$(curl -s --max-time 10 "https://${DOMAIN}/")
echo "  HTML length: $(echo "$HTML" | wc -c) chars"
echo ""
echo "  Searching for redirect patterns..."
echo ""
echo "  window.location / location.assign / location.replace:"
echo "$HTML" | grep -oE "window\.location[^<]{0,80}|location\.(assign|replace)\([^)]{0,80}" | head -5 | sed 's/^/    /'
echo ""
echo "  meta http-equiv refresh:"
echo "$HTML" | grep -oE "<meta[^>]*http-equiv[^>]*>" | head -5 | sed 's/^/    /'
echo ""
echo "  serviceWorker registration:"
echo "$HTML" | grep -oE "serviceWorker\.[a-zA-Z]+\([^)]{0,80}" | head -5 | sed 's/^/    /'
echo ""
echo "  Any mention of 'index.js' in the HTML:"
echo "$HTML" | grep -oE "[^\"]*index\.js[^\"]*" | head -10 | sed 's/^/    /'
echo ""

# ------------------------------------------------------------
# 3. Check the Webuzo 'index' directive
# ------------------------------------------------------------
echo "[3/5] Checking Webuzo 'index' directive in server block..."
WEBUZO_CONF="/usr/local/apps/nginx/etc/conf.d/webuzoVH.conf"
echo "  Lines around the rasmuta server blocks containing 'index':"
grep -B2 -A1 "index" "${WEBUZO_CONF}" | grep -B2 -A1 "rasmuta\|index" | head -30 | sed 's/^/    /'
echo ""

# ------------------------------------------------------------
# 4. Look for /index.js in the Webuzo config try_files directives
# ------------------------------------------------------------
echo "[4/5] Searching for 'index.js' references in webuzoVH.conf..."
grep -n "index.js\|index\.js" "${WEBUZO_CONF}" | head -10 | sed 's/^/    /'
echo ""

# ------------------------------------------------------------
# 5. Add a defensive redirect: /index.js → / (handles cached browser state)
# ------------------------------------------------------------
echo "[5/5] Adding defensive redirect rule: /index.js → / ..."
echo "  (This protects against any cached redirects or accidental navigation to /index.js)"
echo ""

# Backup current config
BACKUP="${CONF_FILE}.bak.$(date +%Y%m%d-%H%M%S)"
cp "${CONF_FILE}" "${BACKUP}"
echo "  Backed up to: ${BACKUP}"

# Prepend an explicit redirect for /index.js → /
# Use location = (exact match) which has highest priority
cat > "${CONF_FILE}" <<'NGINX_CONF'
# rasmutafoundation.org — proxy to Next.js on 153.75.247.4:3000
# Uses ^~ prefix to override Webuzo's default try_files directive
# (which serves the "Default Website Page" for unmatched routes)

# DEFENSIVE REDIRECT: If anyone hits /index.js, send them back to /
# (protects against cached 301 redirects from before our fix)
location = /index.js {
    return 301 /;
}

# DEFENSIVE REDIRECT: Same for /index.html
location = /index.html {
    return 301 /;
}

# Main Next.js app — ^~ prefix takes priority over Webuzo's location /
location ^~ / {
    proxy_pass http://153.75.247.4:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_cache_bypass $http_upgrade;
    proxy_read_timeout 300s;
    proxy_connect_timeout 75s;

    # Prevent browsers from caching 301 redirects (which can persist for years)
    add_header Cache-Control "no-cache, no-store, must-revalidate" always;
    add_header X-Accel-Expires "0" always;
}

# Cache Next.js static assets (build artifacts, immutable)
location ^~ /_next/static/ {
    proxy_pass http://153.75.247.4:3000;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    expires 365d;
    add_header Cache-Control "public, immutable";
    access_log off;
}

# Cache images and fonts
location ~* ^/.*\.(jpg|jpeg|png|gif|ico|svg|webp|woff2?|ttf|eot)$ {
    proxy_pass http://153.75.247.4:3000;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    expires 30d;
    add_header Cache-Control "public";
    access_log off;
}
NGINX_CONF

echo "  ✓ Wrote ${CONF_FILE}"
echo ""

# Test & reload
echo "  Testing Nginx config..."
if nginx -t 2>&1; then
  echo "  ✓ Syntax OK"
  nginx -s reload && echo "  ✓ Nginx reloaded" || {
    echo "  nginx -s reload failed, trying systemctl restart..."
    systemctl restart nginx && echo "  ✓ Nginx restarted"
  }
else
  echo "  ✗ Syntax FAILED — rolling back"
  cp "${BACKUP}" "${CONF_FILE}"
  exit 1
fi
echo ""

sleep 2

# ------------------------------------------------------------
# Final verification
# ------------------------------------------------------------
echo "============================================================"
echo "  FINAL VERIFICATION"
echo "============================================================"
echo ""
echo "  / → status + first 100 chars of body:"
curl -sI --max-time 10 "https://${DOMAIN}/" | head -1 | sed 's/^/    /'
curl -s --max-time 10 "https://${DOMAIN}/" | head -c 100 | sed 's/^/    /'
echo ""
echo ""
echo "  /index.js → should now 301 redirect to /:"
curl -sI --max-time 10 "https://${DOMAIN}/index.js" | head -5 | sed 's/^/    /'
echo ""
echo "  /index.html → should now 301 redirect to /:"
curl -sI --max-time 10 "https://${DOMAIN}/index.html" | head -5 | sed 's/^/    /'
echo ""
echo "============================================================"
echo "  DONE — Browser cache is the remaining suspect"
echo "============================================================"
echo ""
echo "What to do in your browser:"
echo "  1. Open a brand new INCOGNITO / PRIVATE window"
echo "  2. Visit https://rasmutafoundation.org/"
echo "  3. Does it work in incognito? If yes → your normal browser has cached"
echo "     the old broken state. Clear site data:"
echo "       - Open DevTools (F12)"
echo "       - Application tab → Storage → Clear site data"
echo "       - OR Settings → Clear browsing data → Cached images and files"
echo "       - OR just visit: chrome://settings/clearBrowserData"
echo ""
echo "  4. If still broken in incognito → paste the console errors (F12 → Console)"
echo ""
