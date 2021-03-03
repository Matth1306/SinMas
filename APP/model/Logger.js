const mongoose = require("mongoose");

const loggerSchema = new mongoose.Schema({
  milsName: {
    type: String,
    required: true,
  },
  range: {
    type: Array,
    required: true,
  },
  latlong: {
    type: Object,
    required: true,
  },
  errCounter: {
    type: Number,
    required: false,
  },
});

module.exports = mongoose.model("logger", loggerSchema);
