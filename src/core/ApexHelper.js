import {LEAVE_STATUS, PL_LEAVE_STATUS} from "./Enums";

export function prepareApexSeries(data, countFreeDays) {
    // const annualData = data.filter(t => new Date().getFullYear() === new Date(t.endDate).getFullYear());
    const annualData = data;
    console.log(annualData);
    const series = [];
    const acceptedValues = annualData.filter(acc => acc.status === LEAVE_STATUS.ACCEPTED)
        .reduce((prev, curr) => {
            return prev + curr.days
        }, 0);
    const newValues = annualData.filter(acc => acc.status === LEAVE_STATUS.NEW)
        .reduce((prev, curr) => {
            return prev + curr.days
        }, 0)

    series.push({
        name: 'Zaakceptowane',
        data: [acceptedValues]
    })

    series.push({
        name: 'Oczekujące',
        data: [newValues]
    })

    series.push({
        name: 'Odrzucone',
        data: [annualData.filter(acc => acc.status === LEAVE_STATUS.REJECTED)
            .reduce((prev, curr) => {
                return prev + curr.days
            }, 0)]
    })

    series.push({
        name: 'Dostępne',
        data: [countFreeDays - acceptedValues - newValues]
    })

    return series;
}

export function prepareTimetableApexSeries(unresolvedLeaves, resolvedLeaves) {

    let employeesLeaves = [...unresolvedLeaves, ...resolvedLeaves]

    const series = []

    while (employeesLeaves.length) {
        let empLeaves = employeesLeaves.filter(tmp =>
            employeesLeaves[0].name === tmp.name)
            .map(tmp1 => {
                let endDate = new Date(tmp1.endDate);
                return {
                    x: PL_LEAVE_STATUS[tmp1.status],
                    y: [new Date(tmp1.startDate).getTime(),
                        endDate.setDate(endDate.getDate()+1)]
                }
            })
        series.push({
            name: employeesLeaves[0].name,
            data: empLeaves
        });
        employeesLeaves = employeesLeaves.filter(tmp =>
            employeesLeaves[0].name !== tmp.name)
    }
    return series

}