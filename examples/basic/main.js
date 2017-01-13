/// <reference path="../../typings/index.d.ts" />
'use strict'

import Vue from 'vue'
import msgbox from './msgbox'
import dialogs from 'vue-modal-dialogs'

Vue.use(dialogs)
dialogs.use('msgbox', msgbox, 'message', 'title')

new Vue({     // eslint-disable-line no-new
  el: '#app',
  render: h => h(require('./App'))
})
