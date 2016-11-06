/**
 * Created by clicktronix on 30.10.16.
 */
'use strict';

let ExtractTextPlugin = require('extract-text-webpack-plugin');
let HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    context: __dirname + '/dev',
    entry: {
        main: ['./app.js', './main.styl']
    },
    output: {
        path: './public',
        filename: 'bundle.js'
    },

    module: {
        loaders: [{
            test: /\.pug$/,
            loader: 'pug'
        }, {
            test: /\.styl$/,
            loader: ExtractTextPlugin.extract('css!stylus?resolve url')
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel?presets[]=es2015'
        }]
    },

    devtool: 'source-map',

    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './index.pug'
        }),
        new ExtractTextPlugin('[name].css', {allChunks: true})
    ]
};
