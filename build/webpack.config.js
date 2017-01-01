'use strict'

const path = require('path')
const merge = require('webpack-merge')
const webpack = require('webpack')

let config = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'babel-loader',
          'eslint-loader'
        ]
      }
    ]
  },
  resolve: {
    modules: ['node_modules']
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    })
  ]
}

if (process.env.NODE_ENV === 'production') {
  config = merge({
    entry: path.resolve(__dirname, '../src/index.js'),
    output: {
      path: path.resolve(__dirname, '../dist'),
      library: 'vue-modal'
    }
  }, config)
} else {
  config = merge({
    entry: path.resolve(__dirname, '../example/app.js'),
    output: {
      filename: 'app.js',
      publicPath: '/'
    },
    resolve: {
      alias: {
        'vue-modal': path.resolve(__dirname, '../src')
      }
    },
    devtool: 'eval-source-map'
  }, config)
}

module.exports = config
