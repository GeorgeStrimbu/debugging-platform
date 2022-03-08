const express = require('express');
const roomRoute = express.Router();

let Room = require('./room');

roomRoute.route('/add').post(function (req, res) {
    let room = new Room(req.body);
    room.save()
        .then(() => {
            res.status(200).json({ 'room': 'room added successfully' });
        })
        .catch(() => {
            res.status(400).send("unable to save to database");
        });
});

roomRoute.route('/roomExists').get(function (req, res) {
    Room.findOne({ number: req.query.roomNumber }).then(existingRoom => {
        if (existingRoom != null) {
            res.status(200).json({ roomExists: true });
        } else {
            res.status(200).json({ roomExists: false });
        }
    });


})

module.exports = roomRoute;