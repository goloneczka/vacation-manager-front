<template>
    <div>
        <Header :text="$t('confirm.header')" class="mb-5"/>
        <AlertTemplate :message="message" :type="type"/>
    </div>
</template>

<script>
    import Header from "../Header";
    import AlertTemplate from "../AlertTemplate";
    import {workerService} from "../../App";

    export default {
        name: "ActivateAccountEmployee",
        components: {AlertTemplate, Header},
        props: ["email", "enterpriseName"],
        data() {
            return {
                type: '',
                message: '',
            }
        },
        mounted() {
            workerService.confirmEmployee(this.email, this.enterpriseName ).then(response => {
                if(response.errors){
                    this.type = 'danger'
                    this.message = response.errors[0]
                }
                else {
                    this.type = 'success'
                    this.message = this.$t("confirm.message.accept")
                }
            })
        },

    }
</script>

<style scoped>

</style>