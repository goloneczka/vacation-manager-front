import Home from "./components/unlogged/Home";
import Register from "./components/unlogged/Register"
import Login from "./components/unlogged/Login";
import ActivateAccount from "./components/unlogged/ActivateAccount";
import HRHome from "./components/loged/homes/HRHome";
import CEOHome from "./components/loged/homes/CEOHome";
import EmployeeHome from "./components/loged/homes/EmployeeHome";

export const routesNames = {
    home: '/home',
    registerCompany: '/registerCompany',
    login: '/logging',
    newAccount: '/newAccount/:email/:enterpriseId',

    loggedEmployee: '/employee/home',
    loggedHR: '/HR/home',
    loggedCEO: '/CEO/home'

};

export const routes = [
    {path: '/', component: Home},
    {path: routesNames.registerCompany, component: Register},
    {path: routesNames.login, component: Login},
    {path: routesNames.newAccount, component: ActivateAccount, props: true},

    {path: routesNames.loggedEmployee, component: EmployeeHome},
    {path: routesNames.loggedHR, component: HRHome},
    {path: routesNames.loggedCEO, component: CEOHome},



];
