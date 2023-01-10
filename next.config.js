/** @type {import('next').NextConfig} */
const path = require('path')
const CompressionPlugin = require('compression-webpack-plugin');

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  distDir: 'build',
  trailingSlash: false,
  webpack: function(config) {
    config.plugins.push(new CompressionPlugin());
    return config;
  },
  images: {
    unoptimized: true,
    loader: 'custom'
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')]
  }
}

module.exports = nextConfig
