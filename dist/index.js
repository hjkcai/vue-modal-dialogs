'use strict'

import diff from 'arr-diff'
import { isVueComponent } from './util'
import dialogsWrapperFactory from './dialogs-wrapper'

var Vue = null
var dialogsWrapper = null
var debug = process.env.NODE_ENV === 'development'

var VueModalDialogs = {
  // VueModalDialogs plugin installer
  install: function install (vue, options) {
    Vue = vue
    options = Object.assign({ el: null }, options)

    // A mount element for the DialogsWrapper component
    var el = options.el
    if (typeof el === 'string') {
      el = document.querySelector(el)
    }

    if (el == null) {
      el = document.createElement('div')
      document.body.insertBefore(el, document.body.childNodes[0])
    }

    // Mount the DialogsWrapper component on `el`.
    // Dialog components will be added into this wrapper.
    var DialogsWrapper = dialogsWrapperFactory(Vue, options)
    dialogsWrapper = new DialogsWrapper(options.wrapperComponentOptions)
    dialogsWrapper.$mount(el)
  },
  makeDialog: makeDialog
}

VueModalDialogs.default = VueModalDialogs
export default VueModalDialogs

// Dialog function maker
export function makeDialog (options) {
  var props = [], len = arguments.length - 1;
  while ( len-- > 0 ) props[ len ] = arguments[ len + 1 ];

  var component
  if (isVueComponent(options)) {
    component = options
  } else if (isVueComponent(options.component)) {
    props = options.props
    component = options.component
  } else {
    if (debug) { console.error('[vue-modal-dialogs] No Vue component specified') }
    return
  }

  // Dialog component and props
  var dialogConfig = {
    props: props,

    // Inject a `$close` function and pre-defined props into dialog component
    component: Vue.extend({
      extends: component,
      props: diff(['dialogId', 'arguments' ].concat( props), Object.keys(component.props || [])),
      methods: {
        $close: function $close (data) {
          this.$emit('vue-modal-dialogs:close', data)
        }
      }
    })
  }

  // Return dialog function
  return function dialogFunction () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    if (dialogsWrapper) {
      // Add dialog component into dialogsWrapper component
      return dialogsWrapper.add(dialogConfig, args)
    } else if (debug) {
      console.error('[vue-modal-dialogs] Plugin not initialized. Please call Vue.use before calling dialog functions.')
    }
  }
}
