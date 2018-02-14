'use strict'

/** All dialog wrappers */
export const wrappers = {}

/**
 * Map props definition to args.
 *
 * @param {string[]} props
 * @param {any[]} args
 */
function collectProps (props, args) {
  if (props.length === 0 && args[0] && typeof args[0] === 'object') {
    return args[0]
  }

  return props.reduce((propsData, prop, i) => {
    propsData[prop] = args[i]
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
    wrappers[this.name] = this
  },
  render (createElement) {
    // Render the wrapper as transition-group
    return createElement(
      'transition-group',
      {
        props: Object.assign({},
          this.$options.propsData,
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
     * @param {Object} dialogOptions Dialog options created in the `makeDialog` function
     * @param {any[]} args Arguments from the dialog function
     */
    add (dialogOptions, args) {
      const id = this.id++
      let resolve

      // This promise will be resolved when 'close' function is called
      const promise = new Promise(res => { resolve = res })
        // Remove the dialog after it is closed
        .then(data => {
          this.$delete(this.dialogs, renderOptions.id)
          return data
        })

      // Magic 'resolve' outside the promise
      const close = promise.close = data => {
        resolve(data)
        return promise
      }

      // Prepare the props of the dialog component
      const propsData = Object.assign({
        dialogId: id,
        arguments: args
      }, collectProps(dialogOptions.props, args))

      // Build detailed render options
      const renderOptions = Object.assign({ id, propsData, promise, resolve, close }, dialogOptions)

      // Use Object.freeze to prevent vue from observing renderOptions
      this.$set(this.dialogs, renderOptions.id, Object.freeze(renderOptions))

      return promise
    }
  }
}
