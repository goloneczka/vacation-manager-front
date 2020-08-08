<template>
    <div>
        <apexchart type="bar" height="150" :options="chartOptions" :series="series"></apexchart>
    </div>
</template>

<script>
    import {leaveService} from "../../../App";
    import {prepareApexSeries} from "../../../core/ApexHelper";
    import {countFreeDays} from "../../../core/Formatter"


    export default {
        name: "CustomApexBarChart",
        props: ["companyName", "email", "employeeName", "vars", "companyLeaves"],
        data() {
            return {
                series: [],
                chartOptions: {
                    chart: {
                        type: 'bar',
                        stacked: true,
                        stackType: '100%',
                        toolbar: {
                            show: false,
                        }
                    },
                    plotOptions: {
                        bar: {
                            horizontal: true,
                        },
                    },
                    legend: {
                        position: 'top',
                        offsetX: 40
                    },
                    xaxis: {
                        categories: [this.employeeName],
                    },
                },
            }
        },
        watch: {
            vars: function (n) {
                this.getDetails(n)
            },
            employeeName: function (n) {
                this.$set(this.chartOptions.xaxis.categories, 0, n);
            }
        },
        mounted() {
            this.getDetails(this.vars);
        },
        methods: {
            getDetails(vars) {
                const amountFreeDays = countFreeDays(this.companyLeaves, vars)

                leaveService.getEmployeeLeaves(this.companyName, this.email).then((data) => {
                    if (data.errors)
                        this.errors = data.errors;
                    else {
                        this.series = prepareApexSeries(data, amountFreeDays)
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>