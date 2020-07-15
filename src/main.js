import Vue from 'vue'
import App from './App.vue'
import i18n from "./i18n"
import VueRouter from 'vue-router'
import {BootstrapVue} from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import {routes} from './routes'
import {authorizationStorage} from "./App";
import {AUTHORIZATION, ROLES} from "./core/Enums";

Vue.config.productionTip = false

Vue.use(VueRouter);
Vue.use(BootstrapVue);


let router = new VueRouter({mode: 'history', routes: routes});

router.beforeEach((to, from, next) => {
    if (to.path.includes("/HR") && (authorizationStorage.getAuthorization(ROLES.ROLE) === ROLES.CEO
        || authorizationStorage.getAuthorization(ROLES.ROLE) === ROLES.HR))
        next();
    else if (to.path.includes("/employee") && !authorizationStorage.isEmpty(ROLES.ROLE))
        next();
    else if ((!to.path.includes("/HR") && !to.path.includes("/employee")) && authorizationStorage.isEmpty(AUTHORIZATION))
        next();
    else
        next(false);
});

new Vue({
    render: h => h(App),
    router,
    i18n,
}).$mount('#app')
