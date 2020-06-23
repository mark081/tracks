/**
 *
 * Simple and common reducer pattern, simply replaces state data with action.paylod from GET_DATA actiom
 *
 */

export default (state = [], action) => {
  switch (action.type) {
    case "CREATE_TRACK":
      return [...state, action.payload];
    case "GET_DATA":
      return action.payload;
    default:
      return state;
  }
};
