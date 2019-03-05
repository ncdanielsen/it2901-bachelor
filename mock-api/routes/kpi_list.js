/*
    More tutorial:
    What happens here: First, we import express and express.router.

    Then, we assign a string and function to a particular route. While you don't have to think too much about it,
    this is the common callback-pattern in javascript. We're essentially passin a function as a argument.

    In the function, we can use the req (short for "request") to get properties of the request. Likewise, res ("Response")
    gives access to the possible methods to respond. The one which is most impart to us is res.json({...]); This will
    send a JSON as a response.

    err ("Error") might be null. If not null, an error has occured.
 */
const express = require('express');
const router = express.Router();

const retrieve_kpi_metadata = require('../utilities/kpi_retriever');

// Binds the /-link to a function. The function simply uses a utility function with a callback to send the DB-data as JSON
router.get('/', function (req, res, err) {
    retrieve_kpi_metadata(function (kpi) {
        res.json(kpi);
    });
});

module.exports = router;