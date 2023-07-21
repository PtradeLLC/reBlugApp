/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config) {
    config.experiments = { ...config.experiments, topLevelAwait: true };
    config.module.rules.push({
      test: /\.tsx?$/,
      loader: "ts-loader",
    });

    config.resolve.extensions.push(".ts", ".tsx");

    return config;
  },
  // experimental: {
  //   forceSwcTransforms: true,
  // },
  images: {
    domains: ["images.unsplash.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "replicate.com",
      },
      {
        protocol: "https",
        hostname: "replicate.delivery",
      },
    ],
  },
  babel: {
    presets: ["next/babel"],
  },
};

module.exports = nextConfig;
