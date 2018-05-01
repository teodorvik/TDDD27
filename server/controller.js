const Question = require('./models/question');

function getQuestions(req, res) {
    Question.find({}, function (err, questions) {
        if(err) {
            res.send("Something went wrong!!");
            next();
        }

        res.json(questions);
    });
};

function getQuestion(req, res) {
    res.send("hej2");
};

function addQuestion(req, res) {

    const newQuestion = new Question(req.body.question);
    newQuestion.save((err, saved) => {
        if (err) {
            res.status(500).send(err);
        }
        res.json({ question: saved });
    });
};

function deleteQuestion(req, res) {
    res.send("hej4");
};

function getAnswers(req, res) {
    res.send("hej5");
};

function getAnswer(req, res) {
    res.send("hej6");
};

function addAnswer(req, res) {
    res.send("hej7");
};

function deleteAnswer(req, res) {
    res.send("hej8");
};

module.exports = {
    getQuestions,
    getQuestion,
    addQuestion,
    deleteQuestion,

    getAnswers,
    getAnswer,
    addAnswer,
    deleteAnswer
};