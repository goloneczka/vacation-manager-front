<template>
    <div>
        <apexchart type="bar" height="150" :options="chartOptions" :series="series"></apexchart>
    </div>
</template>

<script>
    import {LEAVE_STATUS} from "../../../core/Enums";

    export default {
        name: "CustomApexBarChartWorker",
        props: ["data", "name"],
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
            this.series.push({
                name: 'Zaakceptowane',
                data: [this.data.filter(acc => acc.status === LEAVE_STATUS.ACCEPTED)
                    .reduce((prev, curr) => { return prev + curr.days} , 0) ]
            })
            this.series.push({
                name: 'Oczekujące',
                data: [this.data.filter(acc => acc.status === LEAVE_STATUS.NEW)
                    .reduce((prev, curr) => { return prev + curr.days} , 0)]
            })
            this.series.push({
                name: 'Odrzucone',
                data: [this.data.filter(acc => acc.status === LEAVE_STATUS.REJECTED)
                    .reduce((prev, curr) => { return prev + curr.days} , 0)]
            })
        }
    }
</script>

<style scoped>

</style>