'use strict'

const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const examples = path.join(__dirname, 'examples')

module.exports = {
  entry: {
    app: path.join(examples, 'main.ts')
  },
  devServer: {
    publicPath: '/'
  },
  output: {
    path: path.resolve(__dirname, 'docs'),
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production' ? '/vue-modal-dialogs/' : '/'
  },
  devtool: 'sourcemap',
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
                css: 'vue-style-loader!css-loader',
                less: 'vue-style-loader!css-loader!less-loader'
              },
              postcss: [
                require('autoprefixer')({
                  browsers: ['last 5 versions']
                })
              ]
            }
          }
        ]
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/]
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
        use: 'file-loader'
      }
    ]
  },
  resolve: {
    alias: {
      'vue-modal-dialogs': path.resolve(__dirname, 'src')
    },
    extensions: ['.js', '.ts', '.vue'],
    modules: ['examples', 'node_modules']
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(examples, 'index.html'),
      chunks: ['app'],
      chunksSortMode: 'dependency',
      inject: true
    })
  ],
  performance: {
    hints: false
  }
}
