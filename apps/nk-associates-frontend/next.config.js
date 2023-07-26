/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "127.0.0.1",
      "localhost",
      "https://strapi-dev.nkgroupofcompanies.com/",
    ],
  },
};

module.exports = nextConfig;
