import { ActionContext } from 'vuex';
import { IJwtToken } from '../models/auth';
import { IUserViewModel } from '../models/users';
import AuthStorage from './AuthStorage';
import { authService } from '../services/authservice';
import { TokenHelper } from '../utility/token-helper';

const jwtDecode = require('jwt-decode');

export const actions = {
    checkedLoggedIn(commit: ActionContext<any, IUserViewModel>) {
        var token = AuthStorage.getToken();

        var userData = TokenHelper.parseUserToken(token);

        commit.state.currentUser = userData;
        commit.state.loggedIn = userData.authenticated;

        console.log(commit.state);
    },
    logIn(commit: ActionContext<any, IUserViewModel>, data: string) {

        var tokenData = TokenHelper.parseUserToken(data);
        AuthStorage.setToken(data);
        if (tokenData.authenticated) {
            commit.commit('loggedIn', tokenData);
        }

        return;
    }
}