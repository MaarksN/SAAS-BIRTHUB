/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    "@salesos/ui",
    "@salesos/core",
    "@salesos/database",
    "@salesos/auth",
    "@salesos/prospector",
    "@salesos/hub",
    "@salesos/communication",
    "@salesos/ai",
    "@salesos/ai-assistant"
  ],
  reactStrictMode: true,
};

module.exports = nextConfig;
