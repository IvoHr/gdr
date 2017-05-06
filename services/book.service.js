var config = require('config.json');
var _ = require('lodash');
var Q = require('q');
var rp = require('request-promise');
var axios = require('axios');

var service = {};

service.search = search;
service.get = get;
module.exports = service;

function search(q, page) {
    var deferred = Q.defer();

    console.log('Server service book search for [%s] page [%s]', q, page);

    axios.request({
    	url: 'http://isbndb.com/api/v2/json/' + config.isbndbKey + '/books',
    	params: {
    		q: q,
    		page: page
    	}
	})
    .then(function (response) {
    	console.log('Server service book search sucess');
    	deferred.resolve(response.data);
    })
    .catch(function (error) {
    	console.log('Server service book search failure');
        deferred.reject(error);
    });

    return deferred.promise;
}

function get(isbn13) {
    var deferred = Q.defer();

    console.log('Server service book get for [%s]', isbn13);

    axios.request({
    	url: 'http://isbndb.com/api/v2/json/' + config.isbndbKey + '/book/' + isbn13
	})
    .then(function (response) {
    	console.log('Server service book get sucess');
    	deferred.resolve(response.data);
    })
    .catch(function (error) {
    	console.log('Server service book get failure');
        deferred.reject(error);
    });

    return deferred.promise;
}
