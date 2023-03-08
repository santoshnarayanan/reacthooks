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
        case "NEXT_BOOKABLE":
            //count the bookables in the current group
            const count = state.bookables.filter(b => b.group === state.group).length;
            return {
                ...state,
                bookableIndex: (state.bookableIndex + 1) % count //wrap count  from last to first
            };
        case "FETCH_BOOKABLES_REQUEST":
            return {
                ...state,
                isLoading: true,
                error: false,
                bookables: []
            };

        case "FETCH_BOOKABLES_SUCCESS":
            return {
                ...state,
                isLoading: false,
                bookables: action.payload
            };

        case "FETCH_BOOKABLES_ERROR":
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };
        default:
            return state;
    }
}