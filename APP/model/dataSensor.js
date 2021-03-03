const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  loggerID: {
    type: String,
    required: true,
  },
  dataParam: {
    type: Array,
    required: true,
  },
  timestamp: {
    type: Number,
    required: true,
  },
  serverTimestamp: {
    type: Number,
    required: false,
  },
});

module.exports = (type, id) => {
  return mongoose.model(`dataSensor_${type}_${id}`, dataSchema);
};
