#!/bin/bash
# ============================================================
# FIX ALL SITES: clipe233eng.net + globalexperiencegh.org + rasmutafoundation.org
# ============================================================
# Problem: All 3 sites show "Softaculous Webuzo | Default Website Page"
# Root causes:
#   1. Webuzo regenerated Nginx configs and reverted all custom reverse-proxy
#      configs to default placeholders
#   2. PM2 processes for clipe233 (port 3001) and global-experience (port 3004)
#      are also down (only rasmuta on port 3000 is still running)
#
# This script:
#   1. Restarts PM2 for clipe233 (root PM2, port 3001)
#   2. Restarts PM2 for global-experience (root PM2, port 3004)
#   3. Verifies rasmuta PM2 (clipe233-user PM2, port 3000) is running
#   4. Writes the correct custom Nginx config for all 3 domains
#   5. Tests and reloads Nginx
#   6. Verifies all 3 sites serve the Next.js app (not Default Website Page)
#
# Run on the VPS as root:
#   cd /home/clipe233/app
#   git pull origin main
#   bash scripts/fix-all-sites-nginx.sh
# ============================================================

set -u  # don't use -e — we want to continue and report all errors at the end

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
CYAN='\033[0;36m'
NC='\033[0m'

NGINX_CUSTOM_DIR="/var/webuzo-data/nginx/custom/domains"
SSL_DIR="/var/webuzo-data/nginx/ssl"

# Track per-site results
declare -A SITES=(
  ["clipe233eng.net"]="3001:/home/clipe233/app/ecosystem.config.js:clipe233:root"
  ["globalexperiencegh.org"]="3004:/home/clipe233/global-experience/ecosystem.config.js:global-experience:root"
  ["rasmutafoundation.org"]="3000:/home/clipe233/rasmuta/ecosystem.config.js:rasmuta:clipe233-user"
)

echo -e "${CYAN}============================================================${NC}"
echo -e "${CYAN}  FIX ALL SITES — Nginx reverse-proxy + PM2 restart${NC}"
echo -e "${CYAN}============================================================${NC}"
echo ""

# ── Step 1: PM2 diagnosis ─────────────────────────────────────────────────
echo -e "${CYAN}[1/6] Root PM2 process list:${NC}"
pm2 list 2>&1 || echo -e "  ${RED}pm2 command not found in root PATH${NC}"
echo ""

echo -e "${CYAN}      clipe233-user PM2 process list (if exists):${NC}"
if id "clipe233" &>/dev/null; then
  su - clipe233 -c "pm2 list" 2>&1 | head -20 || echo -e "  ${YELLOW}(could not list clipe233-user PM2)${NC}"
else
  echo -e "  ${YELLOW}(user 'clipe233' not found — rasmuta may run under a different user)${NC}"
  echo -e "  ${YELLOW}Checking who runs port 3000...${NC}"
  ss -tlnp 2>/dev/null | grep ':3000' || echo "  (port 3000 not listening)"
fi
echo ""

echo -e "${CYAN}      Ports 3000-3005 listeners:${NC}"
ss -tlnp 2>/dev/null | grep -E ':300[0-5]' || echo "  (nothing on 3000-3005)"
echo ""

# ── Step 2: Restart PM2 processes for clipe233 and global-experience ─────
restart_pm2() {
  local APP_NAME="$1"
  local ECOSYSTEM_PATH="$2"
  local PM2_USER="$3"

  echo -e "${CYAN}  Restarting ${APP_NAME} (PM2 user: ${PM2_USER})...${NC}"

  if [ "$PM2_USER" = "root" ]; then
    if [ ! -f "$ECOSYSTEM_PATH" ]; then
      echo -e "    ${RED}✗ ecosystem.config.js not found at: $ECOSYSTEM_PATH${NC}"
      return 1
    fi
    cd "$(dirname "$ECOSYSTEM_PATH")"
    pm2 delete "$APP_NAME" 2>/dev/null || true
    pm2 start "$ECOSYSTEM_PATH" 2>&1 | tail -5
    pm2 save 2>&1 | tail -1
  else
    # Run as another user
    if ! id -u "$PM2_USER" &>/dev/null; then
      echo -e "    ${RED}✗ User '$PM2_USER' does not exist${NC}"
      return 1
    fi
    su - "$PM2_USER" -c "cd $(dirname "$ECOSYSTEM_PATH") && pm2 delete $APP_NAME 2>/dev/null; pm2 start $ECOSYSTEM_PATH" 2>&1 | tail -5
    su - "$PM2_USER" -c "pm2 save" 2>&1 | tail -1
  fi
  return 0
}

echo -e "${CYAN}[2/6] Restarting PM2 processes...${NC}"
restart_pm2 "clipe233" "/home/clipe233/app/ecosystem.config.js" "root"
echo ""
restart_pm2 "global-experience" "/home/clipe233/global-experience/ecosystem.config.js" "root"
echo ""
# Note: rasmuta is already running on port 3000 — only restart if not
echo -e "${CYAN}  Rasmuta — only restart if port 3000 is not listening...${NC}"
if ss -tlnp 2>/dev/null | grep -q ':3000'; then
  echo -e "    ${GREEN}✓ Port 3000 already listening — skipping rasmuta restart${NC}"
else
  echo -e "    ${YELLOW}Port 3000 not listening — restarting rasmuta...${NC}"
  restart_pm2 "rasmuta" "/home/clipe233/rasmuta/ecosystem.config.js" "clipe233"
fi
echo ""

# Wait for processes to come up
echo -e "${CYAN}  Waiting 5s for processes to start...${NC}"
sleep 5
echo ""

# ── Step 3: Verify each app responds locally ──────────────────────────────
echo -e "${CYAN}[3/6] Local app verification:${NC}"
declare -A PORT_STATUS
for SITE in "${!SITES[@]}"; do
  IFS=':' read -r PORT ECOSYSTEM APP_NAME PM2_USER <<< "${SITES[$SITE]}"
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" --max-time 8 http://localhost:${PORT}/ || echo "fail")
  PORT_STATUS[$SITE]="$STATUS"
  if [ "$STATUS" = "200" ]; then
    echo -e "  ${GREEN}✓ ${SITE} (port ${PORT}): HTTP 200${NC}"
  else
    echo -e "  ${RED}✗ ${SITE} (port ${PORT}): HTTP ${STATUS}${NC}"
  fi
done
echo ""

# ── Step 4: Write custom Nginx configs for all 3 domains ──────────────────
echo -e "${CYAN}[4/6] Writing Nginx custom configs...${NC}"
mkdir -p "$NGINX_CUSTOM_DIR"

write_nginx_conf() {
  local DOMAIN="$1"
  local PORT="$2"
  local CONF_PATH="${NGINX_CUSTOM_DIR}/${DOMAIN}.conf"

  # Backup existing
  if [ -f "$CONF_PATH" ]; then
    BACKUP="${CONF_PATH}.bak.$(date +%Y%m%d-%H%M%S)"
    cp "$CONF_PATH" "$BACKUP"
    echo -e "  ${YELLOW}Backed up: ${BACKUP}${NC}"
  fi

  # Try to find SSL certs (Webuzo sometimes uses different paths)
  SSL_CERT=""
  SSL_KEY=""
  for cand in "${SSL_DIR}/${DOMAIN}.crt" "/etc/letsencrypt/live/${DOMAIN}/fullchain.pem" "/var/webuzo-data/nginx/ssl/${DOMAIN}/fullchain.pem"; do
    if [ -f "$cand" ]; then
      SSL_CERT="$cand"
      break
    fi
  done
  for cand in "${SSL_DIR}/${DOMAIN}.key" "/etc/letsencrypt/live/${DOMAIN}/privkey.pem" "/var/webuzo-data/nginx/ssl/${DOMAIN}/privkey.pem"; do
    if [ -f "$cand" ]; then
      SSL_KEY="$cand"
      break
    fi
  done

  if [ -z "$SSL_CERT" ] || [ -z "$SSL_KEY" ]; then
    echo -e "  ${RED}✗ No SSL cert found for ${DOMAIN}${NC}"
    echo -e "    Searched:"
    echo -e "      ${SSL_DIR}/${DOMAIN}.crt"
    echo -e "      /etc/letsencrypt/live/${DOMAIN}/fullchain.pem"
    echo -e "    Skipping — fix SSL first"
    return 1
  fi

  cat > "$CONF_PATH" <<NGINX_CONF
# ============================================================
# ${DOMAIN} — reverse proxy to Next.js app on port ${PORT}
# ============================================================
# Custom config — overrides Webuzo's default server block.
# Loaded from /var/webuzo-data/nginx/custom/domains/
# ============================================================

# HTTP -> HTTPS redirect
server {
    listen 80;
    listen [::]:80;
    server_name ${DOMAIN} www.${DOMAIN};

    # Let's Encrypt challenge passthrough
    location /.well-known/acme-challenge/ {
        root /usr/local/apps/nginx/var/www/${DOMAIN};
    }

    location / {
        return 301 https://${DOMAIN}\$request_uri;
    }
}

# HTTPS — reverse proxy
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name ${DOMAIN} www.${DOMAIN};

    ssl_certificate     ${SSL_CERT};
    ssl_certificate_key ${SSL_KEY};
    ssl_protocols       TLSv1.2 TLSv1.3;
    ssl_ciphers         HIGH:!aNULL:!MD5;
    ssl_session_cache   shared:SSL:10m;
    ssl_session_timeout 10m;

    # Redirect www -> non-www
    if (\$host = 'www.${DOMAIN}') {
        return 301 https://${DOMAIN}\$request_uri;
    }

    client_max_body_size 25M;

    # Next.js app
    location / {
        proxy_pass http://127.0.0.1:${PORT};
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
        proxy_read_timeout 300s;
        proxy_connect_timeout 75s;
    }

    # Cache Next.js static assets aggressively
    location /_next/static/ {
        proxy_pass http://127.0.0.1:${PORT};
        expires 365d;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    # Cache images
    location ~* \\.(jpg|jpeg|png|gif|ico|svg|webp|woff2?)\$ {
        proxy_pass http://127.0.0.1:${PORT};
        expires 30d;
        add_header Cache-Control "public";
        access_log off;
    }
}
NGINX_CONF

  echo -e "  ${GREEN}✓ Wrote: ${CONF_PATH} (port ${PORT})${NC}"
}

for SITE in "${!SITES[@]}"; do
  IFS=':' read -r PORT ECOSYSTEM APP_NAME PM2_USER <<< "${SITES[$SITE]}"
  write_nginx_conf "$SITE" "$PORT"
done
echo ""

# ── Step 5: Test and reload Nginx ─────────────────────────────────────────
echo -e "${CYAN}[5/6] Testing Nginx config...${NC}"
if nginx -t 2>&1; then
  echo -e "  ${GREEN}✓ Nginx config syntax OK${NC}"
else
  echo -e "  ${RED}✗ Nginx config syntax error${NC}"
  echo -e "  ${YELLOW}Inspecting main webuzoVH.conf for the include line...${NC}"
  grep -n "custom/domains" /usr/local/apps/nginx/etc/conf.d/webuzoVH.conf 2>/dev/null | head -5
  exit 1
fi

echo -e "${CYAN}  Reloading Nginx...${NC}"
systemctl reload nginx 2>&1 || nginx -s reload 2>&1
sleep 3
echo -e "  ${GREEN}✓ Nginx reloaded${NC}"
echo ""

# ── Step 6: Verify all 3 sites ────────────────────────────────────────────
echo -e "${CYAN}[6/6] Verifying all 3 sites...${NC}"
declare -A FINAL_STATUS
declare -A FINAL_TITLE
ALL_OK=1

for SITE in "${!SITES[@]}"; do
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" --max-time 15 -L https://${SITE}/ || echo "fail")
  TITLE=$(curl -s --max-time 15 -L https://${SITE}/ 2>/dev/null | grep -oE '<title>[^<]+</title>' | head -1 || echo "")
  FINAL_STATUS[$SITE]="$STATUS"
  FINAL_TITLE[$SITE]="$TITLE"

  if [ "$STATUS" = "200" ] && ! echo "$TITLE" | grep -q "Default Website Page"; then
    echo -e "  ${GREEN}✓ ${SITE}: ${STATUS} | ${TITLE}${NC}"
  else
    echo -e "  ${RED}✗ ${SITE}: ${STATUS} | ${TITLE}${NC}"
    ALL_OK=0
  fi
done

echo ""
echo -e "${CYAN}============================================================${NC}"
if [ "$ALL_OK" = "1" ]; then
  echo -e "${GREEN}  ✓ ALL 3 SITES FIXED!${NC}"
  echo -e "${CYAN}============================================================${NC}"
  echo ""
  for SITE in "${!SITES[@]}"; do
    echo -e "  ${GREEN}https://${SITE}${NC}  →  ${FINAL_TITLE[$SITE]}"
  done
  echo ""
  echo -e "  ${YELLOW}If your browser still shows 'Default Website Page',${NC}"
  echo -e "  ${YELLOW}hard-refresh: Ctrl+Shift+R (Win/Linux) or Cmd+Shift+R (Mac)${NC}"
else
  echo -e "${RED}  ✗ Some sites still failing${NC}"
  echo -e "${CYAN}============================================================${NC}"
  echo ""
  echo -e "  ${YELLOW}Diagnostic commands:${NC}"
  echo -e "    # Check what Nginx is actually including:"
  echo -e "    grep -r 'clipe233eng\\|globalexperience\\|rasmuta' /usr/local/apps/nginx/etc/conf.d/"
  echo ""
  echo -e "    # Check the main webuzoVH.conf:"
  echo -e "    grep -n 'custom/domains' /usr/local/apps/nginx/etc/conf.d/webuzoVH.conf"
  echo ""
  echo -e "    # Check PM2 process logs:"
  echo -e "    pm2 logs clipe233 --lines 20"
  echo -e "    pm2 logs global-experience --lines 20"
  echo ""
  echo -e "    # Check which Nginx server block wins for clipe233eng.net:"
  echo -e "    nginx -T 2>/dev/null | grep -A 3 'server_name clipe233eng'"
fi
