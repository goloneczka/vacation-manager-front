<template>
    <div>
        <div class="form-group row" >
            <label> Pracownik </label>
            <input v-model="employeeName" :disabled="true" type="text"
                   class="form-control"/>
        </div>
        <div class="form-group row">
            <label> Staż pracy </label>
            <div class="input-group mb-2 mr-sm-2">
                <input v-model="vars.seniority" :disabled="true" type="text"
                       class="form-control"/>
                <div class="input-group-prepend">
                    <div class="input-group-text ml-2">Lat</div>
                </div>
            </div>
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
    import {workerService} from "../../../App";

    export default {
        name: "EmployeeVars",
        props: ["varId", "employeeName"],
        data() {
            return {
                vars: {
                    annualExtraDays: '',
                    extraDays: '',
                    seniority: ''
                },
            }
        },
        watch: {
            varId: function (n) {
                this.getDeatails(n)
            }
        },
        mounted() {
            this.getDeatails(this.varId)

        },
        methods: {
            getDeatails(val) {
                workerService.getWorkerDetails(val).then(data => {
                    if (data.errors)
                        this.errors = data.errors;
                    else {
                        this.vars = data
                        this.vars.extraDays += this.vars.seniority >= 10 ? 6 : 0
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>