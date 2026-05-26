import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  allowedDevOrigins: [
    ".space.chatglm.site",
    ".space-z.ai",
  ],
  // Next.js 16 uses Turbopack by default
  turbopack: {},
  serverExternalPackages: [],
  // Disable image optimization to reduce memory usage
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
