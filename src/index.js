'use strict'

import { find } from './util'
import modalWrapperFactory from './dialogs-wrapper'

class VueModalDialog {
  constructor () {
    this.Vue = null
    this.debug = process.env.NODE_ENV === 'development'
    this.modalWrapper = null
    this.modalFunctions = []
  }

  _findModalByName (name) {
    return find(this.modalFunctions, item => item.name === name)
  }

  install (vue, options) {
    // export vue instance to global scope
    // so that we can easily modify its prototype
    this.Vue = vue

    // create an anchor element for modal dialogs' wrapper
    const anchor = document.createElement('div')
    document.body.insertBefore(anchor, document.body.childNodes[0])

    // and mount the modal dialogs' wrapper on that anchor
    const ModalWrapper = modalWrapperFactory(options)
    this.modalWrapper = new ModalWrapper()
    this.modalWrapper.$mount(anchor)
  }

  /**
   * Add a modal function into Vue.prototype
   * so that you can access this function
   * via `this.$<name>` from a Vue component.
   */
  use (name, options) {
    name = name.toString().trim()

    // make sure 'name' is unique
    if (this._findModalByName(name)) {
      if (this.debug) console.warn(`[vue-modal] Another modal function ${name} is already exist.`)
      return
    }

    this.modalFunctions.push(options)
    this.Vue.prototype[`$${name}`] = this.show.bind(undefined, name)
  }

  show (name, ...args) {
    return new Promise((resolve, reject) => {
      const modal = this._findModalByName(name)
      if (!modal) {
        if (this.debug) console.warn(`[vue-modal] Modal dialog ${name} is not found.`)
        return reject(new Error(`Modal dialog ${name} is not found.`))
      }

      return this.modalWrapper.add(modal, ...args)
    })
  }
}

export default new VueModalDialog()
