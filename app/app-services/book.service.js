(function () {
    'use strict';

    angular
        .module('app')
        .factory('BookService', Service);

    function Service($http, $q) {
        var service = {};

        service.Search = Search;
        service.Get = Get;
    
        return service;

        function Search(q, page) {
            console.log('Book service search [%s] page [%s]', q, page);
            return $http.post('/api/books/search', {q, page}).then(handleSuccess, handleError);
        }

        function Get(isbn13) {
            console.log('Book service get [%s]', isbn13);
            return $http.post('/api/books/get', {isbn13}).then(handleSuccess, handleError);
        }
        
        // private functions

        function handleSuccess(res) {
            console.log('Book service success', res);
            return res.data;
        }

        function handleError(res) {
            console.log('Book service failure', res);
            return $q.reject(res.data);
        }
    }

})();
