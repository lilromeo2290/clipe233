#!/bin/bash
# ============================================================
# FIX ALL SITES — v3 (override Webuzo's try_files conflict)
# ============================================================
# v2 got Nginx to reload successfully, but sites still 404 because:
#
#   HTTP/1.1 308 Permanent Redirect
#   location: /index.js
#
# That 308 redirect is Nginx's STATIC FILE module trying to serve
# /index.js from the document root — it's NOT the Next.js 404.
# Webuzo's parent server{} block has its own `location /` with
# `try_files $uri $uri/ /index.php` (or similar) that takes
# priority over our custom `location /` block, because:
#
#   1. Webuzo's location is defined FIRST in the parent server{}
#   2. Nginx picks the first matching location for prefix matches
#      of equal specificity
#
# v3 fix:
#   - Use `location = /` (EXACT match for /) — beats any prefix match
#   - Use `location ^~ /` (priority prefix match) — beats regex matches
#     and any other prefix matches of equal length
#   - Explicitly set `root /dev/null` won't work, but `internal;` on
#     static locations prevents direct serving
#   - Most reliable: use `try_files` ourselves with a non-existent
#     fallback that forces proxy_pass
#
# Actually the SIMPLEST fix: just put `proxy_pass` in a location that
# uses `^~` prefix. This beats Webuzo's plain `location /` every time.
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
echo -e "${CYAN}  FIX ALL SITES v3 — ^~ prefix to override Webuzo try_files${NC}"
echo -e "${CYAN}============================================================${NC}"
echo ""

# ── Step 1: Show the parent server block so we know what we're overriding ─
echo -e "${CYAN}[1/5] Inspecting Webuzo's parent server block for clipe233eng.net...${NC}"
PARENT_CONF="/usr/local/apps/nginx/etc/conf.d/webuzoVH.conf"
if [ -f "$PARENT_CONF" ]; then
  # Print the server block containing 'server_name clipe233eng.net'
  awk '/server[[:space:]]*\{/{buf=""; depth=0; capture=0}
       /server_name[[:space:]]+clipe233eng\.net/{capture=1}
       {if(capture){buf=buf"\n"$0}}
       /\{/{if(capture)depth++}
       /\}/{if(capture){depth--; if(depth==0){print buf; exit}}}' "$PARENT_CONF" 2>/dev/null | head -80
fi
echo ""

# ── Step 2: Write v3 Nginx configs (with ^~ prefix) ───────────────────────
echo -e "${CYAN}[2/5] Writing v3 Nginx configs (with ^~ priority prefix)...${NC}"
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

  # Write config with ^~ prefix on location / to override Webuzo's
  # static-file `location /` block in the parent server{}.
  #
  # ^~ tells Nginx: "if this prefix matches, STOP looking at regex
  # locations and use this one." Combined with the fact that more
  # specific prefix matches win, this reliably takes priority over
  # Webuzo's plain `location / { try_files ... }`.
  cat > "$CONF_PATH" <<NGINX_CONF
# ============================================================
# ${DOMAIN} — reverse proxy to Next.js app
# ============================================================
# IMPORTANT: This file is INCLUDED INSIDE Webuzo's server{} block
# in webuzoVH.conf. Therefore it must contain ONLY location blocks
# (no nested server{} blocks).
#
# Webuzo's parent server{} block has its own:
#   location / { try_files \$uri \$uri/ /index.php; }
# which serves static files from the document root. To override it,
# we use the ^~ prefix on our `location /` block — this tells Nginx
# to STOP looking at other locations and use ours.
#
# We also override /_next/static/ so Next.js build artifacts are
# served by the Next.js app (not from the document root).
# ============================================================

# Main Next.js app — ^~ prefix takes priority over Webuzo's location /
location ^~ / {
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

# Cache Next.js static assets (build artifacts, immutable)
# This is more specific than location ^~ / so it wins automatically
location /_next/static/ {
    proxy_pass http://${PROXY_TARGET};
    expires 365d;
    add_header Cache-Control "public, immutable";
    access_log off;
}

# Cache images and fonts (more specific than location ^~ /)
location ~* \\.(jpg|jpeg|png|gif|ico|svg|webp|woff2?)\$ {
    proxy_pass http://${PROXY_TARGET};
    expires 30d;
    add_header Cache-Control "public";
    access_log off;
}
NGINX_CONF

  echo -e "  ${GREEN}✓ Wrote: ${CONF_PATH}${NC}"
  echo -e "    proxy_pass -> http://${PROXY_TARGET}  (^~ priority)"
}

for SITE in "${!SITE_PORT[@]}"; do
  write_location_conf "$SITE" "${SITE_PROXY_TARGET[$SITE]}"
done
echo ""

# ── Step 3: Test Nginx config ─────────────────────────────────────────────
echo -e "${CYAN}[3/5] Testing Nginx config...${NC}"
if nginx -t 2>&1; then
  echo -e "  ${GREEN}✓ Nginx config syntax OK${NC}"
else
  echo -e "  ${RED}✗ Nginx config syntax error${NC}"
  exit 1
fi
echo ""

# ── Step 4: Reload Nginx (use nginx -s reload directly, not systemctl) ────
echo -e "${CYAN}[4/5] Reloading Nginx...${NC}"
# systemctl reload doesn't work for nginx on this Webuzo setup
# (it's not managed as a systemd unit with reload capability)
# Use nginx -s reload directly
if nginx -s reload 2>&1; then
  echo -e "  ${GREEN}✓ Nginx reloaded via nginx -s reload${NC}"
else
  echo -e "  ${YELLOW}! nginx -s reload failed, trying restart...${NC}"
  systemctl restart nginx 2>&1 || nginx -s reload 2>&1
fi
sleep 3
echo ""

# ── Step 5: Verify all 3 sites ────────────────────────────────────────────
echo -e "${CYAN}[5/5] Verifying all 3 sites...${NC}"
ALL_OK=1
for SITE in "${!SITE_PORT[@]}"; do
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" --max-time 15 -L https://${SITE}/ || echo "fail")
  TITLE=$(curl -s --max-time 15 -L https://${SITE}/ 2>/dev/null | grep -oE '<title>[^<]+</title>' | head -1 | sed 's/<[^>]*>//g' || echo "")

  # Color-code the result
  if [ "$STATUS" = "200" ]; then
    echo -e "  ${GREEN}✓ ${SITE}: HTTP ${STATUS} | ${TITLE}${NC}"
  elif [ "$STATUS" = "404" ]; then
    echo -e "  ${YELLOW}? ${SITE}: HTTP 404 (Next.js routing — check if app was rebuilt)${NC}"
    echo -e "    ${YELLOW}Title: ${TITLE}${NC}"
  else
    echo -e "  ${RED}✗ ${SITE}: HTTP ${STATUS} | ${TITLE}${NC}"
    ALL_OK=0
  fi
done

echo ""
echo -e "${CYAN}============================================================${NC}"
echo -e "${CYAN}  Next steps based on results above${NC}"
echo -e "${CYAN}============================================================${NC}"
echo ""
echo -e "If sites show HTTP 200 → DONE. Hard-refresh browser."
echo ""
echo -e "If sites still show HTTP 404 (Next.js's 404 page, not Webuzo Default):"
echo -e "  The Nginx proxy is working, but Next.js itself is returning 404."
echo -e "  Likely cause: the app needs to be rebuilt on the VPS."
echo -e ""
echo -e "  ${CYAN}Fix:${NC}"
echo -e "    cd /home/clipe233/app"
echo -e "    npm install"
echo -e "    npm run build"
echo -e "    pm2 restart clipe233"
echo ""
echo -e "  Repeat for global-experience:"
echo -e "    cd /home/clipe233/global-experience"
echo -e "    npm install && npm run build && pm2 restart global-experience"
echo ""
echo -e "  And for rasmuta:"
echo -e "    cd /home/clipe233/rasmuta"
echo -e "    su - clipe233 -c 'cd /home/clipe233/rasmuta && npm install && npm run build'"
echo -e "    su - clipe233 -c 'pm2 restart rasmuta'"
