const KPI_Retreiver = require("../utilities/kpi_retriever");
const retriever = new KPI_Retreiver();

const express = require("express");
const router = express.Router();

const kpiUpdater = require("../utilities/kpi_updater");
const updater = new kpiUpdater();

const validate = (jsonData) => {
  if (jsonData.hasOwnProperty("lastUpdated") && jsonData.hasOwnProperty("owner") && jsonData.hasOwnProperty("created") &&
  jsonData.hasOwnProperty("description") && jsonData.hasOwnProperty("values") && jsonData.hasOwnProperty("name")){
    return true 
  }
  return false
}

router.get("/", function(req, res, next) {
  retriever.retrieve_rkpi(data => {
    res.json(data);
  });
});

router.post("/", function(req, res) {
  if (validate(req.body)) {
    adder.addNewKPI(req.body);
    res.send("200");
  } else {
    res.send("The JSON specified has the wrong format.");
  }
});

router.put("/", function(req, res) {
  if (validate(req.body)) {
    updater.updateRKPI(req.body)
    res.send("200")
  }
  else {
    res.send("Wrong data format")
  }
})

module.exports = router;