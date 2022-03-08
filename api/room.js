const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Room = new Schema({
    number: Number
}, {
    collection: 'rooms'
});

module.exports = mongoose.model('Room', Room);