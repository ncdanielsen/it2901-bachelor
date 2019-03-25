const mongoose = require("mongoose");

const Schema = mongoose.Schema;

module.exports.neighbourhood_schema = new Schema({
    name: "String",
    buildings: [{ type: Schema.Types.ObjectId, ref: 'Buildings'}]
});