import { combineReducers } from "redux";
import trackListReducer from "./trackListReducer";
import userReducer from "./userReducer";
import trackReducer from "./trackReducer";

/**
 * 
 * combineReducers maps all Reducers to the state properties they will return 
 * 
 */

export default combineReducers({
  tracks: trackListReducer,
  users: userReducer,
  track: trackReducer
});