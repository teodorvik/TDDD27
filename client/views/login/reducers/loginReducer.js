import {
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    IS_AUTHENTICATED,
    LOGOUT
} from '../actions/actionConstants';

export const user = (state = { isLoggedIn: false, isLoaded: false }, action) => {
    console.log(action);
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                isLoggedIn: true,
                isLoaded: true
            };
        case LOGIN_FAILED:
            console.warn(`${action.type}: ${action.payload}`);
            return {
                isLoggedIn: false,
                isLoaded: true
            };
        case IS_AUTHENTICATED:
            return {
                isLoggedIn: action.payload,
                isLoaded: true
            };
        case LOGOUT:
            return {
                isLoggedIn: false,
                isLoaded: true
            };
        default:
            return state;
    }
};