import { useRef } from "react";
import { FaChevronLeft, FaCalendarDay, FaChevronRight, FaCalendarCheck } from "react-icons/fa";

// The WeekPicker component lets users navigate from week to week to book resources
// in the company

export default function WeekPicker({ dispatch }) {
    const textboxRef = useRef(null);

    //Handler for the Go button
    function goToDate() {
        dispatch({ type: "SET_DATE", payload: textboxRef.current.value });
    }

    return (
        <div>
            <p className="date-picker">
                {/*Dispatch actions to the reducer to switch weeks(PREV_WEEK, TODAY, NEXT_WEEK) */}
                <button className="btn" onClick={() => dispatch({ type: "PREV_WEEK" })}   >
                    <FaChevronLeft />
                    <span>Prev</span>
                </button>
                <button className="btn" onClick={() => dispatch({ type: "TODAY" })}  >
                    <FaCalendarDay />
                    <span>Today</span>
                </button>

                <span>
                    <input type="text" value={textboxRef} placeholder="e.g. 2023-01-02" defaultValue="2023.02.15" />
                    <button className="go btn" onClick={goToDate}>
                        <FaCalendarCheck />
                        <span>Go</span>
                    </button>
                </span>

                <button className="btn" onClick={() => dispatch({ type: "NEXT_WEEK" })}  >
                    <span>Next</span>
                    <FaChevronRight />
                </button>
            </p>
        </div>
    );
}