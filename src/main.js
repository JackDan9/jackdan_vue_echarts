// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import ElementUI from 'element-ui'

import Config from './config/config'
import App from './App'
import router from './router'

import 'element-ui/lib/theme-chalk/display.css'
import 'element-ui/lib/theme-chalk/index.css'
import './style/common.css'
import './style/reset.css'

Vue.use(ElementUI)
Vue.config.productionTip = false

// Default baseURL
axios.defaults.baseURL = Config.api

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
