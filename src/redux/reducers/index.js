import { combineReducers } from "redux";
import authors from "./authorsReducer";
import courses from "./coursesReducer";
import apiCallsInProgress from "./apiStatusReducer";
const rootReducer = combineReducers({
	courses,
	authors,
	apiCallsInProgress,
});
export default rootReducer;
