/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    "@salesos/ui",
    "@salesos/core",
    "@salesos/database",
    "@salesos/auth",
    "@salesos/prospector",
    "@salesos/hub"
  ],
  reactStrictMode: true,
};

module.exports = nextConfig;
