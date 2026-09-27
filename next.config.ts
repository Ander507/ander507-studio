import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingRoot: import.meta.dirname,
  async rewrites() {
    return [
      { source: "/contact", destination: "/contact/index.html" },
      { source: "/noteai", destination: "/noteai/index.html" },
    ];
  },
};

export default nextConfig;
