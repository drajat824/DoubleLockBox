const initialState = {
  isRegister: false,
};

const Auth = (state = initialState, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case "SET_REGISTER":
      return {
        ...state,
        isRegister: payload,
      };
    default:
      return state;
  }
};

export default Auth;
