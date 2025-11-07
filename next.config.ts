import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
 images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "caltechsites-prod-assets.s3.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
