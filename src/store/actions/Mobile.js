function createAction(type, payload) {
    return {
        type,
        payload,
    };
}

export const setMobileID = (data) => createAction('SET_MOBILE_ID', data);