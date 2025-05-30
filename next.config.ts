import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',  // allows all HTTPS hosts
        port: '',
        pathname: '/**', // allows all paths
      },
    ],
  }
  /* config options here */
};

export default nextConfig;
