var config = require('config.json');
var express = require('express');
var router = express.Router();
var service = require('services/quote.service');

// routes
router.get('/', getQuote);

module.exports = router;

function getQuote(req, res) {
    service.get()
        .then(function (quote) {
            if (quote) {
                res.send(quote);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}
