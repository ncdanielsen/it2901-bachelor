const express = require('express');
const router = express.Router();
const KPI_Retreiver = require('../utilities/kpi_retriever');
const retriever = new KPI_Retreiver();
router.get('/', function(req, res, next) {
    retriever.retrieve_ckpi(data => {
      res.json(data)
    });
  });

module.exports = router;
