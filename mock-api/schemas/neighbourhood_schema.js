const mongoose = require("mongoose");

const Schema = mongoose.Schema;

module.exports.neighbourhood_schema = new Schema({
    name: String,
    neigh_id: Number,
    buildings: [{
        building_id: Number
    }],
});


/**
 * NOTE: Is currently not used by the frontend.
 * 
 * 
 */