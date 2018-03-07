export default class AuthStorage {
    static STORAGE_KEY: string = "token";

    static getToken() {
        return window.localStorage.getItem(AuthStorage.STORAGE_KEY);
    }

    static setToken(token: string) {
        window.localStorage.setItem(AuthStorage.STORAGE_KEY, token);
    }

    static removeToken(): void {
        window.localStorage.removeItem(AuthStorage.STORAGE_KEY);
    }
}