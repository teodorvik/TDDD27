const express    = require('express');
const router     = express.Router();
const controller = require('./controller');

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

router.get(    '/questions',        controller.getQuestions);
router.get(    '/questions/:cuid',  controller.getQuestion);
router.get(    '/questions/random', controller.getRandomQuestion);
router.post(   '/questions/',       controller.addQuestion);
router.delete( '/questions/:cuid',  controller.deleteQuestion);

router.get(    '/answers',          controller.getAnswers);
router.get(    '/answers/:cuid',    controller.getAnswer);
router.post(   '/answers/',         controller.addAnswer);
router.delete( '/answers/:cuid',    controller.deleteAnswer);

module.exports = router;