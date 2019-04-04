const mongoose = require("mongoose");

const Schema = mongoose.Schema;

module.exports.ckpi_schema = new Schema({
    name: String,
    values: [
        {
        time: Number,
        value: Number,
        }
    ]
});