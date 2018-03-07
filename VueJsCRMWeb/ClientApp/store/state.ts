import { IUserViewModel } from '../models/users';

export const state = {
    loggedIn: false,
    userName: '',
    currentUser: { userName: 'unknown', firstName: 'unknown', lastName: 'unknown', middleName: 'unknown', address: 'unknown', gender: 0, authenticated: false, roles: [], position: '' }
}