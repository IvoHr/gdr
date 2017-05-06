var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('shelves');

var service = {};

service.getAll = getAll;
service.get = getById;
service.create = create;
service.update = update;
service.delete = _delete;
service.addBook = addBook;
service.removeBook = removeBook;

module.exports = service;

function getById(_id) {
    var deferred = Q.defer();

    db.shelves.findById(_id, function (err, shelve) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (shelve) {
            // return shelve (without hashed password)
            deferred.resolve(_.omit(shelve, 'hash'));
        } else {
            // shelve not found
            deferred.resolve();
        }
    });

    return deferred.promise;
}

function getAll(userId) {
    console.log('Shelve service getAll for user [%s]', userId);
    var deferred = Q.defer();

    db.shelves.find({userId}).toArray(function (err, shelves) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        console.log('Shelve service getAll found [%s]', shelves.length);

        if (shelves) {
            // return shelves
            deferred.resolve(shelves);
        } else {
            // shelves not found
            deferred.resolve();
        }
    });

    return deferred.promise;
}

function create(userId, params) {
    var deferred = Q.defer();

    // validation
    db.shelves.findOne(
        { userId, name: params.name },
        function (err, shelve) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            if (shelve) {
                // shelvename already exists
                deferred.reject('Shelve with name "' + params.name + '" is already taken');
            } else {
                createShelve();
            }
        });

    function createShelve() {
        var shelve = params;
        shelve.userId = userId;

        db.shelves.insert(
            shelve,
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    }

    return deferred.promise;
}

function update(_id, params) {
    var deferred = Q.defer();

    // validation
    db.shelves.findById(_id, function (err, shelve) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (shelve.shelvename !== params.shelvename) {
            // shelvename has changed so check if the new shelvename is already taken
            db.shelves.findOne(
                { shelvename: params.shelvename },
                function (err, shelve) {
                    if (err) deferred.reject(err.name + ': ' + err.message);

                    if (shelve) {
                        // shelvename already exists
                        deferred.reject('Username "' + req.body.shelvename + '" is already taken')
                    } else {
                        updateUser();
                    }
                });
        } else {
            updateUser();
        }
    });

    function updateUser() {
        // fields to update
        var set = {
            firstName: params.firstName,
            lastName: params.lastName,
            shelvename: params.shelvename,
        };

        // update password if it was entered
        if (params.password) {
            set.hash = bcrypt.hashSync(params.password, 10);
        }

        db.shelves.update(
            { _id: mongo.helper.toObjectID(_id) },
            { $set: set },
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    }

    return deferred.promise;
}

function _delete(userId, _id) {
    var deferred = Q.defer();

    db.shelves.remove(
        { userId, _id: mongo.helper.toObjectID(_id) },
        function (err) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            deferred.resolve();
        });

    return deferred.promise;
}

function addBook(userId, shelveId, book) {
    console.log('Shelve service add book [%s] to shelve [%s]...', book.book_id, shelveId);
    var deferred = Q.defer();

    db.shelves.findOne({
        userId,
        _id: mongo.helper.toObjectID(shelveId)
    }, function (err, shelve) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (!shelve) {
            console.error('Shelve service unable to find shelve with id [%s] for user [%s]', shelveId, userId);
            return deferred.reject();
        }

        let updateShelve = {books: shelve.books || {}};

        console.log('Shelve service adding book...');

        updateShelve.books[book.isbn13] = book;

        db.shelves.update(
            { _id: mongo.helper.toObjectID(shelveId) },
            { $set: updateShelve },
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                console.log('Shelve service book added to shelve');

                deferred.resolve();
            }
        );
    });

    return deferred.promise;
}


function removeBook(userId, shelveId, bookId) {
    console.log('Shelve service remove book [%s] to shelve [%s]...', bookId, shelveId);
    var deferred = Q.defer();

    db.shelves.findOne({
        userId,
        _id: mongo.helper.toObjectID(shelveId)
    }, function (err, shelve) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (!shelve) {
            console.error('Shelve service unable to find shelve with id [%s] for user [%s]', shelveId, userId);
            return deferred.reject();
        }

        let updateShelve = {books: shelve.books || {}};

        console.log('Shelve service removing book...');

        delete updateShelve.books[bookId];

        db.shelves.update(
            { _id: mongo.helper.toObjectID(shelveId) },
            { $set: updateShelve },
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                console.log('Shelve service book added to shelve');

                deferred.resolve();
            }
        );
    });

    return deferred.promise;
}