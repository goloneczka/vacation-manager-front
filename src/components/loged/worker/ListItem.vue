<template>
    <q> Wniosek o urlop na <b>{{item.startDate}} ; {{item.endDate}}</b> został <b> {{status}} </b> </q>
</template>

<script>

    import {LEAVE_STATUS} from "../../../core/Enums";

    export default {
        name: "ListItem",
        props: ["item"],
        computed: {
            status() {
                if (this.item.status === LEAVE_STATUS.ACCEPTED)
                    return 'zaakceptowany'
                if (this.item.status === LEAVE_STATUS.REJECTED)
                    return 'odrzucony'
                if (this.item.status === LEAVE_STATUS.NEW)
                    return 'jeszcze nierozpatrzony'
                return ' ';
            }
        }
    }
</script>

<style scoped>

</style>