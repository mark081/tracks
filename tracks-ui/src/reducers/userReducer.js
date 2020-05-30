// Check to see if the user is in state, if not add it

export default (state = [], action) => {
    switch (action.type) {
      case "GET_USER":
          if (!state.find((user) => user.id === action.payload.id)) 
             return([...state, action.payload])          
          else return state
      default:
          return state

    }
}