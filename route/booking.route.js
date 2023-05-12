module.exports = app => {
    const booking = require("../controller/booking.controller.js");
    var router = require("express").Router();
    // Create a new Tutorial
    router.post("/book", booking.create); 
    app.use("/api/booking", router);
    
  };
  