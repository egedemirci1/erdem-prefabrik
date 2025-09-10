import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Enable Next.js Image Optimization for significant bandwidth savings
    unoptimized: false,
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [64, 96, 128, 256, 384],
  },
};

export default nextConfig;
