#!/usr/bin/env bash
# ============================================================
# Deep diagnostic for rasmutafoundation.org
# Tests every possible URL combination the user might be hitting
# ============================================================

DOMAIN="rasmutafoundation.org"
PUBLIC_IP="153.75.247.4"
PORT="3000"

echo "============================================================"
echo "  DEEP DIAGNOSTIC — rasmutafoundation.org"
echo "============================================================"
echo ""

# ------------------------------------------------------------
# 1. Multiple URL variations
# ------------------------------------------------------------
echo "[1/6] Testing URL variations..."
echo ""
for url in \
  "https://${DOMAIN}/" \
  "https://www.${DOMAIN}/" \
  "http://${DOMAIN}/" \
  "http://www.${DOMAIN}/"; do
  printf "  %-50s " "$url"
  RESULT=$(curl -sI --max-time 10 -L "$url" 2>&1 | head -1)
  if [ -z "$RESULT" ]; then
    echo "FAIL (no response)"
  else
    echo "$RESULT"
  fi
done
echo ""

# ------------------------------------------------------------
# 2. Multiple page paths (in case only homepage works)
# ------------------------------------------------------------
echo "[2/6] Testing subpage paths on https://${DOMAIN}..."
echo ""
for path in / /about /events /gallery /news /contact /donate /team /programs /history /celebration; do
  printf "  %-25s " "${path}"
  CODE=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 "https://${DOMAIN}${path}")
  TITLE=$(curl -s --max-time 10 "https://${DOMAIN}${path}" | grep -oP '<title>[^<]+</title>' | head -1)
  echo "HTTP ${CODE}  ${TITLE}"
done
echo ""

# ------------------------------------------------------------
# 3. Check if www redirects properly
# ------------------------------------------------------------
echo "[3/6] www → non-www redirect test..."
echo "  curl -sI https://www.${DOMAIN}/ (no -L, follow manually)"
curl -sI --max-time 10 "https://www.${DOMAIN}/" 2>&1 | head -8
echo ""

# ------------------------------------------------------------
# 4. Check what the body actually contains (looking for "Default Website Page")
# ------------------------------------------------------------
echo "[4/6] Body content check on homepage..."
BODY=$(curl -s --max-time 10 "https://${DOMAIN}/")
echo "  Body length: $(echo "$BODY" | wc -c) chars"
echo "  Contains 'Default Website Page': $(echo "$BODY" | grep -c 'Default Website Page')"
echo "  Contains '404': $(echo "$BODY" | grep -c '404')"
echo "  Contains 'RAS MUTA': $(echo "$BODY" | grep -c 'RAS MUTA')"
echo "  Contains 'next.js': $(echo "$BODY" | grep -c 'next')"
echo ""

# ------------------------------------------------------------
# 5. Check DNS — what IP does the domain resolve to?
# ------------------------------------------------------------
echo "[5/6] DNS resolution..."
echo "  ${DOMAIN} resolves to:"
dig +short "${DOMAIN}" A 2>/dev/null | sed 's/^/    /'
echo "  www.${DOMAIN} resolves to:"
dig +short "www.${DOMAIN}" A 2>/dev/null | sed 's/^/    /'
echo "  Public IP of this VPS: ${PUBLIC_IP}"
echo ""

# ------------------------------------------------------------
# 6. Check Nginx server_name and listen directives
# ------------------------------------------------------------
echo "[6/6] Nginx server_name for rasmuta..."
WEBUZO_CONF="/usr/local/apps/nginx/etc/conf.d/webuzoVH.conf"
grep -B1 -A2 "server_name.*rasmutafoundation" "${WEBUZO_CONF}" 2>/dev/null | head -20
echo ""

echo "============================================================"
echo "  DIAGNOSIS"
echo "============================================================"
echo ""
echo "If [1/6] shows HTTPS non-www = HTTP 200 → site works, problem is browser cache."
echo "  → Fix: Hard refresh (Ctrl+Shift+R), or try incognito, or clear cache."
echo ""
echo "If www version fails → Nginx is missing server_name www.${DOMAIN} block."
echo ""
echo "If subpages fail → Next.js routing issue, app needs rebuild."
echo ""
echo "If body contains 'Default Website Page' → Nginx config still broken."
echo ""
echo "If DNS doesn't point to ${PUBLIC_IP} → DNS issue, not server."
