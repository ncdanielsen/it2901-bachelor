var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const config = require('../config.json');
const jwt = require("jsonwebtoken")
const check_token = require("../middleware/check_token_validity")
const check_auth = require("../middleware/check_auth")

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
          const payload = {
            ID: user[0]._id,
            email: user[0].email,
            superuser: user[0].superuser,
            admin: user[0].admin
          }
          // Uses HS256 algorithm. "secret" is the private key. Expires in 1 hour after creation
          const token = jwt.sign(payload, "secret", { expiresIn: '1h' })
          return res.status(200).json({
            message: "Authentication succsessful",
            token: token
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
          message: "Email exists"
        });
      }
      else if(! req.body){
        
        return res.status(400).json({
          message: "Need to fill in Email and password"
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


router.post("/profile", check_token, (req, res, next)=>{
  user_model.find({ _id: req.userData.ID })
    .exec()
    .then(user => {
      if(user.length > 0){
        res.json({
          _id: req.userData.ID,
          email: req.userData.email,
          superuser: req.userData.superuser,
          admin: req.userData.admin
        })
      }
      else{
        return res.status(401).json({
          message: "Authorisation failed!"
        });
      }
    })
  
});

router.delete("/delete/:userID", check_token, (req, res, next)=>{
  user_model.find({ email: req.userData.email })
    .exec()
    .then(user => {
      if(user.length > 0){
        if((req.userData.ID == req.params.userID) || (req.userData.admin == true)){
          user_model.remove({ _id: req.params.userID })
            .exec()
            .then(
              res.status(200).json({
                message: "Deletion Successful"
              })
            ) 
        }
        else{
          return res.status(401).json({
            message: "Authorisation failed!"
          });
        }
      }
      else{
        return res.status(401).json({
          message: "Authentication failed!"
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
    });
  });
});

module.exports = router;
