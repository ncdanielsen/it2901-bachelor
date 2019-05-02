var express = require('express');
var router = express.Router();

const check_token = require("../middleware/check_token_validity")
const check_auth = require("../middleware/check_auth")

const KPI_Retreiver = require('../utilities/kpi_retriever');
const retriever = new KPI_Retreiver();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/neighbourhoods', check_token, function (req, res, err) {
  retriever.retrieve_neighbourhoods((data) => {
      res.json(data);
  })
});

router.get('/buildings', check_token, function (req, res, err) {
  
  retriever.retrieve_buildings((data) => {
      res.json(data);
  })
});

module.exports = router;
