module.exports = app => {
    const users = require("../controller/user.controller.js");
    var router = require("express").Router();
    // Create a new Tutorial
    router.post("/register", users.create); 
    router.post("/login", users.Login); 
    router.post("/activate", users.Activate); 
    router.post("/duplicateid", users.EMailIdExists); 
    app.use("/api/users", router);
  };
  