let initialState = {
  useFinger: false,
  useFace: false,
  pin: "",
  finger: "",
  face: "",
};

const User = (state = initialState, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case "SET_USER_PIN":
      return {
        ...state,
        pin: payload,
      };
    case "SET_USER_FACE":
      return {
        ...state,
        finger: payload,
      };
    case "SET_USER_FINGER":
      return {
        ...state,
        face: payload,
      };
    case "SET_USER_USE_FACE":
      return {
        ...state,
        useFace: payload,
      };
    case "SET_USER_USE_FINGER":
      return {
        ...state,
        useFinger: payload,
      };
    default:
      return state;
  }
};

export default User;
