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

export function isComponentCtor (obj) {
  if (obj != null) {
    const type = typeof obj
    if (type === 'object') {
      return (
        // Accept any thenable object
        // because we have no idea about what is in that promise
        typeof obj.then === 'function' ||

        // Accept component options (typically a single file component)
        typeof obj.render === 'function' ||

        // Accept user-written component options (not recommended)
        typeof obj.template === 'string'
      )
    } else if (type === 'function') {
      // All vue constructor has a `cid` property
      return typeof obj.cid === 'number'
    }
  }

  return false
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
