const INITIAL_STATE = {
  isSignedIn: null,
  userId: null,
  email: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "AUTH_CHANGE":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
