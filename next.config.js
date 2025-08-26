// next.config.js


const nextConfig = {
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
