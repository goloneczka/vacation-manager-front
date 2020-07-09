import Home from "./components/unlogged/Home";
import Register from "./components/unlogged/Register"
import Login from "./components/unlogged/Login";
import WorkerHome from "./components/loged/WorkerHome";

export const routesNames = {
    home: '/home',
    registerCompany: '/registerCompany',
    login: '/logging',
    loggedWorker: '/employee/home'
};

export const routes = [
    {path: '/', component: Home},
    {path: routesNames.registerCompany, component: Register},
    {path: routesNames.login, component: Login},
    {path: routesNames.loggedWorker, component: WorkerHome}

];
