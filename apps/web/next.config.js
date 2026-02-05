const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
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

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(withNextIntl(nextConfig));
