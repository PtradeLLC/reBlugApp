/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config) {
    config.resolve.fallback = { fs: false };
    config.module.rules.push({
      test: /\.ts$/,
      use: "ts-loader",
      exclude: /node_modules/,
    });
    config.resolve.extensions.push(".ts", ".tsx");

    return config;
  },

  images: {
    domains: ["images.unsplash.com", "lh3.googleusercontent.com", "res.cloudinary.com"],
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
};

module.exports = nextConfig;
