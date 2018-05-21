const mongoose = require('mongoose');
var questionSchema = mongoose.Schema({
	userid: String,
    text: String,
    options: [String]
});

module.exports = mongoose.model('Question', questionSchema);