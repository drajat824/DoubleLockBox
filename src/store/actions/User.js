function createAction(type, payload) {
    return {
        type,
        payload,
    };
}

export const setUserPin = (data) => createAction('SET_USER_PIN', data);
export const setUserFace = (data) => createAction('SET_USER_FACE', data);
export const setUserFinger = (data) => createAction('SET_USER_FINGER', data);

export const setUserUseFace = (data) => createAction('SET_USER_USE_FACE', data);
export const setUserUseFinger = (data) => createAction('SET_USER_USE_FINGER', data);