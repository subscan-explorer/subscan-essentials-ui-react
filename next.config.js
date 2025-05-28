/** @type {import('next').NextConfig} */

const { configureRuntimeEnv } = require('next-runtime-env/build/configure');

configureRuntimeEnv();

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
const nextConfig = {
  output: 'standalone',
  async rewrites() {
    return []
  },
}

module.exports = withBundleAnalyzer(nextConfig)
