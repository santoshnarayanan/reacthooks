import {getWeek} from "../../utils/date-wrangler";

//* The reducer imports the getWeek function to generate the week object for each state
//* change. Having the getWeek function available to import means we can also use it as an
//* initialization function when we call the useReducer hook in the WeekPicker component

export default function reducer (state, action) {
  switch (action.type) {
    case "NEXT_WEEK":
      return getWeek(state.date, 7); //returns week object
    case "PREV_WEEK":  
      return getWeek(state.date, -7); //returns week object
    case "TODAY":
      return getWeek(new Date());
    case "SET_DATE":
      return getWeek(new Date(action.payload));
    default:
      throw new Error(`Unknown action type: ${action.type}`)
  }
}