﻿const jwtDecode = require('jwt-decode');
import { IJwtToken } from '../models/auth';
import { IUserViewModel } from '../models/users';

export class TokenHelper {

    public static parseUserToken(token: string) {
        let user: IUserViewModel = { authenticated: false, address: null, firstName: null, gender: 0, lastName: null, middleName: null, roles: [], userName: null };

        if (token) {
            let decodedToken: IJwtToken = jwtDecode(token);

            console.log(decodedToken.exp);
            console.log(Date.now());
            user.authenticated = decodedToken.exp * 1000 > Date.now();
        }

        return user;
    }

}