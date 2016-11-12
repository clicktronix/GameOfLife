/**
 * Created by clicktronix on 12.11.16.
 */

let webpackConfig = require('./webpack.config.js');

module.exports = function (config) {

    config.set({

        basePath: 'dev/__tests__/',

        browsers: ['PhantomJS'],

        frameworks: ['mocha', 'chai'],

        files: [
            '../../packages/canteen.min.js',
            '../../packages/jquery-3.1.1.min.js',
            '../../packages/easeljs-0.8.2.min.js',
            'tests.js'
        ],

        reporters: ['mocha'],

        preprocessors: {
            'tests.js': ['webpack']
        },

        webpack: webpackConfig,

        plugins: [
            require('karma-webpack'),
            require('karma-mocha'),
            require('karma-chai'),
            require('karma-mocha-reporter'),
            require('karma-phantomjs-launcher')
        ],

        mochaReporter: {
            colors: {
                error: 'bgRed'
            }
        },
    });
};