const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.users = require("./user.js")(mongoose);
db.booking = require("./booking.js")(mongoose);
db.contacts = require("./contact.js")(mongoose);
// db.messages = require("./message.model.js")(mongoose);
// db.deleteMessages = require("./deleteMessage.model.js")(mongoose);
module.exports = db;
