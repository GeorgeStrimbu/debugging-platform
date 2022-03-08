const express = require('express');
const usersRoutes = express.Router();
const jwt = require('jsonwebtoken');
const config = require('./config');

let User = require('./users');

usersRoutes.route('/add').post(function (req, res) {
  let user = new User(req.body);
  user.save()
    .then(() => {
      let token = jwt.sign(
        { id: user.id },
        config.secret,
        { expiresIn: 86400 } // expires in 24 hours
      );
      res.status(200).send({
        auth: true,
        token: token,
        user: user
      });
    })
    .catch(() => {
      res.status(400).send("unable to save to database");
    });

});

usersRoutes.route('/userExists').get(function (req, res) {
  User.findOne({ username: req.query.username }).then(existingUser => {
    if (existingUser != null) {
      res.status(200).json({ userExists: true });
    } else {
      res.status(200).json({ userExists: false });
    }
  });


})


module.exports = usersRoutes;