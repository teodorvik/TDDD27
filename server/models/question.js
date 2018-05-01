const mongoose = require('mongoose');
var questionSchema = mongoose.Schema({
    cuid: String,
    text: String,
    options: [String]
});

module.exports = mongoose.model('Question', questionSchema);