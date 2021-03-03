const express = require("express");
const router = express.Router();

const loggerDb = require("../../model/Logger");
const userDb = require("../../model/User");

// GET location
router.get("/:id", async (req, res, next) => {
  const user = await userDb.findOne({ _id: req.params.id });
  if (!user) return res.status(400).send("User not found!");
  if (user.role === "admin") {
    const loggerList = await loggerDb
      .find()
      .select({ milsName: 1, latlong: 1, _id: 0 });
    res.send(loggerList);
  } else {
    const loggerList = await loggerDb
      .find({ _id: user.associateLogger })
      .select({ milsName: 1, latlong: 1, _id: 0 });
    res.send(loggerList);
  }
});

module.exports = router;
