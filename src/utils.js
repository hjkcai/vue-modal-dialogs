'use strict'

export function noop () { /* nothing */ }

export const CLOSE_EVENT = 'vue-modal-dialogs:close'
export const ERROR_EVENT = 'vue-modal-dialogs:error'

export const transitionGroupProps = {
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
}

export function collectProps (props, args) {
  if (props.length === 0 && args[0] && typeof args[0] === 'object') {
    return args[0]
  }

  return props.reduce((propsData, prop, i) => {
    propsData[prop] = args[i]
    return propsData
  }, {})
}

export function isVueConstructor (obj) {
  if (obj != null) {
    const type = typeof obj
    if (type === 'object') {
      return typeof obj.then === 'function' ||
        typeof obj.render === 'function' ||
        typeof obj.template === 'string'
    } else if (type === 'function') {
      return isVueConstructor(obj.options)
    }

    return false
  }
}

export function filterUndefinedProps (props, component) {
  const propKeys = {}
  const queue = [component]

  function pushIfNotNull (value) {
    if (value != null) {
      queue.push(value)
    }
  }

  // eslint-disable-next-line no-cond-assign
  while (component = queue.shift()) {
    let propKeysArray
    if (Array.isArray(component.props)) {
      propKeysArray = component.props
    } else if (typeof component.props === 'object') {
      propKeysArray = Object.keys(component.props)
    }

    if (propKeysArray) {
      propKeysArray.forEach(key => {
        propKeys[key] = true
      })
    }

    // If component is from Vue.extend, the real options are in component.options
    pushIfNotNull(component.options)

    // Iterate over component's parent compoent and mixins
    pushIfNotNull(component.extends)
    if (Array.isArray(component.mixins)) {
      component.mixins.forEach(pushIfNotNull)
    }
  }

  return props.filter(key => !propKeys[key])
}

export function generateDialogData (props, component) {
  let dialogData

  // eslint-disable-next-line no-return-assign
  return dialogData = {
    props,
    createdCallback: noop,
    component: Promise.resolve(component).then(component => ({
      extends: component.default || component,
      props: filterUndefinedProps(['dialogId', 'arguments', ...props], component),
      created () {
        // Resolves componentPromise that is created in DialogsWrapper.add()
        dialogData.createdCallback(this)
      },
      methods: {
        $close (data) {
          this.$emit(CLOSE_EVENT, data)
        },
        $error (data) {
          this.$emit(ERROR_EVENT, data)
        }
      }
    }))
  }
}
