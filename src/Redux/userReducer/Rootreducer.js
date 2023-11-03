import { combineReducers } from "redux";
import resturentReducer from "./resturentReducer";

import { cityResturent } from "./cityResturent";

const reducer =combineReducers({
    resturentReducer,
    cityResturent,   
})
export default reducer
