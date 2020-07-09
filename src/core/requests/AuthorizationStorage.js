import {AUTHORIZATION, ROLES} from "../Enums";


export default class AuthorizationStorage {

    getAuthorization(key) {
            return sessionStorage.getItem(key);
    }

     setAuthorization(login, password) {
        sessionStorage.setItem(AUTHORIZATION, `Basic ${btoa(`${login}:${password}`)}`)
    }

    setAuthorizationLevel(role){
        sessionStorage.setItem(ROLES.ROLE, role)
    }

    removeAuthorizationItem(item) {
        sessionStorage.removeItem(item);
    }

    removeAuthorization() {
        sessionStorage.clear();
    }

    isEmpty(key) {
        return sessionStorage.getItem(key) === null;
    }

}
