const Question = require('./models/question');

function populate(req, res) {
    const questionsPath = './data/questions-' + req.params.data + '.js';
    const data = require(questionsPath);

    Question.remove({},  function(err) {
        if (err) {
            res.status(500).send(err);
        }

        //insert demo answers
        for (let i in data.questions) {
            data.questions[i].answers = [];
            data.questions[i].answers.push({
                userid: 'Always0',
                option: 0
            });

            data.questions[i].answers.push({
                userid: 'Always1',
                option: 1
            });

            data.questions[i].answers.push({
                userid: 'Random1',
                option: Math.floor(Math.random() * Math.floor(2))
            });

            data.questions[i].answers.push({
                userid: 'Random2',
                option: Math.floor(Math.random() * Math.floor(2))
            });
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