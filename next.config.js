/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { 
    unoptimized: true 
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb'
    }
  }
};

module.exports = nextConfig;