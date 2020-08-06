<template>
    <div>
        <div class="form-group row">
            <label> Dni urlopowe w firmie </label>
            <input v-model="companyLeaves" :disabled="true" type="text"
                   class="form-control"/>
        </div>
        <div class="form-group row">
            <label> Staż pracy </label>
            <div class="row">
                <div class="col-md-6">
                    <div class="input-group mb-2 mr-sm-2">
                        <input v-model="vars.seniority" :disabled="true" type="text"
                               class="form-control"/>
                        <div class="input-group-prepend">
                            <div class="input-group-text ml-2">Lat</div>
                        </div>
                    </div>
                </div>
            </div>
            <small>{{$t('HR.freeWithSeniority')}}</small>
        </div>
        <div class="form-group row">
            <label> Dodatkowo przyznane dni </label>
            <input v-model="vars.extraDays" :disabled="true" type="text"
                   class="form-control"/>
        </div>
        <div class="form-group row">
            <label> Dodatkowo przyznane dni na ten rok</label>
            <input v-model="vars.annualExtraDays" :disabled="true" type="text"
                   class="form-control"/>
        </div>
    </div>
</template>

<script>
    import {workerService, enterpriseService} from "../../../App";

    export default {
        name: "WorkerVars",
        props: ["varId", "companyName"],
        data() {
            return {
                vars: {
                    annualExtraDays: '',
                    extraDays: '',
                    seniority: ''
                },
                companyLeaves: '',
            }
        },
        mounted() {
            workerService.getWorkerDetails(this.varId).then(data => {
                if (data.errors)
                    this.errors = data.errors;
                else {
                    this.vars = data
                    this.vars.extraDays += this.vars.seniority >= 10 ? 6 : 0
                }
            })
            enterpriseService.getCompanyByName(this.companyName).then(data => {
                if (data.errors)
                    this.errors = data.errors;
                else {
                    this.companyLeaves = data.freeDays;
                }
            })
        }
    }
</script>

<style scoped>

</style>