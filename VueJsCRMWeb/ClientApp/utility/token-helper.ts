const jwtDecode = require('jwt-decode');
import { IJwtToken } from '../models/auth';
import { IUserViewModel } from '../models/users';

export class TokenHelper {

    public static parseUserToken(token: string) {
        let user: IUserViewModel = { authenticated: false, address: null, firstName: null, gender: 0, lastName: null, middleName: null, roles: [], userName: null };

        if (token) {
            let decodedToken: IJwtToken = jwtDecode(token);

            user.authenticated = decodedToken.exp * 1000 > Date.now();

            let name = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
            let roles = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
            let sid = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid'];

            user.userName = name ? name[1] : null;
            user.firstName = decodedToken['firstname'];
            user.lastName = decodedToken['lastname'];
            user.sessExp = new Date(decodedToken.exp * 1000);
            user.position = decodedToken['position'];
        }

        return user;
    }

}