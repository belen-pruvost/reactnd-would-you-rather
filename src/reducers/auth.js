import {AUTH_LOGIN_SUCCESS, AUTH_LOGOUT_SUCCESS} from "../actions/auth";

export default function auth(state = {}, action) {
    switch (action.type) {
        case AUTH_LOGIN_SUCCESS:
            return {
                ...state,
                authenticated: action.authenticated,
                loggedInUser: action.loggedInUser
            };
        case AUTH_LOGOUT_SUCCESS:
            return {
                ...state,
                authenticated: action.authenticated,
                loggedInUser: action.loggedInUser
            };
        default:
            return state;
    }
}