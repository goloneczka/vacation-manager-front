<template>
    <b-modal id="modal-employee" :title="$t('CEO.newEmployee.title')"
             @hidden="resetModal"
             @ok="handleOk">
        <div v-for="(error, index) in errorsForm" v-bind:key="index">
            <AlertTemplate :message="error" :type="'danger'"/>
        </div>
        <form ref="form" @submit.stop.prevent="handleSubmit">
            <div class="form-group">
                <label for="name">{{$t('registerForm.getName')}}</label>
                <input v-model="newEmployeeForm.name" class="form-control" id="name"
                       v-bind:placeholder="$t('registerForm.getName')">
            </div>
            <div class="form-group">
                <label for="email">{{$t('registerForm.getEmail')}}</label>
                <input v-model="newEmployeeForm.email" class="form-control" id="email"
                       v-bind:placeholder="$t('registerForm.getEmail')">
                <small>{{$t('registerForm.emailNote')}}</small>
            </div>
            <div class="form-group">
                <label for="name">{{$t('CEO.newEmployee.hired')}}</label>
                <input v-model="newEmployeeForm.hired" class="form-control" id="date"
                       v-bind:placeholder="$t('CEO.newEmployee.hiredTemplate')">
                <small>{{$t('CEO.newEmployee.hiredNote')}}</small>
            </div>
            <div class="form-group">
                <label for="name">{{$t('CEO.newEmployee.occupation')}}</label>
                <input v-model="newEmployeeForm.occupation" class="form-control" id="occupation"
                       v-bind:placeholder="$t('CEO.newEmployee.occupation')">
            </div>
            <div class="form-group">
                <input type="checkbox" id="checkbox" v-model="newEmployeeForm.isHR">
                <label for="checkbox">{{$t('CEO.newEmployee.isHr') }}</label>
            </div>
        </form>
    </b-modal>
</template>

<script>
    import {workerService} from "../../../App";
    import {globalStateAlert} from "../../../core/AlertMessage";
    import AlertTemplate from "../../AlertTemplate";

    export default {
        name: "AddEmployee",
        components: {AlertTemplate},
        props: ["companyName"],
        data() {
            return {
                newEmployeeForm: {
                    name: '',
                    email: '',
                    hired: '',
                    occupation: '',
                    isHR: false
                },
                errorsForm: [],

            }
        },
        mounted() {

        },
        methods: {
            resetModal() {
                for (const prop in this.newEmployeeForm)
                    this.newEmployeeForm[prop] = '';
                this.newEmployeeForm.isHR = false;
                this.errorsForm = [];
            },
            handleOk(bvModalEvt) {
                bvModalEvt.preventDefault()
                this.handleSubmit()
            },
            handleSubmit() {
                this.errorsForm = [];
                workerService.createEmployee(this.newEmployeeForm, this.companyName).then(data => {
                    if (data.errors)
                        this.errorsForm = data.errors;
                    else {
                        this.$nextTick(() => {
                            globalStateAlert.prepareMessageToAlert = this.$t("CEO.newEmployee.accepted")
                            globalStateAlert.type = "success";
                            this.$bvModal.hide('modal-employee')
                        })
                    }
                })
            },
        }
    }
</script>

<style scoped>

</style>