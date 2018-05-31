const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin');



module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, 'src/js/app.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/app.js'
    },
    devtool: 'eval',
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        open: true,
        port: 7777
    },
    module: {
        rules: [
            {
                test: /\.js/,
                exclude: path.resolve(__dirname, 'node_modules'),
                loader: 'babel-loader',
                options: {
                    presets: ['env']
                }
            },
            // {
            //     test: /\.hbs$/,
            //     loader: 'handlebars-loader'
            // },
            {
                test: /\.sass$/,
                use: ExtractTextPlugin.extract(
                    {
                      fallback: 'style-loader',
                      use: ['css-loader', 'sass-loader']
                    })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: 'style.css'
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.html'
        }),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, './src/assets'),
                to: path.resolve(__dirname, 'dist/assets'),
                ignore: ['.*']
            }
        ]),
        new CleanWebpackPlugin(['dist'])
    ]
}