<template>
    <div class="row">
        <div class="col-md-6 grid-box">
            <div class="form-group row">
                <label> Właściciel </label>
                <div class="col-sm-9">
                    <input v-model="worker" :disabled="true" type="text"
                           class="form-control"/>
                </div>
            </div>
            <div class="form-group row">
                <label> Firma </label>
                <div class="col-sm-9">
                    <input v-model="companyName" :disabled="true" type="text"
                           class="form-control"/>
                </div>
            </div>
            <div class="form-group row">
                <label> Ostatni restart</label>
                <div class="col-sm-9">
                    <input v-model="getLastRestart" :disabled="true" type="text"
                           class="form-control"/>
                </div>
                <small id="note">Automatycznie, każdego 1 stycznia rozpoczynany jest nowy cykl urlopowy</small>
            </div>
        </div>
        <div class="col-md-4 grid-box-danger">
            <input type="submit" class="btn" :value="$t('CEO.restart')"  v-b-modal.modal-restart />
        </div>
        <div>
            <RestartAlert :company-name="companyName"/>
        </div>
    </div>
</template>

<script>
    import RestartAlert from "./RestartAlert";
    import {enterpriseService} from "../../../App";

    export default {
        name: "CompanySettings",
        components: {RestartAlert},
        props: ["worker", "companyName"],
        data() {
            return {
                lastRestart: '',
                errors: []
            }
        },
        computed: {
            getLastRestart(){
                return this.lastRestart || 'Brak poprzedniego cyklu'
            }
        },
        mounted() {
            enterpriseService.getCompanyByName(this.companyName).then(data => {
                if (data.errors)
                    this.errors = data;
                else
                    this.lastRestart = data.restartTime;
            })
        },
    }
</script>

<style scoped>
    .grid-box {
        padding: 4%;
        box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 9px 26px 0 rgba(0, 0, 0, 0.19);
    }

    .grid-box-danger {
        padding: 5%;
        margin: 5%;
        box-shadow: 0 0 13px 7px rgba(255, 0, 0, 0.2), 0 0 13px 7px rgba(255, 0, 0, 0.2);
    }

    .btn {
        border-radius: 1rem;
        font-weight: 400;
        margin-left: 5%;
        margin-right: 5%;
        border: none;
        cursor: pointer;
        background-color: #f75e5e;
    }

</style>