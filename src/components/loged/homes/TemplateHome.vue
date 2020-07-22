<template>
    <div>
        <Header :text="worker.name" :is-logged="true" :enterprise="worker.enterpriseName" />
        <Sidebar :role="worker.roles[0].name" :toSelect="selected" />
        <div>
            <WorkerInfo v-if="selected.isWorkerInfo" :company-name="worker.enterpriseName"
                        :email="worker.email" :role="worker.roles[0].name"/>
            <CompanySettings v-if="selected.isCompanySettings" />
            <timetableInfo v-if="selected.isTimetableInfo" />
            <EmployeesInfo v-if="selected.isEmployeesInfo" :company-id="worker.enterpriseId" :role="worker.roles[0].name" />
        </div>
    </div>
</template>

<script>
    import {authorizationStorage} from "../../../App";
    import {ROLES} from "../../../core/Enums";
    import Header from "../../Header";
    import Sidebar from ".././Sidebar";
    import WorkerInfo from "../WorkerInfo";
    import CompanySettings from "../CompanySettings";
    import TimetableInfo from "../TimetableInfo";
    import EmployeesInfo from "../EmployeesInfo";

    export default {
        name: "TemplateHome",
        components: {EmployeesInfo, TimetableInfo, CompanySettings, WorkerInfo, Sidebar, Header},
        data() {
            return{
                worker: {},
                selected: {
                    isCompanySettings: false,
                    isWorkerInfo: true,
                    isTimetableInfo: false,
                    isEmployeesInfo: false
                }
            }
        },
        created() {
            this.worker = JSON.parse(authorizationStorage.getAuthorization(ROLES.WORKER));
        },
        mounted() {
            this.$root.$on("renderView", (selectedView) => {
            for (let prop in this.selected)
                this.selected[prop] = false;
            this.selected[selectedView] = true;
            });

        }
    }
</script>

<style scoped>

</style>