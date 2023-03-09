/**
 *Groups the BookablesList and BookableDetails components and
* manages their shared state
 *
 * @export
 * @return {*} 
 */
import { useCallback, Fragment, useState } from "react";

import BookableList from "./BookableList";
import BookableDetails from "./BookableDetails";

export default function BookablesView() {

    //call reducer by passing initial state
    const [bookable, setBookable] = useState();

    //use callback function to update state
    const updateBookable = useCallback(selected => {
        if (selected) {
            selected.lastShown = Date.now();
            setBookable(selected);
        }
    }, []);  // specify dependencies in callback function

    return (
        <Fragment>
            <BookableList bookable={bookable} setBookable={updateBookable} />
            <BookableDetails bookable={bookable} />
        </Fragment>
    );
}