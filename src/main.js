import Vue from 'vue'
import App from './App.vue'
import i18n from "./i18n"
import VueRouter from 'vue-router'
import {BootstrapVue} from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import {routes} from './routes'
import VueFlashMessage from "vue-flash-message";

Vue.config.productionTip = false

Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.use(VueFlashMessage);


const router = new VueRouter({routes});

router.beforeEach((to, from, next) => {
  if (!to.path.includes("/admin") ) { // TODO || !authorizationStorage.isEmpty()
    next();
  } else {
    next(false);
  }
});

new Vue({
  render: h => h(App),
  router,
  i18n,
}).$mount('#app')
