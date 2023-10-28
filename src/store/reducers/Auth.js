const initialState = {
  isLogin: false
};

const Auth = (state = initialState, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case "SET_LOGIN":
      return {
        ...state,
        isLogin: payload,
      };
    default:
      return state;
  }
};

export default Auth;
