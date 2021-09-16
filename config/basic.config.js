const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const node_env = process.env.NODE_ENV;
const apiEnviroment = process.env.API_ENVIROMENT || '';

module.exports = {
    context: path.join(__dirname, '/'),
    entry: {
        main: path.join(__dirname, '../src/main.ts')
    },
    output: {
        filename: '[name].[fullhash].js',
        chunkFilename: '[id].[contenthash].js',
        chunkFormat: 'module',
        clean: true,
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    'vue-style-loader',
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: node_env === 'development'
                        }
                    },
                    'postcss-loader',
                    {
                        loader: 'less-loader',
                        options: {
                            sourceMap: node_env === 'development'
                        }
                    }
                ],
                exclude: path.join(__dirname, 'node_modules')
            },
            {
                test: /\.css$/,
                oneOf: [
                    {
                        resourceQuery: /module/,
                        use: [
                            'vue-style-loader',
                            {
                                loader: 'css-loader',
                                options: {
                                    sourceMap: node_env === 'development',
                                    modules: true,
                                    // 自定义生成类名
                                    localIdentName: '[local]_[hash:base64:8]'
                                }
                            },
                            'postcss-loader'
                        ]
                    },
                    {
                        use: [
                            'vue-style-loader',
                            'style-loader',
                            'postcss-loader'
                        ]
                    }
                ],
                exclude: path.join(__dirname, 'node_modules')
            },
            {
                test: /\.tsx?$/,
                use: [
                    'babel-loader',
                    {
                        loader: 'ts-loader',
                        options: {
                            appendTsSuffixTo: [/TS\.vue$/]
                        }
                    }
                ],
                exclude: path.join(__dirname, 'node_modules'),
            },
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: path.join(__dirname, 'node_modules')
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        ts: 'babel-loader'
                    },
                    hotReload: node_env === 'development'
                }
            },
            {
                test: /\.html$/i,
                loader: 'html-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                loader: 'url-loader',
                options: {
                    limite: 10200,
                    name: '[name].[ext]',
                    outputPath: 'assets/images',
                    quality: 85,
                }
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.vue', '.html'],
        alias: {
            '@': path.join(__dirname, 'src'),
            'static': path.join(__dirname, 'assets')
        },
        descriptionFiles: ['package.json'],
        modules: ['node_modules', path.join(__dirname, 'assets')]
    },
    optimization:{
        minimize: node_env !== 'development',
        emitOnErrors: true,
        removeAvailableModules: true,
        minimizer: [
            new TerserPlugin({
                parallel: true,
                terserOptions: {
                    ecma: 5
                }
            })
        ],
        splitChunks: {
            automaticNameDelimiter: '-',
            chunks: 'all',
            maxInitialRequests: 15,
            minSize: 15000,
            maxSize: 50000,
            cacheGroups: {
                runtimeChunk: 'single',
                defaultVendors: {
                    test: /[\\/]node_modules[\\/](vuex?|vue\-router)/,
                    // name(module, chunks, cacheGroupKey) {
                    //     console.log('vendors', module.context);
                    //     return `vendors-${cacheGroupKey}`;
                    // },
                    reuseExistingChunk: true
                },
                commons: {
                    test: /[\\/]node_modules[\\/][^(vuex?|vue\-router)]/,
                    // name(module, chunks, cacheGroupKey) {
                    //     console.log('commons', module.context);
                    // },
                    reuseExistingChunk: true
                }
            }
        }
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            title: '测试webpack',
            base: '/',
            template: '../src/index.html'
        }),
        new webpack.NormalModuleReplacementPlugin(
            /enviroment\/enviroment/,
            function(resource) {
                resource.request = resource.request.replace(
                    /enviroment\/enviroment/,
                    `enviroment/enviroment${apiEnviroment && apiEnviroment !== 'dev' ? '.' + apiEnviroment : ''}`
                );
            }
        )
    ]
};