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

export default nextConfig;