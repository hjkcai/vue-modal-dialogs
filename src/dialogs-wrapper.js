'use strict'

import Vue from 'vue'
import defaultsDeep from 'lodash/defaultsDeep'
import { find, findIndex } from './util'

// filter bad wrapper options and add default options
function parseWrapperOptions (options) {
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

export default function modalWrapperFactory (wrapperOptions) {
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
          const dialog = {
            id: id++,
            resolve,
            reject,
            options: dialogOptions
          }

          // prepare render options
          dialog.renderOptions = defaultsDeep(dialog.options, {
            key: dialog.id,
            style: {
              zIndex: wrapperOptions.zIndex.value
            },
            props: { args },
            on: {
              close: this.close.bind(this, id)
            }
          })

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
        renderedDialogs.push(h(dialog.options.component, dialog.renderOptions))
      }

      return h('transition-group', wrapperOptions.transition, renderedDialogs)
    }
  })
}
