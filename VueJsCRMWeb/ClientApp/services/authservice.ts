import RestUtilities from './restutilities';
import { ILoginCredentials, IAuthResult } from '../models/auth';
import { ApiBaseList } from './storecommon';

class AuthService {

    login(credential: ILoginCredentials) {
        return RestUtilities.post<IAuthResult>(`${ApiBaseList.Auth}`, credential);
    }

    logout(userName: string) {
        return RestUtilities.post(`${ApiBaseList.Auth}/logout`, userName);
    }

}

export const authService = new AuthService();