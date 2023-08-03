/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  output: "standalone",
};

module.exports = {
  ...nextConfig,
  images: {
    domains: ["127.0.0.1", "strapi-dev.nkgroupofcompanies.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "strapi-dev.nkgroupofcompanies.com",
        pathname: "/uploads/**",
      },
    ],
  },
};
