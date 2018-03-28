'use strict'

import { wrappers } from './wrapper'
import { isComponentCtor, generateDialogData } from './utils'

/** Create a dialog function */
export function create (options, ...props) {
  if (options == null) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('[vue-modal-dialogs] Dialog options cannot be null or undefined')
    }

    return null
  }

  let wrapper = 'default'
  let component = options

  if (isComponentCtor(options.component)) {
    component = options.component
    wrapper = options.wrapper || wrapper
    props = options.props || []
  } else if (!isComponentCtor(options)) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('[vue-modal-dialogs] No Vue component constructor is passed into makeDialog function')
    }

    return null
  }

  const dialogData = generateDialogData(props, component)
  return function dialogFunction (...args) {
    if (wrappers[wrapper]) {
      // Add dialog component into dialogsWrapper component
      return wrappers[wrapper].add(dialogData, args)
    } else {
      if (process.env.NODE_ENV !== 'production') {
        console.error(`[vue-modal-dialogs] Wrapper ${wrapper} is not found. Make sure that you have added <dialogs-wrapper wrapper-name="${wrapper}" /> component somewhere in your project.`)
      }

      return Promise.reject(new TypeError(`Undefined reference to wrapper ${wrapper}`))
    }
  }
}
