import Vue from 'vue'
import Router from 'vue-router'
// import Home from '../container/home.vue'
// import Flight from '../container/flight.vue'
// import Price from '../container/price.vue'
// import Num from '../container/num.vue'
// import Money from '../container/money.vue'
// import Login from '../container/login.vue'
// import Register from '../container/register.vue'
// import List from '../container/list.vue'
const Home = () => import('../container/home.vue')
const Price = () => import('../container/price.vue')
const Num = () => import('../container/num.vue')
const Money = () => import('../container/money.vue')
const Search = () => import('../container/search.vue')
const Flight = () => import('../container/flight.vue')

Vue.use(Router)

export default new Router({
    routes: [
        {
          path: '/',
          name: 'home',
          component: Home
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
          path: '/money',
          name: 'money',
          component: Money
        },
        {
          path: '/search',
          name: 'search',
          component: Search
        },
        {
          path: '/flight',
          name: 'flight',
          component: Flight
        }
    ]
})
