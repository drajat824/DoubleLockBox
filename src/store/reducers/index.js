import { combineReducers } from "redux";
import Auth from './Auth'
import User from './User'
import Register from './Register'

const reducers = combineReducers({
    Auth,
    User,
    Register
})

export default reducers