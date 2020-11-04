import Home from "./components/unlogged/Home";
import Register from "./components/unlogged/Register"
import Login from "./components/unlogged/Login";
import ActivateAccount from "./components/unlogged/ActivateAccount";
import ActivateAccountEmployee from "./components/unlogged/ActivateAccountEmployee";
import TemplateHome from "./components/loged/home/TemplateHome";
import ConsiderRequire from "./components/loged/require/ConsiderRequire";
import EmployeeSettings from "./components/loged/employees/EmployeeSettings";

export const routesNames = {
    home: '/',
    registerCompany: '/registerCompany',
    login: '/logging',
    newAccount: '/newAccount/:email/:enterpriseName',
    newAccountEmployee: '/newAccountEmployee/:email/:enterpriseName',

    loggedEmployee: '/employee/home',
    loggedHR: '/HR/home',
    loggedCEO: '/CEO/home',
    require: '/HR/require/:enterpriseName/:id', requireName: 'requireLeave',
    employeeSett: '/HR/empSettings/:enterpriseName/:email', employeeSettName: 'employeeSett'


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
    {path: routesNames.employeeSett, component: EmployeeSettings, props: true, name: routesNames.employeeSettName},





];
