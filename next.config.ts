import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || "https://pfect.app",
  },
  // Skip type-checking during production build (runs in CI separately)
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
