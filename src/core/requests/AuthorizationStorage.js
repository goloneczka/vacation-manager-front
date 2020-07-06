

export default class AuthorizationStorage {

    getAuthorization() {
            return sessionStorage.getItem('authorization');
    }

    setAuthorization(login, password) {
        sessionStorage.setItem('authorization', `Basic ${btoa(`${login}:${password}`)}`)
    }

    removeAuthorizationItem(item) {
        sessionStorage.removeItem(item);
    }

    removeAuthorization() {
        sessionStorage.clear();
    }

    isEmpty() {
        return sessionStorage.getItem('authorization') === null;
    }

}
