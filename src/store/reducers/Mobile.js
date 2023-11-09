const initialState = {
  idMobile: ''
};

const Auth = (state = initialState, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case "SET_MOBILE_ID":
      return {
        idMobile: payload
      };
    default:
      return state;
  }
};

export default Auth;
