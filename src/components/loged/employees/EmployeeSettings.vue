<template>
    <div>
        <Header :text="HR.name" :is-logged="true" :enterprise="HR.enterpriseName" :is-back-require="true"/>
        <div class="container">
            <div v-for="(error, index) in errors" v-bind:key="index">
                <Alert :message="error" :type="'danger'"/>
            </div>
            <div class="row">
                <div class="col-md-6 grid-box">
                    <h3> Dane pracownika</h3>
                    <form>
                        <div v-if="employee.name">
                            <EmployeeVars :varId="employee.employeeVarsId" :employee-name="employee.name"
                                          :is-edit="isEditAble"/>
                        </div>
                    </form>
                </div>
                <div class="col-md-6 ">
                    <div class="grid-box2">
                        <div class="form-group row">
                            <label class="col-form-label pr-5"> {{$t('login.login')}} </label>
                            <div class="col-sm-9">
                                <input v-model="employee.email" :disabled="true" type="text"
                                       class="form-control"/>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-form-label"> {{$t('CEO.newEmployee.hired')}} </label>
                            <div class="col-sm-9">
                                <input v-model="employee.hired" :disabled="true" type="text"
                                       class="form-control"/>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-form-label pr-1"> {{$t('CEO.newEmployee.occupation')}} </label>
                            <div class="col-sm-9">
                                <input v-model="employee.occupation" :disabled="!isEditAble" type="text"
                                       class="form-control"/>
                            </div>
                        </div>
                    </div>
                    <div class="form-group grid-box3">
                        <div class="center">
                            <input type="submit" class="btn btnSubmit" :value="$t('HR.edit.accept')"
                                   @click="handleSubmit"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {authorizationStorage, workerService} from "../../../App";
    import Alert from "../../Alert";
    import {ROLES} from "../../../core/Enums";
    import Header from "../../Header";
    import EmployeeVars from "./EmployeeVars";

    export default {
        name: "EmployeeSettings",
        components: {EmployeeVars, Header, Alert},
        props: ["email", "enterpriseId"],
        data() {
            return {
                HR: {},
                errors: [],
                succes: false,
                employee: {
                    occupation: '',
                    hired: '',
                    name: '',
                    email: ''
                },
                isEditAble: false,
                isStateChanged: false,
                isStateVarChanged: false
            }
        },
        computed: {},
        created() {
            this.HR = JSON.parse(authorizationStorage.getAuthorization(ROLES.WORKER));
        },
        watch: {
            employee: {
                deep: true,
                handler(n, o) {
                    if (o.occupation !== '') {
                        this.isStateChanged = true;
                    }
                }
            }
        },
        mounted() {
            workerService.getWorker(this.email, this.HR.enterpriseName).then(data => {
                if (data.errors)
                    this.errors = data.errors;
                else {
                    this.employee = data
                    if (this.employee.roles[0].name !== ROLES.CEO || this.HR.roles[0].name === ROLES.CEO)
                        this.isEditAble = true
                }
            })

            this.$root.$on("setVars", (data) => {
                if (data != null)
                    workerService.setWorkerDetails(this.employee.employeeVarsId, data).then(data => {
                        console.log(data)
                        if (data.errors)
                            this.errors = data.errors;
                        else {
                            this.succes = true;
                        }
                    })
                if (this.isStateChanged)
                    workerService.setWorker(this.email, this.HR.enterpriseName, this.employee ).then(data => {
                        if (data.errors)
                            this.errors = data.errors;
                        else {
                            this.succes = true;
                        }
                    })
            })
        },
        methods: {
            handleSubmit() {
                this.$emit('getVars');
            }
        }
    }
</script>

<style scoped>
    .grid-box {
        padding: 4%;
        box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 9px 26px 0 rgba(0, 0, 0, 0.19);
    }

    .grid-box2 {
        margin-bottom: 2%;
        padding: 5% 5% 5% 8%;
        box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 9px 26px 0 rgba(0, 0, 0, 0.19);
    }

    .grid-box3 {
        margin-top: 10%;
        padding: 5%;
        box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 9px 26px 0 rgba(0, 0, 0, 0.19);
    }

    .btn {
        width: 42%;
        border-radius: 1rem;
        padding: 1.5%;
        font-weight: 400;
        margin-left: 5%;
        margin-right: 5%;
        border: none;
        cursor: pointer;
        color: #fff;

    }

    .grid-box3 .btnSubmit {
        background-color: #0018f0;
    }
</style>