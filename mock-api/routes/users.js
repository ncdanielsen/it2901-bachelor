var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const user_schema = require('../schemas/user_schema');
const config = require('../config.json');
const jwt = require("jsonwebtoken")

// Connection URL
const url = config.DATABASE_URL;
const db_name = config.DATABASE_NAME;

//const user_model = mongoose.model('User', user_schema, 'users_TEST');
const user_model = require("../schemas/user_schema");

mongoose.connect(url + "zen_category_TEST", { useNewUrlParser: true });

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post("/login", function(req, res, next){
  user_model.find({ email: req.body.email })
    .exec()
    .then(user => {
        if (user.length < 1){
          return res.status(401).json({
            message: "Authentication failed"
          })
        }
        if(req.body.password == user[0].password){
          /*jwt.sign({
            userID: user[0]._id,
            email: user[0].email,
            superuser: user[0].superuser
            
          }
          //TODO legg til private key som argument
           )*/
          return res.status(200).json({
            message: "Authentication succsessful"
          })
        }
        res.status(401).json({
          message: "Authentication failed"
        })
    })
});


router.post('/signup', (req, res, next) => {
  user_model.find({ email: req.body.email })
    .exec()
    .then(user =>{
      
      if (user.length >= 1){
        return res.status(409).json({
          message: "Mail exists"
        });
      }
      else if(! req.body){
        return res.status(500).json({
          message: "Need to fill in mail and password"
        });
      }
      else{
        const user = new user_model({
          _id: new mongoose.Types.ObjectId(),
          email: req.body.email,
          password: req.body.password
        });
        user
          .save()
          .then(result => {
            console.log(result);
            res.status(201).json({
              message: "User successfully created"
            });
          })
          .catch(err => {
            console.log(err);
            res.status(500).json({
              error: err
            });
          });
      }
    })
});

router.post("/signin", (req, res, next) =>{
  
});

module.exports = router;
