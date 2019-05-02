const mongoose = require("mongoose");

const Schema = mongoose.Schema;

module.exports.kpi_cat_schema = new Schema({
    name: String,
    cat_id: Number,
    children: [{ type: Schema.Types.ObjectId, ref: 'KPI Metadata'}],
    restricted: {type: "boolean", default: false, required: true}
});
