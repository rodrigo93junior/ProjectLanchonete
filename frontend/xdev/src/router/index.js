import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/createuser',
    name: 'CreateUser',
    component: () => import ('../views/Users/Create.vue')
  },
  {
    path: '/createproduct',
    name: 'CreateProduct',
    component: () => import ('../views/Products/Create.vue')
  },
  {
    path: '/listproducts',
    name: 'ListProducts',
    component: () => import ('../views/Products/List.vue')
  },
  {
    path: '/detailproducts:id',
    name: 'DetailProducts',
    component: () => import ('../views/Products/Detail.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
