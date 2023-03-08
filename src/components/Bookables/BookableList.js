import { useEffect, useRef } from "react";
import { FaArrowRight } from "react-icons/fa";

import Spinner from "../UI/Spinner";
import reducer from "./reducer";          //import custom reducer created
import getData from "../../utils/api";


export default function BookableList({ state, dispatch }) {

   const url = "http://localhost:3001/bookables";

   //Assign state to variables
   const { group, bookableIndex, bookables } = state;
   const { isLoading, error } = state;

   //fetch all rooms in bookables list
   const bookablesInGroup = bookables.filter(b => b.group === group);

   //Assign an array of unique group names to the group variable
   //Set() contain only unique values,so any duplicates will be discarded
   const groups = [...new Set(bookables.map(b => b.group))];

   const nextButtonRef = useRef();

   //#region - useEffect
   useEffect(() => {
      dispatch({ type: "FETCH_BOOKABLES_REQUEST" });
      getData(url)
         .then(bookables => dispatch({
            type: "FETCH_BOOKABLES_SUCCESS",
            payload: bookables
         }))
         .catch(error => dispatch({
            type: "FETCH_BOOKABLES_ERROR",
            payload: error
         }))
   }, [dispatch]); //Include dispatch for the effect
   //#endregion

   //Create handler function to respond to group selection
   function changeGroup(e) {
      dispatch({
         type: "SET_GROUP",
         payload: e.target.value
      });
   }

   function changeBookable(selectedIndex) {
      dispatch({
         type: "SET_BOOKABLE",
         payload: selectedIndex
      });
      nextButtonRef.current.focus(); //use the ref to focus on the next button
   }

   //function is called when use clicks on Next button
   function nextBookable() {
      dispatch({ type: "NEXT_BOOKABLE" }); //dispatch action which does not need payload
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
                  className={i === bookableIndex ? "selected" : null}
               >
                  <button className="btn" onClick={() => changeBookable(i)} >
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