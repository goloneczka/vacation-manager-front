<template>
    <div>
        <div>
            <H3> WYKRES KOLOWY OR PASEK - Z LICZBA WYKORZYTANYCH DNI URLOPU</H3>
        </div>
        <div>
            <ul>
                <li v-for="(item, index) in leaves" v-bind:key="index">
                    {{item}}
                </li>
            </ul>
        </div>
        <div>
            <button type="button" class="btn btn-outline-success"
                    v-b-modal.modal-leave> {{$t('EMPLOYEE.newLeave.title')}}
            </button>
            <b-modal id="modal-leave" :title="$t('EMPLOYEE.newLeave.title')"
                     @hidden="resetModal"
                     @ok="handleOk">
                <div v-for="(error, index) in errorsForm" v-bind:key="index">
                    <Alert :message="error" :type="'danger'"/>
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
            <div v-if="succes">
                <Alert :message="$t('EMPLOYEE.newLeave.accepted')" :type="'success'"/>
            </div>
        </div>
    </div>
</template>

<script>
    import {leaveService} from "../../App";

    import Alert from "../Alert";
    import CalendarPicker from "./CalendarPicker";

    export default {
        name: "WorkerInfo",
        components: {CalendarPicker, Alert},
        props: ["companyName", "email", "role"],
        data() {
            return {
                errors: [],
                errorsForm: [],
                succes: false,
                leaves: [],
                leavesDate: [],
                newLeaveForm: {
                    startDate: '',
                    endDate: '',
                    describe: ''
                }
            }
        },
        mounted() {
            leaveService.getEmployeeLeaves(this.companyName, this.email).then((data) => {
                if (data.errors)
                    this.errors = data.errors;
                else {
                    this.leaves = data
                    this.leavesDate = data.map(paidLeave => {
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
                this.succes = false;
                leaveService.addPaidLeave(this.newLeaveForm, this.companyName, this.email, this.role).then(data => {
                    if (data.errors)
                        this.errorsForm = data.errors;
                    else {
                        this.succes = true;
                        this.leaves.push(data)
                        this.$nextTick(() => {
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

</style>