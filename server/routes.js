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
    res.locals.userId = false;
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
                res.locals.userId = saved._id;
                next();
            });
        } else {
            res.locals.userId = user._id;
            next();
        }
    });
});

router.get(    '/questions',            controller.getQuestions);
router.get(    '/questions/random',     controller.getRandomQuestion);
router.get(    '/questions/answered',   controller.getAnsweredQuestions);
router.get(    '/questions/unanswered', controller.getUnansweredQuestions);
router.get(    '/questions/:id',        controller.getQuestion);
router.post(   '/questions/',           controller.addQuestion);
router.delete( '/questions/:id',        controller.deleteQuestion);

router.get(    '/answers',              controller.getAnswers);
router.get(    '/answers/:id',          controller.getAnswer);
router.post(   '/answers/',             controller.addAnswer);
router.delete( '/answers/:id',          controller.deleteAnswer);

router.get(    '/populate/:data',       init.populate);

module.exports = router;