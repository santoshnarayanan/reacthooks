import data from "../../static.json"; 
const {bookables} = data; //Assign array of data to variable - bookables

export default function BookableList() {
   const group = "Rooms";

    //fetch all rooms in bookables list
   const bookableInGroup = bookables.filter(b => b.group === group);

   //Set the index of the first bookable in the group
   let bookableIndex = 1; 

   //declare function which will receive selected room
   function changeBookable(selectedIndex){
    bookableIndex = selectedIndex;
    console.log(bookableIndex);
   }

  //render and display name of the rooms from "title" 

   return (
      <ul className="bookables items-list-nav">
         {bookableInGroup.map((b, i) => (
               <li key={b.id} className={i === bookableIndex ? "selected" : null}>
                  <button className="btn" onClick={()=> changeBookable(i)} >
                     {b.title}
                  </button>
               </li>
            ))}
      </ul>
   );
}