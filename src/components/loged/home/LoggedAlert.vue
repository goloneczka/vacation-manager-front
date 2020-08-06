<template>
    <div >
        <AlertTemplate :message="message" :type="'success'"/>
    </div>
</template>

<script>
    import AlertTemplate from "../../AlertTemplate";
    import {state} from "../../../core/AlertMessage";

    export default {
        name: "LoggedAlert",
        components: {AlertTemplate},
        data () {
            return {
                state
            }
        },
        mounted() {
            this.$root.$on("clearMessage", () => {
                state.prepareMessageToAlert = '';
            })
        },
        computed: {
            message() {
                return this.state.prepareMessageToAlert
            }
        },
    }

</script>

<style scoped>

</style>
