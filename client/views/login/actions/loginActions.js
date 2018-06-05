import {
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    LOGOUT,
    IS_AUTHENTICATED
} from './actionConstants';

import auth0 from 'auth0-js';
import jwt_decode from 'jwt-decode';
import uuidv4 from 'uuid/v4';


const auth = new auth0.WebAuth({
    domain: 'wyrv.eu.auth0.com',
    clientID: '45wPZ2VRNcGkukPMbHkBe1M3YCBpnzNP',
    redirectUri: 'http://localhost:3000',
    audience: 'http://localhost:3000/api',
    responseType: 'token id_token',
    scope: 'openid email profile'
});

const loginSuccess = () => ({
    type: LOGIN_SUCCESS
});

const loginFailed = error => ({
    type: LOGIN_FAILED,
    payload: error
});

const isAuthenticated = isAuth => ({
    type: IS_AUTHENTICATED,
    payload: isAuth
});

const logout = () => ({
    type: LOGOUT
});

export const loginAction = () => {
    return (dispatch) => {
        auth.authorize();
    }
}

export const isAuthenticatedAction = () => {
    return (dispatch) => {
        dispatch(isAuthenticated(new Date().getTime() < JSON.parse(localStorage.getItem('expires_at'))));
    };
}

export const authenticationAction = () => {
    return (dispatch) => {
        if (!localStorage.getItem('session_id')) {
            let uuid = uuidv4();
            console.log(uuid);
            localStorage.setItem('session_id', uuid);
        }

        auth.parseHash((error, authResult) => {
            if (authResult && authResult.accessToken) {
                history.replaceState({}, document.title, '/');

                let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
                let decodedToken = jwt_decode(authResult.accessToken);
                localStorage.setItem('access_token', authResult.accessToken);
                localStorage.setItem('expires_at', expiresAt);
                dispatch(loginSuccess());
            } else if (error) {
                history.replaceState({}, document.title, '/');
                dispatch(loginFailed(error));
            } else {
                dispatch(isAuthenticatedAction());
            }
        });
    };
}

export const logoutAction = (user) => {
    return (dispatch) => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('expires_at');
        location.reload();

        dispatch(logout());
    }
}