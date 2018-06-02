const Question = require('./models/question');
const Answer = require('./models/answer');

function getQuestions(req, res) {
    Question.find().exec((err, questions) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json(questions);
    });
};

function getQuestion(req, res) {
    Question.findOne({ id: req.params.id }).exec((err, question) => {
        if (err) {
            res.status(500).send(err);
            return;
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
    Answer.find({ userid: res.locals.userId }).exec((err, answeredQuestionIds) => {
        if (err) {
            next(err);
        }

        Question.find({ _id: { $in: answeredQuestionIds } }).exec((err, answeredQuestions) => {
            if (err) {
                res.status(500).send(err);
                return;
            }
            res.json({ questions: answeredQuestions });
        });
    });
};

function getUnansweredQuestions(req, res) {
    //TODO(Aron) if not logged in?
    Answer.find({ userid: res.locals.userId }).exec((err, answeredQuestionIds) => {
        if (err) {
            next(err);
        }

        Question.find({ _id: { $nin: answeredQuestionIds } }).exec((err, unansweredQuestions) => {
            if (err) {
                res.status(500).send(err);
                return;
            }
            res.json({ questions: unansweredQuestions });
        });
    });
};


function getRandomQuestion(req, res) {
    //TODO(Aron) if not logged in?
    Answer.find({ userid: 0 }).exec((err, answeredQuestionIds) => {
        if (err) {
            next(err);
        }

        Question.find({ _id: { $nin: answeredQuestionIds } }).exec((err, unansweredQuestions) => {
            if (err) {
                res.status(500).send(err);
                return;
            }
            var random = Math.floor(Math.random() * unansweredQuestions.length);
            var question = [unansweredQuestions[random]];
            res.json({question});
        });
    });
};

function addQuestion(req, res) {
    if (!req.body.question.text || !req.body.question.options || req.body.question.options.length < 2) {
        res.status(403).end();
        return;
    }

    if(!res.locals.userId) {
        res.status(401).end();
        return;
    }

    const newQuestion = new Question({
        userid: res.locals.userId,
        text: req.body.question.text,
        options: req.body.question.options,
    });

    newQuestion.save((err, saved) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json({ question: saved });
    });
};

function deleteQuestion(req, res) {

    //TODO(Aron) connect question to user. Check if user is allowed to delete questions.

    Question.findOne({ id: req.params.id }).exec((err, question) => {
        if (err) {
            res.status(500).send(err);
            return;
        }

        if(question.userid != res.locals.userId) {
            res.status(401).end();
            return;
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
        return;
    }

    if(!res.locals.userId) {
        res.status(401).end();
        return;
    }

    const newAnswer = new Answer({
        userid: res.locals.userId,
        questionid: req.body.answer.questionid,
        option: req.body.answer.option

    });
    newAnswer.save((err, saved) => {
        if (err) {
            res.status(500).send(err);
        }
        res.json({ answer: saved });
    });
};

function deleteAnswer(req, res) {

    Answer.findOne({ id: req.params.id }).exec((err, answer) => {
        if (err) {
            res.status(500).send(err);
        }

        if(answer.userid != res.locals.userId) {
            res.status(401).end();
            return;
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