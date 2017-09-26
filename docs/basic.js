webpackJsonp([1],{

/***/ 87:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__App__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__msgbox__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_vue_modal_dialogs__ = __webpack_require__(54);
/// <reference path="../../typings/index.d.ts" />







// Use vue-modal-dialogs with default options
__WEBPACK_IMPORTED_MODULE_0_vue__["default"].use(__WEBPACK_IMPORTED_MODULE_3_vue_modal_dialogs__["a" /* default */]);

// Make a dialog function with the template component 'msgbox' and two arguments: 'message', 'title'
// and inject it into Vue's prototype
__WEBPACK_IMPORTED_MODULE_0_vue__["default"].prototype.$msgbox = __WEBPACK_IMPORTED_MODULE_3_vue_modal_dialogs__["a" /* default */].makeDialog(__WEBPACK_IMPORTED_MODULE_2__msgbox__["a" /* default */], 'message', 'title');

new __WEBPACK_IMPORTED_MODULE_0_vue__["default"]({ // eslint-disable-line no-new
  el: '#app',
  render: function render(h) {
    return h(__WEBPACK_IMPORTED_MODULE_1__App__["a" /* default */]);
  }
});

/***/ }),

/***/ 89:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_App_vue__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_3375995a_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_App_vue__ = __webpack_require__(94);
function injectStyle (ssrContext) {
  __webpack_require__(90)
}
var normalizeComponent = __webpack_require__(18)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_App_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_3375995a_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_App_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 90:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(91);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(32)("55f1088c", content, true);

/***/ }),

/***/ 91:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(25)();
// imports


// module
exports.push([module.i, "\n#app > div {\n  margin: 8px 0;\n}\n#app input,\n#app button {\n  font-size: 1em;\n}\n", ""]);

// exports


/***/ }),

/***/ 93:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
  data: () => ({
    title: 'Hello World',
    message: 'This is a message box!',
    result: ''
  }),
  methods: {
    showMessage() {
      this.$msgbox(this.message, this.title).then(result => {
        // dialog function returns a `Promise`
        this.result = result; // so you can get its result from `then` function
      });
    }
  }
});

/***/ }),

/***/ 94:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "app"
    }
  }, [_c('div', [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.title),
      expression: "title"
    }],
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": (_vm.title)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.title = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('div', [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.message),
      expression: "message"
    }],
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": (_vm.message)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.message = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('div', [_c('button', {
    on: {
      "click": _vm.showMessage
    }
  }, [_vm._v("Show Message")])]), _vm._v(" "), _c('div', [_vm._v(_vm._s(_vm.result))])])
}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ 95:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_msgbox_vue__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_d7520270_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_msgbox_vue__ = __webpack_require__(99);
function injectStyle (ssrContext) {
  __webpack_require__(96)
}
var normalizeComponent = __webpack_require__(18)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_msgbox_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_d7520270_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_msgbox_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 96:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(97);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(32)("7f65fe1c", content, true);

/***/ }),

/***/ 97:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(25)();
// imports


// module
exports.push([module.i, "\n.msgbox-wrapper {\n  position: fixed;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  background-color: rgba(0, 0, 0, 0.33);\n}\n.msgbox-wrapper .msgbox {\n  padding: 16px;\n  background-color: white;\n}\n.msgbox-wrapper h1 {\n  font-size: 1em;\n}\n.msgbox-wrapper .buttons {\n  text-align: right;\n}\n", ""]);

// exports


/***/ }),

/***/ 98:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
  props: {
    title: Number,
    another: {
      type: Number,
      required: true
    }
  },
  methods: {
    close(data) {
      // close a dialog by emitting 'close' event with data in the 2nd arugment
      // the data will be returned to the previously created Promise
      this.$close(data);
    }
  }
});

/***/ }),

/***/ 99:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "msgbox-wrapper"
  }, [_c('div', {
    staticClass: "msgbox"
  }, [_c('h1', [_vm._v(_vm._s(_vm.title))]), _vm._v(" "), _c('p', [_vm._v(_vm._s(_vm.message))]), _vm._v(" "), _c('div', {
    staticClass: "buttons"
  }, [_c('button', {
    on: {
      "click": function($event) {
        _vm.close('cancel')
      }
    }
  }, [_vm._v("Cancel")]), _vm._v(" "), _c('button', {
    on: {
      "click": function($event) {
        _vm.close('ok')
      }
    }
  }, [_vm._v("OK")])])])])
}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ })

},[87]);