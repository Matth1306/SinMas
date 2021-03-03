const cron = require("node-cron");
const moment = require("moment");

const { averageQuery } = require("../library/dbApi");

const dataSensorDb = require("../model/dataSensor");
const loggerDb = require("../model/Logger");
const errorDb = require("../model/errorSensor");
const percentDb = require("../model/percentageMils");

cron.schedule("0 0 * * * *", async () => {
  console.log("HOURLY CRONJOB");
  const loggerList = await loggerDb.find();

  loggerList.forEach(async (element) => {
    const data = await averageQuery(element, moment().unix() - 3600, "single");
    if (data.dataParam[0].value !== null) {
      const savedData = await dataSensorDb("hour", data.loggerID).create(data);

      savedData.dataParam.forEach(async (el, index) => {
        if (
          el.value < element.range[index].min ||
          el.value > element.range[index].max
        ) {
          const loggerID = savedData.loggerID,
            errorMsg = `Parameter ${el.name} tidak sesuai ambang batas normal!`,
            timestamp = moment().unix();
          await errorDb("hour", loggerID).create({
            loggerID,
            errorMsg,
            timestamp,
          });
        }
      });
    }
  });
});

cron.schedule("0 0 0 * * *", async () => {
  console.log("DAILY CRONJOB");
  const time = moment().unix() - 86400;
  const loggerList = await loggerDb.find();

  loggerList.forEach(async (element) => {
    const data = await averageQuery(element, time, "hour");
    if (data.dataParam[0].value !== null) {
      await dataSensorDb("day", data.loggerID).create(data);
    }
    let dataPercent = [];
    for (let index = 0; index < element.range.length; index++) {
      const dataError = await errorDb("single", element._id)
        .find({
          timestamp: { $gte: time },
          errorMsg: `Parameter ${element.range[index].name} tidak sesuai ambang batas normal!`,
        })
        .count();
      dataPercent.push({
        name: element.range[index].name,
        value: ((720 - dataError) / 720) * 100,
      });
    }
    await percentDb(element._id).create({
      loggerID: element._id,
      percentage: dataPercent,
      timestamp: moment().unix(),
    });
  });
});
