/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
const nextConfig = {
  output: 'export',
  distDir: 'dist',
}

module.exports = withBundleAnalyzer(nextConfig)
