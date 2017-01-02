'use strict'

import { find, findIndex, defaultsDeep } from './util'

// filter bad wrapper options and add default options
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

  return defaultsDeep(options, {
    wrapper: {
      tag: 'div',
      class: 'modal-dialogs-wrapper',
      transition: {
        name: 'modal-dialog'
      }
    },
    zIndex: {
      value: 1000,
      autoIncrement: true
    }
  })
}

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
          this.dialogs.push({
            id: id,
            resolve,
            reject,
            args,
            options: dialogOptions,
            zIndex: wrapperOptions.zIndex.value,
            close: this.close.bind(this, id)
          })

          ++id
          if (wrapperOptions.zIndex.autoIncrement) {
            ++wrapperOptions.zIndex.value
          }
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
          dialog.resolve({ id, data })
        }
      }
    },
    render (h) {
      let renderedDialogs = []
      for (let i = 0; i < this.dialogs.length; i++) {
        const dialog = this.dialogs[i]
        renderedDialogs.push(h(dialog.options.component, defaultsDeep({ component: null }, dialog.options, {
          key: dialog.id,
          style: {
            zIndex: dialog.zIndex
          },
          props: {
            args: dialog.args
          },
          on: {
            close: dialog.close
          }
        })))
      }

      return h('transition-group', {
        class: wrapperOptions.wrapper.class,
        props: {
          tag: wrapperOptions.wrapper.tag,
          ...wrapperOptions.wrapper.transition
        },
        on: wrapperOptions.wrapper.transition
      }, renderedDialogs)
    }
  })
}
