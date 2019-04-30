const mongoose = require("mongoose");

const Schema = mongoose.Schema;

module.exports.ckpi_schema = new Schema({
    description: String,
    created: Number,
    lastUpdated: Number,
    name: String,
    owner: String,
    values: [
        {
            name: String,
            data: [
                { value: Number, time: Number }
            ]
        }
    ]
});