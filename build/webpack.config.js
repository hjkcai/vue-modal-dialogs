'use strict'

const path = require('path')
const webpack = require('webpack')

let config = {
  entry: path.resolve(__dirname, '../src/index.js'),
  output: {
    path: path.resolve(__dirname, '../dist'),
    library: 'vue-modal'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [ ['es2015', { 'modules': false }] ]
            }
          },
          'eslint-loader'
        ],
        exclude: [
          path.resolve(__dirname, '../node_modules')
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

module.exports = config
