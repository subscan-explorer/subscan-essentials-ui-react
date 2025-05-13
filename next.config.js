/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
const nextConfig = {
  output: 'standalone',
  server: {
    port: process.env.PORT,
    hostname: process.env.HOSTNAME,
  },
  async rewrites() {
    return []
  },
}

module.exports = withBundleAnalyzer(nextConfig)
