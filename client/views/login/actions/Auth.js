import auth0 from 'auth0-js';

class Auth {
    auth0 = new auth0.WebAuth({
        domain: 'wyrv.eu.auth0.com',
        clientID: '45wPZ2VRNcGkukPMbHkBe1M3YCBpnzNP',
        redirectUri: 'http://localhost:3000',
        audience: 'https://wyrv.eu.auth0.com/userinfo',
        responseType: 'token id_token',
        scope: 'openid'
    });

    login() {
        this.auth0.authorize();
    }

    handleAuthentication(callback) {
        this.auth0.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
                localStorage.setItem('access_token', authResult.accessToken);
                localStorage.setItem('id_token', authResult.idToken);
                localStorage.setItem('expires_at', expiresAt);
                history.replaceState({}, document.title, '/'); //TODO(Aron) Check login source?
            } else if (err) {
                console.log(err);
                history.replaceState({}, document.title, '/'); //TODO(Aron) Check login source?
            }
            callback();
        });
    }

    logout() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
    }

    isAuthenticated() {
        let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
        return new Date().getTime() < expiresAt;
    }

    accessToken() {
        if (this.isAuthenticated()) { //TODO(aron) How do we handle expiration checks and stuff?
            return localStorage.getItem('access_token');
        } else {
            return '';
        }
    }

}

export default new Auth();