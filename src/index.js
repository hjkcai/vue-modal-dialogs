'use strict'

import dialogsWrapperFactory from './dialogs-wrapper'
import { isVueComponent } from './util'

let Vue = null
let dialogsWrapper = null
const debug = process.env.NODE_ENV === 'development'

const VueModalDialogs = {
  // Dialog function maker
  makeDialog (options, ...props) {
    let component
    if (isVueComponent(options)) {
      component = options
    } else if (isVueComponent(options.component)) {
      props = options.props
      component = options.component
    } else {
      if (debug) console.error('[vue-modal-dialogs] No Vue component specified')
      return
    }

    // Dialog component and props
    const dialogConfig = {
      props,

      // Inject a `$close` function into dialog component
      component: Vue.extend({
        extends: component,
        methods: {
          $close (data) {
            this.$emit('vue-modal-dialogs:close', data)
          }
        }
      })
    }

    // Return dialog function
    return function dialogFunction (...args) {
      if (dialogsWrapper) {
        // Add dialog component into dialogsWrapper component
        return dialogsWrapper.add(dialogConfig, args)
      } else if (debug) {
        console.error('[vue-modal-dialogs] Plugin not initialized. Please call Vue.use before calling dialog functions.')
      }
    }
  },
  // VueModalDialogs plugin installer
  install (vue, options) {
    Vue = vue
    options = Object.assign({ el: null }, options)

    // A mount element for the DialogsWrapper component
    let el = options.el
    if (typeof el === 'string') {
      el = document.querySelector(el)
    }

    if (el == null) {
      el = document.createElement('div')
      document.body.insertBefore(el, document.body.childNodes[0])
    }

    // Mount the DialogsWrapper component on `el`.
    // Dialog components will be added into this wrapper.
    const DialogsWrapper = dialogsWrapperFactory(Vue, options)
    dialogsWrapper = new DialogsWrapper()
    dialogsWrapper.$mount(el)
  }
}

VueModalDialogs.default = VueModalDialogs
export default VueModalDialogs
