/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn11.bigcommerce.com'],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `https://api.bigcommerce.com/stores/${process.env.NEXT_PUBLIC_BIGCOMMERCE_STORE_HASH}/v3/carts?include=redirect_urls`,
      },
    ]
  },
}

module.exports = nextConfig
