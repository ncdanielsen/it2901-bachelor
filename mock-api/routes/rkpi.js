const KPI_Retreiver = require('../utilities/kpi_retriever');
const retriever = new KPI_Retreiver();
const express = require('express');
const router = express.Router();
router.get('/', function(req, res, next) {
  retriever.retrieve_rkpi(data => {
    res.json(data)
  });
});


module.exports = router;