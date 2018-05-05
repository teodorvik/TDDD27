const Question = require('./models/question');

function getQuestions(req, res) {
    Question.find().exec((err, questions) => {
        if (err) {
            res.status(500).send(err);
        }
        res.json(questions);
    });
};

function getQuestion(req, res) {
    Question.findOne({ cuid: req.params.cuid }).exec((err, question) => {
        if (err) {
            res.status(500).send(err);
        }
        res.json({ question });
    });
};

function getRandomQuestion(req, res) {
    Question.count().exec((err, count) => {
        var random = Math.floor(Math.random() * count);

        Question.find().limit(1).skip(random).exec((err, question) => {
            if (err) {
                res.status(500).send(err);
            }
            res.json({ question });
        });
    });
};

function addQuestion(req, res) {
    if (!req.body.question.text || !req.body.question.options || req.body.question.options.length < 2) {
        res.status(403).end();
    }

    //TODO(Aron) connect question to user. Check if user is allowed to add questions.

    const newQuestion = new Question(req.body.question);
    newQuestion.save((err, saved) => {
        if (err) {
            res.status(500).send(err);
        }
        res.json({ question: saved });
    });
};

function deleteQuestion(req, res) {

    //TODO(Aron) connect question to user. Check if user is allowed to delete questions.

    Question.findOne({ cuid: req.params.cuid }).exec((err, question) => {
        if (err) {
            res.status(500).send(err);
        }
        question.remove(() => {
            res.status(200).end();
        });
    });
};

function getAnswers(req, res) {
    Answer.find().exec((err, answers) => {
        if (err) {
            res.status(500).send(err);
        }

        res.json({ answers });
    });
};

function getAnswer(req, res) {
    Post.findOne({ cuid: req.params.cuid }).exec((err, answer) => {
        if (err) {
            res.status(500).send(err);
        }
        res.json({ answer });
    });
};

function addAnswer(req, res) {
    if (!req.body.answer.questionid || !req.body.answer.option) {
        res.status(403).end();
    }

    //TODO(Aron) connect answer to user. Check if user is allowed to add answers.

    const newAnswer = new Answer(req.body.answer);
    newAnswer.save((err, saved) => {
        if (err) {
            res.status(500).send(err);
        }
        res.json({ answer: saved });
    });
};

function deleteAnswer(req, res) {

    //TODO(Aron) connect answer to user. Check if user is allowed to delete answers.

    Answer.findOne({ cuid: req.params.cuid }).exec((err, answer) => {
        if (err) {
            res.status(500).send(err);
        }
        answer.remove(() => {
            res.status(200).end();
        });
    });
};

module.exports = {
    getQuestions,
    getQuestion,
    getRandomQuestion,
    addQuestion,
    deleteQuestion,

    getAnswers,
    getAnswer,
    addAnswer,
    deleteAnswer
};