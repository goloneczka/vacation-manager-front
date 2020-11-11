<template>
    <div>
        <div class="form-group  mb-4">
            <input v-model="filter" type="text" class="form-control"
                   placeholder="Wyszukaj po imieniu i nazwisku"/>
        </div>
        <hr/>
        <div v-for="(error, index) in errors" v-bind:key="index">
            <AlertTemplate :message="error" :type="'danger'"/>
        </div>
        <div v-if="series">
            <apexchart :height="scalHeight" :options="chartOptions" :series="filteredData"></apexchart>
        </div>

    </div>
</template>

<script>
    import {leaveService} from "../../../App";
    import {prepareTimetableApexSeries} from "../../../core/ApexHelper";
    import AlertTemplate from "../../AlertTemplate";
    import {formatDate, subDays} from "../../../core/Formatter";

    export default {
        name: "TimetableInfo",
        components: {AlertTemplate},
        props: ["companyName"],
        data() {
            return {
                filter: '',
                errors: [],
                series: [],
                chartOptions: {
                    tooltip: {
                        custom: function ({series, seriesIndex, dataPointIndex, w}) {
                            return '<div class="arrow_box">' +
                                '<span>' + w.config.series[seriesIndex].name + '</span>' + '<hr/>' +
                                '<span>' + formatDate(w.config.series[seriesIndex].data[dataPointIndex].y[0]) + ' : ' +
                                subDays(series[seriesIndex][dataPointIndex], 1) + '</span>' +
                                '</div>'
                        }
                    },
                    chart: {
                        type: 'rangeBar',
                    },
                    plotOptions: {
                        bar: {
                            horizontal: true,
                            barHeight: '80%'
                        }
                    },
                    xaxis: {
                        type: 'datetime',
                    },
                    stroke: {
                        width: 1
                    },
                    fill: {
                        type: 'solid',
                        opacity: 0.6
                    },
                    legend: {
                        position: 'top',
                        horizontalAlign: 'left'
                    },
                },
            }
        },
        computed: {
            scalHeight: {
                get: function () {
                    return 150 * this.filteredData.length
                }
            },
            filteredData: {
                get: function () {
                    if (this.filter === '')
                        return this.series
                    else
                        return this.series.filter(singular =>
                            singular.name.startsWith(this.filter)
                        )
                }
            }
        },
        mounted() {
            leaveService.getByCompanyName(this.companyName).then((data) => {
                if (data.errors)
                    this.errors = data.errors;
                else {
                    leaveService.getByCompanyNameAndResolved(this.companyName, 0).then((data1) => {
                        if (data1.errors)
                            this.errors = data1.errors;
                        else
                            this.series = prepareTimetableApexSeries(data, data1)

                    })
                }
            })
        },

    }
</script>

<style scoped>

</style>