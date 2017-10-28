'use strict'

process.env.CHROME_BIN = require('puppeteer').executablePath()

module.exports = function (config) {
  config.set({
    browsers: ['ChromeHeadless'],
    frameworks: ['mocha', 'sinon-chai'],
    reporters: ['spec'],
    files: ['./index.js'],
    preprocessors: {
      './index.js': ['webpack', 'sourcemap']
    },
    webpack: require('../webpack.config'),
    webpackMiddleware: {
      noInfo: true
    }
  })
}
