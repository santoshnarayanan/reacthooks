import { useState, useEffect, useRef } from "react";
import { FaArrowRight } from "react-icons/fa";

import Spinner from "../UI/Spinner";
import getData from "../../utils/api";


export default function BookableList({ bookable, setBookable }) {

   const url = "http://localhost:3001/bookables";

   //Manage state with calls  to the useState hook
   const [bookables, setBookables] = useState([]);
   const [isLoading, setIsLoading] = useState(true);
   const [error, setError] = useState(false);

   const group = bookable?.group; //Get the current group from selected bookable

   //fetch all rooms in bookables list
   const bookablesInGroup = bookables.filter(b => b.group === group);

   //Assign an array of unique group names to the group variable
   //Set() contain only unique values,so any duplicates will be discarded
   const groups = [...new Set(bookables.map(b => b.group))];

   const nextButtonRef = useRef();

   //#region - useEffect
   useEffect(() => {
      getData(url)
         .then(bookables => {
            setBookable(bookables[0]);    //use the setBookable prop to select the first bookable
            setBookables(bookables);      // Use the local updater function to set the bookables state
            setIsLoading(false);
         })
         .catch(error => {
            setError(error);
            setIsLoading(false)
         });
   }, [setBookable]); //Include dispatch for the effect
   //#endregion

   //Create handler function to respond to group selection
   function changeGroup(e) {

      //filter for the selected group
      const bookablesSelectedInGroup = bookables.filter(b => b.group === e.target.value);

      //Set the bookables state to the first in the group
      setBookable(bookablesSelectedInGroup[0]);
   }

   function changeBookable(selectedBookable) {
      setBookable(selectedBookable);
      nextButtonRef.current.focus(); //use the ref to focus on the next button
   }

   //function is called when use clicks on Next button
   function nextBookable() {
      const i = bookablesInGroup.indexOf(bookable);
      const nextIndex = (i + 1) % bookablesInGroup.length;
      const nextBookable = bookablesInGroup[nextIndex];
      setBookable(nextBookable);
   }

   if (error) {
      return <p>{error.message}</p>
   }

   if (isLoading) {
      return <p><Spinner />   Loading...</p>
   }

   //render to display name of the rooms from "title key (refer json file" 
   //Include an event handler to update the selected group. (onChange)
   return (
      <div>
         {/* Displays list of rooms based on group selected from dropdown */}
         <select value={group} onChange={changeGroup} >
            {groups.map(g => <option key={g} value={g}>{g}</option>)}
         </select>
         <ul className="bookables items-list-nav">
            {bookablesInGroup.map((b, i) => (
               <li key={b.id}
                  className={b.id === bookable.id ? "selected" : null}
               >
                  <button className="btn" onClick={() => changeBookable(b)} >
                     {b.title}
                  </button>
               </li>
            ))}
         </ul>
         <p>
            <button className="btn" onClick={nextBookable} ref={nextButtonRef} autoFocus>
               <FaArrowRight />
               <span>Next</span>
            </button>
         </p>
      </div>
   );
}