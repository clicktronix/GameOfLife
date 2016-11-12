
var webpackConfig = require('./webpack.config.js');

module.exports = function (config) {

    config.set({

        basePath: './dev/tests/',

        browsers: ['PhantomJS'],

        frameworks: ['mocha', 'chai'],

        files: [
            '../../packages/jquery-3.1.1.min.js',
            '../../packages/easeljs-0.8.2.min.js',
            'tests.js'
        ],

        reporters: ['mocha'],

        preprocessors: {
            'tests.js': ['webpack', 'sourcemap']
        },

        webpack: webpackConfig,

        webpackMiddleware: {
            noInfo:true
        },

        plugins: [
            require('karma-webpack'),
            require('karma-mocha'),
            require('karma-chai'),
            require('karma-mocha-reporter'),
            require('karma-sourcemap-loader'),
            require('karma-phantomjs-launcher')
        ],

        mochaReporter: {
            colors: {
                error: 'bgRed'
            }
        },
    });
};