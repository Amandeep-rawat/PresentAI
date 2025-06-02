import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'th.bing.com',  // Updated to include the provided link's hostname
        port: '',
        pathname: '/th/id/**', // Match the correct pathname pattern for the Bing images
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
     {
  protocol: 'https',
  hostname: 'res.cloudinary.com',
  port: '',
  pathname: '/**', // Match all paths from any Cloudinary subaccount
},
    ],
  },
};

export default nextConfig;
