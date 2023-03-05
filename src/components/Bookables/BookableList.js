import { useState, Fragment } from "react";
import { FaArrowRight } from "react-icons/fa";

import data from "../../static.json";
const { bookables,sessions, days } = data; //Assign array of data to variable - bookables


export default function BookableList() {
   //use state to tack selected group
   const [group, setGroup] = useState("Kit");

   //fetch all rooms in bookables list
   const bookableInGroup = bookables.filter(b => b.group === group);

   //Set the index of the first bookable in the group
   const [bookableIndex, setBookableIndex] = useState(0);

   //Assign an array of unique group names to the group variable
   //Sets contain only unique values,so any duplicates will be discarded
   const groups = [...new Set(bookables.map(b => b.group))];

   //Assign the currently selected bookable to its own variable
   const bookable = bookableInGroup[bookableIndex];

   //use a third tracked state value to hold if the details are shown
   const [hasDetails, setHasDetails] = useState(false);

   //Create handler function to respond to group selection
   function changeGroup(event){
      setGroup(event.target.value);     //Update group.
      setBookableIndex(0);  //Set first bookable in group
   }

   //this function is called when use clicks on Next button
   function nextBookable() {
      setBookableIndex(i => (i + 1) % bookableInGroup.length);
   }

   //render and display name of the rooms from "title key (refer json file" 
   //Include an event handler to update the selected group. (onChange)
   return (
      <Fragment>
         <div>
            {/*Displays list of rooms based on group selected from dropdown */}
            <select value={group}  onChange={changeGroup} >
               {groups.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
            <ul className="bookables items-list-nav">
               {bookableInGroup.map((b, i) => (
                  <li key={b.id}
                     className={i === bookableIndex ? "selected" : null}
                  >
                     <button className="btn" onClick={() => setBookableIndex(i)} >
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
                           <input type="checkbox" checked={hasDetails}
                              onChange={e => setHasDetails(has => !has)} />
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