'use strict'

/** All dialog wrappers */
export const wrappers = {}

/**
 * Map props definition to args.
 *
 * If the name of the first prop is one of the keys of the first argument,
 * that argument will be ignored.
 *
 * e.g. `makeDialog(component, 'title')({ title: 'some title' })`.
 * The `title` will be `'some title'`, not the object `{ title: 'some title' }`.
 * This will be less ambiguous.
 *
 * @param {string[]} props
 * @param {any[]} args
 */
function collectProps (props, args) {
  return props.reduce((propsData, prop, i) => {
    if (
      (i !== 0 && args[i] !== undefined) ||
      typeof args[0] !== 'object' ||
      args[0][props[0]] === undefined
    ) {
      propsData[prop] = args[i]
    }

    return propsData
  }, {})
}

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
    appear: Boolean,
    appearActiveClass: String,
    appearClass: String,
    appearToClass: String,
    css: Boolean,
    duration: String,
    enterActiveClass: String,
    enterClass: String,
    enterToClass: String,
    leaveActiveClass: String,
    leaveClass: String,
    leaveToClass: String,
    moveClass: String,
    tag: String,
    type: String
  },
  data: () => ({
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
        props: Object.assign({},
          this.$attrs, this.$props,
          { name: this.transitionName }
        ),
        on: this.$listeners
      },
      this.dialogIds.map(dialogId => {
        const dialog = this.dialogs[dialogId]
        return createElement(dialog.component, {
          key: dialog.id,
          props: dialog.propsData,
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

      // Prepare the props of the dialog component
      const defaultPropsData = {
        dialogId: id,
        arguments: args
      }

      // If the first argument of the dialog function is an object,
      // use it as a part of the propsData
      const firstArgObject = typeof args[0] === 'object' ? args[0] : {}
      const propsData = Object.assign(
        {},
        defaultPropsData,
        firstArgObject,
        collectProps(options.props, args)
      )

      // Add this dialog to `this.dialogs`,
      // and inject 'close' function into `promise`
      promise.close = this.pushDialog({ id, propsData, promise, resolve, ...options })

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
