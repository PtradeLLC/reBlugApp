/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.ts$/,
      use: "ts-loader",
      exclude: /node_modules/,
    });
    config.resolve.extensions.push(".ts", ".tsx");

    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "replicate.com",
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: "lh3.googleusercontent.com",
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: "https://replicate.delivery/pbxt/",
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: "forgedmart.ghost.io",
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: "images.unsplash.com",
        pathname: '**',
      },
      {
        protocol: "https",
        hostname: "replicate.delivery",
      },
    ],
  },
  env: {
    // @see https://github.com/facebookexperimental/Recoil/issues/2135#issuecomment-1362197710
    RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED: "false",
  }
};

module.exports = nextConfig;
