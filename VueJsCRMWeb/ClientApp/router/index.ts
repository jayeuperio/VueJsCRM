import Vue from 'vue'
import VueRouter from 'vue-router'

// Containers
import Full from '@/containers/Full.vue'

// Views
import Dashboard from '@/views/Dashboard.vue'
import Login from '@/views/pages/Login.vue'

Vue.use(VueRouter)

export default new VueRouter({
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
