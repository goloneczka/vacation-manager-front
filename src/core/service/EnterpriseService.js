export default class EnterpriseService {

    constructor(httpRequest) {
        this.httpRequest = httpRequest;
    }

    addEnterpriseWithCEO(name, email, enterprise, passwd){
        const registerForm = {
            name : name,
            email : email,
            enterpriseName : enterprise,
            password : passwd,
            occupation : 'CEO'
        }
        return this.httpRequest.post("enterprises/enterprise", registerForm)
    }

    confirmCompanyAndCeo(mail, enterpriseId){
        return this.httpRequest.put(`enterprises/enterprise/${mail}/${enterpriseId}`)
    }

}