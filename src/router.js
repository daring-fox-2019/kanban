import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import signin from '@/views/signin.vue'
import signup from '@/views/signup.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/signin',
      name: 'signin',
      component: signin
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },{
      path:'/signup',
      name:'signup',
      component: signup
    }
  ]
})
