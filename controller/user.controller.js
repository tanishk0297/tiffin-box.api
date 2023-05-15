const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
var nodemailer = require('nodemailer');
const db = require("../model");
const dbConfig = require('../db.config');
const User = db.users;
// 
// Create and Save a new Tutorial
exports.create = async (req, res) => {
 
  const activationKey = uuidv4();

  var hashPassword = await bcrypt.hash(req.body.Password, 10);
  // Create a Tutorial
  const user = new User({
   
    email: req.body.EMailId,
    password: hashPassword,   
    status: 0,
    activationKey: activationKey,
    activationDate: null
  });

  // Save User in the database
  user
    .save()
    .then(async (data) => {


      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: dbConfig.gmailUser,
          pass: dbConfig.gmailPassword
        }
      });

      var mailOptions = {
        from: dbConfig.gmailUser,
        to: req.body.EMailId,
        subject: 'Activate your Account',
        html: '<a href="' + dbConfig.appUrl + '/activate?key=' + activationKey + '">Click here to activate </a>'
      };
      await new Promise((resolve, reject) => {

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    });
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the user."
      });
    });
};
exports.EMailIdExists = (req, res) => {
  //const title = req.query.title;
  //var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  User.find({ email: req.body.EMailId })
    .then(data => {
      res.send(data.length > 0 ? true : false);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};
exports.Login = async function (req, res) {
  let Token = ''
  var user = {}
  try {
    User.find({email: req.body.EMailId})
      .then(data => {
        if (data.length > 0) {
          user = data[0];          
          if (bcrypt.compareSync(req.body.Password, user.password)) {           
            Token = jwt.sign(
              { UserType: 'User', UserId: user._id },
              dbConfig.TokenKey,
              {
                expiresIn: "5h",
              }
            );           
            //user.Token = Token            
          }
        }       
        res.send({...user._doc, Token});
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
  }
  catch (err) {
    throw new Error(err)
  }
 
};
exports.Activate = async function (req, res) {
  try {
    let user = await User.findOneAndUpdate({ activationKey: req.body.activationKey, status: 0 }, { status: 1, activationDate: new Date() }, {
      new: true
    });
    if (user) {
      res.send(true);
    }
    else {
      res.send(false);
    }    
  }
  catch (err) {
    throw new Error(err)
  }
};

exports.EMailIdExists = (req, res) => {
  //const title = req.query.title;
  //var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  User.find({ email: req.body.EMailId })
    .then(data => {
      res.send(data.length > 0 ? true : false);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

