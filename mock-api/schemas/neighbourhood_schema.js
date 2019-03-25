const mongoose = require("mongoose");

const Schema = mongoose.Schema;

module.exports.neighbourhood_schema = new Schema({
    name: "String",
    location: [{
        type: "String"
    }],
    buildings: [{ 
        type: "String"
    }]
});