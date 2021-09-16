const path = require('path');
const basicConfig = require('./basic.config');
const webpack = require('webpack');

basicConfig.optimization.moduleIds = 'named';
basicConfig.optimization.chunkIds = 'named';

const plugins = [
    new webpack.HotModuleReplacementPlugin()
];
basicConfig.plugins.push(...plugins);

module.exports = {
    ...basicConfig,
    mode: 'development',
    watch: {
        ignored: '**/node_modules'
    },
    devtool: 'eval-cheap-source-map',
    devServer: {
        hot: true,
        open: true,
        port: '8800',
        client: {
            logging: 'warn',
            overlay: {
                errors: true,
                warnings: false
            },
            progress: true,
        },
        // http2: true,
        // https: true,
        compress: false,
        static: {
            directory: path.join(__dirname, '../assets'),
            watch: true
        },
        watchFiles: ['src/**/*', 'assets/**/*'],
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
            }
        }
    },
    watchOptions: {
        ignored: /node_modules/
    }
};