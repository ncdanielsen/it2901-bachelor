const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const kpi_meta_schema = require('../schemas/kpi_meta_schema');
const kpi_cat_schema = require('../schemas/category_schema');
const neighbourhood_schema = require('../schemas/neighbourhood_schema');
const config = require('../config.json');

// Connection URL
const url = config.DATABASE_URL;
const db_name = config.DATABASE_NAME;

/**
 * @param: callback(kpi_meta). Fucntion deatiling what to to do with retrieved data.
 * @return: List of availiable from kpi
 */

class kpi_retriever {
    constructor(props) {
        this.connection = mongoose.createConnection(url + "zen_category_TEST");
        this.kpi_meta_model = this.connection.model('KPI Metadata', kpi_meta_schema, 'kpi_TEST');
        this.kpi_cat_model = this.connection.model('KPI Categories', kpi_cat_schema, 'kpi_cat_TEST');
        this.neighbourhood_model = this.connection.model('Neighbourhoods', neighbourhood_schema, 'neighbourhood_TEST');

    }


    retrieve_kpi_metadata(callback) {
        this.kpi_meta_model.find({}, function (err, kpi_meta) {
            callback(kpi_meta);
        })
    }


    retrieve_kpi_categories(callback) {
        this.kpi_cat_model.find({})
            .populate('KPI Metadata')
            .exec((err, cat) => {
                callback(cat);
            })
    }

    retrieve_neighbourhoods(callback) {
        this.neighbourhood_model.find({}, function (err, neighbourhoods) {
            callback(neighbourhoods);
        })
    }
}
module.exports = kpi_retriever;
