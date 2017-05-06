(function () {
    'use strict';

    angular
        .module('app')
        .factory('ShelveService', Service);

    function Service($http, $q) {
        var service = {};

        service.GetAll = GetAll;
        service.GetById = GetById;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;
        service.AddBook = AddBook;
        service.RemoveBook = RemoveBook;

        return service;

        function GetAll() {
            return $http.get('/api/shelves').then(handleSuccess, handleError);
        }

        function GetById(_id) {
            return $http.get('/api/shelves/' + _id).then(handleSuccess, handleError);
        }

        function Create(data) {
            console.log('Service shelve create...');
            return $http.post('/api/shelves', data).then(handleSuccess, handleError);
        }

        function Update(data) {
            return $http.put('/api/shelves/' + data._id, data).then(handleSuccess, handleError);
        }

        function Delete(_id) {
            return $http.delete('/api/shelves/' + _id).then(handleSuccess, handleError);
        }

        function AddBook(_id, book) {
            return $http.post('/api/shelves/' + _id + '/addBook', book).then(handleSuccess, handleError);
        }

        function RemoveBook(_id, bookId) {
            return $http.delete('/api/shelves/' + _id + '/removeBook/' + bookId).then(handleSuccess, handleError);
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
