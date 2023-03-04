import { bookables } from "../../static.json";

function BookableList() {
   const group = "Rooms";

   const bookableIinGroup = bookables.filter(bookable => bookable.group === group);

   const bookableIndex = 1; //hard code the index of the first bookable in the group

   return (
      <ul className="bookables items-list-nav">
         {//Map over the bookable list and render each list item for each one
            bookableIinGroup.map((b, i) => (
               <li key={b.id} className={i === bookableIndex ? "selected" : null}>
                  {//set the class by comparing the current index to the selected index}
                  <button className="btn">
                     {b.title}
                  </button>
               </li>
            ))}
      </ul>
   );

}

export default BookableList;