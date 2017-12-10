import Vue from 'vue'

Vue.config.devtools = false
Vue.config.productionTip = false

// require all test files (files that ends with .spec)
const testsContext = require.context('./specs', true, /\.spec$/)
testsContext.keys().forEach(testsContext)
