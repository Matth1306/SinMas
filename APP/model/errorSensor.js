const mongoose = require("mongoose");

const errorSchema = new mongoose.Schema({
  loggerID: {
    type: String,
    required: true,
  },
  dataSensorID: {
    type: String,
    required: false,
  },
  errorMsg: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Number,
    required: true,
  },
});

module.exports = (type, id) => {
  return mongoose.model(`dataError_${type}_${id}`, errorSchema);
};
