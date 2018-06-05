const express = require('express');

const controller = require('./controller');
const init = require('./init');
const auth = require('./authenticate');

const router = express.Router();

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now());
    next();
});


router.use(auth.jwtCheck);
router.use(auth.setGuestUserId);
router.use(auth.setUserId);
//router.use(auth.updateUser);

router.get('/questions', controller.getQuestions);
router.get('/questions/random', controller.getRandomQuestion);
router.get('/questions/answered', controller.getAnsweredQuestions);
router.get('/questions/unanswered', controller.getUnansweredQuestions);
router.post('/questions/', controller.addQuestion);
router.get('/questions/:id', controller.getQuestion);
router.delete('/questions/:id', controller.deleteQuestion);

router.post('/questions/:id/answers/', controller.addAnswer);
router.delete('/questions/:id/answers', controller.deleteAnswer);

//TODO(Aron) This needs to removed or restricted if we go live with the site.
router.get('/populate/:data', init.populate);

module.exports = router;