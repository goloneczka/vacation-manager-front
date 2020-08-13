<template>
    <div>
        <div>
            <div v-if="Object.keys(vars).length !== 0">
                <CustomApexBarChart :company-name="companyName" :email="selected.email"
                                    :employee-name="selected.name" :vars="vars" :company-leaves="companyLeaves"/>
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
                        <tr v-for="(item, index) in employees" v-bind:key="index">
                            <td>{{item.email}}</td>
                            <td>{{item.name}}</td>
                            <td>{{item.occupation}}</td>
                            <td>{{item.hired}}</td>
                            <td>
                                <button type="button" class="btn btn-outline-info btn-sm "
                                        @click="updateVars(item)">Inf
                                </button>
                                <button type="button" class="pl-1 btn btn-outline-dark btn-sm "
                                        @click="navigate(item)">Edt
                                </button>
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
                <div class="col-md-3 ml-5 grid-box" v-if="Object.keys(vars).length !== 0">
                    <VarsInfo :vars="vars" :employee-name="selected.name"/>
                </div>
                <div>
                    <AddEmployee :company-id="companyId"/>
                </div>
            </div>

        </div>

    </div>

</template>

<script>
    import {enterpriseService, workerService} from "../../../App";
    import {ROLES} from "../../../core/Enums";
    import VarsInfo from "../shared/VarsInfo";
    import CustomApexBarChart from "./CustomApexBarChart";
    import {routesNames} from "../../../routes";
    import AddEmployee from "./AddEmployee";

    export default {
        name: "EmployeesInfo",
        components: {AddEmployee, CustomApexBarChart, VarsInfo},
        props: ["companyId", "companyName", "role"],
        data() {
            return {
                errors: [],
                employees: [],
                selected: {
                    email: '',
                    name: '',
                    employeeVarsId: ''
                },
                vars: {},
                companyLeaves: 0
            }
        },
        computed: {
            roleCeo: () => {
                return ROLES.CEO
            },
        },
        watch: {
            selected: {
                deep: true,
                handler(n) {
                    workerService.getWorkerDetails(n.employeeVarsId).then(data => {
                        if (data.errors)
                            this.errors = data.errors;
                        else {
                            this.vars = data
                        }
                    })
                }
            }
        },
        mounted() {
            enterpriseService.getCompanyByName(this.companyName).then(data => {
                if (data.errors)
                    this.errors = data.errors;
                else {
                    this.companyLeaves = data.freeDays;
                }
            })
            workerService.getEmployeesInCompany(this.companyId).then((data) => {
                if (data.errors)
                    this.errors = data.errors;
                else {
                    this.employees = data
                    this.selected = this.employees[0]
                }
            })
        },
        methods: {
            updateVars(item) {
                this.selected = item;
            },
            navigate(item) {
                this.$router.push({
                    name: routesNames.employeeSettName,
                    params: {enterpriseId: this.companyId, email: item.email}
                });
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