// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // experimental: {
  //   allowedDevOrigins: ["http://5.161.71.249:3000"],
  // },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
