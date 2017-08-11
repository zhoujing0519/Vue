import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import LoveHome from '@/pages/LoveHome'
import My from '@/pages/My'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/lovehome',
      component: LoveHome
    },
    {
      path: '/my',
      component: My
    }
  ]
})
