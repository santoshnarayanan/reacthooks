/**
 *Groups the BookablesList and BookableDetails components and
* manages their shared state
 *
 * @export
 * @return {*} 
 */
import { Fragment, useState } from "react";

import BookableList from "./BookableList";
import BookableDetails from "./BookableDetails";

export default function BookablesView() {

    //call reducer by passing initial state
    const [bookable, setBookable] = useState();

    //use callback function to update state
    function updateBookable(selected) {
        if (selected) {
            selected.lastShown = Date.now();
            setBookable(selected);
        }
    }

    return (
        <Fragment>
            <BookableList bookable={bookable} setBookable={updateBookable} />
            <BookableDetails bookable={bookable} />
        </Fragment>
    );
}