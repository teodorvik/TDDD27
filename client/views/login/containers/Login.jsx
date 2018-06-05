import React, { Component } from 'react';
import { connect } from 'react-redux';
import {loginAction, logoutAction} from '../actions/loginActions';

class Login extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { user, login, logout } = this.props;
        console.log("LOGGED IN: " + user.isLoggedIn);
        console.log(localStorage.getItem('expires_at'));
        if (!user.isLoggedIn) {
            return (<a onClick={login}>Login</a>);
        } else {
            return (<a onClick={logout}>Logout</a>);
        }
    }
}

const mapStateToProps = state => {
    const { user } = state;

    return {
        user
    };
};

const mapDispatchToProps = dispatch => ({
    login: () => {
        dispatch(loginAction());
    },
    logout: () => {
        dispatch(logoutAction());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);