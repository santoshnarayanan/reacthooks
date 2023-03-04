import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";

import data from "../../static.json";
const { bookables } = data; //Assign array of data to variable - bookables


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

      //this function is called when use clicks on Next button
   function nextBookable() {
      setBookableIndex(i => (i + 1) % bookableInGroup.length);
   }

   //render and display name of the rooms from "title key (refer json file" 
   //Include an event handler to update the selected group. (onChange)
   return (
      <div>
         <select
            value={group}
            onChange = {e => setGroup(e.target.value)}
         >
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
   );
}