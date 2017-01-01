'use strict'

const webpack = require('webpack')
const webpackMerge = require('webpack-merge')

process.env.NODE_ENV = 'production'
const webpackBaseConfig = require('./webpack.config')

webpack([

  // non-minified standalone
  webpackMerge(webpackBaseConfig, {
    output: {
      filename: 'vue-modal.js',
      libraryTarget: 'umd'
    }
  }),

  // minified standalone
  webpackMerge(webpackBaseConfig, {
    output: {
      filename: 'vue-modal.min.js',
      libraryTarget: 'umd'
    },
    plugins: [
      new webpack.LoaderOptionsPlugin({
        minimize: true
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
    ]
  }),

  // non-minified commonjs (for development)
  webpackMerge(webpackBaseConfig, {
    output: {
      filename: 'vue-modal.common.js',
      library: '',
      libraryTarget: 'commonjs'
    }
  })

], function (err, stats) {
  if (err) console.error(err)
  stats.stats.forEach(function (stat) {
    console.log(stat.toString({
      chunks: false,
      colors: true
    }), '\n')
  })
})
