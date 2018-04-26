const webpack = require('webpack');
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const extractTextWebpackPlugin = require('extract-text-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';

const config = {
    target: 'web',
    entry: path.join(__dirname, 'src/index.js'),
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            // {
            //     test: /\.css$/,
            //     use: [
            //         {
            //             loader: 'style-loader'
            //         },
            //         {
            //             loader: 'css-loader'
            //         }
            //     ]
            // },
            {
                test: /\.(jpg|jpeg|gif|png|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024,
                            name: '[name].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: isDev
                    ? '"development"'
                    : '"production"'
            }
        }),
        new htmlWebpackPlugin()
    ]
};

if (isDev) {
    config.devtool = '#cheap-module-eval-source-map';
    config.devServer = {
        // host: '0.0.0.0',
        open: true,
        hot: true,
        overlay: {
            errors: true
        }
    };

    config.module.rules.push(
        {
            test: /\.less$/,
            use: [
                {
                    loader: 'style-loader'
                },
                {
                    loader: 'css-loader'
                },
                {
                    loader: 'postcss-loader',
                    options: {
                        sourceMap: true
                    }
                },
                {
                    loader: 'less-loader'
                }
            ]
        }
    );

    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    );

} else {

    config.entry = {
        app: path.join(__dirname, 'src/index.js'),
        lib: ['vue']
    };

    config.output.filename = '[name]-[chunkhash:8].js';

    config.devServer = {
        host: '0.0.0.0',
        port: '8081',
        open: true,
    };

    config.module.rules.push(
        {
            test: /\.less$/,
            use: extractTextWebpackPlugin.extract({
                fallback: 'style-loader',
                use: [
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'less-loader'
                    }
                ]
            })
        }
    );

    config.plugins.push(
        new extractTextWebpackPlugin('style-[contentHash:8].css'),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'lib'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'runtime'
        })
    );
}

module.exports = config;
