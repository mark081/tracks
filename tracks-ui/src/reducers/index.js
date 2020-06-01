import { combineReducers } from "redux";
import trackReducer from "./trackReducer";
import userReducer from "./userReducer";

/**
 * 
 * combineReducers maps all Reducers to the state properties they will return 
 * 
 */

export default combineReducers({
  tracks: trackReducer,
  users: userReducer
});