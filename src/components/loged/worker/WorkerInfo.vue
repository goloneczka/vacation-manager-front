<template>
    <div>
        <div v-if="Object.keys(vars).length !== 0">
            <CustomApexBarChartWorker :data="leaves" :name="email"
                                      :vars="vars" :company-leaves="companyLeaves"/>
        </div>
        <div>
            <div class="row">
                <div class="col-md-8">
                        <ul v-for="(item, index) in leaves" v-bind:key="index" class="list-group">
                            <li class="list-group-item list-group-item-primary"
                                v-if="item.status === statusAcc">
                                <ListItem :item="item" />
                            </li>
                            <li class="list-group-item list-group-item-success"
                                v-if="item.status === statusNew">
                                <ListItem :item="item" />
                            </li>
                            <li class="list-group-item list-group-item-warning "
                                v-if="item.status === statusRej">
                                <ListItem :item="item" />
                            </li>
                        </ul>
                    <button type="button" class="btn btn-outline-success"
                            v-b-modal.modal-leave> {{$t('EMPLOYEE.newLeave.title')}}
                    </button>
                </div>
                <div class="col-md-3 ml-5 grid-box" v-if="Object.keys(vars).length !== 0">
                    <VarsInfo :company-leaves="companyLeaves" :vars="vars"/>
                </div>
            </div>
        </div>
        <AddPaidLeave :leaves-date="leavesDate" :companyName="companyName" :email="email" :role="role"/>
    </div>
</template>

<script>
    import {enterpriseService, leaveService, workerService} from "../../../App";
    import CustomApexBarChartWorker from "./CustomApexBarChartWorker";
    import {LEAVE_STATUS} from "../../../core/Enums";
    import AddPaidLeave from "./AddPaidLeave";
    import VarsInfo from "../shared/VarsInfo";
    import ListItem from "./ListItem";

    export default {
        name: "WorkerInfo",
        components: {ListItem, VarsInfo, AddPaidLeave, CustomApexBarChartWorker},
        props: ["companyName", "email", "role", "workerVarId"],
        data() {
            return {
                errors: [],
                leaves: [],
                leavesDate: [],
                vars: {},
                companyLeaves: 0
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
            enterpriseService.getCompanyByName(this.companyName).then(data => {
                if (data.errors)
                    this.errors = data.errors;
                else {
                    this.companyLeaves = data.freeDays;
                }
            })
            leaveService.getEmployeeLeaves(this.companyName, this.email).then((data) => {
                if (data.errors)
                    this.errors = data.errors;
                else {
                    this.leaves = data
                    workerService.getWorkerDetails(this.workerVarId).then(data1 => {
                        if (data1.errors)
                            this.errors = data1.errors;
                        else
                            this.vars = data1
                    })
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

            this.$root.$on("setLeaves", (data) => {
                this.leaves.push(data)
                let day = new Date(data.endDate);
                day.setDate(day.getDate() + 1)
                this.leavesDate.push({
                    from: new Date(data.startDate),
                    to: day
                })
            })

        },
        methods: {

        }
    }
</script>

<style scoped>
    .grid-box {
        padding: 2%;
        box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 9px 26px 0 rgba(0, 0, 0, 0.19);
    }
</style>