'use strict'

import { find, findIndex, defaultsDeep } from './util'

/* Filter bad wrapper options and add default options */
function parseWrapperOptions (options) {
  if (typeof options !== 'object') options = {}

  if (options.wrapper && typeof options.wrapper !== 'object') {
    options.wrapper = undefined
  }

  if (options.zIndex === false) {
    options.zIndex = {
      value: null,
      autoIncrement: false
    }
  } else if (options.zIndex && typeof options.zIndex !== 'object') {
    options.zIndex = undefined
  }

  let result = defaultsDeep(options, {
    wrapper: {
      class: 'modal-dialogs-wrapper',
      props: {
        tag: 'div',
        name: 'modal-dialog'
      }
    },
    zIndex: {
      value: 1000,
      autoIncrement: true
    }
  })

  return result
}

export default function modalWrapperFactory (Vue, wrapperOptions) {
  wrapperOptions = parseWrapperOptions(wrapperOptions)

  // an auto-increment id to identify dialogs
  let _id = 0

  return Vue.extend({
    name: 'ModalDialogsWrapper',
    data: () => ({
      dialogs: []
    }),
    methods: {
      // add a new modal dialog into this wrapper
      add (dialogOptions, ...args) {
        // the unique id of this dialog
        const id = _id++

        // the function for closing this dialog
        const close = this.close.bind(this, id)

        // this promise will be resolved when 'close' function is called
        const promise = new Promise((resolve, reject) => {
          this.dialogs.push(Object.freeze({
            id,
            args,
            close,
            promise,
            resolve,
            options: defaultsDeep(dialogOptions, { render: {} }),
            zIndex: wrapperOptions.zIndex.value
          }))

          if (wrapperOptions.zIndex.autoIncrement) {
            ++wrapperOptions.zIndex.value
          }
        }).then(data => {
          const index = findIndex(this.dialogs, dialog => dialog.id === id)
          if (index > -1) this.dialogs.splice(index, 1)
          return data
        })

        // inject 'close' function into this promise
        promise.close = close
        return promise
      },
      // close a modal dialog by id
      close (id, data) {
        const dialog = find(this.dialogs, item => item.id === id)
        if (dialog) {
          // resolve previously created promise in 'add' method
          dialog.resolve(data)
        }

        return Promise.resolve(dialog ? dialog.promise : null)
      }
    },
    render (createElement) {
      return createElement('transition-group', wrapperOptions.wrapper, this.dialogs.map(dialog => {
        // map args to props
        // dialog.options.props is the arguments map
        // dialog.args are the real arguments the user have passed
        const props = dialog.options.props.reduce((props, prop, i) => {
          props[prop] = dialog.args[i]
          return props
        }, { args: dialog.args })

        // merge the default render options with user's render options
        const renderOptions = defaultsDeep(dialog.options.render, {
          key: dialog.id,
          style: { zIndex: dialog.zIndex },
          props,
          on: { close: dialog.close }
        })

        // render component
        return createElement(dialog.options.component, renderOptions)
      }))
    }
  })
}
