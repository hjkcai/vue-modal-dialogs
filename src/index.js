'use strict'

import Vue from 'vue'
import makeDialog from './make-dialog'
import DialogsWrapper from './dialogs-wrapper'

const VueModalDialogs = {
  /** VueModalDialogs plugin installer */
  install (Vue, options) {
    Vue.component('DialogsWrapper', DialogsWrapper)
  },
  makeDialog,
  DialogsWrapper,
  DialogComponent: Vue
}

VueModalDialogs.default = VueModalDialogs
export default VueModalDialogs
export {
  makeDialog,
  DialogsWrapper,
  Vue as DialogComponent
}
