import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/passport-uploads/:path*',
        destination: '/api/passport-uploads/:path*'
      },
      {
        source: '/photo-uploads/:path*',
        destination: '/api/photo-uploads/:path*'
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'etauktravel.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
