import { combineReducers } from "redux";
import trackReducer from "./trackReducer";
import userReducer from "./userReducer";


export default combineReducers({
  tracks: trackReducer,
  users: userReducer
});