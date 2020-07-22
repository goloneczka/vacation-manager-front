import {formatDate, countWorkDays} from "../Formatter";
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
        paidLeave.days = countWorkDays(paidLeave.startDate, paidLeave.endDate);
        paidLeave.status = role === ROLES.CEO ? LEAVE_STATUS.ACCEPTED : LEAVE_STATUS.NEW;

        return this.httpRequest.post(`leaves/add/${mail}/${company}`, paidLeave);
    }


}