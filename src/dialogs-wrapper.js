'use strict'

import Vue from 'vue'
import defaultsDeep from 'lodash/defaultsDeep'
import { findIndex } from './util'

export default function modalWrapperFactory (wrapperOptions) {
  wrapperOptions = defaultsDeep(wrapperOptions, {
    wrapperClass: 'modal-dialogs-wrapper',
    transition: {
      tag: 'div',
      name: 'modal-dialog'
    },
    zIndex: {
      value: 1000,
      autoIncrement: true
    }
  })

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
            id: id++,
            resolve,
            reject,
            args,
            options: dialogOptions,
            zIndex: wrapperOptions.zIndex.value
          })

          if (wrapperOptions.zIndex.autoIncrement) {
            ++wrapperOptions.zIndex.value
          }
        }).then(({ id, data }) => {
          const index = findIndex(this.dialogs, item => item.id === id)
          if (index > -1) this.dialogs.splice(index, 1)

          return data
        })
      }
    },
    render (h) {
      // TODO
    }
  })
}
