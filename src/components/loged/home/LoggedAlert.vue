<template>
    <div >
        <AlertTemplate :message="message" :type="type"/>
    </div>
</template>

<script>
    import AlertTemplate from "../../AlertTemplate";
    import {globalStateAlert} from "../../../core/AlertMessage";

    export default {
        name: "LoggedAlert",
        components: {AlertTemplate},
        data () {
            return {
                globalStateAlert
            }
        },
        mounted() {
            this.$root.$on("clearMessage", () => {
                globalStateAlert.prepareMessageToAlert = "";
                globalStateAlert.type = "";
            })
        },
        computed: {
            message() {
                return this.globalStateAlert.prepareMessageToAlert
            },
            type() {
                return this.globalStateAlert.type
            }
        }
    }

</script>

<style scoped>

</style>
