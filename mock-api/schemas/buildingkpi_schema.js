const mongoose = require("mongoose");

const Schema = mongoose.Schema;

module.exports.building_schema = new Schema({
    building_id: Number,
    kpi_id: Number,
    values: [Number],
    times: [Number],
});