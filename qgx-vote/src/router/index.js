import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/home/home'
import Vote from '@/components/vote/vote'
import VoteDetail from '@/components/vote-detail/vote-detail'
import Rule from '@/components/rule/rule'
import Rank from '@/components/rank/rank'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/home',
            name: 'Home',
            component: Home
        },{
            path: '/vote',
            name: 'Vote',
            component: Vote,
            children: [
                {
                    path: ':id',
                    component: VoteDetail
                }
            ],
        },
        {
            path: '/rule',
            name: 'Rule',
            component: Rule
        },
        {
            path: '/rank',
            name: 'Rank',
            component: Rank,
            children: [
                {
                    path: ':id',
                    component: VoteDetail
                }
            ],
        },{
            path: '/',
            redirect: '/home'
        },
    ]
})
