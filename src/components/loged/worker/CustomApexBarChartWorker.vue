<template>
    <div>
        <apexchart type="bar" height="150" :options="chartOptions" :series="series"></apexchart>
    </div>
</template>

<script>
    import {prepareApexSeries} from "../../../core/ApexHelper";
    import {countFreeDays} from "../../../core/Formatter";

    export default {
        name: "CustomApexBarChartWorker",
        props: ["data", "name", "vars", "companyLeaves"],
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
                    legend:{
                        position: 'top',
                        offsetX: 40
                    },
                    xaxis: {
                        categories: [this.name],
                    },
                },
            }
        },
        mounted() {
            const amountFreeDays = countFreeDays(this.companyLeaves, this.vars);
            this.series = prepareApexSeries(this.data, amountFreeDays)
        }
    }
</script>

<style scoped>

</style>