// next.config.ts

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",

  basePath: "/moon-docs",

  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.freepik.com",
      },
    ],
  },
};

export default nextConfig;
