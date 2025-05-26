/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  output: "standalone",
};

module.exports = {
  ...nextConfig,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nk-backend.stixor.com",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "ow4ck0swwss4owcss8o0gsks.stixor.com",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        pathname: "/uploads/**",
      },
    ],
  },
  webpack: (config, options) => {
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
