<template>
    <div>
        <div>
            <H3> Aktywne zgłoszenia </H3>
            <ul v-for="(item, index) in ActiveLeaves" v-bind:key="index"
                class="list-group" v-on:click="selectedLeave(item)">
                <li class="list-group-item list-group-item-success list-group-item-action">
                    <ListItem :item="item" />
                </li>
            </ul>
        </div>
        <div>
            <H3> Rozsztrzygniete zgłoszenia </H3>
            <ul v-for="(item, index) in HistoryLeaves" v-bind:key="index" class="list-group">
                <li class="list-group-item list-group-item-primary"
                    v-if="item.status === statusAcc">
                    <ListItem :item="item" />
                </li>
                <li class="list-group-item list-group-item-warning "
                    v-if="item.status === statusRej">
                    <ListItem :item="item" />
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import {leaveService} from "../../../App";
    import {routesNames} from "../../../routes";
    import {LEAVE_STATUS} from "../../../core/Enums";
    import ListItem from "./ListItem";

    export default {
        name: "RequiresInfo",
        components: {ListItem},
        props: ["companyName"],
        data() {
            return {
                ActiveLeaves: [],
                HistoryLeaves: []
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
            leaveService.getByCompanyName(this.companyName).then((data) => {
                if (data.errors)
                    this.errors = data.errors;
                else
                    this.ActiveLeaves = data
            })
            leaveService.getByCompanyNameAndResolved(this.companyName,  0).then((data) => {
                if (data.errors)
                    this.errors = data.errors;
                else
                    this.HistoryLeaves = data
            })
        },
        methods: {
            selectedLeave(leave) {
                this.$router.push({
                    name: routesNames.requireName,
                    params: {enterpriseName: this.companyName, id: leave.id}
                });
            }
        }
    }
</script>

<style scoped>

</style>