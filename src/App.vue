<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import AuthorizationStorage from './core/requests/AuthorizationStorage';
  import HttpRequest from './core/requests/HttpRequest';
  import EnterpriseService from "./core/service/EnterpriseService";
  import WorkerService from "./core/service/WorkerService";

  const baseUrl = process.env.VUE_APP_BASE_URL
  export const authorizationStorage = new AuthorizationStorage();
  export const httpRequest = new HttpRequest(baseUrl, authorizationStorage);

  export const enterpriseService = new EnterpriseService(httpRequest);
  export const workerService = new WorkerService(httpRequest);


  export default {
   name: 'App',
  }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
