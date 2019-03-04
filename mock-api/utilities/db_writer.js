const MongoClient = require('mongodb').MongoClient;
// const assert = require('assert');
const mongoose = require('mongoose');
const kpi_meta_schema = require('../schemas/kpi_meta_schema');
const config = require('../config.json');

// Connection URL
const url = config.DATABASE_URL;
const db_name = config.COLLECTION_NAME;

const KPI_LIST = require('../mock-data/kpi-list.json');
const kpi_category_child_names = require('../mock-data/kpi_cat_children_names.json');

function write_to_DB(collection, json_data) {
    MongoClient.connect(url, function(err, client){
        //assert.equal(null, err);

        let db = client.db(db_name);

        db.collection(collection).insertMany(json_data, function(err, res) {
            if (err) throw err;
            console.log("Number of documents inserted: " + res.insertedCount);
            client.close();
        });
    })
}

function write_kpi_list(){
    write_to_DB("kpi_TEST", KPI_LIST);
}

function get_kpi_metadata(item = {}){
    let connection = mongoose.createConnection(url + "zen_category_TEST");
    let kpi_meta_model = connection.model('KPI_Meta', kpi_meta_schema, 'kpi_TEST');
    kpi_meta_model.find({item}, function (err, kpi_meta) {
        console.log(kpi_meta);
    })
}

function write_buildings(){
    let buildings = require('../mock-data/buildings.json');

    write_to_DB("buildings_TEST", buildings);
}

async function async_get_kpi_metadata(item){
    let connection = mongoose.createConnection(url + "zen_category_TEST");
    let kpi_meta_model = connection.model('KPI_Meta', kpi_meta_schema, 'kpi_TEST');

    let result = await kpi_meta_model.find(item).exec();

    connection.close();

    return result;
    // kpi_meta_model.find({item}, function (err, kpi_meta) {
    //     console.log(kpi_meta);
    // })
}

async function write_categories(){
    let categories = []

    for (i = 0; i < kpi_category_child_names.length; i++){
        let category = kpi_category_child_names[i];
        let name = category["name"];
        let children = category["kpi_names"];

        let id_list=[];

        for (j=0; j < children.length; j++){
            //console.log(children[j]);
            let kpi_meta = await async_get_kpi_metadata({"name": children[j]});
            let id = kpi_meta[0]["_id"];
            id_list.push(id);
        }

        categories.push({
            name: name,
            children: id_list
        })
    }

    MongoClient.connect(url, function(err, client){

        let db = client.db(db_name);

        let collection_name = "kpi_cat_TEST";

        db.collection(collection_name).insertMany(categories, function(err, res) {
            if (err) throw err;
            console.log("Number of documents inserted: " + res.insertedCount);
            client.close();
        });
    })

}



function json_to_list(jsonlist, category){
    let list = [];
    for (j in jsonlist){
        // console.log(jsonlist[j]);
        list.push(jsonlist[j][category]);
    }
    console.log(list);

}

//write_kpi_list();
//get_kpi_metadata();
//json_to_list(kpi_category_child_names, "name");
//write_categories();

//async_get_kpi_metadata({name: "Energy use"});

// write_buildings();