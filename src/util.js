'use strict'

import forOwn from 'for-own'
import isObject from 'is-extendable'

/**
 * Find the first item that matches the comparator
 *
 * @export
 * @param {Array<any>} arr
 * @param {Function<boolean>} comparator
 */
export function find (arr, comparator) {
  for (var i = 0; i < arr.length; i++) {
    if (comparator(arr[i])) {
      return arr[i]
    }
  }
}

/**
 * Find the first item that matches the comparator
 * and return its index
 *
 * @export
 * @param {Array<any>} arr
 * @param {Function<boolean>} comparator
 */
export function findIndex (arr, comparator) {
  for (var i = 0; i < arr.length; i++) {
    if (comparator(arr[i])) {
      return i
    }
  }

  return -1
}

/**
 * A simple defaultsDeep (like lodash) that works only on objects.
 * Modified from https://github.com/jonschlinkert/defaults-deep
 *
 * @export
 * @param {Object[]} sources
 * @returns {Object}
 */
export function defaultsDeep (...sources) {
  let target = {}

  function copy (target, current) {
    forOwn(current, function (value, key) {
      var val = target[key]
      // add the missing property, or allow a null property to be updated
      if (val == null) {
        target[key] = value
      } else if (isObject(val) && isObject(value)) {
        target[key] = defaultsDeep(val, value)
      }
    })
  }

  sources.forEach(source => (source && copy(target, source)))
  return target
}

/**
 * Check if a JavaScript Object can be used as a Vue Component constructor
 *
 * @export
 * @param {Object|Function} obj
 * @returns {boolean}
 */
export function isVueComponent (obj) {
  return (
    obj != null &&
    (typeof obj === 'object' || typeof obj === 'function')
  ) && (
    // must not a Vue instance
    Object.getPrototypeOf(obj).constructor.name !== 'VueComponent'
  ) && (
    // result of Vue.extend
    (typeof obj === 'function' && obj.name === 'VueComponent') ||

    // import from a .vue file
    Array.isArray(obj.staticRenderFns) ||

    // has a render function
    typeof obj.render === 'function'
  )
}
