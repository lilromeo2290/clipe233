# 🚀 Clipe233 Engineers — Webuzo VPS Deployment Guide

Complete step-by-step guide to deploy this Next.js application on a Webuzo VPS.

---

## 📋 Prerequisites

- A VPS with **Webuzo** installed (get it from https://webuzo.com)
- SSH root access to your VPS
- Your domain **clipe233eng.net** pointed to your VPS IP (A record)
- GitHub repository access: `https://github.com/lilromeo2290/clipe233eng.net`

---

## 📑 Table of Contents

1. [SSH into your VPS](#1-ssh-into-your-vps)
2. [Install Node.js via Webuzo](#2-install-nodejs-via-webuzo)
3. [Create Domain & Database in Webuzo Panel](#3-create-domain--database-in-webuzo-panel)
4. [Clone the Repository](#4-clone-the-repository)
5. [Install Dependencies & Build](#5-install-dependencies--build)
6. [Configure Environment Variables](#6-configure-environment-variables)
7. [Set Up the Database](#7-set-up-the-database)
8. [Start the App with PM2](#8-start-the-app-with-pm2)
9. [Configure Nginx Reverse Proxy](#9-configure-nginx-reverse-proxy)
10. [Install SSL Certificate](#10-install-ssl-certificate)
11. [Verify Deployment](#11-verify-deployment)
12. [Future Updates](#12-future-updates)
13. [Troubleshooting](#13-troubleshooting)

---

## 1. SSH into your VPS

```bash
ssh root@YOUR_VPS_IP
```

Replace `YOUR_VPS_IP` with your actual VPS IP address (e.g., `192.168.1.100`).

---

## 2. Install Node.js via Webuzo

Webuzo makes Node.js installation easy through its panel.

### Option A: Via Webuzo Panel (Recommended)

1. Log in to **Webuzo Admin Panel**: `http://YOUR_VPS_IP:2002/`
2. Go to **Apps → Node.js**
3. Click **Install Node.js**
4. Choose version **20.x** (LTS)
5. Wait for installation to complete (2-3 minutes)

### Option B: Via SSH (if not using Webuzo's installer)

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs
```

### Verify installation

```bash
node -v    # should print v20.x.x
npm -v     # should print 10.x.x
```

### Install PM2 (process manager)

```bash
npm install -g pm2
```

PM2 keeps your Node.js app running 24/7 and auto-restarts it on crashes or reboots.

---

## 3. Create Domain & Database in Webuzo Panel

### Add your domain

1. Go to **Webuzo Enduser Panel**: `http://YOUR_VPS_IP:2004/`
2. Login with your Webuzo account
3. Go to **Domains → Add Domain**
4. Enter: `clipe233eng.net`
5. Click **Add Domain**

### Create a MySQL database (recommended for production)

1. Go to **MySQL → Add Database**
2. Database name: `clipe233_db`
3. Database user: `clipe233_user`
4. Password: generate a strong password (save it!)
5. Click **Add Database**

> **Alternative:** You can use SQLite (simpler, no database setup needed). The default `DATABASE_URL="file:./db/custom.db"` works out of the box. SQLite is fine for low-traffic sites.

---

## 4. Clone the Repository

Create a directory for the app and clone:

```bash
mkdir -p /home/clipe233/app
cd /home/clipe233/app

git clone https://github.com/lilromeo2290/clipe233eng.net.git .
```

> The `.` at the end clones into the current directory.

If you get a permission error, run:
```bash
chown -R $USER:$USER /home/clipe233/app
```

---

## 5. Install Dependencies & Build

```bash
cd /home/clipe233/app

# Install all dependencies (this also runs prisma generate via postinstall)
npm install

# Build the Next.js app for production
npm run build
```

This takes 2-5 minutes. You should see output like:
```
✓ Compiled successfully
Route (app)
├ ○ /
├ ○ /about
├ ○ /contact
...
```

---

## 6. Configure Environment Variables

Copy the example env file and edit it:

```bash
cp .env.example .env
nano .env
```

Update these critical values:

```bash
# Database (use MySQL if you created one in Step 3)
DATABASE_URL="mysql://clipe233_user:YOUR_DB_PASSWORD@localhost:3306/clipe233_db"

# OR use SQLite (simpler — no MySQL needed)
# DATABASE_URL="file:./db/custom.db"

# Site URL
NEXT_PUBLIC_SITE_URL="https://clipe233eng.net"

# Admin credentials — CHANGE THESE!
ADMIN_USERNAME="admin"
ADMIN_PASSWORD="YourStrongPassword123!"

# Email (Gmail SMTP)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="clipe233eng@gmail.com"
SMTP_PASS="your-gmail-app-password"   # Get this from Google Account → App Passwords
EMAIL_FROM="clipe233eng@gmail.com"
EMAIL_TO="clipe233eng@gmail.com, info@clipe233eng.net"
```

Save and exit (`Ctrl+X`, then `Y`, then `Enter`).

### How to get a Gmail App Password:
1. Go to https://myaccount.google.com/security
2. Enable 2-Step Verification
3. Go to **App Passwords** → create a new one for "Mail"
4. Copy the 16-character password into `SMTP_PASS`

---

## 7. Set Up the Database

### If using SQLite (default):

```bash
cd /home/clipe233/app
mkdir -p db
npx prisma db push
```

### If using MySQL:

```bash
cd /home/clipe233/app
npx prisma db push
```

This creates all the tables (users, contacts, blog posts, projects, etc.).

> To seed the admin user, see the section below on [creating an admin](#creating-an-admin-user).

---

## 8. Start the App with PM2

Start the Next.js production server with PM2:

```bash
cd /home/clipe233/app

# Start using the ecosystem config
pm2 start ecosystem.config.js

# Save the process list (so it auto-starts on reboot)
pm2 save

# Enable PM2 to start on system boot
pm2 startup
# (Follow the command PM2 prints — it will give you a command to run)
```

### Verify the app is running

```bash
pm2 status
# Should show "clipe233" as "online"

# Test locally
curl http://localhost:3000
# Should return HTML
```

### PM2 commands you'll use often:

```bash
pm2 logs clipe233          # view live logs
pm2 restart clipe233       # restart the app
pm2 stop clipe233          # stop the app
pm2 monit                  # real-time CPU/memory monitor
```

---

## 9. Configure Nginx Reverse Proxy

Webuzo uses Nginx by default. You need to proxy incoming web traffic to your Node.js app on port 3000.

### Option A: Via Webuzo Panel (Recommended)

1. Go to **Webuzo Enduser Panel** → **Domains**
2. Click **Manage** next to `clipe233eng.net`
3. Go to **Proxy / Reverse Proxy**
4. Add a new reverse proxy:
   - **Source URL**: `/`
   - **Destination URL**: `http://127.0.0.1:3000`
5. Save

### Option B: Via SSH (manual Nginx config)

Create a custom Nginx config:

```bash
nano /etc/nginx/conf.d/clipe233eng.net.conf
```

Add:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name clipe233eng.net www.clipe233eng.net;

    client_max_body_size 10M;

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
}
```

Test and reload Nginx:

```bash
nginx -t
systemctl reload nginx
```

---

## 10. Install SSL Certificate

### Via Webuzo Panel (Recommended)

1. Go to **Webuzo Enduser Panel** → **SSL Certificates**
2. Click **Install Let's Encrypt SSL**
3. Select domain `clipe233eng.net`
4. Click **Install**
5. Repeat for `www.clipe233eng.net`

### Via SSH (Certbot)

```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d clipe233eng.net -d www.clipe233eng.net
```

Follow the prompts. SSL auto-renews every 90 days.

### Force HTTPS redirect

After SSL is installed, edit your Nginx config to redirect HTTP → HTTPS:

```bash
nano /etc/nginx/conf.d/clipe233eng.net.conf
```

Add at the top:

```nginx
server {
    listen 80;
    server_name clipe233eng.net www.clipe233eng.net;
    return 301 https://$server_name$request_uri;
}
```

Reload Nginx:
```bash
systemctl reload nginx
```

---

## 11. Verify Deployment

Open your browser and visit:

- ✅ **https://clipe233eng.net** — Homepage should load
- ✅ **https://clipe233eng.net/contact** — Contact page
- ✅ **https://clipe233eng.net/products** — Products page
- ✅ **https://clipe233eng.net/clipe-sms-crm** — New SMS CRM product
- ✅ **https://clipe233eng.net/admin** — Admin login page

### Test the contact form:
1. Fill out the contact form at `/contact`
2. Submit
3. Check `clipe233eng@gmail.com` and `info@clipe233eng.net` — both should receive the email

### Check live chat:
- The Tawk.to chat bubble should appear in the bottom-right corner
- Log into https://www.tawk.to to respond to chats

---

## 12. Future Updates

Whenever you push new code to GitHub, update the VPS:

### Quick update (use the helper script)

```bash
cd /home/clipe233/app
bash scripts/update.sh
```

### Manual update

```bash
cd /home/clipe233/app

# Pull latest code
git pull origin main

# Install any new dependencies
npm install

# Rebuild
npm run build

# Apply any database schema changes
npx prisma db push

# Restart the app
pm2 restart clipe233
```

---

## Creating an Admin User

To access the admin panel at `/admin`, you need to create an admin user in the database.

### Option A: Using Prisma Studio (GUI)

```bash
cd /home/clipe233/app
npx prisma studio
```

Open `http://localhost:5555` in your browser, navigate to the `User` table, and add a new row:
- email: your-email@example.com
- name: Your Name
- role: admin
- password: (hash this — see Option B)

### Option B: Using a script

Create a file `create-admin.js`:

```javascript
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

async function main() {
  const email = 'admin@clipe233eng.net';
  const password = 'YourStrongPassword123!';
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.upsert({
    where: { email },
    update: { password: hashedPassword, role: 'admin' },
    create: { email, name: 'Admin', password: hashedPassword, role: 'admin' },
  });

  console.log('Admin user created:', user.email);
}

main().then(() => prisma.$disconnect());
```

Run it:
```bash
node create-admin.js
```

---

## 13. Troubleshooting

### App won't start

```bash
pm2 logs clipe233 --lines 50
```

Common issues:
- **Port 3000 in use:** Run `lsof -i :3000` to find what's using it, then `kill -9 <PID>`
- **Missing .env:** Make sure you copied `.env.example` to `.env` and filled in values
- **Build errors:** Run `npm run build` again to see the error

### 502 Bad Gateway

This means Nginx can't reach your Node.js app.

```bash
pm2 status         # is clipe233 online?
pm2 restart clipe233
curl http://localhost:3000   # can you reach it locally?
```

If yes, check your Nginx config — make sure it's proxying to port 3000.

### Database connection errors

```bash
# Test MySQL connection
mysql -u clipe233_user -p -h localhost clipe233_db

# Check DATABASE_URL in .env
cat .env | grep DATABASE_URL
```

### Email not sending

```bash
pm2 logs clipe233 --lines 100 | grep -i email
```

Check:
- Gmail App Password is correct (not your regular Gmail password)
- 2-Step Verification is enabled on the Google account
- `SMTP_USER` matches `EMAIL_FROM`

### Permission denied errors

```bash
chown -R www-data:www-data /home/clipe233/app
chmod -R 755 /home/clipe233/app
```

---

## 📞 Quick Reference

| What | Command / URL |
|------|---------------|
| Webuzo Admin Panel | `http://YOUR_VPS_IP:2002/` |
| Webuzo Enduser Panel | `http://YOUR_VPS_IP:2004/` |
| App URL | `https://clipe233eng.net` |
| Admin Panel | `https://clipe233eng.net/admin` |
| App status | `pm2 status` |
| App logs | `pm2 logs clipe233` |
| Restart app | `pm2 restart clipe233` |
| Update from GitHub | `cd /home/clipe233/app && git pull && npm install && npm run build && pm2 restart clipe233` |
| Tawk.to Dashboard | `https://www.tawk.to` |
| GitHub Repo | `https://github.com/lilromeo2290/clipe233eng.net` |

---

## 🎯 Post-Deployment Checklist

- [ ] Site loads at https://clipe233eng.net
- [ ] All pages work (Home, About, Services, Products, Contact, etc.)
- [ ] Contact form sends emails to both inboxes
- [ ] Admin panel accessible at /admin
- [ ] Tawk.to live chat bubble appears
- [ ] SSL certificate active (https with green lock)
- [ ] PM2 auto-starts on reboot (`pm2 startup` was run)
- [ ] Database backups scheduled in Webuzo
- [ ] Strong admin password set
- [ ] Gmail App Password configured for SMTP

---

**Need help?** Check the troubleshooting section above or contact the development team.
