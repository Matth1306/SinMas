const express = require("express");
const router = express.Router();

const loggerDb = require("../../model/Logger");
const dataSensorDb = require("../../model/dataSensor");

// GET stats data
router.get("/:id", async (req, res, next) => {
  const logger = await loggerDb.findOne({ _id: req.params.id });
  if (!logger) return res.status(400).send("Logger not found!");
  let query = {};

  if (req.query.start)
    query = {
      $and: [
        { timestamp: { $gte: Number(req.query.start) } },
        { timestamp: { $lte: Number(req.query.end) } },
      ],
    };
  const dataList = await dataSensorDb("day", logger._id).find(query);

  res.send({ dataList, logger });
});

module.exports = router;
