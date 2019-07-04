const mongoose = require("mongoose");

const Schema = mongoose.Schema;

module.exports.building_schema = new Schema({
    neighbourhood_id: Number, //Integer
    kpi_id: Number, //Integer
    values: [Number], //(Float, Integer, datetime, etc)
    times: [Number], //(Float, Integer, datetime, etc)
});

/**
 * NOTE: Is currently not used by the frontend.
 * 
 * 
 */