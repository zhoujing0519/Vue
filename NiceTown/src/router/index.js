import Vue from 'vue';
import Router from 'vue-router';

import My from '@/pages/My/My';

Vue.use(Router);

export default new Router({
    // linkActiveClass: 'active',
    routes: [
        {
            name: 'My',
            path: '/my',
            component: My,
        },
    ]
})
