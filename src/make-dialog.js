'use strict'

import diff from 'arr-diff'
import { wrappers } from './dialogs-wrapper'

function isVueConstructor (obj) {
  if (obj != null) {
    const type = typeof obj
    if (type === 'object') {
      return typeof obj.render === 'function' || typeof obj.template === 'string'
    } else if (type === 'function') {
      return isVueConstructor(obj.options)
    }

    return false
  }
}

/** Dialog function maker */
export default function makeDialog (options, ...props) {
  if (options == null) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('[vue-modal-dialogs] Dialog options cannot be null or undefined')
    }

    return null
  }

  let wrapper = 'default'
  let component = options

  if (isVueConstructor(options.component)) {
    component = options.component
    wrapper = options.wrapper || wrapper
    props = options.props || []
  } else if (!isVueConstructor(options)) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('[vue-modal-dialogs] No Vue component constructor is passed into makeDialog function')
    }

    return null
  }

  // Dialog component and props
  const dialogOptions = {
    props,

    // Inject a `$close` function and pre-defined props into dialog component
    component: {
      extends: component,
      props: diff(['dialogId', 'arguments', ...props], Object.keys(component.props || (component.options && component.options.props) || [])),
      created () {
        // See dialogs-wrapper.js:97
        dialogOptions.createdCallback(this)
      },
      methods: {
        $close (data) {
          this.$emit('vue-modal-dialogs:close', data)
        }
      }
    }
  }

  // Return dialog function
  return function dialogFunction (...args) {
    if (wrappers[wrapper]) {
      // Add dialog component into dialogsWrapper component
      return wrappers[wrapper].add(dialogOptions, args)
    } else {
      if (process.env.NODE_ENV !== 'production') {
        console.error(`[vue-modal-dialogs] Wrapper ${wrapper} is not found. Make sure that you have added <dialogs-wrapper wrapper-name="${wrapper}" /> component somewhere in your project.`)
      }

      return Promise.reject(new TypeError(`Undefined reference to wrapper ${wrapper}`))
    }
  }
}
