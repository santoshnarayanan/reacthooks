import { useReducer, useRef } from "react";
import reducer from "./weekReducer";
import { getWeek } from "../../utils/date-wrangler";
import { FaChevronLeft, FaCalendarDay, FaChevronRight, FaCalendarCheck } from "react-icons/fa";

// The WeekPicker component lets users navigate from week to week to book resources
// in the company

export default function WeekPicker({ date }) {

    //we can use the getWeek function to generate the initial week object 
    //from a date we pass to WeekPicker as a prop
    const [week, dispatch] = useReducer(reducer, date, getWeek);
    const textboxRef = useRef();

    //Handler for the Go button
    function goToDate() {
        dispatch({ type: "SET_DATE", payload: textboxRef.current.value });
    }

    return (
        <div>
            <p className="date-picker">
                {/*Dispatch actions to the reducer to switch weeks(PREV_WEEK, TODAY, NEXT_WEEK) */}
                <button
                    className="btn"
                    onClick={() => dispatch({ type: "PREV_WEEK" })}
                >
                    <FaChevronLeft />
                    <span>Prev</span>
                </button>
                <button
                    className="btn"
                    onClick={() => dispatch({ type: "TODAY" })}
                >
                    <FaCalendarDay />
                    <span>Today</span>
                </button>

                <span>
                    <input type="text"
                        ref={textboxRef}
                        placeholder="e.g. 2022-12-02"
                        defaultValue="2023-02-24" />
                    <button className="go btn" onClick={goToDate}>
                        <FaCalendarCheck />
                        <span>Go</span>
                    </button>
                </span>

                <button
                    className="btn"
                    onClick={() => dispatch({ type: "NEXT_WEEK" })}
                >
                    <span>Next</span>
                    <FaChevronRight />
                </button>
            </p>
            <p>
                {/*Use the current state to display the date info.*/}
                {week.start.toDateString()} - {week.end.toDateString()}
            </p>
        </div>
    );
}