var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const config = require('../config.json');
const jwt = require("jsonwebtoken")
const check_token = require("../middleware/check_token_validity")
const check_auth = require("../middleware/check_auth")
const multer = require("multer");
const upload = multer({dest: "uploads/csv"});
const csv = require("fast-csv");
const fs = require("fs");
const kpi_meta_schema = require('../schemas/kpi_meta_schema');

const rkpi_model = require("../schemas/rkpi_schema");
const kpi_meta_model = mongoose.model('KPI Metadata', kpi_meta_schema, 'kpi_TEST');

// Connection URL
const url = config.DATABASE_URL;
const db_name = config.DATABASE_NAME;

router.get('/', function(req, res, next) {
    res.send('Hello World');
  });

router.post("/rkpi", upload.single("file"), async function(req, res, next){
    const fileRows = [];
    csv.fromPath(req.file.path)
            .on("data", async function(data) {
                fileRows.push(data);
            })
            .on("end", async function(){
                fs.unlinkSync(req.file.path);
                
            })
    await sleep(1000);
    
    let correctFormat = await check_format(fileRows);
    
    await sleep(1000);

    if(correctFormat == true){
        const rkpi = new rkpi_model({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            created: new Date(),
            last_updated: new Date(),
            access_type: req.body.access_type,
            owner: req.userData.ID,
            description: req.body.description,
            values: fileRows
        });
        rkpi
            .save()
            .then(result => {
                console.log(result);
                res.status(201).json({
                  message: "File succesfully uploaded"
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                  error: err
                });
              });
    
    }
    else{
        res.status(400).json({
            message: "Wrong Format"
    })
    }
    
    
});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

async function check_format(fileRows){
    let correctFormat = true;
    await kpi_meta_model.find()
        .select("name")
        .exec()
        .then(kpi => {
            const kpiList = [];
            kpi.forEach(kpiMap => {
                let kpiObject = kpiMap.toObject();
                kpiList.push(kpiObject.name);
            });
            for(i = 1; i < fileRows.length; i++){
                if(!kpiList.includes(fileRows[i][0].split(";")[0])){
                    correctFormat = false;
                }
            }
            
            
        })
    return correctFormat;
}

  module.exports = router;