var config = require('config.json');
var express = require('express');
var router = express.Router();
var service = require('services/shelve.service');

// routes
router.post('/', createShelve);
router.post('/:_id/addBook', addBook);
router.delete('/:_id/removeBook/:bookId', removeBook);
router.get('/', getAll);
router.put('/:_id', updateShelve);
router.delete('/:_id', deleteShelve);

module.exports = router;

function createShelve(req, res) {
    service.create(req.user.sub, req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getAll(req, res) {
    console.log('Shelves controller getAll...');
    service.getAll(req.user.sub)
        .then(function (shelves) {
            if (shelves) {
                res.send(shelves);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function updateShelve(req, res) {
    var userId = req.user.sub;
    if (req.params._id !== userId) {
        // can only update own account
        return res.status(401).send('You can only update your own account');
    }

    service.update(userId, req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function deleteShelve(req, res) {
    service.delete(req.user.sub, req.params._id)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function addBook(req, res) {
    service.addBook(req.user.sub, req.params._id, req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function removeBook(req, res) {
    service.removeBook(req.user.sub, req.params._id, req.params.bookId)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}