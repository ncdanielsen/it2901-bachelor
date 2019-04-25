const mongoose = require("mongoose");

const rkpiSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true},
    created: {type: Date, required: true},
    last_updated: {type: Date, required: true},
    access_type: {type: String, required: true, default: "Private"},
    owner: {type: mongoose.Schema.Types.ObjectId},
    //owner: String,
    description: String, 
    values: {type: "array", items: {
        type: "object", properties:{
            name: {type: String, required: true},
            value: {type: Number, required: true}
        }
    }}
})
module.exports = mongoose.model("rkpi_schema", rkpiSchema, "rkpi_TEST");