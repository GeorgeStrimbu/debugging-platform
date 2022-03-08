const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 4000;
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./DB.js');
const postRoute = require('./post.route');
const replyRoute = require('./reply.route');
const usersRoute = require('./users.route');
const roomRoute = require('./room.route');

mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useUnifiedTopology: true, useNewUrlParser: true }).then(
  () => { console.log('Database is connected') },
  err => { console.log('Can not connect to the database' + err) }
);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/posts', postRoute);
app.use('/QuestionPage/replies', replyRoute);
app.use('/users', usersRoute);
app.use('/rooms', roomRoute);


app.listen(PORT, function () {
  console.log('Server is running on Port:', PORT);
});