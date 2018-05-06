const express    = require('express');
const router     = express.Router();
const controller = require('./controller');
const init       = require('./init');

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

router.get(    '/questions',        controller.getQuestions);
router.get(    '/questions/random', controller.getRandomQuestion);
router.get(    '/questions/:id',    controller.getQuestion);
router.post(   '/questions/',       controller.addQuestion);
router.delete( '/questions/:id',    controller.deleteQuestion);

router.get(    '/answers',          controller.getAnswers);
router.get(    '/answers/:id',      controller.getAnswer);
router.post(   '/answers/',         controller.addAnswer);
router.delete( '/answers/:id',      controller.deleteAnswer);

router.get(    '/populate/:data',   init.populate);

module.exports = router;