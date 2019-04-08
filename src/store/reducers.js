import { combineReducers } from 'redux'
export const notCorrectSource = (state, action ) =>
    action.type=== "notCorrectSource" ? 
    action.payload
    : state

    export default combineReducers({notCorrectSource})