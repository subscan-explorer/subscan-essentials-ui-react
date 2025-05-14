/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
const nextConfig = {
  output: 'standalone',
  distDir: 'build',
  async rewrites() {
    return []
  },
}

module.exports = withBundleAnalyzer(nextConfig)
