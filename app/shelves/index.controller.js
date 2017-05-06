(function () {
    'use strict';

    angular
        .module('app')
        .controller('Shelves.IndexController', Controller);

    function Controller($window, $location, ShelveService, FlashService) {
        var vm = this;

        vm.create = create;
        vm.delete = deleteShelve;
        vm.removeBook = removeBook;

        initController();

        function initController() {
            getAll();
        }

        function create() {
            console.log('Controller shelves create...');
            ShelveService.Create(vm.shelve)
                .then(function () {
                    $location.path('/shelves');
                    FlashService.Success('Shelve created');
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }

        function deleteShelve(_id) {
            console.log('Controller shelves delete...');
            ShelveService.Delete(_id)
                .then(function () {
                    FlashService.Success('Shelve deleted');
                    getAll();
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }

        function getAll() {
            console.log('Controller shelves getAll...');
            ShelveService.GetAll()
                .then(function (data) {
                    vm.shelves = data;
                    console.log('SHELVES', data)
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }

        function removeBook(_id, bookId) {
            console.log('Controller shelves remove book [%s] from shelve [%s]...', bookId, _id);
            ShelveService.RemoveBook(_id, bookId)
                .then(function () {
                    FlashService.Success('Book was removed from shelve');
                    getAll();
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }

    }

})();