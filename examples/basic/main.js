/// <reference path="../../typings/index.d.ts" />
'use strict'

import Vue from 'vue'
import msgbox from './msgbox'
import dialogs from 'vue-modal-dialogs'

// use vue-modal-dialogs with default options
Vue.use(dialogs)

// add a 'msgbox'
// with the template component 'msgbox' and two arguments: 'message', 'title'
dialogs.add('msgbox', msgbox, 'message', 'title')

new Vue({     // eslint-disable-line no-new
  el: '#app',
  render: h => h(require('./App'))
})
