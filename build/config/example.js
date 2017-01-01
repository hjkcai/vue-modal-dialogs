'use strict'

const path = require('path')
const webpack = require('webpack')
const HTMLWebpackPlugin = require('html-webpack-plugin')

let config = {
  entry: path.resolve(__dirname, '../../example/main.js'),
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, '../../dist/example'),
    publicPath: './'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'babel-loader',
          'eslint-loader'
        ],
        exclude: [
          path.resolve(__dirname, '../../node_modules')
        ]
      },
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              loaders: {
                css: 'css-loader',
                less: 'css-loader!less-loader'
              },
              postcss: [
                require('autoprefixer')({
                  browsers: ['last 5 versions']
                })
              ]
            }
          },
          'eslint-loader'
        ]
      }
    ]
  },
  resolve: {
    alias: {
      'vue-modal': path.resolve(__dirname, '../../src')
    },
    extensions: ['.js', '.vue'],
    modules: ['node_modules']
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    })
  ]
}

let HTMLconfig = {
  filename: 'index.html',
  template: path.resolve(__dirname, '../../example/index.html'),
  inject: true
}

if (process.env.NODE_ENV === 'production') {
  HTMLconfig.minify = {
    removeComments: true,
    collapseWhitespace: true
  }

  config.plugins.push(
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  )
}

config.plugins.push(new HTMLWebpackPlugin(HTMLconfig))
module.exports = config
