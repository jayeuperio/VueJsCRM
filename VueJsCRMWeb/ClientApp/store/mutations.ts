import router from '../router';
import { state } from './state';

export const mutations = {

    // Set loggedIn state
    loggedIn(state, data) {
        state.loggedIn = true;
        state.userName = data.name;

        let redirectTo = state.route.query.redirect || '/';

        router.push(redirectTo);
    },
    loggedOut(state) {
        state.loggedIn = false;
        router.push('/pages/login');
    }
}