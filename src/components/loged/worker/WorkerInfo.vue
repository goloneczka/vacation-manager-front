<template>
    <div>
        <div v-if="leaves.length">
            <CustomApexBarChartWorker :data="leaves" :name="email" />
        </div>
        <div>
            <div class="row">
                <div class="col-md-8">
                        <ul v-for="(item, index) in leaves" v-bind:key="index" class="list-group">
                            <li class="list-group-item list-group-item-primary"
                                v-if="item.status === statusAcc"> {{item}} </li>
                            <li class="list-group-item list-group-item-success"
                                v-if="item.status === statusNew"> {{item}} </li>
                            <li class="list-group-item list-group-item-warning "
                                v-if="item.status === statusRej"> {{item}} </li>
                        </ul>
                    <button type="button" class="btn btn-outline-success"
                            v-b-modal.modal-leave> {{$t('EMPLOYEE.newLeave.title')}}
                    </button>
                </div>
                <div class="col-md-3 ml-5 grid-box">
                    <WorkerVars :company-name="companyName" :varId="workerVarId"/>
                </div>
            </div>
        </div>
        <div>
            <b-modal id="modal-leave" :title="$t('EMPLOYEE.newLeave.title')"
                     @hidden="resetModal"
                     @ok="handleOk">
                <div v-for="(error, index) in errorsForm" v-bind:key="index">
                    <AlertTemplate :message="error" :type="'danger'"/>
                </div>
                <form ref="form" @submit.stop.prevent="handleSubmit">
                    <div class="form-group">
                        <label>{{$t('EMPLOYEE.newLeave.start')}}</label>
                        <CalendarPicker @calendarVal="getCalendarValStart"
                                        :past-leaves="leavesDate" :end-date="newLeaveForm.endDate"/>
                    </div>
                    <div class="form-group">
                        <label>{{$t('EMPLOYEE.newLeave.end')}}</label>
                        <CalendarPicker @calendarVal="getCalendarValEnd"
                                        :past-leaves="leavesDate" :start-date="newLeaveForm.startDate"/>
                    </div>
                    <div class="form-group">
                        <label for="describe">{{$t('EMPLOYEE.newLeave.describe')}}</label>
                        <input v-model="newLeaveForm.describe" class="form-control" id="describe"
                               v-bind:placeholder="$t('EMPLOYEE.newLeave.describe')">
                        <small>{{$t('EMPLOYEE.newLeave.describeNote')}}</small>
                    </div>
                </form>
            </b-modal>

        </div>
    </div>
</template>

<script>
    import {leaveService} from "../../../App";

    import AlertTemplate from "../../AlertTemplate";
    import CalendarPicker from "./CalendarPicker";
    import WorkerVars from "./WorkerVars";
    import CustomApexBarChartWorker from "./CustomApexBarChartWorker";
    import {LEAVE_STATUS} from "../../../core/Enums";
    import {state} from "../../../core/AlertMessage";

    export default {
        name: "WorkerInfo",
        components: {CustomApexBarChartWorker, WorkerVars, CalendarPicker, AlertTemplate},
        props: ["companyName", "email", "role", "workerVarId"],
        data() {
            return {
                errors: [],
                errorsForm: [],
                leaves: [],
                leavesDate: [],
                newLeaveForm: {
                    startDate: '',
                    endDate: '',
                    describe: ''
                }
            }
        },
        computed: {
            statusAcc: () => {
                return LEAVE_STATUS.ACCEPTED
            },
            statusNew: () => {
                return LEAVE_STATUS.NEW
            },
            statusRej: () => {
                return LEAVE_STATUS.REJECTED
            }
        },
        mounted() {
            leaveService.getEmployeeLeaves(this.companyName, this.email).then((data) => {
                if (data.errors)
                    this.errors = data.errors;
                else {
                    this.leaves = data
                    this.leavesDate = data
                        .filter(paidLeave => paidLeave.status !== LEAVE_STATUS.REJECTED)
                        .map(paidLeave => {
                        let day = new Date(paidLeave.endDate);
                        day.setDate(day.getDate() + 1)
                        return {
                            from: new Date(paidLeave.startDate),
                            to: day
                        }
                    })
                }
            })
        },
        methods: {
            resetModal() {
                for (const prop in this.newLeaveForm)
                    this.newLeaveForm[prop] = '';
                this.errorsForm = [];
            },
            handleOk(bvModalEvt) {
                bvModalEvt.preventDefault()
                this.handleSubmit()
            },
            handleSubmit() {
                this.errorsForm = [];
                leaveService.addPaidLeave(this.newLeaveForm, this.companyName, this.email, this.role).then(data => {
                    if (data.errors)
                        this.errorsForm = data.errors;
                    else {
                        this.leaves.push(data)
                        this.$nextTick(() => {
                            state.prepareMessageToAlert = this.$t('EMPLOYEE.newLeave.accepted')
                            this.$bvModal.hide('modal-leave')
                        })
                        let day = new Date(data.endDate);
                        day.setDate(day.getDate() + 1)
                        this.leavesDate.push({
                            from: new Date(data.startDate),
                            to: day
                        })
                    }
                })

            },
            getCalendarValEnd(val) {
                this.newLeaveForm.endDate = val
            },
            getCalendarValStart(val) {
                this.newLeaveForm.startDate = val
            },
        }
    }
</script>

<style scoped>
    .grid-box {
        padding: 2%;
        box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 9px 26px 0 rgba(0, 0, 0, 0.19);
    }
</style>