import Home from "./components/unlogged/Home";
import Register from "./components/unlogged/Register"
import Login from "./components/unlogged/Login";

export const routesNames = {
    home: '/home',
    registerCompany: '/registerCompany',
    login: '/logging'
};

export const routes = [
    {path: '/', component: Home},
    {path: routesNames.registerCompany, component: Register},
    {path: routesNames.login, component: Login}
];
