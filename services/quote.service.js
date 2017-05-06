var config = require('config.json');
var Q = require('q');
var axios = require('axios');

var service = {};

service.get = get;

module.exports = service;

function get(isbn13) {
    var deferred = Q.defer();

    console.log('Server service quote get');

    axios.request({
        url: 'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1'
    })
    .then(function (response) {
        console.log('Server service quote get sucess');
        deferred.resolve(response.data);
    })
    .catch(function (error) {
        console.log('Server service quote get failure');
        deferred.reject(error);
    });

    return deferred.promise;
}