const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "https://tiffin-box.vercel.app"
};

app.use(cors(corsOptions));
global.dbConfig = require("./db.config.js");
global.jwt = require('jsonwebtoken');

var path = require('path');

// parse requests of content-type - application/json
app.use(express.json());
const db = require("./model/index.js");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

require("./route/user.route.js")(app);
require("./route/booking.route.js")(app);
// db.mongoose
//   .connect(db.url, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   })
//   .then(() => {
//     console.log("Connected to the database!");
//   })
//   .catch(err => {
//     console.log("Cannot connect to the database!", err);
//     process.exit();
//   });

// simple route
app.get("/welcome", (req, res) => {
  res.send("Welcome To Tanishk's Api");
});

// require("./app/routes/message.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
var server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});





   
    
   

