const mongoose = require("mongoose");

const Schema = mongoose.Schema;

module.exports.building_schema = new Schema({
    "name": String,
    "address": {
        "address": String,
        "zip": Integer,
        "city": String
    }
});