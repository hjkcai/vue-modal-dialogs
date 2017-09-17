'use strict'

import Vue from 'vue'
import App from './App'
import login from './login'
import msgbox from './msgbox'
import dialogs from 'vue-modal-dialogs'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
Vue.use(ElementUI)

// use vue-modal-dialogs
Vue.use(dialogs, {
  el: '.custom-dialogs-wrapper',    // dialogs goes into this element
  inject: false,                    // don't add shortcut functions into Vue's prototype
  wrapper: {                        // render options of transition-group
    class: 'my-custom-dialogs-wrapper',
    style: {
      position: 'relative',
      zIndex: 1
    },
    props: {
      name: 'fade'
    }
  },
  zIndex: false                     // don't control z-index
})

// add dialogs
dialogs.add('login', login)
dialogs.add('msgbox', msgbox, 'message', 'title')

new Vue({     // eslint-disable-line no-new
  el: '#app',
  render: h => h(App)
})
