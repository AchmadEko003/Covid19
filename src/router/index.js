import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Countries from '../views/Countries.vue'
import AllCountries from '../views/Global.vue'
import Indonesia from '../views/Indonesia.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/',
        name: 'indonesia',
        component: Indonesia
      },
      {
        path: '/countries',
        name: 'countries',
        component: Countries
      },
      {
        path: '/all',
        name: 'all-countries',
        component: AllCountries
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
