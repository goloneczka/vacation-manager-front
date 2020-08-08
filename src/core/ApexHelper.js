import {LEAVE_STATUS} from "./Enums";

export function prepareApexSeries(data, countFreeDays ) {
    const series = []
    const acceptedValues = data.filter(acc => acc.status === LEAVE_STATUS.ACCEPTED)
        .reduce((prev, curr) => { return prev + curr.days} , 0)
    const newValues = data.filter(acc => acc.status === LEAVE_STATUS.NEW)
        .reduce((prev, curr) => { return prev + curr.days} , 0)

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
        data: [data.filter(acc => acc.status === LEAVE_STATUS.REJECTED)
            .reduce((prev, curr) => { return prev + curr.days} , 0)]
    })

    series.push({
        name: 'Dostępne',
        data: [countFreeDays - acceptedValues - newValues]
    })

    return series;
}