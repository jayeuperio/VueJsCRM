import router from '../router';
import { IUserViewModel } from '../models/users';
import { state } from './state';

export const mutations = {

    // Set loggedIn state
    loggedIn(state, data: IUserViewModel) {
        state.loggedIn = true;
        state.userName = data.userName;

        let redirectTo = state.route.query.redirect || '/';

        router.push(redirectTo);
    },
    loggedOut(state) {
        state.loggedIn = false;
        router.push('/pages/login');
    }
}