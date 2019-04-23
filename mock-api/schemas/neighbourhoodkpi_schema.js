const mongoose = require("mongoose");

const Schema = mongoose.Schema;

module.exports.building_schema = new Schema({
    neighbourhood_id: Number,
    kpi_id: Number,
    values: [Number],
    times: [Number],
    restricted: {type: "boolean", default: false, required: true}
});