const express = require("express");
const router = express.Router();
const mailServ = require("../services/mail");

router.get("/", async (req, res) => {
  mailServ(
    "no_reply@app.co.id",
    "COBA MAIL SERVICE",
    `COD data valid is under 90%
    "Please check the condition of the Sparing equipment and log in to application"
    
    enviro-online.pp.co.id`
  ).catch((err) => {
    console.log(err);
  });

  res.send("Mail Sent");
});

module.exports = router;
