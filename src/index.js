'use strict'

import { find } from './util'
import modalWrapperFactory from './dialogs-wrapper'

let Vue = null
let modalFunctions = []

function findModalByName (name) {
  return find(modalFunctions, item => item.name === name)
}

export var debug = process.env.NODE_ENV === 'development'

export function install (vue, options) {
  // export vue instance to global scope
  // so that we can easily modify its prototype
  Vue = vue

  // create an anchor element for modal dialogs' wrapper
  const anchor = document.createElement('div')
  document.body.insertBefore(anchor, document.body.childNodes[0])

  // and mount the modal dialogs' wrapper on that anchor
  const ModalWrapper = modalWrapperFactory(options)
  new ModalWrapper().$mount(anchor)
}

/**
 * Add a modal function into Vue.prototype
 * so that you can access this function
 * via `this.$<name>` from a Vue component.
 */
export function use (name, options) {
  name = name.toString().trim()

  // make sure 'name' is unique
  if (findModalByName(name) && debug) {
    console.warn(`[vue-modal] Another modal function ${name} is already exist.`)
  }

  modalFunctions.push(options)
  Vue.prototype[`$${name}`] = show.bind(undefined, name)
}

export function show (name) {
  return new Promise((resolve, reject) => {
    if (!findModalByName(name) && debug) {
      console.warn(`[vue-modal] Modal dialog ${name} is not found.`)
    }

    // TODO
  })
}
