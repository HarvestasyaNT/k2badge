const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
        k2Badge:'./src/index.js',
        canvas: './src/k2Canvas.js'
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
      },
    stats: {
        colors: true
    },
    resolve: {
        /*modules: [
            'node_modules',
            path.resolve(__dirname, 'src'),
        ],*/
        alias: {
            'jquery-ui': 'jquery-ui-dist/'
          },
        extensions: ['.js', '.es6', '.json']
      },
    devtool: 'source-map',
    mode: "production"
};