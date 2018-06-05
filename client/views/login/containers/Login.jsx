import React, { Component } from 'react';
import Auth from '../actions/Auth';

class Login extends Component {
    constructor(props) {
        super(props);

        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.init = this.init.bind(this);

        this.state = {
            isLoggedIn: Auth.isAuthenticated(),
            isLoaded: false,
        };
    }

    componentDidMount() {
        Auth.handleAuthentication(this.init); //TODO(Aron) Do in app.jsx or custom route instead?
    }

    init() {
        this.setState({
            isLoggedIn: Auth.isAuthenticated(),
            isLoaded: true,
        });
    }

    login() {
        Auth.login();
    }

    logout() {
        Auth.logout();
        this.setState({isLoggedIn : false});
    }

    render() {
        if (!this.state.isLoaded) {
            return (<a>Loading</a>);
        } else if (!this.state.isLoggedIn) {
            return (<a onClick={this.login}>Login</a>);
        } else {
            return (<a onClick={this.logout}>Logout</a>);
        }
    }
}

export default Login;