import { IUserViewModel } from '../models/users';
import { TokenHelper } from '../utility/token-helper';
import AuthStorage from '../store/AuthStorage';

class CommonService {
    getCurrentUser(): IUserViewModel {
        var token = AuthStorage.getToken();
        let user: IUserViewModel = { authenticated: false, address: null, firstName: null, gender: 0, lastName: null, middleName: null, roles: [], userName: null };
        if (token) {
            user =  TokenHelper.parseUserToken(token);
        }

        return user;
    }
}

export const commonService = new CommonService();