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
                        <input v-model="vars.seniority" :disabled="!isEdit" type="text"
                               class="form-control"/>
                        <div class="input-group-prepend">
                            <div class="input-group-text ml-2">Lat</div>
                        </div>
                    </div>
                </div>
                <div class="col-md-4 pl-5" v-if="isEdit">
                    <div class="input-group mb-2 mr-sm-2">
                        <input v-model="seniorityDays" :disabled="true" type="text"
                               class="form-control"/>
                        <div class="input-group-prepend">
                            <div class="input-group-text ml-2">Dni</div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="!isEdit">
                <small>{{$t('HR.freeWithSeniority')}}</small>
            </div>
        </div>
        <div class="form-group row">
            <label> Dodatkowo przyznane dni </label>
            <input v-model="freeWithSeniority" :disabled="!isEdit" type="text"
                   class="form-control"/>
        </div>
        <div class="form-group row">
            <label> Dodatkowo przyznane dni na ten rok</label>
            <input v-model="vars.annualExtraDays" :disabled="!isEdit" type="text"
                   class="form-control"/>
        </div>
    </div>
</template>

<script>
    import {workerService} from "../../../App";

    export default {
        name: "EmployeeVars",
        props: ["varId", "employeeName", "isEdit"],
        data() {
            return {
                vars: {
                    annualExtraDays: 0,
                    extraDays: 0,
                    seniority: 0
                },
                isStateChanged: false,
                seniorityDays: 0,
            }
        },
        watch: {
            varId: function (n) {
                this.getDeatails(n)
            },
            vars: {
                deep: true,
                handler(n, o) {
                    if (o.annualExtraDays !== '') {
                        this.isStateChanged = true;
                    }
                }
            }
        },
        mounted() {
            this.getDeatails(this.varId)

            this.$parent.$on('getVars', () => {
                if (!this.isStateChanged)
                    this.$root.$emit("setVars", false);
                else
                    this.$root.$emit("setVars", this.vars);
            });

        },
        computed: {
            freeWithSeniority(){
                if(!this.isEdit)
                  return this.seniorityDays + this.vars.extraDays;
                else
                    return  this.vars.extraDays;
            }
        },
        methods: {
            getDeatails(val) {
                workerService.getWorkerDetails(val).then(data => {
                    if (data.errors)
                        this.errors = data.errors;
                    else {
                        this.vars = data
                        this.seniorityDays += this.vars.seniority >= 10 ? 6 : 0
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>