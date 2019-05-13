const mongoose = require("mongoose");

const Schema = mongoose.Schema;

module.exports.ckpi_schema = new Schema({
    description: String,
    created: Number, //(Float, Integer, datetime, etc)
    lastUpdated: Number, //(Float, Integer, datetime, etc)
    name: String,
    owner: String,
    values: [
        {
            name: String,
            data: [
                { value: Number, time: Number } //(Float, Integer, datetime, etc)
            ]
        }
    ]
});

/**
 * name:            String              Description: The name of the ckpi set. Example: "Ydalir Building A3"
 * created:         Number              Description: The date of when the ckpi set was first created. 
 * lastUpdated:     Number              Description: The date of when the ckpi set was last modified. 
 * owner:           String              Description: Either "private" or "shared". Meant to indicate the access level required to view the set.
 * description:     String              Description: Textual description of the data set. 
 * 
 * values:          [{name, data}]      Description: Array containing JSON objects. These JSON objects represent a kpi and the timeseries data belonging to it.
 * name:            String              Description: Name of the kpi that the timeseries data belongs to. Example: "Energy need", "Peak load" or "Total gas emissions"
 * data:            [{value, time}]     Description: Array of JSON objects. This is timeseries data that belongs to a kpi.
 * value:           Number              Description: Value measured at a given time. 
 * time:            Number              Description: The Date for when the value was measured-
 */