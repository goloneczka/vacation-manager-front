<template>
    <div>
        <b-modal id="modal-restart" :title="$t('CEO.restart')" :body-bg-variant="'danger'" :body-text-variant="'light'"
                 @ok="handleOk">
            <h4 class="center"> Uwaga! </h4>
            <p> Po zatwierdzeniu ukończone lub odrzucone wnioski urlopowe zostaną usunięte.
            Nie wpłynie to natomiast na liczbę przyznanych tegorocznych dni urlopowych.</p>
            <p> Zdarzenie nieodwracalne</p>
        </b-modal>
    </div>
</template>

<script>
    import {leaveService} from "../../../App";
    import {globalStateAlert} from "../../../core/AlertMessage";
    export default {
        name: "RestartAlert",
        props: ["companyName"],
        methods: {
            handleOk() {
                leaveService.deleteLeavesInCompany(this.companyName).then((data) => {
                    this.$nextTick(() => {
                        if (data.errors){
                            globalStateAlert.prepareMessageToAlert = "Błąd aktualizacji"
                            globalStateAlert.type = "danger";
                        }
                        else {
                            globalStateAlert.prepareMessageToAlert = "Zaktualizowano"
                            globalStateAlert.type = "success";
                        }
                        this.$bvModal.hide('modal-restart')
                    })
                })
            }
        }
    }
</script>

<style scoped>
        .center{
            text-align: center;
        }
</style>