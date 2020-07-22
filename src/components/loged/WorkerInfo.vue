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
                <div v-if="succes">
                    <Alert :message="$t('EMPLOYEE.newLeave.accepted')" :type="'success'"/>
                </div>
                <form ref="form" @submit.stop.prevent="handleSubmit">
                    <div class="form-group">
                        <label >{{$t('EMPLOYEE.newLeave.start')}}</label>
                        <Calendar @calendarVal="getCalendarValStart" :end-date="newLeaveForm.endDate"/>
                    </div>
                    <div class="form-group">
                        <label >{{$t('EMPLOYEE.newLeave.end')}}</label>
                        <Calendar @calendarVal="getCalendarValEnd" :start-date="newLeaveForm.startDate"/>
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
    import {leaveService} from "../../App";

    import Alert from "../Alert";
    import Calendar from "./Calendar";
    export default {
        name: "WorkerInfo",
        components: {Calendar, Alert},
        props: ["companyName", "email", "role"],
        data() {
            return {
                errors: [],
                errorsForm: [],
                succes: false,
                leaves: [],
                newLeaveForm: {
                    startDate: '',
                    endDate: '',
                    describe: ''
                }
            }
        },
        mounted() {
            leaveService.getEmployeeLeaves(this.companyName, this.email).then((data) => {
                console.log(data)
                if (data.errors)
                    this.errors = data.errors;
                else
                    this.leaves = data
            })
        },
        methods: {
            resetModal() {
                for (const prop in this.newLeaveForm)
                    this.newLeaveForm[prop] = '';
                this.errorsForm = [];
                this.succes = false;
            },
            handleOk(bvModalEvt) {
                bvModalEvt.preventDefault()
                this.handleSubmit()
            },
            handleSubmit() {
                this.errorsForm = [];
                this.succes = false;
                leaveService.addPaidLeave(this.newLeaveForm, this.companyName, this.email, this.role).then(data => {
                    console.log(data)
                    if (data.errors)
                        this.errorsForm = data.errors;
                    else
                        this.succes = true;
                })
                this.$nextTick(() => {
                    this.$bvModal.hide('modal-prevent-closing')
                })
            },
            getCalendarValEnd(val){
                this.newLeaveForm.endDate = val
            },
            getCalendarValStart(val){
                this.newLeaveForm.startDate = val
            },
        },

    }
</script>

<style scoped>

</style>