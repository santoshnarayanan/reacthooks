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

    return (
        <Fragment>
            <BookableList bookable={bookable} setBookable={setBookable} />
            <BookableDetails bookable={bookable} />
        </Fragment>
    );
}