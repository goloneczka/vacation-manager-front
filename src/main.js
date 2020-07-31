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
import VueApexCharts from "vue-apexcharts";

Vue.config.productionTip = false

Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.use(VueApexCharts);
Vue.component("apexchart", VueApexCharts);

let router = new VueRouter({routes: routes});

router.beforeEach((to, from, next) => {
    const maxRole = !authorizationStorage.isEmpty(ROLES.WORKER) ?
        JSON.parse(authorizationStorage.getAuthorization(ROLES.WORKER)).roles[0].name : 'none'

    if (to.path.includes("/CEO") && maxRole === ROLES.CEO)
        next();
    else if (to.path.includes("/HR") && (maxRole === ROLES.CEO || maxRole === ROLES.HR))
        next();
    else if (to.path.includes("/employee") && !authorizationStorage.isEmpty(ROLES.WORKER))
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
