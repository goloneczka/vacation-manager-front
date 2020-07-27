import Home from "./components/unlogged/Home";
import Register from "./components/unlogged/Register"
import Login from "./components/unlogged/Login";
import ActivateAccount from "./components/unlogged/ActivateAccount";
import ActivateAccountEmployee from "./components/unlogged/ActivateAccountEmployee";
import TemplateHome from "./components/loged/home/TemplateHome";
import ConsiderRequire from "./components/loged/require/ConsiderRequire";

export const routesNames = {
    home: '/',
    registerCompany: '/registerCompany',
    login: '/logging',
    newAccount: '/newAccount/:email/:enterpriseId',
    newAccountEmployee: '/newAccountEmployee/:email/:enterpriseId',

    loggedEmployee: '/employee/home',
    loggedHR: '/HR/home',
    loggedCEO: '/CEO/home',
    require: '/HR/require/:enterpriseId/:id', requireName: 'requireLeave'

};

export const routes = [
    {path: routesNames.home, component: Home},
    {path: routesNames.registerCompany, component: Register},
    {path: routesNames.login, component: Login},
    {path: routesNames.newAccount, component: ActivateAccount, props: true},
    {path: routesNames.newAccountEmployee, component: ActivateAccountEmployee, props: true },


    {path: routesNames.loggedEmployee, component: TemplateHome},
    {path: routesNames.loggedHR, component: TemplateHome},
    {path: routesNames.loggedCEO, component: TemplateHome},
    {path: routesNames.require, component: ConsiderRequire, props: true, name: routesNames.requireName},




];
