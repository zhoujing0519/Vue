import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'

import Home from '@/components/home/home'
import Rule from '@/components/rule/rule'
import Rank from '@/components/rank/rank'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Hello',
            component: Hello
        },
        {
            path: '/home',
            name: 'Home',
            component: Home
        },
        {
            path: '/rule',
            name: 'Rule',
            component: Rule
        },
        {
            path: '/rank',
            name: 'Rank',
            component: Rank
        }
    ]
})
