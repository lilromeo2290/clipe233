#!/bin/bash
# ============================================================
# Clipe233 Engineers — Webuzo VPS Deployment Script
# ============================================================
# Run this on your VPS as root after SSH-ing in.
# This sets up Node.js, Nginx reverse proxy, PM2 process
# manager, SSL, and deploys the app.
# ============================================================

set -e

# ── CONFIGURATION ──────────────────────────────────────────
DOMAIN="clipe233.com"
WWW_DOMAIN="www.clipe233.com"
APP_DIR="/home/clipe233/app"
NODE_VERSION="20"
APP_PORT=3000
APP_USER="clipe233"
# ───────────────────────────────────────────────────────────

echo "============================================"
echo "  Clipe233 Engineers — VPS Deployment"
echo "  Domain: $DOMAIN"
echo "  App Dir: $APP_DIR"
echo "============================================"

# ── STEP 1: System Updates ────────────────────────────────
echo ""
echo ">>> Step 1/8: Updating system packages..."
apt update && apt upgrade -y
apt install -y curl git wget unzip software-properties-common ufw

# ── STEP 2: Install Node.js ──────────────────────────────
echo ""
echo ">>> Step 2/8: Installing Node.js $NODE_VERSION..."
if ! command -v node &> /dev/null; then
  curl -fsSL https://deb.nodesource.com/setup_$NODE_VERSION.x | bash -
  apt install -y nodejs
fi
echo "Node.js version: $(node -v)"
echo "npm version: $(npm -v)"

# ── STEP 3: Install PM2 ─────────────────────────────────
echo ""
echo ">>> Step 3/8: Installing PM2 process manager..."
npm install -g pm2
pm2 startup systemd -u $APP_USER --hp /home/$APP_USER 2>/dev/null || true

# ── STEP 4: Create App User & Directory ──────────────────
echo ""
echo ">>> Step 4/8: Setting up app directory..."
id -u $APP_USER &>/dev/null || useradd -m -s /bin/bash $APP_USER
mkdir -p $APP_DIR
chown -R $APP_USER:$APP_USER $APP_DIR

# ── STEP 5: Deploy Application ───────────────────────────
echo ""
echo ">>> Step 5/8: Deploying application..."
echo "   Cloning from GitHub..."

su - $APP_USER << 'DEPLOY_SCRIPT'
cd /home/clipe233/app

# Clone or pull
if [ -d ".git" ]; then
  git pull origin main
else
  git clone https://github.com/lilromeo2290/clipe233eng.net.git .
fi

# Install dependencies
npm install --production

# Build the application
npm run build

# Create .env file if it doesn't exist
if [ ! -f ".env" ]; then
  cat > .env << 'ENV_FILE'
# Database URL (update with your actual database)
DATABASE_URL="file:./dev.db"

# Site URL
NEXT_PUBLIC_SITE_URL="https://clipe233.com"

# Admin credentials (CHANGE THESE!)
ADMIN_USERNAME="admin"
ADMIN_PASSWORD="CHANGE_ME_TO_A_STRONG_PASSWORD"

# Email configuration (update with your SMTP)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"
EMAIL_FROM="noreply@clipe233.com"

# Optional: Strapi CMS
NEXT_PUBLIC_STRAPI_URL=""

# Optional: Supabase
NEXT_PUBLIC_SUPABASE_URL=""
NEXT_PUBLIC_SUPABASE_ANON_KEY=""
ENV_FILE
  echo "   Created .env file — UPDATE IT with your real credentials!"
fi
DEPLOY_SCRIPT

# ── STEP 6: Start App with PM2 ───────────────────────────
echo ""
echo ">>> Step 6/8: Starting application with PM2..."

su - $APP_USER << 'PM2_SCRIPT'
cd /home/clipe233/app

# Stop existing process if running
pm2 delete clipe233 2>/dev/null || true

# Start the Next.js server
pm2 start npm --name "clipe233" -- start

# Save PM2 process list
pm2 save
PM2_SCRIPT

# ── STEP 7: Install & Configure Nginx ────────────────────
echo ""
echo ">>> Step 7/8: Configuring Nginx reverse proxy..."

apt install -y nginx

cat > /etc/nginx/sites-available/$DOMAIN << 'NGINX_CONF'
# Clipe233 Engineers — Nginx Configuration
server {
    listen 80;
    listen [::]:80;
    server_name clipe233.com www.clipe233.com;

    # Redirect HTTP to HTTPS (uncomment after SSL setup)
    # return 301 https://$server_name$request_uri;

    # For now, proxy directly (before SSL)
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 300s;
        proxy_connect_timeout 75s;
    }

    # Cache static assets
    location /_next/static/ {
        proxy_pass http://127.0.0.1:3000;
        expires 365d;
        add_header Cache-Control "public, immutable";
    }

    # Cache images
    location ~* \.(jpg|jpeg|png|gif|ico|svg|webp)$ {
        proxy_pass http://127.0.0.1:3000;
        expires 30d;
        add_header Cache-Control "public";
    }

    # Max upload size
    client_max_body_size 10M;
}

# HTTPS server (uncomment after running certbot)
# server {
#     listen 443 ssl http2;
#     listen [::]:443 ssl http2;
#     server_name clipe233.com www.clipe233.com;
#
#     ssl_certificate /etc/letsencrypt/live/clipe233.com/fullchain.pem;
#     ssl_certificate_key /etc/letsencrypt/live/clipe233.com/privkey.pem;
#     ssl_protocols TLSv1.2 TLSv1.3;
#     ssl_ciphers HIGH:!aNULL:!MD5;
#     ssl_prefer_server_ciphers on;
#
#     location / {
#         proxy_pass http://127.0.0.1:3000;
#         proxy_http_version 1.1;
#         proxy_set_header Upgrade $http_upgrade;
#         proxy_set_header Connection 'upgrade';
#         proxy_set_header Host $host;
#         proxy_set_header X-Real-IP $remote_addr;
#         proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
#         proxy_set_header X-Forwarded-Proto $scheme;
#         proxy_cache_bypass $http_upgrade;
#     }
#
#     location /_next/static/ {
#         proxy_pass http://127.0.0.1:3000;
#         expires 365d;
#         add_header Cache-Control "public, immutable";
#     }
#
#     client_max_body_size 10M;
# }
NGINX_CONF

# Enable the site
ln -sf /etc/nginx/sites-available/$DOMAIN /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Test and restart
nginx -t
systemctl restart nginx
systemctl enable nginx

# ── STEP 8: Setup SSL with Let's Encrypt ─────────────────
echo ""
echo ">>> Step 8/8: Setting up SSL (Let's Encrypt)..."
echo ""
echo "   IMPORTANT: Make sure your domain DNS is pointing to this VPS IP first!"
echo "   Then run this command to get SSL:"
echo ""
echo "   apt install -y certbot python3-certbot-nginx"
echo "   certbot --nginx -d clipe233.com -d www.clipe233.com"
echo ""

# ── Firewall Setup ────────────────────────────────────────
echo ""
echo ">>> Configuring firewall..."
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw --force enable

# ── Final Summary ─────────────────────────────────────────
echo ""
echo "============================================"
echo "  DEPLOYMENT COMPLETE!"
echo "============================================"
echo ""
echo "  Your app is running at: http://$DOMAIN"
echo "  PM2 dashboard:         pm2 monit"
echo "  App logs:              pm2 logs clipe233"
echo "  Restart app:           pm2 restart clipe233"
echo ""
echo "  NEXT STEPS:"
echo "  1. Update .env file:   nano $APP_DIR/.env"
echo "  2. Point DNS to VPS IP (A record for clipe233.com)"
echo "  3. Install SSL:        certbot --nginx -d clipe233.com -d www.clipe233.com"
echo "  4. Restart app:        pm2 restart clipe233"
echo ""
echo "============================================"
