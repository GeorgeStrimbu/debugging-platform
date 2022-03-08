const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let User = new Schema({
    role: String,
    username: String,
    room: Number,
}, {
    collection: 'users'
});


module.exports = mongoose.model('User', User);