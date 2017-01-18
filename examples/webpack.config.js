'use strict'

const fs = require('fs')
const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: fs.readdirSync(__dirname).reduce((entries, dir) => {
    const fullDir = path.join(__dirname, dir)
    const entry = path.join(fullDir, 'main.js')
    if (fs.statSync(fullDir).isDirectory() && fs.existsSync(entry)) {
      entries[dir] = entry
    }

    return entries
  }, {}),
  output: {
    path: path.resolve(__dirname, '/__build__/'),
    filename: '[name].js',
    publicPath: './'
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
                ['es2015', { 'modules': false }],
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
      'vue-modal-dialogs': path.resolve(__dirname, '../src')
    },
    extensions: ['.js', '.vue'],
    modules: ['node_modules']
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('common'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    })
  ],
  performance: {
    hints: false
  }
}
