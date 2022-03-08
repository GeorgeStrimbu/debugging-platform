const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Reply = new Schema({
    author: String,
    body: String,
    sourceCode: String,
    upVotes: Number,
    approvedByTheTeacher: Boolean,
    solvedTheIssue: Boolean,
    parentPost: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    }
},{
    collection: 'replies'
});

module.exports = mongoose.model('Reply', Reply);