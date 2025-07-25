/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.alias.canvas = false
    return config
  },
  async rewrites() {
    return [
      {
        source: "/api/pdf",
        destination: "/api/pdf",
      },
    ]
  },
  images: {
    domains: ["www.topikguide.com"],
  },
}

module.exports = nextConfig
