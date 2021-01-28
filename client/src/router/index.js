import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/index'
import Register from '../views/register'
import NotFound from '../views/404'

Vue.use(VueRouter)

const routes = [
  // 跳转页面设置
  {
    path: '/',
    redirect: '/index',
    component: Index
  },
  {
    path: '/index',
    name: 'index',
    component: Index
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '*',
    name: '404',
    component: NotFound
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
