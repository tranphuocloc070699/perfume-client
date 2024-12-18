/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**"
      },
      {
        protocol: "http",
        hostname: "localhost"
      }
    ]
  },
  async rewrites() {
    return [
      {
        source: "/api/auth/:path*",
        destination: "/api/auth/:path*"
      },
      {
        source: "/api/:path*",
        destination: `${process.env.BACKEND_DOMAIN}/:path*`
      }
    ];
  }
};

export default nextConfig;
