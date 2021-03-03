const express = require("express");
const router = express.Router();
const { recData } = require("../library/dbApi");

const userDb = require("../model/User");

// GET 2 min data
router.get("/raw/:id", async (req, res, next) => {
  const user = await userDb.findOne({ _id: req.params.id });
  if (!user) return res.status(400).send("ID Invalid!");
  res.send(await recData("single", req.params.id, req.query));
});

// GET hour data
router.get("/hour/:id", async (req, res, next) => {
  const user = await userDb.findOne({ _id: req.params.id });
  if (!user) return res.status(400).send("ID Invalid!");
  res.send(await recData("hour", req.params.id, req.query));
});

// GET day data
router.get("/day/:id", async (req, res, next) => {
  const user = await userDb.findOne({ _id: req.params.id });
  if (!user) return res.status(400).send("ID Invalid!");
  res.send(await recData("day", req.params.id, req.query));
});

//

module.exports = router;
