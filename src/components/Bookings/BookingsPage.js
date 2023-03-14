/**
 *  Managing the selected bookable with useState
 *
 * @export
 * @return {*} 
 */
import { useState } from "react";
import BookableList from "../Bookables/BookableList";
import Bookings from "./Bookings";

export default function BookingsPage() {

  const [bookable, setBookable] = useState(null); //Manage the selected bookable with useStatess



  return (
    <main className="bookings-page">
      {/** Pass the bookable down so that it can be highlighted in the list */}
      {/** Pass the updater function so users can select a bookable */}
      <BookableList bookable={bookable} setBookable={setBookable} />

      {/** Let the booking component display bookings for the selected bookable */}
      {/** The Bookings component also needs to know the selected week which will be managed in the Bookings component */}
      <Bookings bookable={bookable} />
    </main>
  );
}