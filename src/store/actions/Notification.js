function createAction(type, payload) {
    return {
        type,
        payload,
    };
}

export const setNotifications = (data) => createAction('SET_NOTIFICATIONS_DATA', data);
export const setNotificationReceive = (notificationsData) => createAction('SET_NOTIFICATION_ENABLED', notificationsData);

