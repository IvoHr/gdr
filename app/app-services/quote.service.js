(function () {
    'use strict';

    angular
        .module('app')
        .factory('QuoteService', Service);

    function Service($http, $q) {
        var service = {};

        service.GetQuote = GetQuote;

        return service;

        function GetQuote() {
            return $http.get('/api/quote').then(handleSuccess, handleError);
        }

        // private functions

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(res) {
            return $q.reject(res.data);
        }
    }

})();
