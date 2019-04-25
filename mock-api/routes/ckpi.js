const express = require('express');
const router = express.Router();
const KPI_Retreiver = require('../utilities/kpi_retriever');
const retriever = new KPI_Retreiver();
const kpiAdder = require("../utilities/rkpi_updater");
const adder = new kpiAdder();

const validate = (jsonData) => {
  if (jsonData.hasOwnProperty("name") && jsonData.hasOwnProperty("values")) {
    return true
  }
  return false
}
router.get('/', function(req, res, next) {
    retriever.retrieve_ckpi(data => {
      res.json(data)
    });
  });

router.post("/", function(req, res) {
  if (validate(req.body)) {
    adder.addNewKPI(req.body)
    res.send("200")
  }
  else {
    res.send("Wrong data format")
  }
})
module.exports = router;
