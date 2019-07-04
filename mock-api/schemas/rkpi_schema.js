const mongoose = require("mongoose");

const Schema = mongoose.Schema;

module.exports.rkpi_schema = new Schema({
    name: String,
    created: Number, //(Float, Integer, datetime, etc)
    lastUpdated: Number, //(Float, Integer, datetime, etc)
    owner: String,
    description: String,
    values: [Number], //(Float, Integer, datetime, etc)
});

/**
 * name:            String          Description: The name of the rkpi set. Example : "Cold climate house"
 * created:         Number          Description: The date of when the rkpi set was first created. 
 * lastUpdated:     Number          Description: The date of when the rkpi set was last modified. 
 * owner:           String          Description: Either "private" or "shared". Meant to indicate the access level required to view the set.
 * description:     String          Description: Textual description of the data set.
 * values:          Number[]        Description: Array containing a reference value for each of the kpi.
 *                                               Values need to be in the same order as the kpi in "kpi_list.json"
 * 
 * 
 */