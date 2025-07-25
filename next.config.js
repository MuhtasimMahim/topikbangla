/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (config, { isServer }) => {
    // Handle canvas module
    config.resolve.alias.canvas = false

    // Handle PDF.js worker
    config.resolve.alias["pdfjs-dist/build/pdf.worker.js"] = false

    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        canvas: false,
        fs: false,
        net: false,
        tls: false,
      }
    }

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
    unoptimized: true,
  },
  experimental: {
    esmExternals: "loose",
  },
}

module.exports = nextConfig
