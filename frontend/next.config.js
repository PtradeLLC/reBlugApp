const withPWA = require('next-pwa')({
    dest: 'public',
    register: true,
    disable: process.env.NODE_ENV === 'development',
    buildExcludes: [/middleware-manifest.json$/],
    skipWaiting: true,
    runtimeCaching: [],
    mode: 'production',
    clientsClaim: true,
    maximumFileSizeToCacheInBytes: 50 * 1024 * 1024
});

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    transpilePackages: ['article-assistant'],
    experimental: {
        externalDir: true
    },
    webpack(config) {
        // No need to filter out GenerateSW manually
        return config;
    },
    // Moved to workboxOpts
};

module.exports = nextConfig;






// const withPWA = require('next-pwa')({
//     dest: 'public',
//     register: true,
//     skipWaiting: true,
// });

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     reactStrictMode: true,
// //     // Add the bodyParser size limit configuration
//     api: {
//         bodyParser: {
//             sizeLimit: '5mb',
//         },
//     },
//     webpack(config) {
//         // Do not manually filter out GenerateSW
//         return config;
//     },
// };

// module.exports = nextConfig;



// const withPWA = require('next-pwa')({
//     dest: 'public',
//     register: true,
//     skipWaiting: true,
// });

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     reactStrictMode: true,
// //     webpack(config) {
//         config.plugins = config.plugins.filter(
//             plugin => plugin.constructor.name !== 'GenerateSW'
//         );
//         return config;
//     },
//     // Add the bodyParser size limit configuration
//     api: {
//         bodyParser: {
//             sizeLimit: '5mb',
//         },
//     },
// };

// module.exports = withPWA({
//     ...nextConfig,
// });