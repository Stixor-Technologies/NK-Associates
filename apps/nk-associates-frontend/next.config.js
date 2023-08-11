/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  output: "standalone"
};

module.exports = {
  ...nextConfig,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "strapi-dev.nkgroupofcompanies.com",
        pathname: "/uploads/**"
      }
    ]
  }
};
