<template>
    <div>
        <Header :text="worker.name" :is-logged="true" :enterprise="worker.enterpriseName" />
        <Sidebar :role="worker.roles[0].name" :toSelect="selected" />
        <div>
            <CompanySettings v-if="selected.isCompanySettings" />
            <WorkerInfo v-if="selected.isWorkerInfo" />
            <timetableInfo v-if="selected.isTimetableInfo" />

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

    export default {
        name: "CEOHome",
        components: {TimetableInfo, CompanySettings, WorkerInfo, Sidebar, Header},
        data() {
            return{
                worker: {},
                selected: {
                    isCompanySettings: false,
                    isWorkerInfo: false,
                    isTimetableInfo: false
                }
            }
        },
        created() {
            console.log(this.selected)
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