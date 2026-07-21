#!/usr/bin/env bash
# ============================================================
# Trace why /index.js is being served instead of the homepage
# ============================================================

DOMAIN="rasmutafoundation.org"
DOC_ROOT="/home/clipe233/public_html/rasmutafoundation.org"
WEBUZO_CONF="/usr/local/apps/nginx/etc/conf.d/webuzoVH.conf"

echo "============================================================"
echo "  TRACE /index.js MYSTERY"
echo "============================================================"
echo ""

# ------------------------------------------------------------
# 1. List contents of the document root
# ------------------------------------------------------------
echo "[1/6] Document root contents (${DOC_ROOT})..."
if [ -d "${DOC_ROOT}" ]; then
  ls -la "${DOC_ROOT}" | head -30
  echo ""
  echo "  Specifically looking for index.* files:"
  find "${DOC_ROOT}" -maxdepth 2 -name "index.*" 2>/dev/null | sed 's/^/    /'
else
  echo "  ✗ Document root doesn't exist"
fi
echo ""

# ------------------------------------------------------------
# 2. Test specific URL: /index.js
# ------------------------------------------------------------
echo "[2/6] What does /index.js return?"
echo ""
echo "  curl -sI https://${DOMAIN}/index.js | head -10"
curl -sI --max-time 10 "https://${DOMAIN}/index.js" | head -10
echo ""
echo "  Body (first 5 lines):"
curl -s --max-time 10 "https://${DOMAIN}/index.js" | head -5
echo ""

# ------------------------------------------------------------
# 3. Test the homepage with verbose redirect tracking
# ------------------------------------------------------------
echo "[3/6] Homepage request with verbose redirect tracking..."
echo ""
echo "  curl -sILv https://${DOMAIN}/ 2>&1 | grep -E '^(> GET|> Host|< HTTP|< Location|< Content-Type)' | head -30"
curl -sILv --max-time 10 "https://${DOMAIN}/" 2>&1 | grep -E "^(> GET|> Host|< HTTP|< Location|< Content-Type|< Content-Length)" | head -30
echo ""

# ------------------------------------------------------------
# 4. Test / without -L (no redirect follow) to see raw response
# ------------------------------------------------------------
echo "[4/6] Raw homepage response (no redirect follow)..."
echo ""
echo "  curl -sI https://${DOMAIN}/ | head -10"
curl -sI --max-time 10 "https://${DOMAIN}/" | head -10
echo ""
echo "  Same again but check Server header specifically:"
curl -sI --max-time 10 "https://${DOMAIN}/" | grep -iE "server|content-type|x-nextjs"
echo ""

# ------------------------------------------------------------
# 5. Dump the FULL HTTPS server block from webuzoVH.conf
# ------------------------------------------------------------
echo "[5/6] Full HTTPS server block for ${DOMAIN}..."
echo "  (extracting from ${WEBUZO_CONF})"
echo "  ----------------------------------------"
# Find the SSL server block (the one with ssl_certificate and our domain)
awk -v domain="${DOMAIN}" '
  BEGIN { in_ssl_block=0; brace=0; lines=0 }
  /server[[:space:]]*\{/ { 
    potential=1
    brace=1
    next
  }
  potential && /server_name[[:space:]]+.*domain/ {
    in_ssl_block=1
    potential=0
  }
  potential { potential=0 }
  in_ssl_block {
    print
    brace += gsub(/\{/, "{")
    brace -= gsub(/\}/, "}")
    if (brace <= 0) {
      in_ssl_block=0
      print "=== END SERVER BLOCK ==="
    }
    if (lines++ > 200) { print "... (truncated at 200 lines)"; exit }
  }
' "${WEBUZO_CONF}" | sed 's/^/    /'
echo "  ----------------------------------------"
echo ""

# ------------------------------------------------------------
# 6. Check if our custom config is included in the SSL block
# ------------------------------------------------------------
echo "[6/6] Where is our custom config included?"
echo ""
echo "  All 'include.*rasmutafoundation' lines in webuzoVH.conf:"
grep -n "include.*rasmutafoundation" "${WEBUZO_CONF}" | sed 's/^/    /'
echo ""
echo "  All 'server_name.*rasmutafoundation' lines (so we can count server blocks):"
grep -n "server_name.*rasmutafoundation" "${WEBUZO_CONF}" | sed 's/^/    /'
echo ""

echo "============================================================"
echo "  HYPOTHESIS"
echo "============================================================"
echo ""
echo "If the document root has an 'index.js' file → Webuzo's try_files"
echo "finds it and serves it. The fix would be:"
echo "  rm -f ${DOC_ROOT}/index.*"
echo "  (or just delete the index.js file)"
echo ""
echo "If /index.js returns HTTP 200 with JS content → it's serving the file"
echo "If /index.js returns HTTP 404 from Next.js → it's somehow being proxied"
echo ""
echo "If the HTTPS server block does NOT include our custom config →"
echo "  our ^~ / proxy isn't active for HTTPS, so try_files takes over."
echo "  Fix: also include the config in the HTTPS block."
