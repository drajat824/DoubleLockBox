function createAction(type, payload) {
    return {
        type,
        payload,
    };
}

export const addDevice = (deviceData) => createAction('ADD_DEVICE', deviceData);
export const removeDevice = (deviceId) => createAction('REMOVE_DEVICE', deviceId);