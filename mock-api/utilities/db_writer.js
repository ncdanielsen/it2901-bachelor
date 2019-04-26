/*
Utility to write database data by running the various functions below.
Data is found in ../mock-data/*.json , which is imported in the functions and written to the database.

The following imports are done:
    MongoClient: Send data to DB
    mongoose: Read data from DB
        In mongoose, we also have to use Schemas to read the correct data.
    config: Get correct URL to database.

Writing to database is demonstrated in the function write_to_DB(...).

Reading from the database is shown in async_get_kpi_metadata(item).

 */

const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const config = require('../config.json');


// Connection URL etc
const url = config.DATABASE_URL;
const db_name = config.DATABASE_NAME;

var ObjectID = require("mongodb").ObjectID;

const KPI_LIST = require('../mock-data/kpi-list.json');
const BUILDING_KPIS = require("../mock-data/buildingkpi.json")
const NEIGHBOURHOOD_KPIS = require("../mock-data/neighbourhoodkpi.json")
const DEMOCKPI = require("../mock-data/mock_ckpi_data")
const DEMORKPI = require("../mock-data/mock_rkpi_data")

/*
    Sending data to database:
    First, we use the MongoClient library to create a connection object. Note that url is specified outside the functions,
    as a variable for all the functions below.

    The MongoClient takes in a function as a callback upon creating the connection, at which point we can run our code.

    From there, it's a simple matter of selecting database, and calling insertMany (or insertOne).
    Once inserted, a callback is used to log the number of inserted documents, and then close the client.

    NOTE: This does NOT prevent duplicates! Inserting 10 documents 3 times will give 30 documents. Use the mongo client
    in your terminal to wipe any collections before re-inserting data.
 */

function write_to_DB(collection, json_data) {
    MongoClient.connect(url, function (err, client) {
        //assert.equal(null, err);

        let db = client.db(db_name);

        db.collection(collection).insertMany(json_data, function (err, res) {
            if (err) throw err;
            console.log("Number of documents inserted: " + res.insertedCount);
            client.close();
        });
    })
}

function writeNewRKPI(entry) {
    write_to_DB("RKPI_TEST", [entry])
}

function updateCKPI(entry) {
    MongoClient.connect(url, function (err, client) {
        let db = client.db(db_name);

        db.collection("CKPI_TEST").updateOne({ "_id": ObjectID(entry._id) }, {
            $set: {
                "description": entry.description, "created": entry.created, "lastUpdated": entry.lastUpdated,
                "name": entry.name, "values": entry.values
            }
        }, function (err, res) {
            if (err) throw err;
            console.log("1 document updated");
            client.close();
        });
    })
}

function updateRKPI(entry) {
    MongoClient.connect(url, function (err, client) {
        let db = client.db(db_name);

        db.collection("RKPI_TEST").updateOne({ "_id": ObjectID(entry._id) }, {
            $set: {
                "name": entry.name, "created": entry.created, "lastUpdated": entry.lastUpdated, "owner": entry.owner, "description": entry.description, "values": entry.values
            }
        }, function (err, res) {
            if (err) throw err;
            console.log("1 document updated");
            client.close();
        });
    })
}


function write_demo_ckpi() {
    write_to_DB("CKPI_TEST", DEMOCKPI)
}

function write_demo_rkpi() {
    write_to_DB("RKPI_TEST", DEMORKPI)
}

function write_kpi_list() {
    write_to_DB("kpi_TEST", KPI_LIST);
}

function write_building_KPIs() {
    write_to_DB("buildingkpi_TEST", BUILDING_KPIS)
}

function write_neighbourhood_KPIs() {
    write_to_DB("neighbourhoodkpi_TEST", NEIGHBOURHOOD_KPIS)
}

function write_buildings() {
    let buildings = require('../mock-data/buildings.json');

    write_to_DB("buildings_TEST", buildings);
}

async function async_get_from_database(item, collection, model_name, schema) {
    let connection = mongoose.createConnection(url + db_name);
    let kpi_meta_model = connection.model(model_name, schema, collection);

    let result = await kpi_meta_model.find(item).exec();

    connection.close();

    return result;
}

async function write_categories() {

    let categories = require('../mock-data/kpi_cat_children_names');
    let kpi_schema = require('../schemas/kpi_meta_schema');
    await write_container_items(categories, "name", "kpi_names", "kpi_cat_TEST",
        "kpi_TEST", kpi_schema);
}

async function write_neighborhoods() {
    let neighborhoods = require('../mock-data/neighborhood_building_names');
    let building_schema = require('../schemas/building_schema');
    await write_container_items(neighborhoods, "name", "buildings", "neighborhoods_TEST",
        "buildings_TEST", building_schema);
}


async function write_container_items(containers, container_identifier, child_identifier, container_collection, child_collection,
    child_schema) {
    let containers_list = [];

    for (let i = 0; i < containers.length; i++) {
        let category = containers[i];
        let name = category[container_identifier];
        let children = category[child_identifier];

        let child_list = [];

        for (let j = 0; j < children.length; j++) {
            let child_data = await async_get_from_database({ "name": children[j] }, child_collection, 'Child', child_schema);
            let id = child_data[0];
            child_list.push(id);
        }

        containers_list.push({
            [container_identifier]: name,
            [child_identifier]: child_list
        })
    }

    console.log(containers_list);

    MongoClient.connect(url, function (err, client) {
        let db = client.db(db_name);
        let collection_name = container_collection;
        db.collection(collection_name).insertMany(containers_list, function (err, res) {
            if (err) throw err;
            console.log("Number of documents inserted into " + container_collection + ": " + res.insertedCount);
            client.close();
        });
    })
}

// function add_children_to_category(callback){
//     const category_data = require('../mock-data/kpi_cat_children_names');
//     const kpi_data = require('../mock-data/kpi-list');
//
//
// }

function json_to_list(json_list, category) {
    let list = [];
    for (let j = 0; j > json_list.length; j++) {
        list.push(json_list[j][category]);
    }
    console.log(list);

}


// running this script clears and re-inits db

function clearAll() {
    MongoClient.connect(url, function (err, client) {
        if (err) throw err;
        client.db(db_name).dropDatabase();
        client.close();
    });
}

if (require.main === module) {
    const functions = [clearAll, write_kpi_list, write_buildings, write_categories, write_neighborhoods, write_building_KPIs, write_neighbourhood_KPIs, write_demo_ckpi, write_demo_rkpi];
    let i = 0;
    function timeout() {
        setTimeout(function () {
            functions[i]();
            i++;
            i < functions.length && timeout();
        }, 1000); // NB bad practice, but timeouts work for now to ensure the data is inserted when needed later on
    }
    timeout();
}


//module.exports.writeNewKPI = writeNewKPI;
module.exports.updateRKPI = updateRKPI;
module.exports.updateCKPI = updateCKPI;

