/**
 *Groups the BookablesList and BookableDetails components and
* manages their shared state
 *
 * @export
 * @return {*} 
 */
import { Fragment, useReducer, useState } from "react";

import BookableList from "./BookableList";
import BookableDetails from "./BookableDetails";

import reducer from "./reducer";

//define initial state
const initialState = {
    group: "Rooms",
    bookableIndex: 0,
    hasDetails: true,
    bookables: [], // setting bookables to empty array
    isLoading: true, //added to show loading spinner
    error: false      //added to show error message
}
export default function BookablesView() {

    //call reducer by passing initial state
    const [state, dispatch] = useReducer(reducer, initialState);

    //fetch all rooms in bookables list
    const bookablesInGroup = state.bookables.filter(b => b.group === state.group);

    //Assign the currently selected bookable to its own variable
    const bookable = bookablesInGroup[state.bookableIndex];

    return (
        <Fragment>
            <BookableList state={state} dispatch={dispatch} />
            <BookableDetails bookable={bookable} />
        </Fragment>
    );
}