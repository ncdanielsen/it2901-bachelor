const mongoose = require("mongoose");

const Schema = mongoose.Schema;

module.exports.rkpi_schema = new Schema({
    name: String,
    created: Number,
    lastUpdated: Number,
    owner: String,
    description: String,
    values: [Number]
});