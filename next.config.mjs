/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "product.hstatic.net",
      "bizweb.dktcdn.net",
      "unsplash.com",
      "images.unsplash.com",
    ],
  },
};

export default nextConfig;
