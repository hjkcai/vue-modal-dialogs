'use strict'

import {
  noop,
  CLOSE_EVENT,
  ERROR_EVENT,
  collectProps,
  transitionGroupProps
} from './utils'

/** All dialog wrappers */
export const wrappers = {}

/** DialogsWrapper component */
export default {
  name: 'DialogsWrapper',
  props: {
    name: {
      type: String,
      default: 'default',
      validator: value => value
    },
    transitionName: String,
    ...transitionGroupProps
  },
  data: () => ({
    /** An auto-increment id */
    id: 0,

    /** All dialogs to render. Dialog render options is stored here */
    dialogs: {}
  }),
  computed: {
    dialogIds () {
      return Object.keys(this.dialogs)
    }
  },
  mounted () {
    if (process.env.NODE_ENV === 'development') {
      if (wrappers[this.name]) {
        console.error(`[vue-modal-dialogs] The wrapper '${this.name}' is already exist. Please make sure that every wrapper has a unique name.`)
      }
    }

    // Expose wrapper component
    wrappers[this.name] = this
  },
  beforeDestroy () {
    wrappers[this.name] = undefined
  },
  render (createElement) {
    const on = { ...this.$listeners }

    // Modify the 'after-leave' event for the transition promise
    const afterLeave = on['after-leave'] || noop
    on['after-leave'] = el => {
      el.$afterLeave()
      afterLeave(el)
    }

    const props = {
      ...this.$options.propsData,
      name: this.transitionName
    }

    const children = this.dialogIds.map(dialogId => {
      const data = this.dialogs[dialogId]

      const on = {}
      on[CLOSE_EVENT] = data.close
      on[ERROR_EVENT] = data.error

      return createElement(data.component, {
        on,
        key: data.id,
        props: data.propsData
      })
    })

    // Render the wrapper as transition-group
    return createElement('transition-group', { on, props }, children)
  },
  methods: {
    /**
     * Add a new dialog component into this wrapper
     *
     * @private
     * @param {object} dialogData Data passed from the `makeDialog` function
     * @param {any[]} args Arguments from the dialog function
     */
    add (dialogData, args) {
      const id = this.id++
      let close, error

      // It will be resolved when 'close' function is called
      const dataPromise = new Promise((res, rej) => { close = res; error = rej })
        .then(data => { this.remove(id); return data })
        .catch(reason => { this.remove(id); throw reason })

      // It will be resolved after the component instance is created
      const instancePromise = new Promise(res => { dialogData.createdCallback = res })

      // It will be resolves after the dialog's leave transition ends
      const transitionPromise = instancePromise
        .then(component => new Promise(res => { component.$el.$afterLeave = res }))
        .then(() => dataPromise)

      const finalPromise = dialogData.component.then(component => {
        const propsData = {
          arguments: args,
          ...collectProps(dialogData.props, args)
        }

        // Use Object.freeze to prevent Vue from observing renderOptions
        const renderOptions = Object.freeze({ id, propsData, component, close, error })

        // Finally render the dialog component
        this.$set(this.dialogs, id, renderOptions)

        return dataPromise
      })

      return Object.assign(finalPromise, {
        close,
        error,
        transition: () => transitionPromise,
        getInstance: () => instancePromise
      })
    },

    /** Remove a dialog component from the wrapper */
    remove (id) {
      this.$delete(this.dialogs, id)
    }
  }
}
