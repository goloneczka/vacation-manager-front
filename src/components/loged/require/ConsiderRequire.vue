<template>
    <div>
        <Header :text="HR.name" :is-logged="true" :enterprise="HR.enterpriseName" :is-back-require="true"/>
        <div class="container login-container">
            <div v-for="(error, index) in errors" v-bind:key="index">
                <Alert :message="error" :type="'danger'"/>
            </div>
            <div v-if="succes">
                <Alert :message="$t('HR.consider.accepted')" :type="'success'"/>
            </div>
            <div class="row">
                <div class="col-md-6 login-form-1">
                    <h3> Wniosek o urlop</h3>
                    <form>
                        <div class="form-group row">
                            <label class="col-form-label pr-2"> {{$t('HR.consider.employee')}} </label>
                            <div class="col-sm-9">
                                <input v-model="workerRequire.name" :disabled="true" type="text"
                                       class="form-control"/>
                            </div>
                        </div>
                        <div class="form-group row">
                                <label class="col-form-label"> {{$t('CEO.newEmployee.occupation')}} </label>
                            <div class="col-sm-9">
                                <input v-model="workerRequire.occupation" :disabled="true" type="text"
                                       class="form-control"/>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-form-label pr-5"> {{$t('HR.consider.days')}} </label>
                            <div class="col-sm-9 ">
                                <input v-model="workerRequire.days" :disabled="true" type="text"
                                       class="form-control"/>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label > {{$t('EMPLOYEE.newLeave.describe')}} </label>
                            <input v-model="workerRequire.describe" :disabled="true"  type="text"
                                   class="form-control"/>
                        </div>

                    </form>
                </div>
                <div class="col-md-6">
                    <div class="login-form-2 ">
                       <CalendarDisplay :start="workerRequire.startDate" :end="workerRequire.endDate" />
                    </div>
                    <div class="login-form-3">
                        <h4> Decyzja </h4>
                        <div class="form-group">
                            <input type="submit" class="btn btnSubmit" :value="$t('HR.consider.accept')"
                                   :disabled="succes || valFailed" :id="statusAccept" @click="handleSubmit($event)"/>
                            <input type="submit" class="btn btnReject" :value="$t('HR.consider.decline')"
                                   :disabled="succes || valFailed" :id="statusReject" @click="handleSubmit($event)"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {authorizationStorage, leaveService} from "../../../App";
    import {LEAVE_STATUS, ROLES} from "../../../core/Enums";
    import Header from "../../Header";
    import CalendarDisplay from "./CalendarDisplay";
    import Alert from "../../Alert";

    export default {
        name: "Require",
        components: {Alert, CalendarDisplay, Header},
        props: ["id", "enterpriseId"],
        data() {
            return {
                HR: {},
                errors: [],
                succes: false,
                valFailed: false,
                workerRequire: {
                    name: '',
                    occupation: '',
                    describe: '',
                    days: '',
                    startDate: '',
                    endDate: ''
                }
            }
        },
        created() {
            this.HR = JSON.parse(authorizationStorage.getAuthorization(ROLES.WORKER));
        },
        mounted() {
            leaveService.getLeaveDetails(this.id).then((data) => {
                if (data.errors)
                    this.errors = data.errors;
                else if (data.status !== LEAVE_STATUS.NEW) {
                    this.errors = [this.$t("HR.considerError")]
                    this.valFailed = true
                }
                else {
                    this.workerRequire = data
                }
            })
        },
        computed: {
            statusReject: () => {
                return LEAVE_STATUS.REJECTED
            },
            statusAccept: () => {
                return LEAVE_STATUS.ACCEPTED
            },
        },
        methods: {
            handleSubmit(event) {
                leaveService.setLeaveStatus(this.id, event.currentTarget.id).then((data) => {
                    if (data.errors)
                        this.errors = data.errors;
                    else
                        this.succes = true;
                })
            }
        }
    }

</script>

<style scoped>
    .login-container {
        margin-bottom: 5%;
    }

    .login-form-1 {
        padding: 5%;
        box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 9px 26px 0 rgba(0, 0, 0, 0.19);
    }

    .login-form-2 {
        margin-bottom: 2%;
        padding: 5% 5% 5% 20%;
        box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 9px 26px 0 rgba(0, 0, 0, 0.19);
    }

    .login-form-3 {
        margin-top: 2%;
        padding: 5% 5% 10%;
        box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 9px 26px 0 rgba(0, 0, 0, 0.19);
    }


    .login-form-1 h3 {
        text-align: center;
        color: #333;
    }

    .login-container form {
        padding: 10% 10% 10% 2%;
    }

    .btn {
        width: 30%;
        border-radius: 1rem;
        padding: 1.5%;
        font-weight: 400;
        margin-left: 5%;
        margin-right: 5%;
        border: none;
        cursor: pointer;
        color: #fff;

    }

    .login-form-3 .btnSubmit {
        background-color: #0018f0;
    }

    .login-form-3 .btnReject {
        background-color: #cf0829;
    }
</style>