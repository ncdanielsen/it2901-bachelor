const express = require('express');
const router = express.Router();
const KPI_Retreiver = require('../utilities/kpi_retriever');
const retriever = new KPI_Retreiver();
const kpiUpdater = require("../utilities/kpi_updater");
const updater = new kpiUpdater();

const validate = (jsonData) => {
  if (jsonData.hasOwnProperty("name") && jsonData.hasOwnProperty("values") && jsonData.hasOwnProperty("description") && jsonData.hasOwnProperty("created") &&
    jsonData.hasOwnProperty("lastUpdated")) {
    return true
  }
  return false
}
router.get('/', function (req, res, next) {
  retriever.retrieve_ckpi(data => {
    res.json(data)
  });
});

router.post("/", function (req, res) {
  if (validate(req.body)) {
    updater.addNewCKPI(req.body)
    res.send("200")
  }
  else {
    res.send("Wrong data format")
  }
})

router.put("/", function (req, res) {
  if (validate(req.body)) {
    updater.updateCKPI(req.body)
    res.send("200")
  }
  else {
    res.send("Wrong data format")
  }
})

module.exports = router;
