<template>
    <div class="fontSize">
        <div class="form-group row justify-content-between" v-if="employeeName">
            <label class="col-form-label ">Pracownik</label>
            <div class="col-sm-9">
            <input v-model="employeeName" :disabled="true" type="text"
                   class="form-control"/>
            </div>
        </div>
        <div class="form-group row justify-content-between" v-if="companyLeaves">
            <label class="col-form-label "> Dni urlopowe w firmie </label>
            <div class="col-sm-6">
                <input v-model="companyLeaves" :disabled="true" type="text"
                       class="form-control"/>
            </div>
        </div>
        <div class="form-group row justify-content-between" >
            <label class="col-form-label"> Staż pracy </label>
            <div class="col-sm-6">
                <input v-model="seniorityWithYears" :disabled="true" type="text"
                       class="form-control"/>
            </div>
            <small>{{$t('HR.freeWithSeniority')}}</small>
        </div>
        <div class="form-group row justify-content-between">
            <label class="col-form-label"> Urlop przechodni </label>
            <div class="col-sm-6">
                <input v-model="vars.transitiveDays" :disabled="true" type="text"
                       class="form-control"/>
            </div>
        </div>
        <div class="form-group row justify-content-between">
            <label class="col-form-label"> Dodatkowe dni </label>
            <div class="col-sm-6">
                <input v-model="freeWithSeniority" :disabled="true" type="text"
                       class="form-control"/>
            </div>
        </div>
        <div class="form-group row justify-content-between">
            <label class="col-form-label"> Dodatkowe dni na ten rok </label>
            <div class="col-sm-4">
                <input v-model="vars.annualExtraDays" :disabled="true" type="text"
                       class="form-control"/>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "VarsInfo",
        props: ["vars", "employeeName", "companyLeaves"],

        computed: {
            freeWithSeniority: {
                get: function () {
                    return this.vars.seniority >= 10 ? this.vars.extraDays + 6 : this.vars.extraDays
                },
            },
            seniorityWithYears: {
                get: function () {
                    return this.vars.seniority + " Lat"
                },
            }
        },

    }
</script>

<style scoped>
    .fontSize {
        font-size: 14px
    }
</style>