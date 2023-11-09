const initialState = {
  devices: [], // Simpan data perangkat (termasuk ID dan PIN) dalam bentuk array
};

const DataDevice = (state = initialState, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case "ADD_DEVICE":
      const newDevice = {
        id_device: payload.id_device,
        pin_device: payload.pin_device,
      };
      return {
        ...state,
        devices: [...state.devices, newDevice],
      };
    case "REMOVE_DEVICE":
      return {
        ...state,
        devices: state.devices.filter((device) => device.id !== payload),
      };
    default:
      return state;
  }
};

export default DataDevice;
