// GITHUB_PAGES=true switches on a static export served from /parselab-site.
// Normal dev and production builds are unaffected.
const isPages = process.env.GITHUB_PAGES === 'true';
const basePath = isPages ? '/parselab-site' : '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  ...(isPages && {
    output: 'export',
    basePath,
    trailingSlash: true,
    env: { NEXT_PUBLIC_BASE_PATH: basePath },
  }),
  images: isPages
    ? // Static export has no image optimiser; the loader only prefixes basePath.
      { loader: 'custom', loaderFile: './lib/pagesImageLoader.ts' }
    : {
        formats: ['image/avif', 'image/webp'],
        // Add merchant/product/team image hosts here as real photography lands.
        remotePatterns: [],
      },
};

export default nextConfig;
