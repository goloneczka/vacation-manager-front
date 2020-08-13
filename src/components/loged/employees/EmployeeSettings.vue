<template>
    <div>
        <Header :text="HR.name" :is-logged="true" :enterprise="HR.enterpriseName" :is-back-require="true"/>
        <div class="container">
            <div v-for="(error, index) in errors" v-bind:key="index">
                <AlertTemplate :message="error" :type="'danger'"/>
            </div>
            <div class="row">
                <div class="col-md-6 grid-box">
                    <h3> Dane pracownika</h3>
                    <div class="form-group row">
                        <label> Pracownik </label>
                        <input v-model="employee.name" :disabled="true" type="text"
                               class="form-control"/>
                    </div>
                    <div class="form-group row">
                        <label> Staż pracy </label>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="input-group mb-2 mr-sm-2">
                                    <input v-model="vars.seniority" :disabled="!isEditAble" type="text"
                                           class="form-control"/>
                                    <div class="input-group-prepend">
                                        <div class="input-group-text ml-2">Lat</div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="input-group mb-2 mr-sm-2">
                                    <input v-model="seniorityDays" :disabled="true" type="text"
                                           class="form-control"/>
                                    <div class="input-group-prepend">
                                        <div class="input-group-text ml-2">Dni</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label> Dodatkowo przyznane dni </label>
                        <input v-model="vars.extraDays" :disabled="!isEditAble" type="text"
                               class="form-control"/>
                    </div>
                    <div class="form-group row">
                        <label> Dodatkowo przyznane dni na ten rok</label>
                        <input v-model="vars.annualExtraDays" :disabled="!isEditAble" type="text"
                               class="form-control"/>
                    </div>
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
                            <input type="submit" class="btn btnSubmit" :value="$t('HR.edit.accept')"
                                   @click="handleSubmit"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {authorizationStorage, workerService} from "../../../App";
    import AlertTemplate from "../../AlertTemplate";
    import {ROLES} from "../../../core/Enums";
    import Header from "../../Header";
    import {globalStateAlert} from "../../../core/AlertMessage"

    export default {
        name: "EmployeeSettings",
        components: {Header, AlertTemplate},
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
                vars: {
                    annualExtraDays: 0,
                    extraDays: 0,
                    seniority: 0
                },
                seniorityDays: 0,

                isEditAble: false,
                isStateChanged: false,
                isStateVarChanged: false
            }
        },
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
            },
            vars: {
                deep: true,
                handler(n, o) {
                    if (o.annualExtraDays !== '') {
                        this.isStateVarChanged = true;
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
                    workerService.getWorkerDetails(this.employee.employeeVarsId).then(data => {
                        if (data.errors)
                            this.errors = data.errors;
                        else {
                            this.vars = data
                            this.seniorityDays = this.vars.seniority >= 10 ? 6 : 0
                        }
                    })

                }
            })


        },
        methods: {
            handleSubmit() {
                const that = this;
                const p1 = new Promise((resolve) => {
                    this.resolvePromise(() => workerService.setWorkerDetails(that.email, that.HR.enterpriseName, that.vars),
                        that.isStateVarChanged, resolve)
                })
                const p2 = new Promise((resolve) => {
                    this.resolvePromise(() => workerService.setWorker(that.email, that.HR.enterpriseName, that.employee),
                        that.isStateChanged, resolve)
                })
                Promise.all([p1, p2]).then(() => {
                    globalStateAlert.type = "success";
                    globalStateAlert.prepareMessageToAlert = "Dane pracownika zostały zaktualizowane";
                    this.$router.go(-1);

                })

            },
            resolvePromise(fun, is, resolve) {
                if (is)
                    fun().then(data => {
                        if (data.errors)
                            this.errors = data.errors;
                        else {
                            resolve()
                        }
                    })
                else
                    resolve()
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