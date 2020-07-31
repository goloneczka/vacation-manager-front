export default class WorkerService {

    constructor(httpRequest) {
        this.httpRequest = httpRequest;
    }

    getWorker(mail, enterprise){
        return this.httpRequest.get(`workers/${mail}/${enterprise}`);
    }

    getEmployeesInCompany(companyId){
        return this.httpRequest.get(`workers/HR/${companyId}`)
    }

    addEmployee(employee, companyId){
        return this.httpRequest.post(`workers/CEO/add`, {
            ...employee,
            enterpriseId : companyId
        })
    }

    confirmEmployee(mail, enterpriseId){
        return this.httpRequest.put(`workers/confirm/${mail}/${enterpriseId}`)
    }

    getWorkerDetails(workerVarsId){
        return this.httpRequest.get(`workers/employee/${workerVarsId}`)
    }


}