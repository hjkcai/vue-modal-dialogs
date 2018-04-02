import Vue from 'vue'
import App from './App'
import ModalDialogs from 'vue-modal-dialogs'

// Install vue-modal-dialogs
Vue.use(ModalDialogs)

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  render: h => h(App)
})
