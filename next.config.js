/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    appDir: true
  },
  images: {
    domains: [],
  },
};

module.exports = nextConfig;
