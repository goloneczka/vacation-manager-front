<template>
    <div>
        <ul>
            <li v-for="(item, index) in employees" v-bind:key="index">
                {{item}}
            </li>
        </ul>
        <div v-if="!isEmployeeDetails && role === roleCeo">
            <button type="button" class="btn btn-outline-success"
                    v-b-modal.modal-1> {{$t('CEO.addEmployee')}}
            </button>
            <b-modal id="modal-1" :title="$t('CEO.newEmployee.title')"
                     @hidden="resetModal"
                     @ok="handleOk">
                <div v-for="(error, index) in errorsForm" v-bind:key="index">
                    <Alert :message="error" :type="'danger'"/>
                </div>
                <div v-if="succes">
                    <Alert :message="$t('CEO.newEmployee.accepted')" :type="'success'"/>
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
        </div>
        <div v-if="isEmployeeDetails">
            TODO - informacje o pracowniku ; wykres kolowy ?
        </div>
    </div>
</template>

<script>
    import {workerService} from "../../App";
    import {ROLES} from "../../core/Enums";
    import Alert from "../Alert";

    export default {
        name: "EmployeesInfo",
        components: {Alert},
        props: ["companyId", "role"],
        data() {
            return {
                errors: [],
                errorsForm: [],
                succes: false,
                employees: [],
                isEmployeeDetails: false,
                newEmployeeForm: {
                    name: '',
                    email: '',
                    hired: '',
                    occupation: '',
                    isHR: false
                }
            }
        },
        computed: {
            roleCeo: () => {
                return ROLES.CEO
            }
        },
        mounted() {
            workerService.getEmployeesInCompany(this.companyId).then((data) => {
                if (data.errors)
                    this.errors = data.errors;
                else
                    this.employees = data.map(employee => employee.name)
            })
        },
        methods: {
            resetModal() {
                for (const prop in this.newEmployeeForm)
                    this.newEmployeeForm[prop] = '';
                this.newEmployeeForm.isHR = false;
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
                workerService.addEmployee(this.newEmployeeForm, this.companyId).then(data => {
                    if (data.errors)
                        this.errorsForm = data.errors;
                    else
                        this.succes = true;
                })
                this.$nextTick(() => {
                    this.$bvModal.hide('modal-prevent-closing')
                })
            }
        }
    }
</script>

<style scoped>

</style>