<template>
    <div>
        <apexchart type="bar" height="150" :options="chartOptions" :series="series"></apexchart>
    </div>
</template>

<script>
    import {leaveService} from "../../../App";
    import {LEAVE_STATUS} from "../../../core/Enums";

    export default {
        name: "CustomApexBarChart",
        props: ["companyName", "email", "employeeName"],
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
                        categories: [this.employeeName],
                    },
                },
            }
        },
        watch: {
            email: function (n) {
                this.getDetails(n)
            }
        },
        mounted() {
            this.getDetails(this.email);
        },
        methods: {
            getDetails(n){
                leaveService.getEmployeeLeaves(this.companyName, n).then((data) => {
                    if (data.errors)
                        this.errors = data.errors;
                    else {
                        this.name = []
                        this.series.push({
                            name: 'Zaakceptowane',
                            data: [data.filter(acc => acc.status === LEAVE_STATUS.ACCEPTED)
                                .reduce((prev, curr) => { return prev + curr.days} , 0) ]
                        })
                        this.series.push({
                            name: 'Oczekujące',
                            data: [data.filter(acc => acc.status === LEAVE_STATUS.NEW)
                                .reduce((prev, curr) => { return prev + curr.days} , 0)]
                        })
                        this.series.push({
                            name: 'Odrzucone',
                            data: [data.filter(acc => acc.status === LEAVE_STATUS.REJECTED)
                                .reduce((prev, curr) => { return prev + curr.days} , 0)]
                        })
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>