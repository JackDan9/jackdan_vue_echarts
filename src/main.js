import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import router from './router'
import axios from 'axios'
import qs from 'qs'
import 'babel-polyfill'
import ElementUI from 'element-ui'
import Config from './config/config'
import { DatePicker } from 'element-ui'
import { Loading, Message } from 'element-ui'
import 'element-ui/lib/theme-chalk/display.css'
import 'element-ui/lib/theme-chalk/index.css'
// import './style/common.css'
// import './style/reset.css'
import store from './store/index'

Vue.component(DatePicker.name, DatePicker)
Vue.use(ElementUI)
Vue.use(Vuex)

// 加载超时时长
axios.defaults.timeout = 5000;

// http请求拦截器
let loadinginstace
axios.interceptors.request.use(config => {
    loadinginstace = Loading.service({  
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.8)' 
    })
    return config
}, error => {
    loadinginstace.close()
    Message.error({
        message: '加载超时'
    })
    return Promise.reject(error)
})

// http响应拦截器
axios.interceptors.response.use(data => {
    loadinginstace.close()
    return data
}, error => {
    loadinginstace.close()
    Message.error({
        message: '加载失败'
    })
    return Promise.reject(error)
})

// Vue.prototype.$axios = axios;
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
