export default class HttpRequest {

    constructor(baseUrl, authorizationStorage) {
        this.baseUrl = baseUrl;
        this.authorizationStorage = authorizationStorage;
    }

    get(url) {
        return this.execute(url, 'GET')
    }

    post(url, data) {
        return this.execute(url, 'POST', data)
    }

    put(url, data) {
        return this.execute(url, 'PUT', data)
    }

    delete(url) {
        return this.execute(url, 'DELETE')
    }

    execute(url, method, data) {
        return fetch(`${this.baseUrl}/${url}`, {
            method: method,
            headers: !this.authorizationStorage.isEmpty() ?
                new Headers({
                    'Content-Type': 'application/json',
                    Authorization: this.authorizationStorage.getAuthorization()
                }) : new Headers({'Content-Type': 'application/json'}),
            credentials: 'same-origin',
            cache: 'no-cache',
            body: JSON.stringify(data)
        })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(errors => {
                        return {
                            status: response.status,
                            errors: errors.errors
                        }
                    })
                }
                return response.json();
            })
    }
}


