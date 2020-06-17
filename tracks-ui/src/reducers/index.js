import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import trackListReducer from "./trackListReducer";
import userReducer from "./userReducer";
import trackReducer from "./trackReducer";
import authStatusReducer from "./authStatusReducer";

/**
 *
 * combineReducers maps all Reducers to the state properties they will return
 * formReducer maps redux-form to state
 *
 */

export default combineReducers({
  tracks: trackListReducer,
  users: userReducer,
  track: trackReducer,
  authState: authStatusReducer,
  form: formReducer,
});
