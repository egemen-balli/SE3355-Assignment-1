import { ADD_TO_VISITED } from "../actions/visitedActions";

const initialState = {
    visited: [],
}

const visitedReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_VISITED:
            return {
                ...state,
                visited: [action.payload, ...state.visited].slice(0, 10),
            };
        default:
            return state;
    }
}

export default visitedReducer;