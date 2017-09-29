'use strict'

const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const examples = path.join(__dirname, 'examples')

module.exports = {
  entry: {
    app: path.join(examples, 'main.js')
  },
  devServer: {
    publicPath: '/'
  },
  output: {
    path: path.resolve(__dirname, 'docs'),
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production' ? '/vue-modal-dialogs/' : '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                ['env', {
                  'modules': false,
                  'targets': {
                    'browsers': ['> 1%', 'last 2 versions', 'not ie <= 8']
                  }
                }],
                'stage-2'
              ],
              plugins: ['transform-runtime']
            }
          },
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
                css: 'vue-style-loader!css-loader',
                less: 'vue-style-loader!css-loader!less-loader'
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
    extensions: ['.js', '.vue'],
    modules: ['node_modules']
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
