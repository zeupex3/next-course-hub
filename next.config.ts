import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.genius.com' },
      { protocol: 'https', hostname: 'images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com' },
      { protocol: 'https', hostname: 'encrypted-tbn0.gstatic.com' },
      { protocol: 'https', hostname: 'www.myband.co.th' },
      { protocol: 'https', hostname: 'cheewid.com' },
      { protocol: 'https', hostname: 'cheewid-public-upload-production.s3-ap-southeast-1.amazonaws.com' },
      { protocol: 'https', hostname: 's359.kapook.com' },
      { protocol: 'https', hostname: 'cdn.prod.website-files.com' },
      { protocol: 'https', hostname: 'c.min.ms' },
    ],
  },
};

export default nextConfig;