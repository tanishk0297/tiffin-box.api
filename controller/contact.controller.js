
const { v4: uuidv4 } = require('uuid');
var nodemailer = require('nodemailer');
const db = require("../model");
const dbConfig = require('../db.config');
const Booking = db.booking;
// 
// Create and Save a new Tutorial
exports.create = async (req, res) => {
    let myObject = {}
   
     
     // Create a Tutorial
    const booking = new Booking({
        Name: req.body.Area,
        Email: req.body.Duration,
        Number: req.body.Packages,
        Subject: req.body.Packages,
        Message: req.body.Packages,
        ContactedBy: myObject.UserId,
    });

    // Save User in the database
    booking
        .save()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the booking."
            });
        });
};

