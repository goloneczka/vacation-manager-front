<template>
    <div>
        <div>
            <div v-if="selected.email !== ''">
                <CustomApexBarChart :company-name="companyName" :email="selected.email" :employee-name="selected.name"/>
            </div>
            <div class="row">
                <div class="col-md-8">
                    <table class="table table-hover table-sm ">
                        <thead>
                        <tr>
                            <th scope="col">Email</th>
                            <th scope="col">Imie i nazwsko</th>
                            <th scope="col">Zawód</th>
                            <th scope="col">Zatrudniony</th>
                            <th scope="col">Edytuj</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item, index) in employees" v-bind:key="index"
                            @mouseover="updateVars(item)" >
                            <td>{{item.email}}</td>
                            <td>{{item.name}}</td>
                            <td>{{item.occupation}}</td>
                            <td>{{item.hired}}</td>
                            <td>
                                <button type="button" class="btn btn-outline-dark btn-sm"
                                @click="navigate(item)">Val</button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <div v-if=" role === roleCeo">
                        <button type="button" class="btn btn-outline-success"
                                v-b-modal.modal-employee> {{$t('CEO.addEmployee')}}
                        </button>
                    </div>
                </div>
                <div class="col-md-3 ml-5 grid-box" v-if="selected.employeeVarsId !== ''">
                    <EmployeeVars :varId="selected.employeeVarsId" :employee-name="selected.name" :is-edit="false"/>
                </div>
            </div>
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
        </div>

    </div>

</template>

<script>
    import {workerService} from "../../../App";
    import {ROLES} from "../../../core/Enums";
    import AlertTemplate from "../../AlertTemplate";
    import EmployeeVars from "./EmployeeVars";
    import CustomApexBarChart from "./CustomApexBarChart";
    import {routesNames} from "../../../routes";
    import {state} from "../../../core/AlertMessage";

    export default {
        name: "EmployeesInfo",
        components: {CustomApexBarChart, EmployeeVars, AlertTemplate},
        props: ["companyId", "companyName", "role"],
        data() {
            return {
                errors: [],
                errorsForm: [],
                employees: [],
                newEmployeeForm: {
                    name: '',
                    email: '',
                    hired: '',
                    occupation: '',
                    isHR: false
                },
                selected: {
                    email: '',
                    name: '',
                    employeeVarsId: ''
                },
                tmpSelect: {}
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
                else {
                    this.employees = data
                    this.selected.name = this.employees[0].name;
                    this.selected.employeeVarsId = this.employees[0].employeeVarsId;
                    this.selected.email = this.employees[0].email;

                }
            })
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
                workerService.addEmployee(this.newEmployeeForm, this.companyId).then(data => {
                    if (data.errors)
                        this.errorsForm = data.errors;
                    else {
                        this.$nextTick(() => {
                            state.prepareMessageToAlert = this.$t('CEO.newEmployee.accepted')
                            this.$bvModal.hide('modal-employee')
                        })
                    }
                })
            },
            updateVars(item) {
                this.tmpSelect = item;
                setTimeout(() => {
                    if (this.tmpSelect === item)
                        this.selected = item
                },1000)
            },
            navigate(item){
                this.$router.push({name: routesNames.employeeSettName, params: { enterpriseId: this.companyId, email: item.email}});
            }
        }
    }
</script>

<style scoped>
    .grid-box {
        padding: 2%;
        box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 9px 26px 0 rgba(0, 0, 0, 0.19);
    }
</style>