import {formatDate} from "../Formatter";
import {LEAVE_STATUS, ROLES} from "../Enums";

export default class LeaveService {

    constructor(httpRequest) {
        this.httpRequest = httpRequest;
    }

    getEmployeeLeaves(enterprise, mail){
        return this.httpRequest.get(`leaves/${mail}/${enterprise}`)
    }

    addPaidLeave(paidLeave, company, mail, role){
        paidLeave.startDate = formatDate(paidLeave.startDate);
        paidLeave.endDate = formatDate(paidLeave.endDate);
        paidLeave.status = role === ROLES.CEO ? LEAVE_STATUS.ACCEPTED : LEAVE_STATUS.NEW;

        return this.httpRequest.post(`leaves/add/${mail}/${company}`, paidLeave);
    }

    getEmployeesLeavesInCompany(companyId){
        return this.httpRequest.get(`leaves/${companyId}`);
    }

    getLeaveDetails(id){
        return this.httpRequest.get(`leaves/HR/${id}`);
    }

    getHistoryLeavesInCompany(companyId, page) {
        return this.httpRequest.get(`leaves/past/${companyId}/${page}`);
    }

    setLeaveStatus(id, status) {
        return this.httpRequest.put(`leaves/HR/${id}/${status}`);
    }

    deleteLeavesInCompany(company){
        return this.httpRequest.delete(`leaves/CEO/${company}`);
    }

}