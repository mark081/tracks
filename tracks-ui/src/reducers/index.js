import { combineReducers } from "redux";
import trackReducer from "./trackReducer";


export default combineReducers({
  tracks: trackReducer,
});