/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        missingSuspenseWithCSRBailout: false,
      },
    images: {
        domains: ["img.freepik.com"],
    }
};

export default nextConfig;