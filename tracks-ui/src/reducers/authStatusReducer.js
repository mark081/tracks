const INITIAL_STATE = {
  isSignedIn: null,
  email: null,
  jwt: null,
};

export default (state = INITIAL_STATE, action) => {
  console.log(action.type)
  switch (action.type) {
    case "AUTH_CHANGE":
    case "GET_JWT":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
