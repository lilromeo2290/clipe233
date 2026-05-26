import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Serverless-compatible — no "output: export" or "output: standalone"
  // Vercel handles this automatically with the App Router
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  // Allow preview origins
  allowedDevOrigins: [
    ".space.chatglm.site",
    ".space-z.ai",
  ],
  // Next.js 16 uses Turbopack by default — provide empty config to silence warnings
  turbopack: {},
  // Moved from experimental.serverComponentsExternalPackages in Next.js 16
  serverExternalPackages: [],
};

export default nextConfig;
