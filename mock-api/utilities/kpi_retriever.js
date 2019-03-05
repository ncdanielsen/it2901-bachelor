const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const kpi_meta_schema = require('../schemas/kpi_meta_schema');
const config = require('../config.json');

// Connection URL
const url = config.DATABASE_URL;
const db_name = config.DATABASE_NAME;

/**
 * @param: callback(kpi_meta). Fucntion deatiling what to to do with retrieved data.
 * @return: List of availiable from kpi
 */
function retrieve_kpi_metadata(callback){
    let connection = mongoose.createConnection(url + "zen_category_TEST");
    let kpi_meta_model = connection.model('KPI_Meta', kpi_meta_schema, 'kpi_TEST');
    kpi_meta_model.find({}, function (err, kpi_meta) {
        callback(kpi_meta);
    })
}

module.exports = retrieve_kpi_metadata;
/*
function get_kpi_metadata(){
    let connection = mongoose.createConnection(url + "zen_category_TEST");
    let kpi_meta_model = connection.model('KPI_Meta', kpi_meta_schema, 'kpi_TEST');
    kpi_meta_model.find({name: 'Energy use'}, function (err, kpi_meta) {
        console.log(kpi_meta);
    })
}
 */