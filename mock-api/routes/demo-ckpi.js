const data = require("../mock-data/mock_ckpi_data");
const express = require('express');
const router = express.Router();
router.get('/', function(req, res, next) {
    res.json(data);
  });

module.exports = router;
