webpackJsonp([1],{

/***/ 83:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__App__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__msgbox__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_vue_modal_dialogs__ = __webpack_require__(51);
/// <reference path="../../typings/index.d.ts" />







// use vue-modal-dialogs with default options
__WEBPACK_IMPORTED_MODULE_0_vue__["default"].use(__WEBPACK_IMPORTED_MODULE_3_vue_modal_dialogs__["a" /* default */]);

// add a 'msgbox'
// with the template component 'msgbox' and two arguments: 'message', 'title'
__WEBPACK_IMPORTED_MODULE_3_vue_modal_dialogs__["a" /* default */].add('msgbox', __WEBPACK_IMPORTED_MODULE_2__msgbox__["a" /* default */], 'message', 'title');

new __WEBPACK_IMPORTED_MODULE_0_vue__["default"]({ // eslint-disable-line no-new
  el: '#app',
  render: function render(h) {
    return h(__WEBPACK_IMPORTED_MODULE_1__App__["a" /* default */]);
  }
});

/***/ }),

/***/ 85:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_App_vue__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_3375995a_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_App_vue__ = __webpack_require__(90);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(86)
}
var normalizeComponent = __webpack_require__(17)
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
Component.options.__file = "examples/basic/App.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] App.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3375995a", Component.options)
  } else {
    hotAPI.reload("data-v-3375995a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 86:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(87);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(30)("55f1088c", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3375995a\",\"scoped\":false,\"hasInlineConfig\":true}!../../node_modules/less-loader/index.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./App.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3375995a\",\"scoped\":false,\"hasInlineConfig\":true}!../../node_modules/less-loader/index.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./App.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 87:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(21)();
// imports


// module
exports.push([module.i, "\n#app > div {\n  margin: 8px 0;\n}\n#app input,\n#app button {\n  font-size: 1em;\n}\n", ""]);

// exports


/***/ }),

/***/ 89:
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
      // creates a new dialog via `this.$<name>` shortcut
      // this.$dialogs.show('msgbox', ...) also works
      this.$msgbox(this.message, this.title).then(result => {
        // dialogs returns a `Promise`
        this.result = result; // so you can get its result from `then` function
      });
    }
  }
});

/***/ }),

/***/ 90:
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
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-3375995a", esExports)
  }
}

/***/ }),

/***/ 91:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_msgbox_vue__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_d7520270_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_msgbox_vue__ = __webpack_require__(95);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(92)
}
var normalizeComponent = __webpack_require__(17)
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
Component.options.__file = "examples/basic/msgbox.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] msgbox.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-d7520270", Component.options)
  } else {
    hotAPI.reload("data-v-d7520270", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 92:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(93);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(30)("7f65fe1c", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-d7520270\",\"scoped\":false,\"hasInlineConfig\":true}!../../node_modules/less-loader/index.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./msgbox.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-d7520270\",\"scoped\":false,\"hasInlineConfig\":true}!../../node_modules/less-loader/index.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./msgbox.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 93:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(21)();
// imports


// module
exports.push([module.i, "\n.msgbox-wrapper {\n  position: fixed;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  background-color: rgba(0, 0, 0, 0.33);\n}\n.msgbox-wrapper .msgbox {\n  padding: 16px;\n  background-color: white;\n}\n.msgbox-wrapper h1 {\n  font-size: 1em;\n}\n.msgbox-wrapper .buttons {\n  text-align: right;\n}\n", ""]);

// exports


/***/ }),

/***/ 94:
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
  props: ['message', 'title'],
  methods: {
    close(data) {
      // close a dialog by emitting 'close' event with data in the 2nd arugment
      // the data will be returned to the previously created Promise
      this.$close(data);
    }
  }
});

/***/ }),

/***/ 95:
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
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-d7520270", esExports)
  }
}

/***/ })

},[83]);