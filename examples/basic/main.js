/// <reference path="../../typings/index.d.ts" />
'use strict'

import Vue from 'vue'
import App from './App'
import msgbox from './msgbox'
import ModalDialogs from 'vue-modal-dialogs'

// Use vue-modal-dialogs with default options
Vue.use(ModalDialogs)

// Make a dialog function with the template component 'msgbox' and two arguments: 'message', 'title'
// and inject it into Vue's prototype
Vue.prototype.$msgbox = ModalDialogs.makeDialog(msgbox, 'message', 'title')

new Vue({     // eslint-disable-line no-new
  el: '#app',
  render: h => h(App)
})
