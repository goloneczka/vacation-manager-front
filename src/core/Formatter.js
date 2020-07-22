import moment from "moment";

export function formatDate(date) {
    return moment(date).format('YYYY-MM-DD');
}

export function countWorkDays(startDate, endDays) {
    let date = moment(startDate);
    let counter = 0;

    while (date.isSameOrBefore(endDays)) {
        date = date.add(1, 'days');
        if (date.isoWeekday() === 6 || date.isoWeekday() === 7) {
            continue;
        }
        counter++;
    }
    return counter;
}