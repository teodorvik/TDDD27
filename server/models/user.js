const mongoose = require('mongoose');
var userSchema = mongoose.Schema({
    _id: false,
    userid: String,
    email: String,
    picture: String
});
module.exports = mongoose.model('User', userSchema);