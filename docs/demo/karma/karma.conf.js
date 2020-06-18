/**
 * @file karma demo file
 **/

const webpackConfig = require('./webpack.config.js');

module.exports = function (config) {
    config.set({
        frameworks: ['mocha'],

        files: [
            'test/**/*.test.js'
        ],

        preprocessors: {
            '**/*.test.js': ['webpack', 'sourcemap']
        },

        webpack: webpackConfig,

        reporters: ['spec', 'coverage'],

        coverageReporter: {
            dir: './coverage',
            reporters: [
                {type: 'lcov', subdir: '.'},
                {type: 'text-summary'}
            ]
        },

        browsers: ['Chrome']
    });
};
