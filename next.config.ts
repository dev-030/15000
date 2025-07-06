import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true, // remove this after all the work is completed
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        // hostname: 'edcluster12.b-cdn.net',  
        hostname: '**',  // allows all HTTPS hosts
        port: '',
        pathname: '/**', // allows all paths
      },
    ],
  }
  /* config options here */
};

export default nextConfig;
