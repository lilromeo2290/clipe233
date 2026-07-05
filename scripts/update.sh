#!/bin/bash
# ============================================================
# Clipe233 Engineers — VPS Update Script
# ============================================================
# Run this on your VPS to update the app from GitHub.
#
# Usage:
#   cd /home/clipe233/app
#   bash scripts/update.sh
# ============================================================

set -e

# ── Colors ─────────────────────────────────────────────────
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
CYAN='\033[0;36m'
NC='\033[0m'

APP_DIR="/home/clipe233/app"

cd "$APP_DIR"

echo -e "${CYAN}=== Pulling latest code ===${NC}"
git pull origin main

echo -e "${CYAN}=== Installing dependencies ===${NC}"
npm install

echo -e "${CYAN}=== Building Next.js app ===${NC}"
npm run build

echo -e "${CYAN}=== Applying database changes ===${NC}"
npx prisma db push

echo -e "${CYAN}=== Restarting PM2 process ===${NC}"
pm2 restart clipe233

echo -e "${GREEN}============================================${NC}"
echo -e "${GREEN}  ✓ Update complete!${NC}"
echo -e "${GREEN}============================================${NC}"
echo -e "  App: https://clipe233eng.net"
echo -e "  Status: $(pm2 list | grep clipe233 | awk '{print $18}')"
echo -e "${GREEN}============================================${NC}"
