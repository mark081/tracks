/**
 *
 *  This resolver is attempting to update the list of users as they are added.
 *  Basically, if the user sent in the action.payload is not found in state, add her
 *
 */

export default (state = [], action) => {
  switch (action.type) {
    case "GET_USER":
      if (!state.find((user) => user.id === action.payload.id))
        return [...state, action.payload];
      else return state;
    default:
      return state;
  }
};
