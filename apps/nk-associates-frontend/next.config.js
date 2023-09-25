/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  output: "standalone",
};

module.exports = {
  ...nextConfig,
  // target: "serverless",
  // rules: [
  //   {
  //     test: /\.pdf$/i,
  //     use: "raw-loader",
  //   },
  // ],
  // future: { webpack5: true },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "strapi-dev.nkgroupofcompanies.com",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        pathname: "/uploads/**",
      },
    ],
  },
  // webpack: (config, options) => {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;
    config.module.rules.push({
      test: /\.(glb|gltf)$/,
      type: "asset/resource",
    });

    config.module.rules.push({
      test: /\.pdf/,
      use: "raw-loader",
    });

    return config;
  },
};
