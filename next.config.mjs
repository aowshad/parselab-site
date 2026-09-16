/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    // Add merchant/product/team image hosts here as real photography lands.
    remotePatterns: [],
  },
};

export default nextConfig;
