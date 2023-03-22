/**
 *Groups the BookablesList and BookableDetails components and
* manages their shared state
 *
 * @export
 * @return {*} 
 */
import { useState, Fragment} from "react";

import BookableList from "./BookableList";
import BookableDetails from "./BookableDetails";

export default function BookablesView() {

    const [bookable, setBookable] = useState();

  return (
    <Fragment>
      <BookableList bookable={bookable} setBookable={setBookable}/>
      <BookableDetails bookable={bookable}/>
    </Fragment>
  );
}