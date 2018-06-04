const Question = require('./models/question');

function getQuestions(req, res) {
    Question.find(
        {}
    ).exec((err, questions) => {
        if (err) {
            res.status(500).send(err);
            return;
        }

        res.json( questions );
    });
};

function getQuestion(req, res) {
    Question.findOne(
        { _id: req.params.id }
    ).exec((err, question) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json({ question });
    });
};


function getAnsweredQuestions(req, res) {
    Question.find({
        answers: { $elemMatch: {
            userid: res.userid
        }}
    }).lean().exec((err, answeredQuestions) => {
            if (err) {
                res.status(500).send(err);
                return;
            }
            for (let question of answeredQuestions) {
                question.usersChoice = -1;
                for (answer of question.answers) {
                    if (answer.userid == res.userid) {
                        question.usersChoice = answer.option;
                        break;
                    }
                }
            }

            res.json(answeredQuestions);
    });
};

function getUnansweredQuestions(req, res) {
    Question.find({
        answers: { $not: { $elemMatch: {
            userid: res.userid
        }}}
    }).exec((err, unansweredQuestions) => {
            if (err) {
                res.status(500).send(err);
                return;
            }
            res.json(unansweredQuestions);
    });
};


function getRandomQuestion(req, res) {
    Question.find({
        answers: { $not: { $elemMatch: {
            userid: res.userid
        }}}
    }).exec((err, unansweredQuestions) => {
            if (err) {
                res.status(500).send(err);
                return;
            }
            var random = Math.floor(Math.random() * unansweredQuestions.length);
            var question = [unansweredQuestions[random]];
            res.json({question});
    });
};

function addQuestion(req, res) {
    if (!req.body.question.text || !req.body.question.options || req.body.question.options.length < 2) {
        res.status(403).end();
        return;
    }

    if(!res.userid) {
        res.status(401).end();
        return;
    }

    const newQuestion = new Question({
        userid: res.userid,
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
    Question.remove({ _id: req.params.id, userid: res.userid }).exec((err, result) => {
        if (err) {
            res.status(500).send(err);
            return;
        }

        if(result.n === 0) {
            res.status(401).send(err);
            return;
        }

        res.status(200).end();
    });
};

function addAnswer(req, res) {
    if(!res.userid) {
        res.status(401).end();
        return;
    }

    console.log(res.userid);
    Question.findOneAndUpdate(
        { _id: req.params.id },
        {
            $pull: { answers: {userid: res.userid}  }
        },
        {new: true}
    ).exec((err, question) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        
        Question.findOneAndUpdate(
            { _id: req.params.id },
            {
                $addToSet: {answers: {userid: res.userid, option: req.body.answer.option}}
            },
            {new: true}
        ).exec((err, question) => {
            if (err) {
                res.status(500).send(err);
                return;
            }
            res.json(question);
        });
    });
};

function deleteAnswer(req, res) {
    if(!res.userid) {
        res.status(401).end();
        return;
    }
    
    Question.findOneAndUpdate(
        { _id: req.params.id },
        {
            $pull: { answers: {userid: res.userid}  }
        },
        {new: true}
    ).exec((err, question) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json(question);
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

    addAnswer,
    deleteAnswer
};