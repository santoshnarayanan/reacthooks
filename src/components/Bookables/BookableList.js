import { useState } from "react";

import data from "../../static.json"; 
const {bookables} = data; //Assign array of data to variable - bookables

export default function BookableList() {
   const group = "Rooms";

    //fetch all rooms in bookables list
   const bookableInGroup = bookables.filter(b => b.group === group);

   //Set the index of the first bookable in the group
   const [bookableIndex, setBookableIndex] = useState(0);
   console.log("Room No - " + bookableIndex);

  //render and display name of the rooms from "title key (refer json file" 

   return (
      <ul className="bookables items-list-nav">
         {bookableInGroup.map((b, i) => (
               <li   key={b.id} 
                     className={i === bookableIndex ? "selected" : null}
               >
                  <button className="btn" onClick={()=> setBookableIndex(i)} >
                     {b.title}
                  </button>
               </li>
            ))}
      </ul>
   );
}