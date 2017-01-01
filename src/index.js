'use strict'

let Vue = null
let modalFunctions = []

export var debug = process.env.NODE_ENV === 'development'

export function install (vue) {
  // export vue instance to global scope
  // so that we can easily modify its prototype
  Vue = vue
}
