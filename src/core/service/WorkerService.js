export default class WorkerService {

    constructor(httpRequest) {
        this.httpRequest = httpRequest;
    }

    getWorker(mail, enterprise){
        return this.httpRequest.get(`workers/${mail}/${enterprise}`);
    }

    setWorker(mail, enterprise, data){
        return this.httpRequest.put(`workers/${mail}/${enterprise}`, data);
    }


    getEmployeesByCompanyName(companyName){
        return this.httpRequest.get(`workers/HR/${companyName}`)
    }

    createEmployee(employee, companyName){
        return this.httpRequest.post(`workers/CEO/add`, {
            ...employee,
            enterpriseName : companyName
        })
    }

    confirmEmployee(mail, enterpriseName){
        return this.httpRequest.put(`workers/confirm/${mail}/${enterpriseName}`)
    }

    getWorkerDetails(workerVarsId){
        return this.httpRequest.get(`workers/employee/${workerVarsId}`)
    }

    setWorkerDetails(workerVarsId, enterprise, data){
        return this.httpRequest.put(`workers/employee/${workerVarsId}/${enterprise}`, data);
    }


}