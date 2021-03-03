const express = require("express");
const router = express.Router();

const userDb = require("../model/User");
const ncrDb = require("../model/NCR");

// POST NCR
router.post("/", async (req, res, next) => {
  const ncrData = new ncrDb(req.body);

  try {
    const saveData = await ncrData.save();
    res.send(saveData);
  } catch (error) {
    res.status(400).send(error);
  }
});

// GET DETAILS NCR
router.get("/:id", async (req, res, next) => {
  const ncrData = await ncrDb.findOne({ _id: req.params.id });
  if (!ncrData) return res.status(400).send("Datanot found!");
  res.send(ncrData);
});

// UPDATE NCR
router.put("/:id", async (req, res) => {
  const ncrData = await ncrDb.findOne({ _id: req.params.id });
  if (!ncrData) return res.status(400).send("Data not found!");
  try {
    const ncrUpdate = await ncrDb.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.send(ncrUpdate);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

// GET ALL LIST NCR
router.get("/all/:id", async (req, res) => {
  const user = await userDb.findOne({ _id: req.params.id });
  let ncrDataList = [];
  let query = {};
  console.log(req.query);
  if (req.query.start) {
    query.$and = [
      { date: { $gte: Number(req.query.start) } },
      { date: { $lte: Number(req.query.end) } },
    ];
  }
  if (req.query.mils) {
    query.site = req.query.mils;
  }
  if (user.role === "admin") {
    ncrDataList = await ncrDb.find(query);
  } else {
    query.site = user.associateLogger;
    ncrDataList = await ncrDb.find(query);
  }
  res.send(ncrDataList);
});

module.exports = router;
