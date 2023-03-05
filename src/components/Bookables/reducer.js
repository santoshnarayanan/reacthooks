export default function reducer(state, action) {
    switch (action.type) {
        case "SET_GROUP":
            return {
                ...state, //copy existing state
                group: action.payload,
                bookableIndex: 0 //set bookableIndex to 0
            };
        case "SET_BOOKABLE":
            return {
                ...state,
                bookableIndex: action.payload //overrides property that need updating
            };
        case "TOGGLE_HAS_DETAILS":
            return {
                ...state,
                hasDetails: !state.hasDetails
            };
        case "NEXT_BOOKABLE":
            //count the bookables in the current group
            const count = state.bookables.filer(b => b.group === state.group).length;
            return {
                ...state,
                bookableIndex: (state.bookableIndex + 1) % count //wrap count  from last to first
            };
        default:
            return state;
    }
}