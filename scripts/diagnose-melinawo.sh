#!/bin/bash
# ============================================================
# DIAGNOSE & FIX melinawofoundation.org
# ============================================================
# Run on the VPS as root:
#   bash /home/clipe233/app/scripts/diagnose-melinawo.sh
#
# What this does:
#   1. Inspects current Nginx config for melinawofoundation.org
#   2. Searches for any app directory matching "melina"
#   3. Lists PM2 processes (root + clipe233 user) that might be the app
#   4. Probes common Next.js ports to see what's listening
#   5. Reports findings — does NOT make any changes
# ============================================================

set -u
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m'

DOMAIN="melinawofoundation.org"
NGINX_CUSTOM_DIR="/var/webuzo-data/nginx/custom/domains"
WEBUZO_CONF="/usr/local/apps/nginx/etc/conf.d/webuzoVH.conf"

echo -e "${CYAN}============================================================${NC}"
echo -e "${CYAN}  DIAGNOSE: ${DOMAIN}${NC}"
echo -e "${CYAN}============================================================${NC}"
echo ""

# ── 1. Live HTTP status ──────────────────────────────────────────────────
echo -e "${BOLD}[1/6] Live HTTP probe...${NC}"
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 -k "https://${DOMAIN}/")
BODY_BYTES=$(curl -s --max-time 10 -k "https://${DOMAIN}/" | wc -c)
echo -e "  HTTPS ${DOMAIN}/ → HTTP ${HTTP_CODE} (${BODY_BYTES} bytes body)"
echo ""
if [ "${HTTP_CODE}" = "500" ] && [ "${BODY_BYTES}" -lt 100 ]; then
  echo -e "  ${YELLOW}→ HTTP 500 with empty body = Nginx config is broken or proxy target is unreachable${NC}"
fi
echo ""

# ── 2. Nginx config for melinawofoundation.org ───────────────────────────
echo -e "${BOLD}[2/6] Nginx configs for ${DOMAIN}...${NC}"

echo -e "  ${BOLD}Custom domain config:${NC}"
CUSTOM_CONF="${NGINX_CUSTOM_DIR}/${DOMAIN}.conf"
if [ -f "${CUSTOM_CONF}" ]; then
  echo -e "  ${GREEN}✓ exists: ${CUSTOM_CONF}${NC}"
  echo -e "  ${CYAN}----- contents -----${NC}"
  cat "${CUSTOM_CONF}" | sed 's/^/  /'
  echo -e "  ${CYAN}--------------------${NC}"
else
  echo -e "  ${YELLOW}✗ no custom config at ${CUSTOM_CONF}${NC}"
fi
echo ""

echo -e "  ${BOLD}Parent server block in webuzoVH.conf:${NC}"
if [ -f "${WEBUZO_CONF}" ]; then
  grep -n "melinawofoundation" "${WEBUZO_CONF}" 2>/dev/null | head -10 | sed 's/^/  /' \
    || echo -e "  ${YELLOW}(no melinawofoundation entry in webuzoVH.conf)${NC}"

  echo ""
  echo -e "  ${BOLD}Full server block (if any):${NC}"
  awk '/server[[:space:]]*\{/{buf=""; depth=0; capture=0}
       /server_name[[:space:]]+.*melinawofoundation/{capture=1}
       {if(capture){buf=buf"\n"$0}}
       /\{/{if(capture)depth++}
       /\}/{if(capture){depth--; if(depth==0){print buf; exit}}}' "${WEBUZO_CONF}" 2>/dev/null | head -60 | sed 's/^/  /' \
    || echo -e "  ${YELLOW}(no server block found)${NC}"
fi
echo ""

# ── 3. App directories matching "melina" ─────────────────────────────────
echo -e "${BOLD}[3/6] Looking for an app directory...${NC}"
echo -e "  Searching /home /var/www /usr/local/apps for *melina*..."
find /home /var/www /usr/local/apps -maxdepth 5 -type d -iname "*melina*" 2>/dev/null | head -20 | sed 's/^/  /' \
  || echo -e "  ${YELLOW}(none found)${NC}"

echo ""
echo -e "  ${BOLD}Also checking the Webuzo document root (often /home/<user>/public_html/<domain>):${NC}"
WEBUZO_DOCROOT_GUESS=$(find /home -maxdepth 4 -type d -path "*public_html/${DOMAIN}" 2>/dev/null | head -1)
if [ -n "${WEBUZO_DOCROOT_GUESS}" ]; then
  echo -e "  ${GREEN}✓ Webuzo docroot: ${WEBUZO_DOCROOT_GUESS}${NC}"
  echo -e "  ${BOLD}  Contents:${NC}"
  ls -la "${WEBUZO_DOCROOT_GUESS}" 2>/dev/null | head -20 | sed 's/^/  /'
else
  echo -e "  ${YELLOW}✗ no Webuzo docroot found at /home/*/public_html/${DOMAIN}${NC}"
fi
echo ""

# ── 4. PM2 processes ─────────────────────────────────────────────────────
echo -e "${BOLD}[4/6] PM2 processes...${NC}"
echo -e "  ${BOLD}root PM2:${NC}"
pm2 list 2>/dev/null | grep -v "^$" | head -30 | sed 's/^/  /' \
  || echo -e "  ${YELLOW}(pm2 not in PATH or no processes)${NC}"
echo ""
echo -e "  ${BOLD}clipe233 user PM2:${NC}"
su - clipe233 -c 'pm2 list 2>/dev/null' | grep -v "^$" | head -30 | sed 's/^/  /' \
  || echo -e "  ${YELLOW}(no PM2 under clipe233 user)${NC}"
echo ""
echo -e "  ${BOLD}Looking for anything named 'melina' in PM2:${NC}"
pm2 list 2>/dev/null | grep -i melina | sed 's/^/  /' \
  || echo -e "  ${YELLOW}(none in root PM2)${NC}"
su - clipe233 -c 'pm2 list 2>/dev/null' | grep -i melina | sed 's/^/  /' \
  || echo -e "  ${YELLOW}(none in clipe233 PM2)${NC}"
echo ""

# ── 5. Probe common Next.js ports ────────────────────────────────────────
echo -e "${BOLD}[5/6] Probing what's listening on common Next.js ports...${NC}"
for PORT in 3000 3001 3002 3003 3004 3005 3006 3007 3008 3009 3010; do
  RESULT=$(curl -s -o /dev/null -w "%{http_code}" --max-time 3 "http://127.0.0.1:${PORT}/" 2>/dev/null || echo "down")
  if [ "${RESULT}" != "000" ] && [ "${RESULT}" != "down" ]; then
    TITLE=$(curl -s --max-time 3 "http://127.0.0.1:${PORT}/" 2>/dev/null | grep -oE '<title>[^<]+</title>' | head -1 | sed 's/<[^>]*>//g')
    echo -e "  port ${PORT}: HTTP ${RESULT}  ${TITLE}"
  fi
done
echo ""
echo -e "  ${BOLD}Listening TCP ports (3000-3099):${NC}"
ss -tlnp 2>/dev/null | grep -E ':30[0-9][0-9]' | head -10 | sed 's/^/  /' \
  || netstat -tlnp 2>/dev/null | grep -E ':30[0-9][0-9]' | head -10 | sed 's/^/  /' \
  || echo -e "  ${YELLOW}(could not list listening ports)${NC}"
echo ""

# ── 6. Nginx error log (last 20 lines mentioning melina) ─────────────────
echo -e "${BOLD}[6/6] Recent Nginx errors mentioning melina...${NC}"
NGINX_ERR_LOG="/var/webuzo-data/nginx/logs/${DOMAIN}.error.log"
if [ -f "${NGINX_ERR_LOG}" ]; then
  echo -e "  ${BOLD}Tail of ${NGINX_ERR_LOG}:${NC}"
  tail -30 "${NGINX_ERR_LOG}" | sed 's/^/  /'
else
  echo -e "  ${YELLOW}(no per-site error log at ${NGINX_ERR_LOG})${NC}"
  echo -e "  ${BOLD}Tail of main Nginx error log:${NC}"
  tail -30 /var/log/nginx/error.log 2>/dev/null | grep -i melina | tail -10 | sed 's/^/  /' \
    || tail -10 /var/log/nginx/error.log 2>/dev/null | sed 's/^/  /'
fi
echo ""

# ── Summary ──────────────────────────────────────────────────────────────
echo -e "${CYAN}============================================================${NC}"
echo -e "${CYAN}  SUMMARY — what to do next${NC}"
echo -e "${CYAN}============================================================${NC}"
echo ""
echo -e "If no app directory and no PM2 process exists for melinawofoundation.org:"
echo -e "  ${YELLOW}We need to know:${NC}"
echo -e "    1. What should melinawofoundation.org serve? (clone of another site?"
echo -e "       brand new Next.js app? static HTML? redirect somewhere else?)"
echo -e "    2. If it's a Next.js app: where is the source? (GitHub repo URL?)"
echo ""
echo -e "If an app directory exists but no PM2 process is running for it:"
echo -e "  ${YELLOW}Action:${NC} start the app with PM2 on a free port (e.g. 3005),"
echo -e "  then write an Nginx config at ${NGINX_CUSTOM_DIR}/${DOMAIN}.conf"
echo -e "  pointing proxy_pass to that port."
echo ""
echo -e "If PM2 process is running but Nginx config is missing or broken:"
echo -e "  ${YELLOW}Action:${NC} rewrite Nginx config using the same pattern as the"
echo -e "  other 3 sites (location ^~ / { proxy_pass http://127.0.0.1:<PORT>; })"
echo -e "  and reload Nginx with: nginx -s reload"
echo ""
