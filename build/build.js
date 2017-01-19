'use strict'

const fs = require('fs')
const path = require('path')
const rollup = require('rollup')
const uglify = require('uglify-js')

const buble = require('rollup-plugin-buble')
const replace = require('rollup-plugin-replace')
const commonjs = require('rollup-plugin-commonjs')
const nodeResolve = require('rollup-plugin-node-resolve')

const dist = path.resolve(__dirname, '../dist')
if (!fs.existsSync(dist)) {
  fs.mkdirSync(dist)
}

build([
  {
    suffix: '',
    type: 'umd',
    env: 'development'
  },
  {
    suffix: 'min',
    type: 'umd',
    env: 'production'
  },
  {
    suffix: 'common',
    type: 'cjs'
  }
])

function build (configs) {
  let promise = Promise.resolve()
  configs.forEach(config => {
    promise = promise.then(() => {
      const rollupConfig = {
        entry: path.resolve(__dirname, '../src/index.js'),
        plugins: [
          nodeResolve(),
          commonjs(),
          buble()
        ]
      }

      if (config.env) {
        rollupConfig.plugins.push(replace({ 'process.env.NODE_ENV': JSON.stringify(config.env) }))
      }

      return rollup.rollup(rollupConfig)
    }).then(bundle => {
      const dest = path.join(dist, `vue-modal-dialogs${config.suffix ? `-${config.suffix}` : ''}.js`)
      let result = bundle.generate({
        format: config.type,
        moduleName: 'VueModalDialogs'
      })

      if (config.suffix === 'min') {
        result = uglify.minify(result.code, {
          fromString: true,
          output: {
            screw_ie8: true,
            ascii_only: true
          },
          compress: {
            pure_funcs: ['makeMap']
          }
        })
      }

      console.log(path.parse(dest).base, size(result.code))
      return write(dest, result.code)
    })
  })
}

function write (dest, content) {
  return new Promise((resolve, reject) => {
    fs.writeFile(dest, content, err => {
      if (err) reject(err)
      else resolve()
    })
  })
}

function size (code) {
  return (code.length / 1024).toFixed(2) + 'kb'
}
