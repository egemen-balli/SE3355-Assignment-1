import { createStore } from "redux";
import rootReducer from "./reducers/visitedReducer";

const store = createStore(rootReducer);

export default store;