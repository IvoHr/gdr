var config = require('config.json');
var express = require('express');
var router = express.Router();
var service = require('services/book.service');

// routes

router.post('/search', getSearchBooks);
router.post('/get', getBook);

module.exports = router;

function getSearchBooks(req, res) {
    console.log('Server getSearchBooks [%s] page [%s]', req.body.q, req.body.page);
    service.search(req.body.q, req.body.page)
        .then(function (books) {
            if (books) {
                console.log('Found books');
                res.send(books);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getBook(req, res) {
    console.log('Server getBook [%s] page [%s]', req.body.isbn13);
    service.get(req.body.isbn13)
        .then(function (result) {
            if (result) {
                console.log('Found book');
                res.send(result);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}