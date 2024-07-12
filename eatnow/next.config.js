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
};

module.exports = withPWA({
    ...nextConfig
});


// const withPWA = require('next-pwa')({
//     dest: 'public',
//     register: true,
//     skipWaiting: true,
//     disable: process.env.NODE_ENV === 'development', // Disable PWA in development
//     buildExcludes: [/middleware-manifest\.json$/], // Exclude files if necessary
// });

// const nextConfig = {
//     reactStrictMode: true,
//     swcMinify: true,
//     webpack: (config, { isServer }) => {
//         if (!isServer && process.env.NODE_ENV === 'production') {
//             const { GenerateSW } = require('workbox-webpack-plugin');

//             // Prevent adding multiple instances of GenerateSW
//             if (!config.plugins.some(plugin => plugin instanceof GenerateSW)) {
//                 config.plugins.push(
//                     new GenerateSW({
//                         swDest: 'public/service-worker.js',
//                         clientsClaim: true,
//                         skipWaiting: true,
//                     })
//                 );
//             }
//         }
//         return config;
//     },
// };

// module.exports = withPWA(nextConfig);
