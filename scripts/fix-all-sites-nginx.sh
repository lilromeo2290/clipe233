#!/bin/bash
# ============================================================
# FIX ALL SITES — v2 (corrected)
# clipe233eng.net + globalexperiencegh.org + rasmutafoundation.org
# ============================================================
# v1 failed because:
#   1. It wrote full `server {}` blocks, but Webuzo includes the custom
#      config INSIDE an existing server{} block in webuzoVH.conf, so
#      nested server{} blocks cause:
#        nginx: [emerg] "server" directive is not allowed here
#   2. It searched for SSL certs that Webuzo doesn't store at the paths
#      we checked. But we don't actually need SSL in the custom config —
#      Webuzo handles SSL at the parent server{} block level.
#   3. rasmuta is bound to 153.75.247.4:3000 (public IP only, not 0.0.0.0),
#      so `curl http://localhost:3000` fails. The proxy_pass must use
#      the VPS public IP, not 127.0.0.1.
#
# v2 fix:
#   - Writes LOCATION-ONLY configs (no server{} blocks)
#   - Does NOT touch SSL (Webuzo handles it)
#   - Uses 127.0.0.1 for clipe233 (3001) and global-experience (3004)
#     which are bound to 0.0.0.0
#   - Uses 153.75.247.4 for rasmuta (3000) which is bound to public IP
#
# PM2 is already running (verified in v1 run output), so we skip PM2
# restart and just fix the Nginx configs.
#
# Run on the VPS as root:
#   cd /home/clipe233/app
#   git pull origin main
#   bash scripts/fix-all-sites-nginx.sh
# ============================================================

set -u

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
CYAN='\033[0;36m'
NC='\033[0m'

NGINX_CUSTOM_DIR="/var/webuzo-data/nginx/custom/domains"
VPS_IP="153.75.247.4"

# Site -> port -> proxy_target
# clipe233 + global-experience are on 0.0.0.0 (use 127.0.0.1)
# rasmuta is bound to public IP only (use VPS_IP)
declare -A SITE_PORT=(
  ["clipe233eng.net"]="3001"
  ["globalexperiencegh.org"]="3004"
  ["rasmutafoundation.org"]="3000"
)
declare -A SITE_PROXY_TARGET=(
  ["clipe233eng.net"]="127.0.0.1:3001"
  ["globalexperiencegh.org"]="127.0.0.1:3004"
  ["rasmutafoundation.org"]="${VPS_IP}:3000"
)

echo -e "${CYAN}============================================================${NC}"
echo -e "${CYAN}  FIX ALL SITES v2 — location-only Nginx configs${NC}"
echo -e "${CYAN}============================================================${NC}"
echo ""

# ── Step 1: Verify PM2 processes are running ──────────────────────────────
echo -e "${CYAN}[1/4] Verifying PM2 processes are up...${NC}"
PORTS_TO_CHECK=("3001:clipe233" "3004:global-experience" "3000:rasmuta")
for entry in "${PORTS_TO_CHECK[@]}"; do
  PORT="${entry%%:*}"
  NAME="${entry##*:}"
  if ss -tlnp 2>/dev/null | grep -q ":${PORT}"; then
    echo -e "  ${GREEN}✓ Port ${PORT} (${NAME}): listening${NC}"
  else
    echo -e "  ${RED}✗ Port ${PORT} (${NAME}): NOT listening${NC}"
    echo -e "    ${YELLOW}Run v1 script first to restart PM2, or manually:${NC}"
    echo -e "    pm2 restart clipe233"
    echo -e "    pm2 restart global-experience"
    echo -e "    su - clipe233 -c 'pm2 restart rasmuta'"
  fi
done
echo ""

# ── Step 2: Write location-only Nginx configs ─────────────────────────────
echo -e "${CYAN}[2/4] Writing location-only Nginx configs...${NC}"
mkdir -p "$NGINX_CUSTOM_DIR"

write_location_conf() {
  local DOMAIN="$1"
  local PROXY_TARGET="$2"
  local CONF_PATH="${NGINX_CUSTOM_DIR}/${DOMAIN}.conf"

  # Backup existing
  if [ -f "$CONF_PATH" ]; then
    BACKUP="${CONF_PATH}.bak.$(date +%Y%m%d-%H%M%S)"
    cp "$CONF_PATH" "$BACKUP"
    echo -e "  ${YELLOW}Backed up: ${BACKUP}${NC}"
  fi

  # Write location-only config (NO server{} blocks)
  cat > "$CONF_PATH" <<NGINX_CONF
# ============================================================
# ${DOMAIN} — reverse proxy to Next.js app
# ============================================================
# This file is INCLUDED INSIDE Webuzo's server{} block in
# webuzoVH.conf. Therefore it must contain ONLY location blocks
# and other directives valid in server{} context — NO nested
# server{} blocks (those cause "server directive not allowed here").
#
# Webuzo handles SSL, listen, and server_name at the parent level.
# We only override the routing rules to reverse-proxy to Next.js.
# ============================================================

# Main Next.js app — reverse proxy
location / {
    proxy_pass http://${PROXY_TARGET};
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

# Cache Next.js static assets aggressively (immutable build artifacts)
location /_next/static/ {
    proxy_pass http://${PROXY_TARGET};
    expires 365d;
    add_header Cache-Control "public, immutable";
    access_log off;
}

# Cache image and font assets
location ~* \\.(jpg|jpeg|png|gif|ico|svg|webp|woff2?)\$ {
    proxy_pass http://${PROXY_TARGET};
    expires 30d;
    add_header Cache-Control "public";
    access_log off;
}
NGINX_CONF

  echo -e "  ${GREEN}✓ Wrote: ${CONF_PATH}${NC}"
  echo -e "    proxy_pass -> http://${PROXY_TARGET}"
}

for SITE in "${!SITE_PORT[@]}"; do
  write_location_conf "$SITE" "${SITE_PROXY_TARGET[$SITE]}"
done
echo ""

# ── Step 3: Test and reload Nginx ─────────────────────────────────────────
echo -e "${CYAN}[3/4] Testing Nginx config...${NC}"
if nginx -t 2>&1; then
  echo -e "  ${GREEN}✓ Nginx config syntax OK${NC}"
else
  echo -e "  ${RED}✗ Nginx config syntax error${NC}"
  echo ""
  echo -e "  ${YELLOW}Likely causes:${NC}"
  echo -e "    - Another custom .conf file in ${NGINX_CUSTOM_DIR}/ has a syntax error"
  echo -e "    - The include in webuzoVH.conf is at top level (not inside server{})"
  echo ""
  echo -e "  ${YELLOW}To find which file has the error:${NC}"
  echo -e "    nginx -T 2>&1 | grep -B2 'emerg'"
  echo ""
  echo -e "  ${YELLOW}To inspect the include context:${NC}"
  echo -e "    awk '/server_name ${DOMAIN}/,/^}/' /usr/local/apps/nginx/etc/conf.d/webuzoVH.conf | head -30"
  exit 1
fi

echo -e "${CYAN}  Reloading Nginx...${NC}"
systemctl reload nginx 2>&1 || nginx -s reload 2>&1
sleep 3
echo -e "  ${GREEN}✓ Nginx reloaded${NC}"
echo ""

# ── Step 4: Verify all 3 sites ────────────────────────────────────────────
echo -e "${CYAN}[4/4] Verifying all 3 sites...${NC}"
ALL_OK=1
for SITE in "${!SITE_PORT[@]}"; do
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" --max-time 15 -L https://${SITE}/ || echo "fail")
  TITLE=$(curl -s --max-time 15 -L https://${SITE}/ 2>/dev/null | grep -oE '<title>[^<]+</title>' | head -1 | sed 's/<[^>]*>//g' || echo "")

  if [ "$STATUS" = "200" ] && [ "$TITLE" != "Softaculous Webuzo | Default Website Page" ]; then
    echo -e "  ${GREEN}✓ ${SITE}: HTTP ${STATUS} | ${TITLE}${NC}"
  else
    echo -e "  ${RED}✗ ${SITE}: HTTP ${STATUS} | ${TITLE}${NC}"
    ALL_OK=0
  fi
done

echo ""
echo -e "${CYAN}============================================================${NC}"
if [ "$ALL_OK" = "1" ]; then
  echo -e "${GREEN}  ✓ ALL 3 SITES FIXED!${NC}"
else
  echo -e "${YELLOW}  Some sites still failing — see diagnostics below${NC}"
fi
echo -e "${CYAN}============================================================${NC}"
echo ""
echo -e "  ${YELLOW}If your browser still shows 'Default Website Page',${NC}"
echo -e "  ${YELLOW}hard-refresh: Ctrl+Shift+R (Win/Linux) or Cmd+Shift+R (Mac)${NC}"
echo ""
echo -e "  ${CYAN}Diagnostic commands (if any site still fails):${NC}"
echo -e "    # See which server block is actually handling the request:"
echo -e "    nginx -T 2>/dev/null | grep -B1 -A8 'server_name ${SITE}'"
echo ""
echo -e "    # Check what's in the on-disk config:"
echo -e "    cat ${NGINX_CUSTOM_DIR}/<domain>.conf"
echo ""
echo -e "    # Test local app directly (bypass Nginx):"
echo -e "    curl -sI http://127.0.0.1:3001/   # clipe233"
echo -e "    curl -sI http://127.0.0.1:3004/   # global-experience"
echo -e "    curl -sI http://${VPS_IP}:3000/   # rasmuta (note: public IP)"
