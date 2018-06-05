import React, { Component } from 'react';
import { connect } from 'react-redux';
import {loginAction, logoutAction} from '../actions/loginActions';

class Login extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { user, login, logout } = this.props;
        if (!user.isLoggedIn) {
            return (<button onClick={login}>Login</button>);
        } else {
            return (<button onClick={logout}>Logout</button>);
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