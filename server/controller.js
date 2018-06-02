const Question = require('./models/question');
const Answer = require('./models/answer');

function getQuestions(req, res) {
    Question.find().exec((err, questions) => {
        if (err) {
            res.status(500).send(err);
        }
        res.json(questions);
    });
};

function getQuestion(req, res) {
    Question.findOne({ id: req.params.id }).exec((err, question) => {
        if (err) {
            res.status(500).send(err);
        }
        res.json({ question });
    });
};

// .group({
//     _id: "$questionid",
//     selectedOptionsArr: { $push: "$option" }
// })

// .group({
//     _id: { questionId: "$questionid", option: "$option"}, sum: { $sum: 1 }
// })

function getAnsweredQuestions(req, res) {
    // TODO: Only return questions answered by the user

    Answer.aggregate()
        // Joins on questions and options.
        // sum is number of votes for that option
        .group({
            _id: { questionid: "$questionid", option: "$option" }, sum: { $sum: 1 }
        })
        // Group on questionid and create object
        // options: { option: alternative, votes: sum }
        .group({
            _id: "$_id.questionid",
            options: {
                $push: {
                    option: "$_id.option",
                    votes: "$sum"
                }
            }
        })
        .exec((err, test) => console.log(test));


    // Add property showing what question the user answered
    Answer.distinct("questionid").exec((err, answeredQuestionIds) => {
        if (err) {
            next(err);
        }

        Question.find({ _id: { $in: answeredQuestionIds } }).exec((err, answeredQuestions) => {
            if (err) {
                res.status(500).send(err);
            }
            res.json({ questions: answeredQuestions });
        });
    });
};

function getUnansweredQuestions(req, res) {
    // TODO: Only return questions unanswered by the user
    Answer.distinct("questionid").exec((err, answeredQuestionIds) => {
        if (err) {
            next(err);
        }

        Question.find({ _id: { $nin: answeredQuestionIds } }).exec((err, unansweredQuestions) => {
            if (err) {
                res.status(500).send(err);
            }
            res.json({ questions: unansweredQuestions });
        });
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

    Question.findOne({ id: req.params.id }).exec((err, question) => {
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
    Post.findOne({ id: req.params.id }).exec((err, answer) => {
        if (err) {
            res.status(500).send(err);
        }
        res.json({ answer });
    });
};

function addAnswer(req, res) {
    if ((!req.body.answer.questionid) || typeof req.body.answer.option === 'undefined') {
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

    Answer.findOne({ id: req.params.id }).exec((err, answer) => {
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
    getAnsweredQuestions,
    getUnansweredQuestions,
    addQuestion,
    deleteQuestion,

    getAnswers,
    getAnswer,
    addAnswer,
    deleteAnswer
};