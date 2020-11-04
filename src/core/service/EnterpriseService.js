export default class EnterpriseService {

    constructor(httpRequest) {
        this.httpRequest = httpRequest;
    }

    addEnterpriseWithCEO(name, email, enterprise, passwd, hired){
        const registerForm = {
            name : name,
            email : email,
            enterpriseName : enterprise,
            password : passwd,
            hired: hired,
            occupation : 'CEO'
        }
        return this.httpRequest.post("enterprises/enterprise", registerForm)
    }

    confirmCompanyAndCeo(mail, enterpriseName){
        return this.httpRequest.put(`enterprises/confirm/${mail}/${enterpriseName}`)
    }


    getCompanyByName(enterpriseName){
        return this.httpRequest.get(`enterprises/${enterpriseName}`)
    }

}