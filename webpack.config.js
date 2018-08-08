const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
const WebpackMd5Hash = require('webpack-md5-hash')

module.exports = (env, { mode }) => {
    const isDev = mode === 'development'

    const output = {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
    }

    if (isDev) {
        output.filename = 'bundle.js'
    } else {
        output.filename = '[name].[chunkhash].js'
    }

    let plugins = []

    if (isDev) {
        plugins = [
            new CleanWebpackPlugin(['dist']),
            new CopyWebpackPlugin([
                { from: './src/index.html' },
                { from: './src/assets', to: './assets' },
            ]),
            new HardSourceWebpackPlugin(),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoEmitOnErrorsPlugin(),
            new HtmlWebpackPlugin({     // Create HTML file that includes references to bundled CSS and JS.
                template: 'src/index.html',
                minify: {
                    removeComments: true,
                    collapseWhitespace: true,
                },
                inject: true,
            }),
        ]
    } else {
        plugins = [
            new CopyWebpackPlugin([
                { from: './src/assets', to: './assets' },
            ]),
            new WebpackMd5Hash(),

            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify('production'),
                __DEV__: false,
            }),

            new HtmlWebpackPlugin({
                template: 'src/index.html',
                favicon: 'src/assets/img/favicon/favicon.ico',
                minify: {
                    removeComments: true,
                    collapseWhitespace: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeStyleLinkTypeAttributes: true,
                    keepClosingSlash: true,
                    minifyJS: true,
                    minifyCSS: true,
                    minifyURLs: true,
                },
                inject: true,
                trackJSToken: '',
            }),
        ]
    }

    const config = {
        resolve: {
            extensions: ['*', '.js', '.jsx', '.json'],
            alias: {
                Modules: path.resolve(__dirname, './src/modules'),
                Config: path.resolve(__dirname, './src/config.json'),
            },
        },
        entry: ['babel-polyfill', path.resolve(__dirname, './src/app.js')],
        target: 'web',
        mode,
        output,
        plugins,
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    use: ['babel-loader'],
                },
                {
                    test: /\.eot(\?v=\d+.\d+.\d+)?$/,
                    use: ['file-loader'],
                },
                {
                    test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                limit: 10000,
                                mimetype: 'application/font-woff',
                            },
                        },
                    ],
                },
                {
                    test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                limit: 10000,
                                mimetype: 'application/octet-stream',
                            },
                        },
                    ],
                },
                {
                    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                limit: 10000,
                                mimetype: 'image/svg+xml',
                            },
                        },
                    ],
                },
                {
                    test: /\.(jpe?g|png|gif|ico)$/i,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name].[ext]',
                            },
                        },
                    ],
                },
                {
                    test: /^((?!\.module).)*(\.css|\.scss|\.sass)$/,
                    use: [
                        'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                            },
                        }, {
                            loader: 'postcss-loader',
                            options: {
                                plugins: () => [
                                    require('autoprefixer'),
                                ],
                                sourceMap: true,
                            },
                        },
                        'sass-loader',
                    ],
                },

                {
                    test: /\.module\.sass$/,
                    use: [
                        'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                importLoaders: 1,
                                localIdentName: '[local]__[hash:base64:5]',
                                camelCase: true,
                                minimize: false,
                            },
                        },
                        'sass-loader',
                    ],
                },
            ],
        },
    }

    if (isDev) {
        config.devServer = {
            contentBase: path.join(__dirname, 'dist'),
            port: 9000,
            compress: true,
            publicPath: '/',
            stats: 'minimal',
        }
    }

    return config
}
