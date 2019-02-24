const MongoClient = require('mongodb').MongoClient;
// const assert = require('assert');
const mongoose = require('mongoose');
const kpi_meta_schema = require('../schemas/kpi_meta_schema');

// Connection URL
const url = 'mongodb://localhost:27017/';

function write_metadata(){
    MongoClient.connect(url, function(err, client){
        //assert.equal(null, err);

        let db = client.db("zen_category_TEST");

        let KPI_META = [
            {
                name: "Energy need",
                unit: "kWh/m2",
                type: "float",
                timeseries: true,
                description: "Energy need of building"
            },{
                name: "Energy use",
                unit: "kWh",
                type: "float",
                timeseries: true,
                description: "Amount of energy used"
            },{
                name: "Delivered energy",
                unit: "kWh",
                type: "float",
                timeseries: true,
                description: "Amount of energy delivered to grid (?)"
            },{
                name: "Exported energy",
                unit: "kWh",
                type: "float",
                timeseries: true,
                description: "Amount of energy which is exported (?)"
            },{
                name: "Self consumption",
                unit: "float",
                type: "float",
                timeseries: true,
                description: "Percent of energy generated locally which is also consumed locally."
            },{
                name: "Self generation",
                unit: "kWh",
                type: "float",
                timeseries: true,
                description: "Amount of energy consumed locally which is also generated locally. "
            }
        ];

        let collection_name = "kpi_TEST";

        db.collection(collection_name).insertMany(KPI_META, function(err, res) {
            if (err) throw err;
            console.log("Number of documents inserted: " + res.insertedCount);
            client.close();
        });
    })
}

function get_kpi_metadata(){
    let connection = mongoose.createConnection(url + "zen_category_TEST");
    let kpi_meta_model = connection.model('KPI_Meta', kpi_meta_schema, 'kpi_TEST');
    kpi_meta_model.find({}, function (err, kpi_meta) {
        console.log(kpi_meta);
    })
}

//write_metadata();
get_kpi_metadata();

/*
class beverageRetriever{
        constructor(){
            let connection = mongoose.createConnection('mongodb://localhost:27017/vinmonopolet');
            this.Beverage = connection.model('Beverage', beverageSchema, 'sortiment');
        }

    getAllFromDB(callback){
        this.Beverage.find( {},
        function (err, beverages) {
            callback(beverages)
        });
    }

}
 */