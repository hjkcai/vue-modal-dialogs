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

/** Return a copy of the original object without some specific keys */
function objectWithoutKeys (obj, keys) {
  return Object.keys(obj).reduce((newObj, key) => {
    if (keys.indexOf(key) === -1) {
      newObj[key] = obj[key]
    }

    return newObj
  }, {})
}

/** Keys to remove in the dialog's render options */
const CUSTOM_OPTIONS = ['component', 'args', 'inject']

export default function modalWrapperFactory (Vue, wrapperOptions) {
  wrapperOptions = parseWrapperOptions(wrapperOptions)

  // an auto-increment id to indentify dialogs
  let id = 0

  return Vue.extend({
    name: 'ModalDialogsWrapper',
    data: () => ({
      dialogs: []
    }),
    methods: {
      // add a new modal dialog into this wrapper
      add (dialogOptions, ...args) {
        return new Promise((resolve, reject) => {
          this.dialogs.push(Object.freeze({
            id,
            resolve,
            args,
            options: dialogOptions,
            zIndex: wrapperOptions.zIndex.value,
            close: this.close.bind(this, id)
          }))

          ++id    // make sure id will never duplicate
          if (wrapperOptions.zIndex.autoIncrement) {
            ++wrapperOptions.zIndex.value
          }

          /* this promise will be resolved when 'close' method is called */
        }).then(({ id, data }) => {
          const index = findIndex(this.dialogs, item => item.id === id)
          if (index > -1) this.dialogs.splice(index, 1)

          return data
        })
      },
      // close a modal dialog by id
      close (id, data) {
        const dialog = find(this.dialogs, item => item.id === id)
        if (dialog) {
          // resolve previously created promise in 'add' method
          dialog.resolve({ id, data })
        }
      }
    },
    render (createElement) {
      return createElement('transition-group', wrapperOptions.wrapper, this.dialogs.map(dialog => {
        // map args to props
        // dialog.options.args is the arguments map
        // dialog.args are the real arguments the user have passed
        const props = dialog.options.args.reduce((props, prop, i) => {
          props[prop] = dialog.args[i]
          return props
        }, { args: dialog.args })

        // merge the default render options with user's dialog options
        const renderOptions = defaultsDeep(dialog.options, {
          key: dialog.id,
          style: { zIndex: dialog.zIndex },
          props,
          on: { close: dialog.close }
        })

        // render component
        return createElement(dialog.options.component, objectWithoutKeys(renderOptions, CUSTOM_OPTIONS))
      }))
    }
  })
}
