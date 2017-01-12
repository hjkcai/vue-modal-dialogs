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
  let target = sources[0] || {}

  function copy (target, current) {
    forOwn(current, function (value, key) {
      var val = target[key]
      // add the missing property, or allow a null property to be updated
      if (val == null) {
        target[key] = value
      } else if (isObject(val) && isObject(value)) {
        defaultsDeep(val, value)
      }
    })
  }

  sources.forEach(source => (source && copy(target, source)))
  return target
}
