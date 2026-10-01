/** @type {import('next').NextConfig} */
const nextConfig = {
  // `yarn verify --full` builds into its own directory so it never disturbs `next dev`.
  distDir: process.env.NEXT_DIST_DIR || '.next',
};

export default nextConfig;
