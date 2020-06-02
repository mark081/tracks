/**
 * 
 * Simple and common reducer pattern, simply replaces state data with action.paylod from GET_DATA actiom
 * 
 */


export default (state = [], action) => {
  switch (action.type) {
    case "GET_DATA":
      return action.payload;
    default:
      return state;
  }
};
