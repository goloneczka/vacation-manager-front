<template>
    <div>
        <Header :text="$t('confirm.header')" class="mb-5"/>
        <AlertTemplate :message="message" :type="type"/>
    </div>
</template>

<script>
    import Header from "../Header";
    import AlertTemplate from "../AlertTemplate";
    import {enterpriseService} from "../../App";

    export default {
        name: "ActivateAccount",
        components: {AlertTemplate, Header},
        props: ["email", "enterpriseName"],
        data() {
            return {
                type: '',
                message: '',
            }
        },
        mounted() {
            enterpriseService.confirmCompanyAndCeo(this.email, this.enterpriseName ).then(response => {
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