import Home from "./components/unlogged/Home";
import Register from "./components/unlogged/Register"
import Login from "./components/unlogged/Login";
import ActivateAccount from "./components/unlogged/ActivateAccount";
// import HRHome from "./components/loged/homes/HRHome";
// import CEOHome from "./components/loged/homes/CEOHome";
// import EmployeeHome from "./components/loged/homes/EmployeeHome";
import ActivateAccountEmployee from "./components/unlogged/ActivateAccountEmployee";
import TemplateHome from "./components/loged/homes/TemplateHome";

export const routesNames = {
    home: '/',
    registerCompany: '/registerCompany',
    login: '/logging',
    newAccount: '/newAccount/:email/:enterpriseId',
    newAccountEmployee: '/newAccountEmployee/:email/:enterpriseId',

    loggedEmployee: '/employee/home',
    loggedHR: '/HR/home',
    loggedCEO: '/CEO/home'

};

export const routes = [
    {path: routesNames.home, component: Home},
    {path: routesNames.registerCompany, component: Register},
    {path: routesNames.login, component: Login},
    {path: routesNames.newAccount, component: ActivateAccount, props: true},
    {path: routesNames.newAccountEmployee, component: ActivateAccountEmployee, props: true},


    {path: routesNames.loggedEmployee, component: TemplateHome},
    {path: routesNames.loggedHR, component: TemplateHome},
    {path: routesNames.loggedCEO, component: TemplateHome},



];
