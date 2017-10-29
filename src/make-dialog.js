'use strict'

import diff from 'arr-diff'
import { wrappers } from './dialogs-wrapper'

/** Dialog function maker */
export default function makeDialog (options, ...props) {
  let wrapper = 'default'
  let component = options

  if (options.component) {
    component = options.component
    wrapper = options.wrapper
    props = options.props || []
  }

  // Dialog component and props
  const dialogOptions = {
    props,

    // Inject a `$close` function and pre-defined props into dialog component
    component: {
      extends: component,
      props: diff(['dialogId', 'arguments', ...props], Object.keys(component.props || [])),
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
    } else if (process.env.NODE_ENV !== 'production') {
      const message = `[vue-modal-dialogs] Wrapper ${wrapper} is not found. Make sure that you have added <dialogs-wrapper wrapper-name="${wrapper}" /> component somewhere in your project.`
      return Promise.reject(new Error(message))
    }
  }
}
