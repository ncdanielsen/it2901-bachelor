const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const kpi_meta_schema = require('../schemas/kpi_meta_schema');
const kpi_cat_schema = require('../schemas/category_schema');
const neighbourhood_schema = require('../schemas/neighbourhood_schema');
const buildingkpi_schema = require("../schemas/buildingkpi_schema")
const neighbourhoodkpi_schema = require("../schemas/neighbourhoodkpi_schema")
const ckpi_schema = require("../schemas/ckpi_schema")
const rkpi_schema = require("../schemas/rkpi_schema")
const config = require('../config.json');

// Connection URL
const url = config.DATABASE_URL;
const db_name = config.DATABASE_NAME;

/**
 * @param: callback(kpi_meta). Function detailing what to to do with retrieved data.
 * @return: List of availiable from kpi
 */

class kpi_retriever {
    constructor(props) {
        this.connection = mongoose.createConnection(url + "zen_category_TEST");
        this.kpi_meta_model = this.connection.model('KPI Metadata', kpi_meta_schema, 'kpi_TEST');
        this.kpi_cat_model = this.connection.model('KPI Categories', kpi_cat_schema, 'kpi_cat_TEST');
        this.neighbourhood_model = this.connection.model('Neighbourhoods', neighbourhood_schema, 'neighborhoods_TEST');
        this.building_model = this.connection.model('Buildings', neighbourhood_schema, 'buildings_TEST');
        this.buildingkpi_model = this.connection.model("Building KPIs", buildingkpi_schema, "buildingkpi_TEST")
        this.neighbourhoodkpi_model = this.connection.model("Neighbourhood KPIs", neighbourhoodkpi_schema, "neighbourhoodkpi_TEST")
        this.ckpi_model = this.connection.model("Demo CKPIs", ckpi_schema, "CKPI_TEST")
        this.rkpi_model = this.connection.model("Demo RKPI", rkpi_schema, "RKPI_TEST")

    }


    retrieve_kpi_metadata(callback) {
        this.kpi_meta_model.find({}, function (err, kpi_meta) {
            callback(kpi_meta);
        })
    }

    retrieve_buildingkpi(buildingID, kpiID, callback) {
        this.buildingkpi_model.find({building_id: buildingID, kpi_id: kpiID}, function(err, buildingkpi) {
            callback(buildingkpi)
        })
    }

    retrieve_neighbourhoodkpi(neighbourhoodID, kpiID, callback ) {
        this.neighbourhoodkpi_model.find({neighbourhood_id: neighbourhoodID, kpi_id: kpiID}, function(err, buildingkpi) {
            callback(buildingkpi)
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


    retrieve_ckpi(callback) { 
        this.ckpi_model.find({}, function(err, ckpis) {
            callback(ckpis)
        })
    }

    retrieve_rkpi(callback) { 
        this.rkpi_model.find({}, function(err, rkpis) {
            callback(rkpis)
        })
    }

    retrieve_buildings(callback) {
        this.building_model.find({}, function (err, buildings) {
            callback(buildings);
        })
    }
}
module.exports = kpi_retriever;
