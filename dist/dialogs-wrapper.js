'use strict'

import { find, findIndex, defaultsDeep } from './util'

/* Filter bad wrapper options and add default options */
function parseWrapperOptions (options) {
  if (typeof options !== 'object') { options = {} }

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

  var result = defaultsDeep(options, {
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
  var _id = 0

  return Vue.extend({
    name: 'ModalDialogsWrapper',
    data: function () { return ({
      dialogs: []
    }); },
    methods: {
      // add a new modal dialog into this wrapper
      add: function add (dialogOptions, args) {
        var this$1 = this;

        // the unique id of this dialog
        var id = _id++

        // the function for closing this dialog
        var close = this.close.bind(this, id)

        // this promise will be resolved when 'close' function is called
        var promise = new Promise(function (resolve, reject) {
          this$1.dialogs.push(Object.freeze({
            id: id,
            args: args,
            close: close,
            promise: promise,
            resolve: resolve,
            options: defaultsDeep(dialogOptions, { render: {} }),
            zIndex: wrapperOptions.zIndex.value
          }))

          if (wrapperOptions.zIndex.autoIncrement) {
            ++wrapperOptions.zIndex.value
          }
        }).then(function (data) {
          var index = findIndex(this$1.dialogs, function (dialog) { return dialog.id === id; })
          if (index > -1) { this$1.dialogs.splice(index, 1) }
          return data
        })

        // inject 'close' function into this promise
        promise.close = close
        return promise
      },
      // close a modal dialog by id
      close: function close (id, data) {
        var dialog = find(this.dialogs, function (item) { return item.id === id; })
        if (dialog) {
          // resolve previously created promise in 'add' method
          dialog.resolve(data)
        }

        return Promise.resolve(dialog ? dialog.promise : null)
      }
    },
    render: function render (createElement) {
      return createElement('transition-group', wrapperOptions.wrapper, this.dialogs.map(function (dialog) {
        // map args to props
        var props = dialog.options.props.reduce(function (props, prop, i) {
          props[prop] = dialog.args[i]
          return props
        }, {
          dialogId: dialog.id,
          arguments: dialog.args
        })

        // merge the default render options with user's render options
        var renderOptions = defaultsDeep(dialog.options.render, {
          key: dialog.id,
          style: { zIndex: dialog.zIndex },
          props: props,
          on: { 'vue-modal-dialogs:close': dialog.close }
        })

        // render component
        return createElement(dialog.options.component, renderOptions)
      }))
    }
  })
}
