import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    // This line is required to make images work with `output: "export"`
    unoptimized: true,

    // Corrected your remotePatterns configuration below
    remotePatterns: [
      {
        protocol: "https", // Should be "https", not "httpshttps"
        hostname: "img.freepik.com", // Wildcards like '/**' are not used here
      },
    ],
  },
  // if used turbopack
  // transpilePackages: ["next-mdx-remote"],
};

export default nextConfig;
