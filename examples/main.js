'use strict'

import Vue from 'vue'
import Index from './index'
Vue.config.devtools = true

new Vue({
  render (h) {
    return h(Index)
  }
}).$mount('#app')
