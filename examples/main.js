'use strict'

import Vue from 'vue'
Vue.config.devtools = true

import Index from './index'

new Vue({
  render (h) {
    return h(Index)
  }
}).$mount('#app')
