/** @type {import('next').NextConfig} */
const path = require("path")

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  distDir: "build",
  images: {
    unoptimized: true
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')]
  },
  assetPrefix: './'
}

module.exports = nextConfig
