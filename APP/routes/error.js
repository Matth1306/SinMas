const express = require("express");
const router = express.Router();
const { errData, percentageData } = require("../library/dbApi");

const userDb = require("../model/User");

// GET 2 min Error Data
router.get("/raw/:id", async (req, res, next) => {
  const user = await userDb.findOne({ _id: req.params.id });
  if (!user) return res.status(400).send("ID Invalid!");
  res.send(await errData("single", req.params.id, req.query));
});

// GET hour Error Data
router.get("/hour/:id", async (req, res, next) => {
  const user = await userDb.findOne({ _id: req.params.id });
  if (!user) return res.status(400).send("ID Invalid!");
  res.send(await errData("hour", req.params.id, req.query));
});

router.get("/percentage/:id", async (req, res) => {
  const user = await userDb.findOne({ _id: req.params.id });
  if (!user) return res.status(400).send("ID Invalid!");
  res.send(await percentageData(req.params.id, req.query));
});

module.exports = router;
