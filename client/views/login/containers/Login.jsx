import React, { Component } from 'react';
import Auth from '../actions/Auth';

class Login extends Component {
    constructor(props) {
        super(props);
        Auth.handleAuthentication(); //TODO: Do in app.jsx or custom route instead?
        console.log(Auth.isAuthenticated());
        this.state = {
            isLoggedIn: Auth.isAuthenticated() //TODO: DO this after handleAuthentication parseHash is finnished. Show loading screen until done?
        };

        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }

    login() {
        Auth.login();
    }

    logout() {
        Auth.logout();
        this.setState({isLoggedIn : false});
    }

    render() {
        if (!this.state.isLoggedIn) {
            return (<button onClick={this.login}>Login</button>);
        } else {
            return (<button onClick={this.logout}>Logout</button>);
        }
    }
}

export default Login;