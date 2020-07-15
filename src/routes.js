import Home from "./components/unlogged/Home";
import Register from "./components/unlogged/Register"
import Login from "./components/unlogged/Login";
import WorkerHome from "./components/loged/WorkerHome";
import ActivateAccount from "./components/unlogged/ActivateAccount";

export const routesNames = {
    home: '/home',
    registerCompany: '/registerCompany',
    login: '/logging',
    loggedWorker: '/employee/home',
    newAccount: '/newAccount/:email/:enterpriseId'
};

export const routes = [
    {path: '/', component: Home},
    {path: routesNames.registerCompany, component: Register},
    {path: routesNames.login, component: Login},
    {path: routesNames.loggedWorker, component: WorkerHome},
    {path: routesNames.newAccount, component: ActivateAccount, props: true}

];
