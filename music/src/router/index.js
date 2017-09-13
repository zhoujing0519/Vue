import Vue from 'vue'
import Router from 'vue-router'

// 同步加载路由组件
/*
    import Recommend from '@/components/recommend/recommend'
    import Disc from '@/components/disc/disc'

    import Singer from '@/components/singer/singer'
    import SingerDetail from '@/components/singer-detail/singer-detail'

    import Rank from '@/components/rank/rank'
    import TopList from '@/components/top-list/top-list'

    import Search from '@/components/search/search'

    import UserCenter from '@/components/user-center/user-center'
*/

// 异步加载路由组件
    const Recommend = (resolve) => {
        import('@/components/recommend/recommend').then((component) => {
            resolve(component)
        })
    }
    const Disc = (resolve) => {
        import('@/components/disc/disc').then((component) => {
            resolve(component)
        })
    }
    const Singer = (resolve) => {
        import('@/components/singer/singer').then((component) => {
            resolve(component)
        })
    }
    const SingerDetail = (resolve) => {
        import('@/components/singer-detail/singer-detail').then((component) => {
            resolve(component)
        })
    }
    const Rank = (resolve) => {
        import('@/components/rank/rank').then((component) => {
            resolve(component)
        })
    }
    const TopList = (resolve) => {
        import('@/components/top-list/top-list').then((component) => {
            resolve(component)
        })
    }
    const Search = (resolve) => {
        import('@/components/search/search').then((component) => {
            resolve(component)
        })
    }
    const UserCenter = (resolve) => {
        import('@/components/user-center/user-center').then((component) => {
            resolve(component)
        })
    }

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/recommend',
            component: Recommend,
            children: [
                {
                    path: ':id',
                    component: Disc
                }
            ],
        },
        {
            path: '/singer',
            component: Singer,
            children: [
                {
                    path: ':id',
                    component: SingerDetail
                }
            ],
        },
        {
            path: '/rank',
            component: Rank,
            children: [
                {
                    path: ':id',
                    component: TopList,
                }
            ],
        },
        {
            path: '/search',
            component: Search,
            children: [
                {
                    path: ':id',
                    component: SingerDetail
                }
            ],
        },
        {
            path: '/user',
            component: UserCenter
        },
        {
            path: '/',
            redirect: '/recommend'
        },
    ]
})
