'use strict'

export const makeDialog = require('./make-dialog').default
export const DialogsWrapper = require('./dialogs-wrapper').default

const VueModalDialogs = {
  /** VueModalDialogs plugin installer */
  install (Vue, options) {
    Vue.component('DialogsWrapper', DialogsWrapper)
  },
  makeDialog,
  DialogsWrapper
}

VueModalDialogs.default = VueModalDialogs
export default VueModalDialogs
