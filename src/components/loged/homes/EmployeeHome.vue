<template>
    <div>
        <Header :text="worker.name" :is-logged="true" :enterprise="worker.enterpriseName" />
        <Sidebar :role="worker.roles[0].name"/>
        <H3> TODO </H3>
    </div>
</template>

<script>
    import {authorizationStorage} from "../../../App";
    import {ROLES} from "../../../core/Enums";
    import Header from "../../Header";
    import Sidebar from ".././Sidebar";

    export default {
        name: "EmployeeHome",
        components: {Sidebar, Header},
        data() {
            return{
                worker: {}
            }
        },
        created() {
            this.worker = JSON.parse(authorizationStorage.getAuthorization(ROLES.WORKER));
            console.log(JSON.parse(authorizationStorage.getAuthorization(ROLES.WORKER)))
        }
    }
</script>

<style scoped>

</style>