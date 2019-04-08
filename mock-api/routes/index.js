var express = require('express');
var router = express.Router();

const KPI_Retreiver = require('../utilities/kpi_retriever');
const retriever = new KPI_Retreiver();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/neighbourhoods', function (req, res, err) {
  retriever.retrieve_neighbourhoods((data) => {
      res.json(data);
  })
});

router.get('/buildings', function (req, res, err) {
  retriever.retrieve_buildings((data) => {
      res.json(data);
  })
});

module.exports = router;
