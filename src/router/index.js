import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Pie from '@/components/Pie'
import Bar from '@/components/Bar'
import Line from '@/components/Line'
import Candlestick from '@/components/Candlestick'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/pie',
      name: 'Pie',
      component: Pie
    },
    {
      path: '/bar',
      name: 'Bar',
      component: Bar
    },
    {
      path: '/line',
      name: 'Line',
      component: Line
    },
    {
      path: '/candlestick',
      name: 'Candlestick',
      component: Candlestick
    }
  ]
})
