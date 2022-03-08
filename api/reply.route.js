const express = require('express');
const replyRoutes = express.Router();

let Reply = require('./reply');
let Post = require('./post')

replyRoutes.route('/add').post(async function (req, res) {
  try {
    let reply = new Reply(req.body);
    reply.approvedByTheTeacher = false;
    reply.solvedTheIssue = false;
    await reply.save();
    const post = await Post.findById(reply.parentPost);
    post.replies.push(reply._id);
    await post.save();
    res.json({ success: true, reply })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
});

replyRoutes.route('/').get(function (req, res) {
  Reply.find(function (err, replies) {
    if (err) {
      res.json(err);
    }
    else {
      res.json(replies);
    }
  });
});

replyRoutes.route('/get/:id').get(function (req, res) {
  let id = req.params.id;
  Reply.findById(id, function (err, reply) {
    if (err) {
      res.json(err);
    }
    res.json(reply);
  });
});

replyRoutes.route('/update/:id').post(function (req, res) {
  Reply.findById(req.params.id, function (err, reply) {
    if (!reply)
      res.status(404).send("data is not found");
    else {
      reply.author = req.body.author;
      reply.body = req.body.body;
      reply.approvedByTheTeacher = req.body.approvedByTheTeacher;
      reply.solvedTheIssue = req.body.solvedTheIssue;
      reply.save().then(() => {
        res.json('Update complete');
      })
        .catch(() => {
          res.status(400).send("unable to update the database");
        });
    }
  });
});

replyRoutes.route('/delete/:id').delete(function (req, res) {
  Reply.findByIdAndRemove({ _id: req.params.id }, function (err) {
    if (err) res.json(err);
    else res.json('Successfully removed ' + req.params.id);
  });
});

module.exports = replyRoutes;