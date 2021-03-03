const mongoose = require("mongoose");

const ncrSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  date: {
    type: Number,
    required: true,
  },
  site: {
    type: String,
    required: true,
  },
  status: {
    type: Number,
    required: false,
  },
  condition: {
    type: Number,
    required: false,
  },
  abnormal: {
    type: Number,
    required: false,
  },
  otherAbnormality: {
    type: Number,
    required: false,
  },
  emergency: {
    type: Number,
    required: false,
  },
  unit: { type: Number, required: false },
  otherUnit: { type: String, required: false },
  description: { type: String, required: false },
  rootProblem: { type: String, required: false },
  action: { type: String, required: false },
  actionDate: { type: Number, required: false },
  actionDue: { type: Number, required: false },
  verification: { type: String, required: false },
  verificationDate: { type: Number, required: false },
  verificationStatus: { type: String, required: false },
  file: {
    type: Object,
    required: false,
  },
});

module.exports = mongoose.model("ncr", ncrSchema);
