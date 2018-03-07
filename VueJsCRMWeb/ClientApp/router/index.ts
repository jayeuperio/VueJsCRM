import Vue from 'vue'
import VueRouter from 'vue-router'
import { Route, RawLocation } from 'vue-router';
import store from '../store';
// Containers
import Full from '@/containers/Full.vue'

// Views
import Dashboard from '@/views/Dashboard.vue';
import Login from '@/views/pages/Login.vue';
import Register from '@/views/pages/Register.vue';

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
            beforeEnter: (
                to: Route,
                from: Route,
                next: (to?: RawLocation | false | ((vm: Vue) => any) | void) => void
            ) => {
                console.log(store.state);
                if (!store.state.loggedIn) {
                    next({
                        path: '/auth/login',
                        query: { rediret: to.path }
                    });
                }
                else {
                    next();
                }
            },
            children: [
                {
                    path: 'dashboard',
                    name: 'Dashboard',
                    component: Dashboard
                }

            ]
        },
        {
            path: '/auth/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/auth/register',
            name: 'Register',
            component: Register
        }
    ]
})
