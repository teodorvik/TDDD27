const jwt    = require('express-jwt');
const jwks   = require('jwks-rsa');
const https  = require('https');

const User   = require('./models/user');

var jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: "https://wyrv.eu.auth0.com/.well-known/jwks.json"
    }),
    resultProperty: 'locals.user',
    audience: 'http://localhost:3000/api',
    issuer: "https://wyrv.eu.auth0.com/",
    algorithms: ['RS256']
});

function setGuestUserId(err, req, res, next) {
    if (!err) {
        next();
        return;
    } else if (req.headers.sessionid) {
        const token = req.headers.sessionid;
        res.locals.userid = 'guest|'+token;
    } else {
        res.status(err.status).send({message:err.message});
    }
    next();
}

function setUserId(req, res, next) {
    if (res.locals.user) {
        res.locals.userid = res.locals.user.sub.split('|')[1];
    }
    next();
}

function updateUser(req, res, next) {
    User.update(
        {userid: res.locals.userid},
        {
            userid: res.locals.userid,
            email: res.locals.user.email,
            picture: res.locals.user.picture
        },
        {upsert: true}
    ).exec((err) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        next();
    });
}

module.exports = {
    jwtCheck,
    setGuestUserId,
    setUserId,
    updateUser
};