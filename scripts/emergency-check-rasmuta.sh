#!/usr/bin/env bash
# ============================================================
# Emergency check — is rasmuta server even responding?
# ============================================================

DOMAIN="rasmutafoundation.org"
PUBLIC_IP="153.75.247.4"
PORT="3000"

echo "============================================================"
echo "  EMERGENCY STATUS CHECK"
echo "============================================================"
echo ""

# ------------------------------------------------------------
# 1. PM2 status (both users)
# ------------------------------------------------------------
echo "[1/5] PM2 status..."
echo ""
echo "  Root PM2:"
pm2 list 2>/dev/null | grep -E "name|rasmuta|clipe233|global" | sed 's/^/    /'
echo ""
echo "  clipe233 user PM2:"
su - clipe233 -c 'pm2 list' 2>/dev/null | grep -E "name|rasmuta|clipe233|global" | sed 's/^/    /'
echo ""

# ------------------------------------------------------------
# 2. Port 3000 listening?
# ------------------------------------------------------------
echo "[2/5] Port ${PORT} listener..."
ss -tlnp 2>/dev/null | grep ":${PORT} " || echo "  ✗ Nothing listening on port ${PORT}"
echo ""

# ------------------------------------------------------------
# 3. Direct curl to Next.js (bypassing Nginx)
# ------------------------------------------------------------
echo "[3/5] Direct curl to Next.js on http://${PUBLIC_IP}:${PORT}/ ..."
curl -sI --max-time 5 "http://${PUBLIC_IP}:${PORT}/" 2>&1 | head -5 | sed 's/^/    /'
echo ""

# ------------------------------------------------------------
# 4. Public HTTPS curl through Nginx
# ------------------------------------------------------------
echo "[4/5] Public HTTPS curl to https://${DOMAIN}/ ..."
curl -sI --max-time 10 "https://${DOMAIN}/" 2>&1 | head -10 | sed 's/^/    /'
echo ""

# ------------------------------------------------------------
# 5. PM2 logs (last 30 lines, looking for crashes)
# ------------------------------------------------------------
echo "[5/5] Recent PM2 logs (last 30 lines)..."
echo ""
echo "  Error log (last 30):"
su - clipe233 -c 'pm2 logs rasmuta --lines 30 --nostream --err' 2>&1 | tail -35 | sed 's/^/    /'
echo ""
echo "  Out log (last 30):"
su - clipe233 -c 'pm2 logs rasmuta --lines 30 --nostream --out' 2>&1 | tail -35 | sed 's/^/    /'
echo ""

# ------------------------------------------------------------
# 6. Disk space check (in case build filled up disk)
# ------------------------------------------------------------
echo "[bonus] Disk space:"
df -h | head -5 | sed 's/^/    /'
echo ""

echo "============================================================"
echo "  WHAT TO LOOK FOR"
echo "============================================================"
echo ""
echo "1. PM2 status: Is rasmuta 'online' or 'errored'?"
echo "2. Port 3000: Is anything listening?"
echo "3. Direct curl: Does Next.js respond on the public IP?"
echo "4. Public HTTPS: Does Nginx proxy correctly?"
echo "5. Logs: Look for 'Error:' or 'EADDRINUSE' or 'Module not found'"
