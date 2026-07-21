#!/bin/bash
# ============================================================
# FIX: clipe233eng.net showing "Default Website Page"
# ============================================================
# Problem: Webuzo reverted the Nginx config for clipe233eng.net to its
# default placeholder. The Next.js app may also be on the wrong port.
#
# This script:
#   1. Diagnoses PM2 process state and port
#   2. Restarts PM2 clipe233 with the correct ecosystem.config.js (port 3001)
#   3. Writes the correct custom Nginx config to proxy clipe233eng.net -> :3001
#   4. Reloads Nginx
#   5. Verifies everything works
#
# Run on the VPS as root:
#   bash /home/clipe233/app/scripts/fix-clipe233eng-nginx.sh
# ============================================================

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
CYAN='\033[0;36m'
NC='\033[0m'

APP_DIR="/home/clipe233/app"
NGINX_CUSTOM_DIR="/var/webuzo-data/nginx/custom/domains"
NGINX_CUSTOM_CONF="${NGINX_CUSTOM_DIR}/clipe233eng.net.conf"
DOMAIN="clipe233eng.net"

echo -e "${CYAN}============================================================${NC}"
echo -e "${CYAN}  FIX: clipe233eng.net -> reverse-proxy to Next.js app${NC}"
echo -e "${CYAN}============================================================${NC}"
echo ""

# ── Step 1: Diagnose PM2 state ────────────────────────────────────────────
echo -e "${CYAN}[1/6] PM2 process list:${NC}"
pm2 list
echo ""

echo -e "${CYAN}[2/6] What's listening on ports 3000-3005?${NC}"
ss -tlnp 2>/dev/null | grep -E ':300[0-5]' || echo "  (nothing on 3000-3005)"
echo ""

# ── Step 2: Restart PM2 with the correct ecosystem config ────────────────
echo -e "${CYAN}[3/6] Restarting PM2 clipe233 with ecosystem.config.js (port 3001)...${NC}"
cd "$APP_DIR"

# Stop and delete the existing process so we start fresh with the correct port
pm2 delete clipe233 2>/dev/null || true
pm2 start ecosystem.config.js
pm2 save

# Wait for it to come up
sleep 3

# Verify port 3001 is now listening
echo ""
echo -e "${CYAN}  Verify port 3001:${NC}"
if ss -tlnp 2>/dev/null | grep -q ':3001'; then
  echo -e "  ${GREEN}✓ Port 3001 is listening${NC}"
else
  echo -e "  ${RED}✗ Port 3001 is NOT listening — PM2 may have failed to start${NC}"
  echo -e "  ${YELLOW}  Check: pm2 logs clipe233 --lines 30${NC}"
  exit 1
fi

# Local curl test
echo ""
echo -e "${CYAN}  Local curl http://localhost:3001:${NC}"
LOCAL_STATUS=$(curl -s -o /dev/null -w "%{http_code}" --max-time 5 http://localhost:3001/ || echo "fail")
if [ "$LOCAL_STATUS" = "200" ]; then
  echo -e "  ${GREEN}✓ HTTP 200 from localhost:3001${NC}"
else
  echo -e "  ${RED}✗ HTTP $LOCAL_STATUS from localhost:3001${NC}"
  exit 1
fi
echo ""

# ── Step 3: Write the correct custom Nginx config ─────────────────────────
echo -e "${CYAN}[4/6] Writing Nginx custom config for ${DOMAIN}...${NC}"
mkdir -p "$NGINX_CUSTOM_DIR"

# Backup existing config if present
if [ -f "$NGINX_CUSTOM_CONF" ]; then
  BACKUP="${NGINX_CUSTOM_CONF}.bak.$(date +%Y%m%d-%H%M%S)"
  cp "$NGINX_CUSTOM_CONF" "$BACKUP"
  echo -e "  ${YELLOW}Backed up existing config to: $BACKUP${NC}"
fi

cat > "$NGINX_CUSTOM_CONF" <<'NGINX_CONF'
# ============================================================
# clipe233eng.net — reverse proxy to Next.js app on port 3001
# ============================================================
# This custom config overrides Webuzo's default server block for this
# domain. It is loaded from /var/webuzo-data/nginx/custom/domains/ and
# included in the main webuzoVH.conf.
# ============================================================

# HTTP -> HTTPS redirect
server {
    listen 80;
    listen [::]:80;
    server_name clipe233eng.net www.clipe233eng.net;

    # Let's Encrypt challenge passthrough
    location /.well-known/acme-challenge/ {
        root /usr/local/apps/nginx/var/www/clipe233eng.net;
    }

    location / {
        return 301 https://clipe233eng.net$request_uri;
    }
}

# HTTPS — reverse proxy to Next.js
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name clipe233eng.net www.clipe233eng.net;

    # SSL certs (managed by Webuzo Let's Encrypt)
    ssl_certificate     /var/webuzo-data/nginx/ssl/clipe233eng.net.crt;
    ssl_certificate_key /var/webuzo-data/nginx/ssl/clipe233eng.net.key;
    ssl_protocols       TLSv1.2 TLSv1.3;
    ssl_ciphers         HIGH:!aNULL:!MD5;
    ssl_session_cache   shared:SSL:10m;
    ssl_session_timeout 10m;

    # Redirect www -> non-www
    if ($host = 'www.clipe233eng.net') {
        return 301 https://clipe233eng.net$request_uri;
    }

    client_max_body_size 25M;

    # Next.js app
    location / {
        proxy_pass http://127.0.0.1:3001;
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
    location /_next/static/ {
        proxy_pass http://127.0.0.1:3001;
        expires 365d;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    # Cache images
    location ~* \.(jpg|jpeg|png|gif|ico|svg|webp|woff2?)$ {
        proxy_pass http://127.0.0.1:3001;
        expires 30d;
        add_header Cache-Control "public";
        access_log off;
    }
}
NGINX_CONF

echo -e "  ${GREEN}✓ Wrote: $NGINX_CUSTOM_CONF${NC}"
echo ""

# ── Step 4: Test Nginx config and reload ──────────────────────────────────
echo -e "${CYAN}[5/6] Testing Nginx config...${NC}"
if nginx -t 2>&1; then
  echo -e "  ${GREEN}✓ Nginx config syntax OK${NC}"
else
  echo -e "  ${RED}✗ Nginx config syntax error — aborting${NC}"
  exit 1
fi

echo -e "${CYAN}  Reloading Nginx...${NC}"
systemctl reload nginx || nginx -s reload
sleep 2
echo -e "  ${GREEN}✓ Nginx reloaded${NC}"
echo ""

# ── Step 5: Verify the site ───────────────────────────────────────────────
echo -e "${CYAN}[6/6] Verifying https://${DOMAIN}...${NC}"
HTTPS_STATUS=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 -L https://${DOMAIN}/ || echo "fail")
HTTPS_TITLE=$(curl -s --max-time 10 -L https://${DOMAIN}/ | grep -oE '<title>[^<]+</title>' | head -1 || echo "")

echo -e "  HTTP status: $HTTPS_STATUS"
echo -e "  Title:       $HTTPS_TITLE"
echo ""

if [ "$HTTPS_STATUS" = "200" ] && echo "$HTTPS_TITLE" | grep -qv "Default Website Page"; then
  echo -e "${GREEN}============================================================${NC}"
  echo -e "${GREEN}  ✓ FIXED! clipe233eng.net is now serving the Next.js app${NC}"
  echo -e "${GREEN}============================================================${NC}"
  echo ""
  echo -e "  Open: ${CYAN}https://clipe233eng.net${NC}"
  echo ""
  echo -e "  If you still see the old 'Default Website Page', hard-refresh"
  echo -e "  your browser (Ctrl+Shift+R / Cmd+Shift+R) to bypass cache."
else
  echo -e "${RED}============================================================${NC}"
  echo -e "${RED}  ✗ Site still showing Default Website Page${NC}"
  echo -e "${RED}============================================================${NC}"
  echo ""
  echo -e "  Possible causes:"
  echo -e "    1. Webuzo is not including custom domain configs"
  echo -e "       Check: grep -r 'clipe233eng' /usr/local/apps/nginx/etc/conf.d/"
  echo -e "    2. SSL cert path is different on this server"
  echo -e "       Check: ls /var/webuzo-data/nginx/ssl/ | grep clipe233"
  echo -e "    3. The main webuzoVH.conf has a conflicting server block"
  echo -e "       Check: grep -n 'clipe233eng' /usr/local/apps/nginx/etc/conf.d/webuzoVH.conf"
fi
