import moment from "moment";

export function formatDate(date) {
    return moment(date).format('YYYY-MM-DD');
}

export function countWorkDays(startDate, endDays) {
    let date = moment(startDate);
    let counter = 0;

    while (date.isSameOrBefore(endDays)) {
        if (date.isoWeekday() !== 6 && date.isoWeekday() !== 7) {
            counter++;
        }
        date = date.add(1, 'days');
    }
    return counter;
}

export function countFreeDays(company, vars) {
    let freeDays = company;
    for (const prop in vars)
        freeDays += prop !== 'seniority' ? vars[prop] :
            vars[prop] >= 10 ?  6 : 0
    return freeDays;
}