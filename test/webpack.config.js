'use strict'

const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: path.join(__dirname, './index.js'),
  devServer: {
    publicPath: '/'
  },
  output: {
    filename: '[name].js',
    publicPath: '/'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'babel-loader',
          'eslint-loader'
        ],
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              loaders: {
                ts: 'ts-loader',
                css: 'vue-style-loader!css-loader'
              }
            }
          }
        ]
      },
      {
        test: /\.tsx?$/,
        use: [
          'babel-loader',
          {
            loader: 'ts-loader',
            options: {
              appendTsSuffixTo: [/\.vue$/]
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    alias: {
      'vue-modal-dialogs': path.resolve(__dirname, '../src')
    },
    extensions: ['.js', '.ts', '.tsx', '.vue'],
    modules: ['examples', 'node_modules']
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    })
  ],
  performance: {
    hints: false
  }
}
