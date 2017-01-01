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
