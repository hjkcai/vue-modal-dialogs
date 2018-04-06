import vue from 'vue';

'use strict';

function noop () { /* nothing */ }

var CLOSE_EVENT = 'vue-modal-dialogs:close';
var ERROR_EVENT = 'vue-modal-dialogs:error';

var transitionGroupProps = {
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
};

function collectProps (props, args) {
  if (props.length === 0 && args[0] && typeof args[0] === 'object') {
    return args[0]
  }

  return props.reduce(function (propsData, prop, i) {
    propsData[prop] = args[i];
    return propsData
  }, {})
}

function isComponentCtor (obj) {
  if (obj != null) {
    var type = typeof obj;
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

function filterUndefinedProps (props, component) {
  var propKeys = {};
  var queue = [component];

  function pushIfNotNull (value) {
    if (value != null) {
      queue.push(value);
    }
  }

  // eslint-disable-next-line no-cond-assign
  while (component = queue.shift()) {
    var propKeysArray = (void 0);
    if (Array.isArray(component.props)) {
      propKeysArray = component.props;
    } else if (typeof component.props === 'object') {
      propKeysArray = Object.keys(component.props);
    }

    if (propKeysArray) {
      propKeysArray.forEach(function (key) {
        propKeys[key] = true;
      });
    }

    // If component is from Vue.extend, the real options are in component.options
    pushIfNotNull(component.options);

    // Iterate over component's parent compoent and mixins
    pushIfNotNull(component.extends);
    if (Array.isArray(component.mixins)) {
      component.mixins.forEach(pushIfNotNull);
    }
  }

  return props.filter(function (key) { return !propKeys[key]; })
}

'use strict';

/** All dialog wrappers */
var wrappers = {};

/** DialogsWrapper component */
var DialogsWrapper = {
  name: 'DialogsWrapper',
  props: Object.assign({}, {name: {
      type: String,
      default: 'default',
      validator: function (value) { return value; }
    },
    transitionName: String},
    transitionGroupProps),
  data: function () { return ({
    /** An auto-increment id */
    id: 0,

    /** All dialogs to render. Dialog render options is stored here */
    dialogs: {}
  }); },
  computed: {
    dialogIds: function dialogIds () {
      return Object.keys(this.dialogs)
    }
  },
  created: function created () {
    if (process.env.NODE_ENV === 'development') {
      if (wrappers[this.name]) {
        console.error(("[vue-modal-dialogs] The wrapper '" + (this.name) + "' is already exist. Please make sure that every wrapper has a unique name."));
      }
    }

    // Expose wrapper component
    wrappers[this.name] = this;
  },
  beforeDestroy: function beforeDestroy () {
    wrappers[this.name] = undefined;
  },
  render: function render (createElement) {
    var this$1 = this;

    var on = Object.assign({}, this.$listeners);

    // Modify the 'after-leave' event for the transition promise
    var afterLeave = on['after-leave'] || noop;
    on['after-leave'] = function (el) {
      el.$afterLeave();
      afterLeave(el);
    };

    var props = Object.assign({}, this.$options.propsData,
      {name: this.transitionName});

    var children = this.dialogIds.map(function (dialogId) {
      var data = this$1.dialogs[dialogId];

      var on = {};
      on[CLOSE_EVENT] = data.close;
      on[ERROR_EVENT] = data.error;

      return createElement(data.component, {
        on: on,
        key: data.id,
        props: data.propsData
      })
    });

    // Render the wrapper as transition-group
    return createElement('transition-group', { on: on, props: props }, children)
  },
  methods: {
    /**
     * Add a new dialog component into this wrapper
     *
     * @private
     * @param {object} dialogData Data passed from the `makeDialog` function
     * @param {any[]} args Arguments from the dialog function
     */
    add: function add (dialogData, args) {
      var this$1 = this;

      var id = this.id++;
      var close, error;

      // It will be resolved when 'close' function is called
      var dataPromise = new Promise(function (res, rej) { close = res; error = rej; })
        .then(function (data) { this$1.remove(id); return data })
        .catch(function (reason) { this$1.remove(id); throw reason });

      // It will be resolved after the component instance is created
      var instancePromise = new Promise(function (res) { dialogData.createdCallback = res; });

      // It will be resolves after the dialog's leave transition ends
      var transitionPromise = instancePromise
        .then(function (component) { return new Promise(function (res) { component.$el.$afterLeave = res; }); })
        .then(function () { return dataPromise; });

      var finalPromise = dialogData.component.then(function (component) {
        var propsData = Object.assign({}, {dialogId: id,
          arguments: args},
          collectProps(dialogData.props, args));

        // Use Object.freeze to prevent Vue from observing renderOptions
        var renderOptions = Object.freeze({ id: id, propsData: propsData, component: component, close: close, error: error });

        // Finally render the dialog component
        this$1.$set(this$1.dialogs, id, renderOptions);

        return dataPromise
      });

      return Object.assign(finalPromise, {
        close: close,
        error: error,
        transition: function () { return transitionPromise; },
        getInstance: function () { return instancePromise; }
      })
    },

    /** Remove a dialog component from the wrapper */
    remove: function remove (id) {
      this.$delete(this.dialogs, id);
    }
  }
};

'use strict';

function generateDialogData (props, component) {
  var dialogData;

  // eslint-disable-next-line no-return-assign
  return dialogData = {
    props: props,
    createdCallback: noop,
    component: Promise.resolve(component).then(function (component) { return ({
      extends: component.default || component,
      props: filterUndefinedProps(['dialogId', 'arguments' ].concat( props), component),
      created: function created () {
        // Resolves componentPromise that is created in DialogsWrapper.add()
        dialogData.createdCallback(this);
      },
      methods: {
        $close: function $close (data) {
          this.$emit(CLOSE_EVENT, data);
        },
        $error: function $error (data) {
          this.$emit(ERROR_EVENT, data);
        }
      }
    }); })
  }
}

/** Create a dialog function */
function create (options) {
  var props = [], len = arguments.length - 1;
  while ( len-- > 0 ) props[ len ] = arguments[ len + 1 ];

  if (options == null) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[vue-modal-dialogs] Dialog options cannot be null or undefined');
    }

    return null
  }

  var wrapper = 'default';
  var component = options;

  if (isComponentCtor(options.component)) {
    component = options.component;
    wrapper = options.wrapper || wrapper;
    props = options.props || [];
  } else if (!isComponentCtor(options)) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[vue-modal-dialogs] No Vue component constructor is passed into makeDialog function');
    }

    return null
  }

  var dialogData = generateDialogData(props, component);
  return function dialogFunction () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    if (wrappers[wrapper]) {
      // Add dialog component into dialogsWrapper component
      return wrappers[wrapper].add(dialogData, args)
    } else {
      if (process.env.NODE_ENV === 'development') {
        console.error(("[vue-modal-dialogs] Wrapper " + wrapper + " is not found. Make sure that you have added <dialogs-wrapper wrapper-name=\"" + wrapper + "\" /> component somewhere in your project."));
      }

      return Promise.reject(new TypeError(("Undefined reference to wrapper " + wrapper)))
    }
  }
}

'use strict';

/** vue-modal-dialogs plugin installer */
function install (Vue, options) {
  Vue.component('DialogsWrapper', DialogsWrapper);
}

function makeDialog () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  if (process.env.NODE_ENV === 'development') {
    console.error('[vue-modal-dialogs] makeDialog function is deprecated. Use ModalDialogs.create instead.');
  }

  return create.apply(void 0, args)
}

export { create, DialogsWrapper, vue as DialogComponent, install, makeDialog };
