import Vue from 'vue'
import Router from 'vue-router'
import Home from '../container/home.vue'
import Flight from '../container/flight.vue'
import Price from '../container/price.vue'
import Num from '../container/num.vue'
import Login from '../container/login.vue'
import Register from '../container/register.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
          path: '/',
          name: 'home',
          component: Home
        },
        {
          path: '/flight',
          name: 'flight',
          component: Flight
        },
        {
          path: '/price',
          name: 'price',
          component: Price
        },
        {
          path: '/num',
          name: 'num',
          component: Num
        },
        {
          path: '/login',
          name: 'login',
          component: Login
        },
        {
          path: '/register',
          name: 'register',
          component: Register
        }
    ]
})
