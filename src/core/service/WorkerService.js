export default class WorkerService {

    constructor(httpRequest) {
        this.httpRequest = httpRequest;
    }

    getWorker(mail, enterprise){
        return this.httpRequest.get(`workers/${mail}/${enterprise}`);
    }


}