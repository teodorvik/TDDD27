const Question = require('./models/question');

function populate(req, res) {
    const questionsPath = './data/questions-' + req.params.data + '.js';
    const data = require(questionsPath);

    Question.remove({},  function(err) {
        if (err) {
            res.status(500).send(err);
        }
        Question.insertMany(data.questions, function(err, saved) {
            if (err) {
                res.status(500).send(err);
            }
            res.json({ data: saved });
        });
    });
}

module.exports = {
    populate
};