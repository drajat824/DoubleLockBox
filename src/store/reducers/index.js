import { combineReducers } from "redux";
import Auth from './Auth'
import User from './User'
import Register from './Register'
import Devices from './Devices'
import Notification from './Notification'
import Mobile from './Mobile'

const reducers = combineReducers({
    Auth,
    User,
    Register,
    Devices,
    Notification,
    Mobile
})

export default reducers