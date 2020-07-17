import {AUTHORIZATION, ROLES} from "../Enums";


export default class AuthorizationStorage {

    getAuthorization(key) {
            return sessionStorage.getItem(key);
    }

     setAuthorization(login, password) {
        sessionStorage.setItem(AUTHORIZATION, `Basic ${btoa(`${login}:${password}`)}`)
    }

    setWorkerAuthorization(worker){
        sessionStorage.setItem(ROLES.WORKER, worker)
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
