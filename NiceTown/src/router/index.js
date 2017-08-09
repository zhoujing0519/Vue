import Vue from 'vue'
import Router from 'vue-router'
import LoveHome from '@/pages/LoveHome'
import My from '@/pages/My'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: LoveHome
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
