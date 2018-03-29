import 'element-ui/lib/theme-chalk/index.css'
import 'highlight.js/styles/color-brewer.css'

import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'

Vue.use(ElementUI)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})
