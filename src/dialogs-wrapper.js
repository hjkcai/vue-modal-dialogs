'use strict'

/** All dialog wrappers */
export const wrappers = {}

export default {
  name: 'DialogsWrapper',
  props: {
    name: {
      type: String,
      default: 'default',
      validator: value => value
    },
    transitionName: String
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
  created () {
    if (process.env.NODE_ENV !== 'production') {
      if (wrappers[this.name]) {
        console.error(`[vue-modal-dialogs] The wrapper '${this.name}' is already exist. Please make sure that every wrapper has a unique name.`)
      }
    }

    // Expose wrapper component
    if (!wrappers[this.name]) {
      wrappers[this.name] = this
    }
  },
  render (createElement) {
    // Render the wrapper as transition-group
    return createElement(
      'transition-group',
      {
        props: Object.assign({}, this.$attrs, { name: this.transitionName }),
        on: this.$listeners
      },
      this.dialogIds.map(dialogId => {
        const dialog = this.dialogs[dialogId]

        // Map args to props
        const props = dialog.props.reduce((props, prop, i) => {
          props[prop] = dialog.args[i]
          return props
        }, {
          dialogId,
          arguments: dialog.args
        })

        // Render component
        return createElement(dialog.component, {
          key: dialog.id,
          props,
          on: { 'vue-modal-dialogs:close': dialog.close }
        })
      })
    )
  },
  methods: {
    /**
     * Add a new dialog into this wrapper
     *
     * @private
     * @param {Object} options Dialog options created in the `makeDialog` function
     * @param {any[]} args Arguments from the dialog function
     */
    add (options, args) {
      const id = this.id++
      let resolve

      // This promise will be resolved when 'close' function is called
      const promise = new Promise(res => { resolve = res })

      // Add this dialog to `this.dialogs`,
      // and inject 'close' function into `promise`
      promise.close = this.pushDialog({ id, args, promise, resolve, ...options })

      return promise
    },

    /**
     * Add a dialog to `this.dialogs`
     *
     * @private
     * @param {Object} renderOptions Dialog render options generated in the `add` method
     * @returns {Function} A callback function to close the dialog
     */
    pushDialog (renderOptions) {
      // Resolve previously created promise in 'add' method
      renderOptions.close = data => {
        renderOptions.resolve(data)
        return renderOptions.promise
      }

      // Remove the dialog after it is closed
      renderOptions.promise = renderOptions.promise.then(data => {
        this.$delete(this.dialogs, renderOptions.id)
      })

      // Use Object.freeze to prevent vue from observing renderOptions
      this.$set(this.dialogs, renderOptions.id, Object.freeze(renderOptions))

      return renderOptions.close
    }
  }
}
