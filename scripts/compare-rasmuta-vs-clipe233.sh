#!/usr/bin/env bash
# ============================================================
# Compare what's served by rasmuta vs clipe233 (which works)
# Look for missing assets, broken CSS, hydration errors
# ============================================================

RASMUTA="https://rasmutafoundation.org/"
CLIPE233="https://clipe233eng.net/"

echo "============================================================"
echo "  RENDER COMPARISON: rasmuta vs clipe233"
echo "============================================================"
echo ""

for url in "$RASMUTA" "$CLIPE233"; do
  echo "============================================================"
  echo "  URL: $url"
  echo "============================================================"
  echo ""

  echo "[1/5] Response headers:"
  curl -sI --max-time 10 "$url" | head -15 | sed 's/^/  /'
  echo ""

  echo "[2/5] Body length and <head> contents:"
  BODY=$(curl -s --max-time 10 "$url")
  echo "  Body length: $(echo "$BODY" | wc -c) chars"
  echo "  Number of <link> tags: $(echo "$BODY" | grep -oc '<link')"
  echo "  Number of <script> tags: $(echo "$BODY" | grep -oc '<script')"
  echo "  Number of <img> tags: $(echo "$BODY" | grep -oc '<img')"
  echo ""

  echo "[3/5] CSS files referenced:"
  echo "$BODY" | grep -oE 'href="[^"]*\.css[^"]*"' | sed 's/^/  /' | head -5
  echo ""

  echo "[4/5] JS chunks referenced:"
  echo "$BODY" | grep -oE 'src="[^"]*\.js[^"]*"' | sed 's/^/  /' | head -10
  echo ""

  echo "[5/5] <body> class and first 200 chars after <body>:"
  echo "$BODY" | grep -oE '<body[^>]*>.{0,200}' | head -1 | sed 's/^/  /'
  echo ""

  echo "  Asset URLs (first 20 unique paths):"
  echo "$BODY" | grep -oE '(href|src)="(/[^"]*|https?://[^"]*)"' | sed 's/.*="//' | sed 's/"$//' | sort -u | head -20 | sed 's/^/    /'
  echo ""
done

# ------------------------------------------------------------
# Test if CSS/JS assets actually load
# ------------------------------------------------------------
echo "============================================================"
echo "  ASSET LOADING TEST (rasmuta)"
echo "============================================================"
echo ""
echo "  Testing first 5 CSS/JS asset URLs from rasmuta homepage..."
ASSETS=$(curl -s --max-time 10 "$RASMUTA" | grep -oE '(href|src)="(/_next/[^"]*)"' | sed 's/.*="//' | sed 's/"$//' | head -5)
for asset in $ASSETS; do
  STATUS=$(curl -s -o /dev/null -w "%{http_code} %{size_download}bytes" --max-time 10 "https://rasmutafoundation.org${asset}")
  printf "    %-70s %s\n" "$asset" "$STATUS"
done
echo ""

echo "============================================================"
echo "  HTML STRUCTURE COMPARISON"
echo "============================================================"
echo ""
echo "  rasmuta <body> class attribute (truncated to 300 chars):"
curl -s --max-time 10 "$RASMUTA" | grep -oE '<body[^>]*>' | head -1 | head -c 400 | sed 's/^/    /'
echo ""
echo ""
echo "  clipe233 <body> class attribute (truncated to 300 chars):"
curl -s --max-time 10 "$CLIPE233" | grep -oE '<body[^>]*>' | head -1 | head -c 400 | sed 's/^/    /'
echo ""
echo ""
echo "  rasmuta <main> tag (first 200 chars):"
curl -s --max-time 10 "$RASMUTA" | grep -oE '<main[^>]*>.{0,200}' | head -1 | sed 's/^/    /'
echo ""
echo ""
echo "  clipe233 <main> tag (first 200 chars):"
curl -s --max-time 10 "$CLIPE233" | grep -oE '<main[^>]*>.{0,200}' | head -1 | sed 's/^/    /'
echo ""

echo "============================================================"
echo "  WHAT TO LOOK FOR"
echo "============================================================"
echo ""
echo "If rasmuta assets return 404 → CSS/JS not loading → check .next/static"
echo "If rasmuta <body> has fewer classes → CSS not loaded"
echo "If rasmuta <main> is empty or short → React not rendering"
