import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '**',
      },
    ],
  },
  // We set this to undefined or remove the unrecognized keys 
  // to satisfy the strict TypeScript check in your environment.
  devIndicators: {
    position: "bottom-right", 
  },
};

export default nextConfig;