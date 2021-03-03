const moment = require("moment");

const dataSensorDb = require("../model/dataSensor");
const userDb = require("../model/User");
const loggerDb = require("../model/Logger");
const errDb = require("../model/errorSensor");
const percentDb = require("../model/percentageMils");

module.exports = {
  recData: (time, id, filter) => {
    return new Promise(async (resolve) => {
      const user = await userDb.findOne({ _id: id });

      let query = {};
      if (filter.start)
        query.$and = [
          { timestamp: { $gte: Number(filter.start) } },
          { timestamp: { $lte: Number(filter.end) } },
        ];

      if (filter.mils) query.loggerID = filter.mils;

      const loggerList = await loggerDb.find();
      let data = [];
      let num = 0;
      const bar = new Promise(async (res, reject) => {
        if (user.role === "admin") {
          await loggerList.forEach(async (element, index, array) => {
            const dataSensor = await dataSensorDb(time, element._id).find(
              query
            );
            // for (let i = 0; i < dataSensor.length; i++) {
            //   const el = dataSensor[i];
            //   const name = loggerList.find(
            //     (e) => String(e._id) === el.loggerID
            //   );
            //   const dataParam = el.dataParam,
            //     timestamp = el.timestamp,
            //     milsName = name.milsName;
            //   data.push({ dataParam, timestamp, milsName });
            // }

            if (dataSensor.length !== 0) {
              await dataSensor.forEach(async (el) => {
                const name = loggerList.find(
                  (e) => String(e._id) === el.loggerID
                );
                const dataParam = el.dataParam,
                  timestamp = el.timestamp,
                  milsName = name.milsName;
                data.push({ dataParam, timestamp, milsName });
              });
            }

            num++;
            if (num === array.length) res();
          });
        } else {
          const dataSensor = await dataSensorDb(
            time,
            user.associateLogger
          ).find(query);
          if (dataSensor.length == 0) res();
          dataSensor.forEach((el, index, array) => {
            const name = loggerList.find((e) => String(e._id) === el.loggerID);
            const dataParam = el.dataParam,
              timestamp = el.timestamp,
              milsName = name.milsName;
            data.push({ dataParam, timestamp, milsName });
            if (index === array.length - 1) res();
          });
        }
      });
      bar.then(() => {
        data.sort((a, b) => {
          return b.timestamp - a.timestamp;
        });
        resolve(data);
      });
    });
  },
  findUser: (email) => {
    return new Promise(async (resolve) => {
      const user = await userDb.findOne({ email: email });
      resolve(user);
    });
  },
  averageQuery: (element, time, db) => {
    return new Promise(async (resolve) => {
      let sendItem = {
        dataParam: [
          {
            name: "pH",
            value: 0,
          },
          {
            name: "COD",
            value: 0,
          },
          {
            name: "TSS",
            value: 0,
          },
          {
            name: "NH3N",
            value: 0,
          },
          {
            name: "Debit",
            value: 0,
          },
        ],
        loggerID: element._id,
        timestamp: moment().unix(),
      };

      const hey = element.range.map(async (el, index) => {
        const pipeline = [
          {
            $match: {
              timestamp: {
                $gt: time,
              },
            },
          },
          { $unwind: "$dataParam" },
          { $match: { "dataParam.name": el.name } },
          {
            $group: {
              _id: 0,
              AVG: {
                $avg: "$dataParam.value",
              },
            },
          },
        ];

        const data = await dataSensorDb(db, element._id).aggregate(pipeline);

        if (data.length !== 0) {
          sendItem.dataParam[index].value = data[0].AVG;
        } else {
          sendItem.dataParam[index].value = null;
        }
      });
      Promise.all(hey).then(() => {
        resolve(sendItem);
      });
    });
  },
  errData: (time, id, filter) => {
    return new Promise(async (resolve) => {
      const user = await userDb.findOne({ _id: id });
      let query = {};
      if (filter.start)
        query.$and = [
          { timestamp: { $gte: Number(filter.start) } },
          { timestamp: { $lte: Number(filter.end) } },
        ];
      if (filter.mils) query.loggerID = filter.mils;

      const loggerList = await loggerDb.find();
      let num = 0;
      let data = [];
      const bar = new Promise(async (res, reject) => {
        if (user.role === "admin") {
          loggerList.forEach(async (element, index, array) => {
            const dataError = await errDb(time, element._id).find(query);
            if (dataError.length !== 0) {
              dataError.forEach((el) => {
                const name = loggerList.find(
                  (e) => String(e._id) === el.loggerID
                );
                const errorMsg = el.errorMsg,
                  timestamp = el.timestamp,
                  milsName = name.milsName;
                data.push({ errorMsg, timestamp, milsName });
              });
            }
            num++;
            if (num === array.length) res();
          });
        } else {
          const dataError = await errDb(time, user.associateLogger).find(query);
          if (dataError.length == 0) res();
          dataError.forEach((el, index, array) => {
            const name = loggerList.find((e) => String(e._id) === el.loggerID);
            const errorMsg = el.errorMsg,
              timestamp = el.timestamp,
              milsName = name.milsName;
            data.push({ errorMsg, timestamp, milsName });
            if (index === array.length - 1) res();
          });
        }
      });
      bar.then(() => {
        data.sort((a, b) => {
          return b.timestamp - a.timestamp;
        });
        resolve(data);
      });
    });
  },
  percentageData: (id, filter) => {
    return new Promise(async (resolve) => {
      const user = await userDb.findOne({ _id: id });
      let query = {};
      if (filter.start)
        query.$and = [
          { timestamp: { $gte: Number(filter.start) } },
          { timestamp: { $lte: Number(filter.end) } },
        ];
      if (filter.mils) query.loggerID = filter.mils;
      const loggerList = await loggerDb.find();
      let num = 0;
      let data = [];
      console.log(query);
      const bar = new Promise(async (res, reject) => {
        if (user.role === "admin") {
          loggerList.forEach(async (element, index, array) => {
            const percentData = await percentDb(element._id).find(query);
            if (percentData.length !== 0) {
              percentData.forEach((el) => {
                const name = loggerList.find(
                  (e) => String(e._id) === el.loggerID
                );
                const percentage = el.percentage,
                  timestamp = el.timestamp,
                  milsName = name.milsName;
                data.push({ percentage, timestamp, milsName });
              });
            }
            num++;

            if (num === array.length) res();
          });
        } else {
          const percentData = await percentDb(user.associateLogger).find(query);
          if (percentData.length == 0) res();
          percentData.forEach((el, index, array) => {
            const name = loggerList.find((e) => String(e._id) === el.loggerID);
            const percentage = el.percentage,
              timestamp = el.timestamp,
              milsName = name.milsName;
            data.push({ percentage, timestamp, milsName });
            if (index === array.length - 1) res();
          });
        }
      });
      bar.then(() => {
        data.sort((a, b) => {
          return b.timestamp - a.timestamp;
        });
        resolve(data);
      });
    });
  },
};
