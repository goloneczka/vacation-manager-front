<template>
    <div>
        <Header :text="$t('login.header')"/>
        <div v-if="error.length">
            <Alert :message="error" :type="'danger'"/>
        </div>
        <div class="container login-container">
            <div class="row">
                <div class="col-md-6 login-form-1">
                    <h3>{{$t('login.title')}}</h3>
                    <form @submit.prevent="handleSubmit">
                        <div class="form-group">
                            <input v-model="enterprise" type="text" class="form-control"
                                   :placeholder="$t('login.enterprise')"
                                   value=""/>
                        </div>
                        <div class="form-group">
                            <input v-model="login" type="text" class="form-control" :placeholder="$t('login.login')"
                                   value=""/>
                        </div>
                        <div class="form-group">
                            <input v-model="password" type="password" class="form-control"
                                   :placeholder="$t('login.password')"
                                   value=""/>
                        </div>
                        <div class="form-group">
                            <input type="submit" class="btnSubmit" :value="$t('login.button')"/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

    import {workerService, authorizationStorage, enterpriseService} from '../../App'
    import Header from "../Header";
    import Alert from "../Alert";
    import {routesNames} from "../../routes";
    import {ROLES} from "../../core/Enums";

    export default {
        name: 'login',
        components: {Alert, Header},
        data() {
            return {
                enterprise: '',
                login: '',
                password: '',
                error: '',
            }
        },
        methods: {
            handleSubmit() {
                this.error = '';
                authorizationStorage.setAuthorization(this.login + "/" + this.enterprise, this.password);
                workerService.getWorker(this.login, this.enterprise).then(response => {
                    if (response.errors) {
                        this.error = response.errors;
                        authorizationStorage.removeAuthorization()
                    } else {
                        enterpriseService.getCompanyById(response.enterpriseId).then((response1) => {
                            if (response.errors) {
                                this.error = response.errors;
                                authorizationStorage.removeAuthorization()
                            } else {
                                authorizationStorage.setWorkerAuthorization(JSON.stringify({
                                    ...response,
                                    enterpriseName: response1.enterpriseName
                                }))
                                switch (response.roles[0].name) {
                                    case ROLES.CEO:
                                        this.$router.push(routesNames.loggedCEO);
                                        break;
                                    case ROLES.HR:
                                        this.$router.push(routesNames.loggedHR);
                                        break;
                                    case ROLES.EMPLOYEE:
                                        this.$router.push(routesNames.loggedEmployee);
                                        break;
                                }
                            }
                        })
                    }
                })
            },
        }
    }
</script>
<style scoped>
    .login-container {
        margin-bottom: 5%;
    }

    .login-form-1 {
        padding: 5%;
        margin: auto;
        box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 9px 26px 0 rgba(0, 0, 0, 0.19);
    }

    .login-form-1 h3 {
        text-align: center;
        color: #333;
    }

    .login-container form {
        padding: 10%;
    }

    .btnSubmit {
        width: 50%;
        border-radius: 1rem;
        padding: 1.5%;
        border: none;
        cursor: pointer;
    }

    .login-form-1 .btnSubmit {
        font-weight: 600;
        color: #fff;
        background-color: #9933ff;
    }

    .login-form-1 .ForgetPwd {
        color: #9933ff;
        font-weight: 600;
        text-decoration: none;
    }
</style>
