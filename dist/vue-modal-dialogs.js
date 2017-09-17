(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.VueModalDialogs = factory());
}(this, (function () { 'use strict';

/*!
 * for-in <https://github.com/jonschlinkert/for-in>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

'use strict';

var forIn = function forIn(obj, fn, thisArg) {
  for (var key in obj) {
    if (fn.call(thisArg, obj[key], key, obj) === false) {
      break;
    }
  }
};

/*!
 * for-own <https://github.com/jonschlinkert/for-own>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

'use strict';


var hasOwn = Object.prototype.hasOwnProperty;

var forOwn = function forOwn(obj, fn, thisArg) {
  forIn(obj, function(val, key) {
    if (hasOwn.call(obj, key)) {
      return fn.call(thisArg, obj[key], key, obj);
    }
  });
};

/*!
 * is-extendable <https://github.com/jonschlinkert/is-extendable>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var isExtendable = function isExtendable(val) {
  return typeof val !== 'undefined' && val !== null
    && (typeof val === 'object' || typeof val === 'function');
};

'use strict';

/**
 * Find the first item that matches the comparator
 *
 * @export
 * @param {Array<any>} arr
 * @param {Function<boolean>} comparator
 */
function find (arr, comparator) {
  for (var i = 0; i < arr.length; i++) {
    if (comparator(arr[i])) {
      return arr[i]
    }
  }
}

/**
 * Find the first item that matches the comparator
 * and return its index
 *
 * @export
 * @param {Array<any>} arr
 * @param {Function<boolean>} comparator
 */
function findIndex (arr, comparator) {
  for (var i = 0; i < arr.length; i++) {
    if (comparator(arr[i])) {
      return i
    }
  }

  return -1
}

/**
 * A simple defaultsDeep (like lodash) that works only on objects.
 * Modified from https://github.com/jonschlinkert/defaults-deep
 *
 * @export
 * @param {Object[]} sources
 * @returns {Object}
 */
function defaultsDeep () {
  var sources = [], len = arguments.length;
  while ( len-- ) sources[ len ] = arguments[ len ];

  var target = {};

  function copy (target, current) {
    forOwn(current, function (value, key) {
      var val = target[key];
      // add the missing property, or allow a null property to be updated
      if (val == null) {
        target[key] = value;
      } else if (isExtendable(val) && isExtendable(value)) {
        target[key] = defaultsDeep(val, value);
      }
    });
  }

  sources.forEach(function (source) { return (source && copy(target, source)); });
  return target
}

/**
 * Check if a JavaScript Object can be used as a Vue Component constructor
 *
 * @export
 * @param {Object|Function} obj
 * @returns {boolean}
 */
function isVueComponent (obj) {
  return (
    obj != null &&
    (typeof obj === 'object' || typeof obj === 'function')
  ) && (
    // must not a Vue instance
    Object.getPrototypeOf(obj).constructor.name !== 'VueComponent'
  ) && (
    // result of Vue.extend
    (typeof obj === 'function' && obj.name === 'VueComponent') ||

    // import from a .vue file
    Array.isArray(obj.staticRenderFns) ||

    // has a render function
    typeof obj.render === 'function'
  )
}

'use strict';

// filter bad wrapper options and add default options
function parseWrapperOptions (options) {
  if (typeof options !== 'object') { options = {}; }

  if (options.wrapper && typeof options.wrapper !== 'object') {
    options.wrapper = undefined;
  }

  if (options.zIndex === false) {
    options.zIndex = {
      value: null,
      autoIncrement: false
    };
  } else if (options.zIndex && typeof options.zIndex !== 'object') {
    options.zIndex = undefined;
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
  });

  return result
}

function modalWrapperFactory (Vue, wrapperOptions) {
  wrapperOptions = parseWrapperOptions(wrapperOptions);

  // an auto-increment id to indentify dialogs
  var id = 0;

  return Vue.extend({
    name: 'ModalDialogsWrapper',
    data: function () { return ({
      dialogs: []
    }); },
    methods: {
      // add a new modal dialog into this wrapper
      add: function add (dialogOptions) {
        var this$1 = this;
        var args = [], len = arguments.length - 1;
        while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

        return new Promise(function (resolve, reject) {
          this$1.dialogs.push(Object.freeze({
            id: id,
            resolve: resolve,
            reject: reject,
            args: args,
            options: dialogOptions,
            zIndex: wrapperOptions.zIndex.value,
            close: this$1.close.bind(this$1, id)
          }));

          ++id;    // make sure id will never duplicate
          if (wrapperOptions.zIndex.autoIncrement) {
            ++wrapperOptions.zIndex.value;
          }

          /* this promise will be resolved when 'close' method is called */
        }).then(function (ref) {
          var id = ref.id;
          var data = ref.data;

          var index = findIndex(this$1.dialogs, function (item) { return item.id === id; });
          if (index > -1) { this$1.dialogs.splice(index, 1); }

          return data
        })
      },
      // close a modal dialog by id
      close: function close (id, data) {
        var dialog = find(this.dialogs, function (item) { return item.id === id; });
        if (dialog) {
          // resolve previously created promise in 'add' method
          dialog.resolve({ id: id, data: data });
        }
      }
    },
    render: function render (h) {
      var this$1 = this;

      var renderedDialogs = [];
      var loop = function ( i ) {
        var dialog = this$1.dialogs[i];

        // map args to props
        var props = { args: dialog.args };
        dialog.options.args.forEach(function (arg, i) { props[arg] = dialog.args[i]; });

        // render component
        var renderOptions = defaultsDeep(
          dialog.options,                         // merge with user's dialog options
          {                                       // and some default options
            key: dialog.id,
            style: { zIndex: dialog.zIndex },
            props: props,
            on: { close: dialog.close }
          }
        );

        // clear extra properties otherwise vue will throw an error
        delete renderOptions.component;
        delete renderOptions.args;

        renderedDialogs.push(h(dialog.options.component, renderOptions));
      };

      for (var i = 0; i < this.dialogs.length; i++) loop( i );

      return h('transition-group', wrapperOptions.wrapper, renderedDialogs)
    }
  })
}

'use strict';

var VueModalDialogs = function VueModalDialogs () {
  this.Vue = null;
  this.debug = "development" === 'development';
  this.dialogsWrapper = null;
  this.dialogFunctions = {};
  this.inject = true;
};

VueModalDialogs.prototype.install = function install (Vue, options) {
  options = defaultsDeep(options, {
    el: null,
    inject: true
  });

  // export vue instance to global scope
  // so that we can easily modify its prototype
  this.Vue = Vue;

  // install `this` into vue
  this.Vue.prototype.$dialogs = this;

  // A mount element for the modal dialogs' wrapper
  var el = options.el;
  if (typeof el === 'string') {
    el = document.querySelector(el);
  }

  if (el == null) {
    el = document.createElement('div');
    document.body.insertBefore(el, document.body.childNodes[0]);
  }

  // determines if shortcut functions will be added
  // into Vue's prototype
  this.inject = options.inject;

  // and mount the modal dialogs' wrapper on that anchor
  var DialogsWrapper = modalWrapperFactory(Vue, options);
  this.dialogsWrapper = new DialogsWrapper();
  this.dialogsWrapper.$mount(el);
};

VueModalDialogs.prototype.add = function add (name, component) {
    var args = [], len = arguments.length - 2;
    while ( len-- > 0 ) args[ len ] = arguments[ len + 2 ];

  name = name.toString().trim();

  // make sure 'name' is unique
  if (this.dialogFunctions.hasOwnProperty(name)) {
    if (this.debug) { console.error(("[vue-modal-dialogs] Another modal function " + name + " is already exist.")); }
    return
  }

  // parse options
  if (args.length === 0 && !isVueComponent(component)) {
    args = component.args || [];
    component = component.component;
  }

  if (!isVueComponent(component)) {
    if (this.debug) { console.error('[vue-modal-dialogs]', component, 'is not a Vue component constructor'); }
    return
  }

  this.dialogFunctions[name] = {
    // inject a `$close` function into dialog component
    component: this.Vue.extend({
      extends: component,
      methods: {
        $close: function $close (data) {
          this.$emit('close', data);
        }
      }
    }),
    args: args
  };

  if (this.inject) {
    this.Vue.prototype[("$" + name)] = this.show.bind(this, name);
  }
};

VueModalDialogs.prototype.show = function show (name) {
    var this$1 = this;
    var args = [], len = arguments.length - 1;
    while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

  return new Promise(function (resolve, reject) {
    if (!this$1.dialogFunctions.hasOwnProperty(name)) {
      if (this$1.debug) { console.error(("[vue-modal-dialogs] Modal dialog " + name + " is not found.")); }
      return reject(new Error(("Modal dialog " + name + " is not found.")))
    }

    resolve((ref = this$1.dialogsWrapper).add.apply(ref, [ this$1.dialogFunctions[name] ].concat( args )));
      var ref;
  })
};

var index = new VueModalDialogs();

return index;

})));
