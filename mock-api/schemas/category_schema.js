const mongoose = require("mongoose");

const Schema = mongoose.Schema;

module.exports.kpi_cat_schema = new Schema({
    name: String,
    children: [{ type: Schema.Types.ObjectId, ref: 'KPI Metadata'}]
});
