function createAction(type, payload) {
    return {
        type,
        payload,
    };
}

export const setRegister = (data) => createAction('SET_REGISTER', data);