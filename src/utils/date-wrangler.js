export function addDays(date, daysToAdd) {
    const clone = new Date(date.getTime());
    clone.setDate(clone.getDate() + daysToAdd); //shift the date by the number of days to add
    return clone;
}

export function addMonths(date, monthsToAdd) {
    const clone = new Date(date.getTime());
    clone.setMonth(clone.getMonth() + monthsToAdd);
    return clone;
}

export function addYears(date, yearsToAdd) {
    const clone = new Date(date.getTime());
    clone.setFullYear(clone.getFullYear() + yearsToAdd);
    return clone;
}


export function getWeek(forDate, daysOffset = 0) {
    const date = addDays(forDate, daysOffset); //Immediatly shift date
    const day = date.getDay(); //get day index for the new date
    return {
        date,
        start: addDays(date, -day), //e.g. Tuesday shift back by 2 days
        end: addDays(date, 6 - day) //e.g. Tuesday shift forward by 4 days
    };
}
