const axios = require("axios");
const moment = require("moment");
const jwt = require("jsonwebtoken");

const API = "http://localhost:4000/api/logger/data",
  interval = 120000,
  idList = ["5ff60a10bdbb9596b2cce618", "5ff6e97967815129fd4a481f"];

setInterval(() => {
  idList.map((id) => {
    axios
      .post(API, dataGenerator(id))
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  });
}, interval);

const rand = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const dataGenerator = (id) => {
  const token = jwt.sign(
    {
      uid: id,
      timestamp: moment().unix(),
      pH: rand(6, 9),
      cod: rand(0, 170),
      tss: rand(0, 110),
      nh3n: rand(0, 100),
      debit: rand(0, 110),
    },
    "p9ancxC9g4UnMWeh"
  );

  return { token };
};
