// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // experimental: {
  //   allowedDevOrigins: ["https://wernetech.com:3000"],
  // },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
