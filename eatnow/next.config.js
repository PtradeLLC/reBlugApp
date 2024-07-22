const withPWA = require('next-pwa')({
    dest: 'public',
    register: true,
    skipWaiting: true,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    webpack(config) {
        config.plugins = config.plugins.filter(
            plugin => plugin.constructor.name !== 'GenerateSW'
        );
        return config;
    },
    // Add the bodyParser size limit configuration
    api: {
        bodyParser: {
            sizeLimit: '5mb',
        },
    },
};

module.exports = withPWA({
    ...nextConfig,
});


// const withPWA = require('next-pwa')({
//     dest: 'public',
//     register: true,
//     skipWaiting: true,
// });

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     reactStrictMode: true,
//     swcMinify: true,
//     webpack(config) {
//         config.plugins = config.plugins.filter(
//             plugin => plugin.constructor.name !== 'GenerateSW'
//         );
//         return config;
//     },
// };

// module.exports = withPWA({
//     ...nextConfig
// });

