module.exports = app => {
    const booking = require("../controller/contact.controller.js");
    var router = require("express").Router();
    // Create a new Tutorial
    router.post("/contact", contact.create); 
    app.use("/api/contact", router);
    
  };
  