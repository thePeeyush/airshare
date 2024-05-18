/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        missingSuspenseWithCSRBailout: false,
      },
    images: {
        remotePatterns: [{
          protocol: 'https',
          hostname: 'img.freepik.com',
        }]
    }
};

import withPWA from 'next-pwa';

const pwaConfig = {
  dest: 'public', // Destination directory for the PWA files
  disable: process.env.NODE_ENV === 'development', // Disable PWA in development mode
  register: true, // Register the PWA service worker
  skipWaiting: true, // Skip waiting for service worker activation
};

const withPWAConfig = withPWA(pwaConfig);

export default withPWAConfig(nextConfig);