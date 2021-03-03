const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const moment = require("moment");
const secret = "p9ancxC9g4UnMWeh";
const { listDb } = require("../services/database");

const loggerDb = require("../model/Logger");
const dataSensorDb = require("../model/dataSensor");
const errorSensorDb = require("../model/errorSensor");
const userDb = require("../model/User");

// POST new logger
router.post("/", async (req, res) => {
  const loggerNew = new loggerDb(req.body);
  try {
    const loggerSave = await loggerNew.save();
    res.send(loggerSave);
  } catch (error) {
    res.status(400).send(error);
  }
});

// GET logger list
router.get("/list/:id", async (req, res) => {
  const user = await userDb.findOne({ _id: req.params.id });
  let logger = [];
  if (user.role === "admin") {
    logger = await loggerDb.find();
  } else {
    logger = await loggerDb.find({ _id: String(user.associateLogger) });
  }
  res.send(logger);
});

// PUT update logger
router.put("/:id", async (req, res) => {
  req.body.range.map((e) => {
    e.min = Number(e.min);
    e.max = Number(e.max);
  });
  try {
    const loggerUpdate = await loggerDb.updateOne(
      { _id: req.params.id },
      req.body
    );
    res.send(loggerUpdate);
  } catch (error) {
    res.status(400).send(error);
  }
});

// POST insert new dataSensor
router.post("/data", async (req, res) => {
  const decodedData = jwt.decode(req.body.token, secret);
  if (!decodedData) res.status(400).send("Token verification failed!");
  const logger = await loggerDb.findOne({ _id: decodedData.uid });
  if (!logger) return res.status(400).send("Logger is not authorized!");

  const par = [
    { name: "pH", value: parseFloat(decodedData.pH) },
    { name: "COD", value: parseFloat(decodedData.cod) },
    { name: "TSS", value: parseFloat(decodedData.tss) },
    { name: "NH3N", value: parseFloat(decodedData.nh3n) },
    { name: "Debit", value: parseFloat(decodedData.debit) },
  ];

  let paramsCheck = 0;
  for (let i = 0; i < par.length; i++) {
    for (let a = 0; a < logger.range.length; a++) {
      if (par[i].name === logger.range[a].name) {
        paramsCheck++;
      }
    }
  }

  if (paramsCheck < logger.range.length || par.length !== logger.range.length)
    return res.status(400).send("Parameter Error!");

  for (let i = 0; i < par.length; i++) {
    if (par[i].value === undefined)
      return res.status(400).send(`Value of ${par[i].name} Undefined!`);
  }

  const savedSensorData = await dataSensorDb("single", decodedData.uid).create({
    loggerID: decodedData.uid,
    dataParam: par,
    timestamp: decodedData.timestamp,
    serverTimestamp: moment().unix(),
    ip: req.headers["x-real-ip"] || req.connection.remoteAddress,
  });

  for (let i = 0; i < savedSensorData.dataParam.length; i++) {
    for (let a = 0; a < logger.range.length; a++) {
      if (savedSensorData.dataParam[i].name === logger.range[a].name) {
        if (
          savedSensorData.dataParam[i].value > logger.range[a].max ||
          savedSensorData.dataParam[i].value < logger.range[a].min
        ) {
          await errorSensorDb("single", savedSensorData.loggerID).create({
            loggerID: savedSensorData.loggerID,
            dataSensorId: savedSensorData._id,
            timestamp: moment().unix(),
            errorMsg:
              "Parameter " +
              savedSensorData.dataParam[i].name +
              " tidak sesuai ambang batas normal!",
          });
        }
      }
    }
  }

  try {
    res
      .status(200)
      .send(savedSensorData + "\n \nCongratulations! Data sent successfully!");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
