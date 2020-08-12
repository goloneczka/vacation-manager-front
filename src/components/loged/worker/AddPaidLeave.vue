<template>
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
</template>

<script>
    import {leaveService} from "../../../App";
    import {globalStateAlert} from "../../../core/AlertMessage";
    import AlertTemplate from "../../AlertTemplate";
    import CalendarPicker from "./CalendarPicker";

    export default {
        name: "AddPaidLeave",
        components: {CalendarPicker, AlertTemplate},
        props: ["companyName", "leavesDate", "email", "role"],
        data() {
            return{
                newLeaveForm: {
                    startDate: '',
                    endDate: '',
                    describe: ''
                },
                errorsForm: [],

            }
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
                        this.$nextTick(() => {
                            globalStateAlert.prepareMessageToAlert = this.$t('EMPLOYEE.newLeave.accepted');
                            globalStateAlert.type = "success";
                            this.$bvModal.hide('modal-leave')
                        })
                        this.$root.$emit("setLeaves", data)
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