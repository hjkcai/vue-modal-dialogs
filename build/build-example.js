'use strict'

const webpack = require('webpack')

process.env.NODE_ENV = 'production'
const webpackBaseConfig = require('./config/example')

webpack(webpackBaseConfig, function (err, stat) {
  if (err) console.error(err)
  console.log(stat.toString({
    chunks: false,
    colors: true
  }), '\n')
})
