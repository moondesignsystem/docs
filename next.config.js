/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  output: "export",
  
  // Enable detailed hydration warnings in development
  reactStrictMode: true,
  
  experimental: {
    // More detailed error reporting for hydration mismatches
    logging: {
      level: 'verbose'
    }
  },

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
