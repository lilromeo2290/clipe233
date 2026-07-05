// ============================================================
// PM2 Ecosystem Configuration for Clipe233 Engineers
// ============================================================
// This file is used by PM2 to manage the Next.js process.
//
// NOTE: Port 3001 is used because rasmutafoundation.org runs
// on port 3000 on the same VPS. If you change this port, also
// update the Nginx config at:
//   /var/webuzo-data/nginx/custom/domains/clipe233eng.net.conf
//
// Usage:
//   pm2 start ecosystem.config.js
//   pm2 save
//   pm2 startup (to auto-start on boot)
//
// Logs:
//   pm2 logs clipe233
//   pm2 monit
// ============================================================

module.exports = {
  apps: [
    {
      name: "clipe233",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3001",
      cwd: "/home/clipe233/app",
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      max_restarts: 10,
      max_memory_restart: "512M",
      watch: false,
      env: {
        NODE_ENV: "production",
        PORT: 3001,
      },
      error_file: "/home/clipe233/.pm2/logs/clipe233-error.log",
      out_file: "/home/clipe233/.pm2/logs/clipe233-out.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss Z",
      merge_logs: true,
      kill_timeout: 3000,
    },
  ],
};
