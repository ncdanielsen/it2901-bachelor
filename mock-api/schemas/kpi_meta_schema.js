const mongoose = require("mongoose");

const Schema = mongoose.Schema;

module.exports.kpi_meta_schema = new Schema({
    name: String,
    kpi_id: Number, // Integer
    unit: String,
    type: String,
    timeseries: Boolean,
    description: String,
});


/**
 * Schema of a KPI
 * 
 * name:            String          Description: The name of the kpi. Example: "Energy need"
 * kpi_id:          Number          Description: Identifier for the kpi.
 * unit:            String          Description: The unit in which the kpi is measured. Example "kWh/m2"
 * type:            String          Description: Can for example be "float" or "String".
 * timeseries:      Boolean         Description: Meant to indicate if the data is timeseries or not.
 * description:     String          Description: Short textual desciption of the kpi
 * 
 * 
 */
