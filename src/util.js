'use strict'

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
 * A simple defaultsDeep (like lodash) that works only on objects
 *
 * @export
 * @param {Object[]} sources
 * @returns Object
 */
export function defaultsDeep (...sources) {
  let result = {}

  sources.forEach(source => {
    if (source === null || typeof source !== 'object') return

    Object.keys(source).forEach(key => {
      if (typeof source[key] === 'object' && (typeof result[key] === 'object' || result[key] === undefined)) {
        result[key] = defaultsDeep(result[key], source[key])
      } else if (result[key] === undefined) {
        result[key] = source[key]
      }
    })
  })

  return result
}
