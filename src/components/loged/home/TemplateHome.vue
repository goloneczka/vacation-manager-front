<template>
    <div>
        <Header :text="worker.name" :is-logged="true" :enterprise="worker.enterpriseName" />
        <Sidebar :role="worker.roles[0].name" :toSelect="selected" />
        <div class="align-to-sidebar">
            <WorkerInfo v-if="selected.isWorkerInfo" :company-name="worker.enterpriseName"
                        :email="worker.email" :role="worker.roles[0].name"/>
            <timetableInfo v-if="selected.isTimetableInfo" />
            <RequiresInfo v-if="selected.isRequiresInfo" :company-id="worker.enterpriseId" />
            <EmployeesInfo v-if="selected.isEmployeesInfo" :company-id="worker.enterpriseId" :role="worker.roles[0].name" />
            <CompanySettings v-if="selected.isCompanySettings" />

        </div>
    </div>
</template>

<script>
    import {authorizationStorage} from "../../../App";
    import {ROLES} from "../../../core/Enums";
    import Header from "../../Header";
    import Sidebar from "./Sidebar";
    import WorkerInfo from "../WorkerInfo";
    import CompanySettings from "../CompanySettings";
    import TimetableInfo from "../TimetableInfo";
    import EmployeesInfo from "../EmployeesInfo";
    import RequiresInfo from "../require/RequiresInfo";

    export default {
        name: "TemplateHome",
        components: {RequiresInfo, EmployeesInfo, TimetableInfo, CompanySettings, WorkerInfo, Sidebar, Header},
        data() {
            return{
                worker: {},
                selected: {
                    isCompanySettings: false,
                    isWorkerInfo: true,
                    isTimetableInfo: false,
                    isEmployeesInfo: false,
                    isRequiresInfo : false
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
        .align-to-sidebar{
            margin-left: 200px;
        }
</style>