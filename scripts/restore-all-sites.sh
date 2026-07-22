#!/usr/bin/env bash
# ============================================================
# RESTORE ALL SITES — Webuzo regenerated nginx config and
# dropped our custom include lines. Re-apply everything.
# ============================================================
set -e

WEBUZO_CONF="/usr/local/apps/nginx/etc/conf.d/webuzoVH.conf"
NGINX_CUSTOM_DIR="/var/webuzo-data/nginx/custom/domains"

# Site configurations (port 3001=clipe233, 3004=global-experience, 3000=rasmuta)
declare -A SITES
SITES["clipe233eng.net"]="127.0.0.1:3001"
SITES["globalexperiencegh.org"]="127.0.0.1:3004"
SITES["rasmutafoundation.org"]="153.75.247.4:3000"

echo "============================================================"
echo "  RESTORE ALL SITES — Webuzo config regeneration fix"
echo "============================================================"
echo ""

# ------------------------------------------------------------
# 1. Test all sites first to see current state
# ------------------------------------------------------------
echo "[1/6] Current state of all sites..."
echo ""
ALL_DOMAINS="clipe233eng.net globalexperiencegh.org rasmutafoundation.org melinawofoundation.org 24hournewsonline.com"
for domain in $ALL_DOMAINS; do
  printf "  %-35s " "https://${domain}/"
  RESULT=$(curl -s --max-time 8 "https://${domain}/" 2>&1)
  if echo "$RESULT" | grep -q "Default Website Page\|Webuzo"; then
    echo "❌ Webuzo Default Page"
  elif echo "$RESULT" | grep -q "<title>"; then
    TITLE=$(echo "$RESULT" | grep -oP '<title>[^<]+</title>' | head -1 | sed 's/<[^>]*>//g')
    echo "✅ ${TITLE}"
  else
    STATUS=$(curl -sI --max-time 8 "https://${domain}/" 2>&1 | head -1)
    echo "? ${STATUS}"
  fi
done
echo ""

# ------------------------------------------------------------
# 2. Check if our custom config files still exist
# ------------------------------------------------------------
echo "[2/6] Checking custom Nginx config files..."
echo ""
for domain in clipe233eng.net globalexperiencegh.org rasmutafoundation.org; do
  CONF="${NGINX_CUSTOM_DIR}/${domain}.conf"
  if [ -f "$CONF" ]; then
    echo "  ✓ ${domain}.conf exists ($(wc -l < "$CONF") lines)"
  else
    echo "  ✗ ${domain}.conf MISSING — will recreate"
  fi
done
echo ""

# ------------------------------------------------------------
# 3. Check if webuzoVH.conf still includes our custom configs
# ------------------------------------------------------------
echo "[3/6] Checking webuzoVH.conf include lines..."
echo ""
for domain in clipe233eng.net globalexperiencegh.org rasmutafoundation.org; do
  COUNT=$(grep -c "include.*${domain}.conf" "$WEBUZO_CONF" 2>/dev/null || echo "0")
  echo "  ${domain}.conf included ${COUNT} times in webuzoVH.conf"
done
echo ""

# Check melinawofoundation.org — new domain, we don't know what app serves it
echo "  Checking melinawofoundation.org — what's set up for it?"
echo "    Nginx config file:"
ls -la "${NGINX_CUSTOM_DIR}/melinawofoundation.org.conf" 2>/dev/null | sed 's/^/      /' || echo "      (no custom config)"
echo ""
echo "    In webuzoVH.conf:"
grep -n "melinawofoundation" "$WEBUZO_CONF" 2>/dev/null | head -10 | sed 's/^/      /' || echo "      (not in webuzoVH.conf)"
echo ""

echo "    Looking for an app directory for melinawofoundation.org:"
find /home -maxdepth 4 -type d -name "melinawofoundation*" 2>/dev/null | sed 's/^/      /' || echo "      (none found)"
echo ""

echo "    PM2 processes (looking for melina or similar):"
pm2 list 2>/dev/null | grep -iE "melina|foundation" | sed 's/^/      /' || echo "      (no melina in root PM2)"
su - clipe233 -c 'pm2 list' 2>/dev/null | grep -iE "melina|foundation" | sed 's/^/      /' || echo "      (no melina in clipe233 PM2)"
echo ""

# ------------------------------------------------------------
# 4. Rewrite all 3 Next.js site configs (with ^~ priority)
# ------------------------------------------------------------
echo "[4/6] Rewriting custom Nginx configs for 3 Next.js sites..."
echo ""

for domain in clipe233eng.net globalexperiencegh.org rasmutafoundation.org; do
  PROXY_TARGET="${SITES[$domain]}"
  CONF="${NGINX_CUSTOM_DIR}/${domain}.conf"

  # Backup if exists
  if [ -f "$CONF" ]; then
    BACKUP="${CONF}.bak.$(date +%Y%m%d-%H%M%S)"
    cp "$CONF" "$BACKUP"
    echo "  Backed up ${domain}.conf → ${BACKUP##*/}"
  fi

  cat > "$CONF" <<NGINX_CONF
# ${domain} — proxy to Next.js on ${PROXY_TARGET}
# Uses ^~ prefix to override Webuzo's default try_files directive

# Defensive redirect: /index.js → /
location = /index.js {
    return 301 /;
}

# Defensive redirect: /index.html → /
location = /index.html {
    return 301 /;
}

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

    # Prevent browsers from caching 301 redirects
    add_header Cache-Control "no-cache, no-store, must-revalidate" always;
}

# Cache Next.js static assets (build artifacts, immutable)
location ^~ /_next/static/ {
    proxy_pass http://${PROXY_TARGET};
    proxy_set_header Host \$host;
    proxy_set_header X-Real-IP \$remote_addr;
    proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto \$scheme;
    expires 365d;
    add_header Cache-Control "public, immutable";
    access_log off;
}

# Cache images and fonts
location ~* ^/.*\.(jpg|jpeg|png|gif|ico|svg|webp|woff2?|ttf|eot)$ {
    proxy_pass http://${PROXY_TARGET};
    proxy_set_header Host \$host;
    proxy_set_header X-Real-IP \$remote_addr;
    proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto \$scheme;
    expires 30d;
    add_header Cache-Control "public";
    access_log off;
}
NGINX_CONF

  echo "  ✓ Wrote ${domain}.conf → proxy_pass http://${PROXY_TARGET}"
done
echo ""

# ------------------------------------------------------------
# 5. Test and reload Nginx
# ------------------------------------------------------------
echo "[5/6] Testing and reloading Nginx..."
echo ""
if nginx -t 2>&1; then
  echo "  ✓ Syntax OK"
  nginx -s reload && echo "  ✓ Nginx reloaded via nginx -s reload" || {
    echo "  nginx -s reload failed, trying systemctl restart..."
    systemctl restart nginx && echo "  ✓ Nginx restarted via systemctl"
  }
else
  echo "  ✗ Syntax FAILED — aborting"
  exit 1
fi
echo ""

sleep 3

# ------------------------------------------------------------
# 6. Verify all sites
# ------------------------------------------------------------
echo "[6/6] Final verification..."
echo ""
for domain in clipe233eng.net globalexperiencegh.org rasmutafoundation.org melinawofoundation.org 24hournewsonline.com; do
  printf "  %-35s " "https://${domain}/"
  RESULT=$(curl -s --max-time 10 "https://${domain}/" 2>&1)
  if echo "$RESULT" | grep -q "Default Website Page\|Webuzo"; then
    echo "❌ STILL Webuzo Default"
  elif echo "$RESULT" | grep -q "<title>"; then
    TITLE=$(echo "$RESULT" | grep -oP '<title>[^<]+</title>' | head -1 | sed 's/<[^>]*>//g')
    CODE=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 "https://${domain}/")
    echo "✅ HTTP ${CODE} — ${TITLE}"
  else
    STATUS=$(curl -sI --max-time 10 "https://${domain}/" 2>&1 | head -1)
    echo "? ${STATUS}"
  fi
done
echo ""

echo "============================================================"
echo "  DONE"
echo "============================================================"
echo ""
echo "  If 3 Next.js sites are now ✅ but melinawofoundation.org is still ❌:"
echo "    → melinawofoundation.org is a NEW domain we haven't set up before."
echo "    → Need to know: which Next.js app serves it? What port? What directory?"
echo "    → Please paste the output above so I can see what's set up for it."
echo ""
echo "  If WordPress site (24hournewsonline.com) shows ❌:"
echo "    → Its config was likely also overwritten."
echo "    → Need to restore the WordPress php-fpm config."
echo ""
echo "  If all sites still show ❌:"
echo "    → The webuzoVH.conf may have dropped our include lines entirely."
echo "    → Need to manually add them back."
