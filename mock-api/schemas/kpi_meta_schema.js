const mongoose = require("mongoose");

const Schema = mongoose.Schema;

module.exports.kpi_meta_schema = new Schema({
  name: String,
  unit: String,
  type: String,
  timeseries: Boolean,
  description: String
});
