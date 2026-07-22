#!/usr/bin/env bash
# ============================================================
# Diagnose & fix Nginx config for rasmutafoundation.org
# We know: Next.js serves 200 on http://153.75.247.4:3000/
# So the 404 is coming from Nginx, not Next.js
# ============================================================
set -e

DOMAIN="rasmutafoundation.org"
PUBLIC_IP="153.75.247.4"
PORT="3000"
CONF_FILE="/var/webuzo-data/nginx/custom/domains/${DOMAIN}.conf"

echo "============================================================"
echo "  DIAGNOSE rasmutafoundation.org NGINX"
echo "============================================================"
echo ""

# ------------------------------------------------------------
# Step 1: Verify Next.js is serving 200 directly (sanity check)
# ------------------------------------------------------------
echo "[1/6] Sanity check: Next.js direct curl..."
STATUS=$(curl -sI --max-time 10 "http://${PUBLIC_IP}:${PORT}/" | head -1)
echo "  -> ${STATUS}"
echo ""

# ------------------------------------------------------------
# Step 2: Check the current Nginx config for this domain
# ------------------------------------------------------------
echo "[2/6] Current Nginx config at ${CONF_FILE}:"
if [ -f "${CONF_FILE}" ]; then
  echo "  File exists. Contents:"
  echo "  ----------------------------------------"
  cat "${CONF_FILE}" | sed 's/^/    /'
  echo "  ----------------------------------------"
else
  echo "  ✗ FILE DOES NOT EXIST — this is the problem!"
  echo "    Nginx has no custom config for ${DOMAIN}, so it falls back to Webuzo's default try_files."
fi
echo ""

# ------------------------------------------------------------
# Step 3: Check Webuzo's parent server block
# ------------------------------------------------------------
echo "[3/6] Webuzo parent server block for ${DOMAIN}..."
WEBUZO_CONF="/usr/local/apps/nginx/etc/conf.d/webuzoVH.conf"
if [ -f "${WEBUZO_CONF}" ]; then
  # Extract the server block that listens for this domain
  echo "  Searching webuzoVH.conf for server_name ${DOMAIN}..."
  MATCHES=$(grep -c "${DOMAIN}" "${WEBUZO_CONF}" || true)
  echo "  Found ${MATCHES} references to ${DOMAIN}"
  echo ""
  echo "  Server block (first 60 lines after match):"
  echo "  ----------------------------------------"
  awk -v domain="${DOMAIN}" '
    $0 ~ "server_name.*"domain {
      in_block=1
      brace_count=0
    }
    in_block {
      print
      brace_count += gsub(/\{/, "{", $0) - gsub(/\}/, "}", $0)
      if (brace_count < 0) in_block=0
      if (count++ > 60) { print "  ... (truncated)"; exit }
    }
  ' "${WEBUZO_CONF}" | sed 's/^/    /'
  echo "  ----------------------------------------"
fi
echo ""

# ------------------------------------------------------------
# Step 4: Test through public HTTPS (reproduces the 404)
# ------------------------------------------------------------
echo "[4/6] Public HTTPS curl through Nginx..."
echo "  -> curl -sI https://${DOMAIN}/ | head -10"
curl -sI --max-time 10 "https://${DOMAIN}/" | head -10 || true
echo ""
echo "  Body (first 20 lines):"
curl -s --max-time 10 "https://${DOMAIN}/" | head -20
echo ""

# ------------------------------------------------------------
# Step 5: Write/rewrite the correct Nginx config
# ------------------------------------------------------------
echo "[5/6] Writing corrected Nginx config to ${CONF_FILE}..."

# Backup existing
if [ -f "${CONF_FILE}" ]; then
  BACKUP="${CONF_FILE}.bak.$(date +%Y%m%d-%H%M%S)"
  cp "${CONF_FILE}" "${BACKUP}"
  echo "  Backed up to: ${BACKUP}"
fi

# Use ^~ priority prefix to override Webuzo's try_files
# Proxy to public IP because rasmuta binds to 153.75.247.4:3000 (not 0.0.0.0 or 127.0.0.1)
cat > "${CONF_FILE}" <<'NGINX_CONF'
# rasmutafoundation.org — proxy to Next.js on 153.75.247.4:3000
# Uses ^~ prefix to override Webuzo's default try_files directive
# (which serves the "Default Website Page" for unmatched routes)

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
}

# Cache Next.js static assets aggressively
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

# Cache image/font assets
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

# ------------------------------------------------------------
# Step 6: Test & reload Nginx
# ------------------------------------------------------------
echo "[6/6] Testing & reloading Nginx..."
if nginx -t 2>&1; then
  echo "  ✓ Syntax OK"
  nginx -s reload && echo "  ✓ Nginx reloaded" || {
    echo "  nginx -s reload failed, trying systemctl restart..."
    systemctl restart nginx && echo "  ✓ Nginx restarted"
  }
else
  echo "  ✗ Syntax FAILED — rolling back"
  [ -f "${BACKUP}" ] && cp "${BACKUP}" "${CONF_FILE}"
  exit 1
fi
echo ""

# Wait for Nginx to pick up
sleep 2

# ------------------------------------------------------------
# Final verification
# ------------------------------------------------------------
echo "============================================================"
echo "  FINAL VERIFICATION"
echo "============================================================"
echo ""
echo "  Public HTTPS curl:"
curl -sI --max-time 10 "https://${DOMAIN}/" | head -5
echo ""
echo "  Page title:"
curl -s --max-time 10 "https://${DOMAIN}/" | grep -oP '<title>[^<]+</title>' | head -1
echo ""
echo "============================================================"
echo "  DONE"
echo "============================================================"
