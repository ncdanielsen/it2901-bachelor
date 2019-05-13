const mongoose = require("mongoose");

const Schema = mongoose.Schema;

module.exports.kpi_cat_schema = new Schema({
    name: String,
    cat_id: Number, //
    children: [{ type: Schema.Types.ObjectId, ref: 'KPI Metadata'}],
});


/**
 * Schema of a KPI Category
 * 
 * name:            String          Description: The name of the kpi category. Example: "Energy", "Power", "Emissions", etc
 * cat_id:          Number          Description: Identifier for the category.
 * children:        []              Description: Array that contains the id's of kpi which belong to this category. These kpi are defined in "kpi_meta_schema.js".
 * 
 */