const path = require('path');

module.exports = {
    webpack: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },

    // Development server configuration
    // devServer: {
    //     port: 3000,
    //     open: true,
    //     proxy: {
    //       // Proxy API requests to backend
    //       '/api': {
    //         target: 'http://localhost:8080',
    //         changeOrigin: true
    //       }
    //     }
    //   },
};