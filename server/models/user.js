const mongoose = require('mongoose');
var userSchema = mongoose.Schema({
    hashedToken: String
});

module.exports = mongoose.model('User', userSchema);