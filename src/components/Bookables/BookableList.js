import { useReducer, useEffect, Fragment } from "react";
import { FaArrowRight } from "react-icons/fa";

import Spinner from "../UI/Spinner";
import reducer from "./reducer";          //import custom reducer created
import getData from "../../utils/api";  

//#region Loading data from json file
import data from "../../static.json";
const { sessions, days } = data;
//#endregion

//define initial state
const initialState = {
   group: "Rooms", 
   bookableIndex: 0, 
   hasDetails: true,
   bookables: [], // setting bookables to empty array
   isLoading: true, //added to show loading spinner
   error: false      //added to show error message
}

const url = "http://localhost:3001/bookables";


export default function BookableList() {
   //call reducer by passing initial state
   const [state, dispatch] = useReducer(reducer, initialState);

   //Assign state to variables
   const { group, bookableIndex, bookables } = state;
   const { hasDetails, isLoading, error } = state;

   //fetch all rooms in bookables list
   const bookablesInGroup = bookables.filter(b => b.group === group);

   //Assign the currently selected bookable to its own variable
   const bookable = bookablesInGroup[bookableIndex];

   //Assign an array of unique group names to the group variable
   //Set() contain only unique values,so any duplicates will be discarded
   const groups = [...new Set(bookables.map(b => b.group))];

      //#region - useEffect
      useEffect(() => {
         dispatch({type: "FETCH_BOOKABLES_REQUEST"});
         getData(url)
            .then(bookables => dispatch({
               type: "FETCH_BOOKABLES_SUCCESS",
               payload: bookables
            }))
            .catch(error => dispatch({
               type: "FETCH_BOOKABLES_ERROR",
               payload: error
            }))
      },[]);
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
   }

   //function is called when use clicks on Next button
   function nextBookable() {
      dispatch({ type: "NEXT_BOOKABLE" }); //dispatch action which does not need payload
   }

   function toggleDetails() {
      dispatch({ type: "TOGGLE_HAS_DETAILS" }); //dispatch action which does not need payload
   }

   if(error){
      return<p>{error.message}</p>
   }

   if(isLoading){
      return <p><Spinner />   Loading...</p>
   }

   //render to display name of the rooms from "title key (refer json file" 
   //Include an event handler to update the selected group. (onChange)
   return (
      <Fragment>
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
               <button className="btn" onClick={nextBookable} autoFocus>
                  <FaArrowRight />
                  <span>Next</span>
               </button>
            </p>
         </div>
         {/* Include a  new UI section for the selected bookable */}
         {bookable && (
            <div className="bookable-details">
               <div className="item">
                  <div className="item-header">
                     <h2> {bookable.title} </h2>
                     <span className="controls">
                        <label>
                           <input type="checkbox" checked={hasDetails} onChange={toggleDetails} />
                           ShowDetails
                        </label>
                     </span>
                  </div>
                  <p>{bookable.notes}</p>
                  {/* Show details only if user clicks on checkbox*/}
                  {hasDetails && (
                     <div className="item-details">
                        <h3>Availability</h3>
                        <div className="bookable-availability">
                           {/* Display list of available days */}
                           <ul>
                              {bookable.days.sort().map(d => <li key={d}>{days[d]}</li>)}
                           </ul>
                           <ul>
                              {bookable.sessions.map(s => <li key={s}>{sessions[s]}</li>)}
                           </ul>
                        </div>
                     </div>
                  )}
               </div>
            </div>
         )}
      </Fragment>

   );
}