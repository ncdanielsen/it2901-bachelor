const express = require('express');
const router = express.Router();

const KPI_Retreiver = require('../utilities/kpi_retriever');
const retriever = new KPI_Retreiver();

router.get('/buildingID/:buildingID/kpiID/:kpiID', function (req, res, err) {
    retriever.retrieve_buildingkpi(parseInt(req.params.buildingID), parseInt(req.params.kpiID), (data) => {
        res.json(data);
    });
});

module.exports = router;