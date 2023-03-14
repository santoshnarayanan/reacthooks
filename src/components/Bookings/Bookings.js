/**
 *
 *
 * @export
 * @param {*} { bookable }
 */

import { useState, useReducer } from "react";
import { getWeek } from "../../utils/date-wrangler";

import WeekPicker from "./WeekPicker";
import BookingsGrid from "./BookingsGrid";
import BookingDetails from "./BookingDetails";

import weekReducer from "./weekReducer"        //Import the existing reducer for the week
export default function Bookings({ bookable }) {
    const [week, dispatch] = useReducer(weekReducer, new Date(), getWeek);  // Manage shared state for the selected week

    const [booking, setBooking] = useState(null); //Manage shared state for selected booking

    return (
        <div className="bookings">
            <div>
                <WeekPicker dispatch={dispatch} />
                <BookingsGrid week={week} bookable={booking} setBooking={setBooking} />
            </div>
            <BookingDetails booking={booking} bookable={bookable} />
        </div>
    );
}