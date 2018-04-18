import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import router from './router'
import axios from 'axios'
import qs from 'qs'
import 'babel-polyfill'
import ElementUI from 'element-ui'
import Config from './config/config'
import {DatePicker} from 'element-ui'
import 'element-ui/lib/theme-chalk/display.css'
import 'element-ui/lib/theme-chalk/index.css'
import './style/common.css'
import './style/reset.css'
import store from './store/index'

Vue.component(DatePicker.name, DatePicker)
Vue.use(ElementUI)
Vue.use(Vuex)

Vue.prototype.$axios = axios;
Vue.config.productionTip = false;
// Default baseURL
axios.defaults.baseURL = Config.api;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  data: {
    charts: []
  }
})
