const data = require("../mock-data/mock_rkpi_data");
const express = require('express');
const router = express.Router();
router.get('/', function(req, res, next) {
    res.json(data);
  });

module.exports = router;
