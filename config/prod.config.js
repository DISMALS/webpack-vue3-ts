const path = require('path');
const CopyWebpackPlugin = reuqire('copy-webpack-plugin');
const CleanWebpackPlugin = reuqire('clean-webpack-plugin');

const basicConfig = require('./basic.config');

const plugins = [
    new CopyWebpackPlugin({
        patterns: [
            {from: '../assets', to: '../dist/assets'}
        ]
    }),
    new CleanWebpackPlugin({
        cleanStaleWebpackAssets: false,
        cleanOnceBeforeBuildPatterns: [path.join(__dirname, 'dist'), '**/*']
    })
];

basicConfig.plugins.push(...plugins);

module.exports = {
    mode: 'production',
    ...basicConfig
};