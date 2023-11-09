const initialState = {
  notifications: [], // Simpan data notifikasi dalam bentuk array
  notificationEnabled: false,
};

const Notification = (state = initialState, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case "SET_NOTIFICATIONS_DATA":
      return {
        ...state,
        notifications: [payload, ...state.notifications],
      };
    case "SET_NOTIFICATION_ENABLED":
      return {
        ...state,
        notificationEnabled: payload,
      };
    default:
      return state;
  }
};

export default Notification;
