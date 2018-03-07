import Vue from 'vue'
import Router from 'vue-router'

// Containers
import Full from '@/containers/Full.vue'

// Views
import Dashboard from '@/views/Dashboard.vue'
import Login from '@/views/pages/Login.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    linkActiveClass: 'open active',
    scrollBehavior: () => {
        return { y: 0, x: 0 };
    },
    routes: [
        {
            path: '/',
            redirect: '/dashboard',
            name: 'Home',
            component: Full,
            children: [
                {
                    path: 'dashboard',
                    name: 'Dashboard',
                    component: Dashboard
                }

            ]
        },
        {
            path: '/pages/login',
            name: 'Login',
            component: Login
        }
    ]
})
