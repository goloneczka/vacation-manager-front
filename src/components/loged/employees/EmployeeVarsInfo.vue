<template>
    <div>
        <div class="form-group row">
            <label> Pracownik </label>
            <input v-model="employeeName" :disabled="true" type="text"
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
            <input v-model="freeWithSeniority" :disabled="true" type="text"
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
    export default {
        name: "EmployeeVarsInfo",
        props: ["vars", "employeeName", "isEdit"],

        computed: {
            freeWithSeniority: {
                get: function () {
                    return this.vars.seniority >= 10 ? this.vars.extraDays + 6 : this.vars.extraDays
                },
            }
        },

    }
</script>

<style scoped>

</style>