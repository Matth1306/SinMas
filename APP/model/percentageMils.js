const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  loggerID: {
    type: String,
    required: true,
  },
  percentage: {
    type: Array,
    required: true,
  },
  timestamp: {
    type: Number,
    required: true,
  },
});

module.exports = (id) => {
  return mongoose.model(`percentage_${id}`, dataSchema);
};
