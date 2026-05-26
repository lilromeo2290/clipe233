import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Removed "output: standalone" — not compatible with serverless deployment
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  allowedDevOrigins: [
    ".space.chatglm.site",
    ".space-z.ai",
  ],
};

export default nextConfig;
