'use strict'

import { wrappers } from './wrapper'
import {
  noop,
  CLOSE_EVENT,
  ERROR_EVENT,
  isComponentCtor,
  filterUndefinedProps
} from './utils'

function generateDialogData (props, component) {
  let dialogData

  // eslint-disable-next-line no-return-assign
  return dialogData = {
    props,
    createdCallback: noop,
    component: Promise.resolve(component).then(component => ({
      extends: component.default || component,
      props: filterUndefinedProps(['arguments', ...props], component),
      created () {
        // Resolves componentPromise that is created in DialogsWrapper.add()
        dialogData.createdCallback(this)
      },
      methods: {
        $close (data) {
          this.$emit(CLOSE_EVENT, data)
        },
        $error (data) {
          this.$emit(ERROR_EVENT, data)
        }
      }
    }))
  }
}

/** Create a dialog function */
export function create (options, ...props) {
  if (options == null) {
    if (process.env.NODE_ENV === 'development') {
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
    if (process.env.NODE_ENV === 'development') {
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
      if (process.env.NODE_ENV === 'development') {
        console.error(`[vue-modal-dialogs] Wrapper ${wrapper} is not found. Make sure that you have added <dialogs-wrapper wrapper-name="${wrapper}" /> component somewhere in your project.`)
      }

      return Promise.reject(new TypeError(`Undefined reference to wrapper ${wrapper}`))
    }
  }
}
