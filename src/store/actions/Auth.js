function createAction(type, payload) {
    return {
        type,
        payload,
    };
}

export const setLogin = (data) => createAction('SET_LOGIN', data);