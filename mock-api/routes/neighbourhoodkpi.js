const express = require('express');
const router = express.Router();

const KPI_Retreiver = require('../utilities/kpi_retriever');
const retriever = new KPI_Retreiver();

router.get('/:neighbourhoodID-:kpiID', function (req, res, err) {
    retriever.retrieve_neighbourhoodkpi(parseInt(req.params.neighbourhoodID), parseInt(req.params.kpiID), (data) => {
        res.json(data);
    });
});

module.exports = router;