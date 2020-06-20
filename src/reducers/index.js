import { combineReducers } from 'redux'
import login from './auth'
import users from './users'
import questions from './questions'
import { loadingBarReducer } from 'react-redux-loading'

export default combineReducers({
    users,
    questions,
    login,
    loadingBar: loadingBarReducer,
})