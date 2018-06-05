const mongoose = require('mongoose');
var questionSchema = mongoose.Schema({
    userid: String,
    text: String,
    options: [String],
    answers: [{
        _id: false,
        userid: String,
        option: Number
    }]
});

module.exports = mongoose.model('Question', questionSchema);