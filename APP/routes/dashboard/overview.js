const express = require("express");
const router = express.Router();

const loggerDb = require("../../model/Logger");
const dataSensorDb = require("../../model/dataSensor");
const errorSensorDb = require("../../model/errorSensor");

const percentDb = require("../../model/percentageMils");

/* GET home page. */
router.get("/data/:id", async (req, res, next) => {
  const logger = await loggerDb.findOne({ _id: req.params.id });
  if (!logger) return res.status(400).send("Logger not found!");

  const dataList = await dataSensorDb("single", logger._id)
    .find()
    .sort({ _id: -1 })
    .limit(50);
  const errorList = await errorSensorDb("single", logger._id)
    .find()
    .sort({ _id: -1 })
    .limit(50);
  const percent = await percentDb(logger._id).find().sort({ _id: -1 }).limit(1);

  dataList.map((a) => {
    a.dataParam.map((b, index) => {
      b.value < logger.range[index].min || b.value > logger.range[index].max
        ? (b.status = "danger")
        : (b.status = "success");
    });
  });

  res.send({ dataList, errorList, logger, percent });
});

module.exports = router;
