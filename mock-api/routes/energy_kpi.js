const express = require('express');
const router = express.Router();

router.get('/', function (req, res, err) {
    let args = req.query;
    console.log(args);

    res.json({
        args
    });
});

//localhostblabla/energy/kpi

module.exports = router;