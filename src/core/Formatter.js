import moment from "moment";

export function formatDate(date) {
    return moment(date).format('YYYY-MM-DD');
}

export function subDays(date, days) {
    return moment(date).add(-days, 'days').format('YYYY-MM-DD');
}

export function countFreeDays(company, vars) {
    let freeDays = company;
    for (const prop in vars)
        freeDays += prop !== 'seniority' ? vars[prop] :
            vars[prop] >= 10 ?  6 : 0
    return freeDays;
}