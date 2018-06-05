const crypto     = require('crypto');
const express    = require('express');
const jwt        = require('jsonwebtoken');

const controller = require('./controller');
const init       = require('./init');
const User       = require('./models/user');

const router     = express.Router();

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

router.use(function handleUserToken (req, res, next) {
    res.userid = false;
    const token = req.headers.authorization.replace('Bearer ', ''); //TODO(Aron) Check id token and stuff instead.
    if(!token) {
        next();
    }
    const hash = crypto.createHash('md5').update(req.headers.authorization).digest('hex');
    res.locals.userHash = hash;
    User.findOne({ hashedToken: hash }).exec((err, user) => {
        if (err) {
            res.status(500).send(err);
        } 
        if(!user) {
            const newUser = new User({hashedToken: hash});
            newUser.save((err, saved) => {
                if (err) {
                    res.status(500).send(err);
                }
                res.userid = saved._id;
                next();
            });
        } else {
            res.userid = user._id;
            next();
        }
    });
});

router.get(    '/questions',              controller.getQuestions);
router.get(    '/questions/random',       controller.getRandomQuestion);
router.get(    '/questions/answered',     controller.getAnsweredQuestions);
router.get(    '/questions/unanswered',   controller.getUnansweredQuestions);
router.post(   '/questions/',             controller.addQuestion);
router.get(    '/questions/:id',          controller.getQuestion);
router.delete( '/questions/:id',          controller.deleteQuestion);

router.post(   '/questions/:id/answers/', controller.addAnswer);
router.delete( '/questions/:id/answers',  controller.deleteAnswer);

//TODO(Aron) This needs to removed or restricted if we go live with the site.
router.get(    '/populate/:data',       init.populate);

module.exports = router;