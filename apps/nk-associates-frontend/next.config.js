/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["www.google.com", "127.0.0.1"],
    //env does not work here
  },
};

module.exports = nextConfig;
