<template>
    <div>
        <div>
            <H3> Aktywne zgłoszenia </H3>
                <div v-for="(item, index) in ActiveLeaves" v-bind:key="index" v-on:click="selectedLeave(item)">
                    <Require :thin-worker-require="item"/>
                </div>
        </div>
        <div>
            <H3> Rozsztrzygniete zgłoszenia </H3>
            <ul>
                <li v-for="(item, index) in HistoryLeaves" v-bind:key="index">
                    {{item}}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import {leaveService} from "../../../App";
    import Require from "./Require";
    import {routesNames} from "../../../routes";

    export default {
        name: "RequiresInfo",
        components: {Require},
        props: ["companyId"],
        data() {
            return {
                ActiveLeaves: [],
                HistoryLeaves: []
            }
        },
        mounted() {
            leaveService.getEmployeesLeavesInCompany(this.companyId).then((data) => {
                if (data.errors)
                    this.errors = data.errors;
                else
                    this.ActiveLeaves = data
            })
            leaveService.getHistoryLeavesInCompany(this.companyId, 0).then((data) => {
                if (data.errors)
                    this.errors = data.errors;
                else
                    this.HistoryLeaves = data
            })
        },
        methods: {
            selectedLeave(leave){
                this.$router.push({name: routesNames.requireName, params: { enterpriseId: this.companyId, id: leave.id}});
            }
        }
    }
</script>

<style scoped>

</style>