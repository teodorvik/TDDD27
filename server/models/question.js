const mongoose = require('mongoose');
var questionSchema = mongoose.Schema({
    text: String,
    options: [String]
});

module.exports = mongoose.model('Question', questionSchema);