const mongoose = require('mongoose');
var answerSchema = mongoose.Schema({
    userid: String,
    questionid: String,
    option: Number
});

module.exports = mongoose.model('Answer', answerSchema);