const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let Post = new Schema({
  author: String,
  authRoom: Number,
  title: String,
  body: String,
  sourceCode: String,
  upVotes: Number,
  replies: [{
    type: Schema.Types.ObjectId,
    ref: 'Reply'
  }]
},{
    collection: 'posts'
});

module.exports = mongoose.model('Post', Post);