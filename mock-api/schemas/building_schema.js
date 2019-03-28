const mongoose = require(mongoose);

const Schema = mongoose.Schema;

module.exports.building_schema = new Schema({
    name: String,
    building_id: Number,
    address: {
        address: String,
        zip: Number,
        city: String
    }
});