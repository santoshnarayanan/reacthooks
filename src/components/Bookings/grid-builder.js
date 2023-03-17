
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

/**
 *  We need to transform the array of  bookings into the handy lookup object
 *  Using reduce to step through each booking and build up the bookings lookup 
 * @export
 * @param {*} bookingsArray
 * @return {*} 
 */
export function transformBookings(bookingsArray) {
    return bookingsArray.reduce((bookings, booking) => {

        const { session, date } = booking;  //Destructure the session and date for current booking.

        if (!bookings[session]) {
            bookings[session] = {};    //Add a property to the lookuo for each new session.
        }

        bookings[session][date] = booking; //Assign the booking to its session and date.

        return bookings;
    }, {});
};