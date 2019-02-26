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
            },
            /* Power Kpi's start here. */
            {
                name: "Yearly net load profile", 
                unit: "kW",
                type: "float",
                timeseries: true,
                description: "The yearly net power load profiles",
            },{
                name: "Net load duration curve", 
                unit: "kW",
                type: "float",
                timeseries: true,
                description: "Curve of the net load duration",
            },{
                name: "Peak load", 
                unit: "kW",
                type: "float",
                timeseries: true,
                description: "Peak power load",
            },{
                name: "Peak export", 
                unit: "kW",
                type: "float",
                timeseries: true,
                description: "Peak power exported",
            },{
                name: "Utilisation factor", 
                unit: "percentage",
                type: "float",
                timeseries: true,
                description: "Percantage power utilised",
            },{
                name: "Daily net load profile", 
                unit: "kW",
                type: "float",
                timeseries: true,
                description: "The daily net power load profile",
            },
            /* Emmision kpi's start here. */
            {
                name: "Total gas emissions", 
                unit: "tCO_2eq",
                type: "float",
                timeseries: false,
                description: "The total amount of gas emissions",
            },{
                name: "Total gas emissions pr. m^2", 
                unit: "tCO_2eq/m^2/year",
                type: "float",
                timeseries: false,
                description: "The total amount of gas emmisions per square meter each year.",
            },{
                name: "Greenhouse gas emissions", 
                unit: "percentage", //(% reduction compared to base case)
                type: "float",
                timeseries: true,
                description: "Percentage of gas emission reduction compared to base case",
            },
            /* Economy kpi's start here */
            {
                name: "Life cycle cost", 
                unit: "NOK",
                type: "float",
                timeseries: true,
                description: "The cost of the building for each of its life cycles.",
            },{
                name: "Life cycle cost pr. m^2", 
                unit: "NOK/m^2 heated floor area/year",
                type: "float",
                timeseries: true,
                description: "The cost of the building for each of its life cycles per square meters of heated floors.",
            },
            /* Mobility kpi's start here */
            {
                name: "Mode of transport", 
                unit: "percentage",
                type: "float",
                timeseries: false,
                description: "The percentage of people who choose different means of transport.",
            },{
                name: "Acesss to public transport", 
                unit: "Meters",
                type: "float",
                timeseries: false,
                description: "How good the access is to public transportation such as busses and trains.",
            },
            /* Spatial Quality kpi's start here */
            {
                name: "Demographic needs", 
                unit: "Qualitative",
                type: "String",
                timeseries: false,
                description: "Other qualitative needs",
            },{
                name: "Number of services, facilities and amenities", 
                unit: "No. of amenities",
                type: "float",
                timeseries: false,
                description: "Amount of public services and amenities there are in the vicinity.",
            },{
                name: "Meters from services, facilities and amenities", 
                unit: "Meters",
                type: "float",
                timeseries: false,
                description: "How far away public services and amenities are.",
            },{
                name: "Public space", 
                unit: "Qualitative",
                type: "String",
                timeseries: false,
                description: "Amount of space available for public use.",
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
    kpi_meta_model.find({name: 'Energy use'}, function (err, kpi_meta) {
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