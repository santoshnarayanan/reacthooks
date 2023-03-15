
import { addDays, shortISO } from "../../utils/date-wrangler";

// #region Loading data from json file
import data from "../../static.json";
const { sessions: sessionNames } = data;
// #endregion

//accept current bookable and week start date as arguments
export function getGrid(bookable, startDate) {
    //use day numbers and start date to create an array of dates for the week.
    const dates = bookable.days.sort().map(day => shortISO(addDays(startDate, day)));

    /** Each session index from the bookable is mapped to its session name */

    const sessions = bookable.sessions.map(i => sessionNames[i]);

    const grid = {};

    /** Assign an object to grid for each session */
    /** Assign a booking object for each date to each session */
    sessions.array.forEach(session => {
        grid[session] = {};
        dates.array.forEach(date => { grid[session][date] = { session, date, bookableId: bookable.id, title: "" } });
    });

    //In addition to the grid return the dates and sessions array for convenience.
    return { grid, dates, sessions };

};
