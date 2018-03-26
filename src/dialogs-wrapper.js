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
    transitionName: String,
    tag: String,
    appear: Boolean,
    css: Boolean,
    mode: String,
    type: String,
    moveClass: String,
    enterClass: String,
    leaveClass: String,
    enterToClass: String,
    leaveToClass: String,
    enterActiveClass: String,
    leaveActiveClass: String,
    appearClass: String,
    appearActiveClass: String,
    appearToClass: String,
    duration: [Number, String, Object]
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
  beforeDestroy () {
    wrappers[this.name] = undefined
  },
  render (createElement) {
    const on = Object.assign({}, this.$listeners)

    // Modify the 'after-leave' event for the transition promise
    const afterLeave = on['after-leave'] || (() => { /* noop */ })
    on['after-leave'] = el => {
      el.$afterLeave()
      afterLeave(el)
    }

    // Render the wrapper as transition-group
    return createElement(
      'transition-group',
      {
        on,
        props: Object.assign({},
          this.$options.propsData,
          { name: this.transitionName }
        )
      },
      this.dialogIds.map(dialogId => {
        const dialog = this.dialogs[dialogId]
        return createElement(dialog.component, {
          key: dialog.id,
          props: dialog.propsData,
          on: {
            'vue-modal-dialogs:close': dialog.close,
            'vue-modal-dialogs:error': dialog.error
          }
        })
      })
    )
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
        const propsData = Object.assign({
          dialogId: id,
          arguments: args
        }, collectProps(dialogData.props, args))

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
