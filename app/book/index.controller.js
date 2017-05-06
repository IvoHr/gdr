(function () {
    'use strict';

    angular
        .module('app')
        .controller('Book.IndexController', Controller);

    function Controller($stateParams, BookService, FlashService) {
        var vm = this;

        vm.book = null;

        console.log(arguments)

        initController();

        function initController() {
            BookService.Get($stateParams.book)
                .then(function (data) {
                    console.log('Books controller get Success', data);
                    vm.book = data.data[0];
                }).catch(function (data) {
                    FlashService.Error(data);
                });
        }

        function searchBook(q, page) {
            console.log('Angular searchBook [%s] page [%s]', vm.book.q, page);
            vm.searching = true;
            BookService.Search(vm.book.q, page)
                .then(function (data) {
                    console.log('Books controller search Success', data);
                    vm.searchResult = data;
                    data.current_page = parseInt(data.current_page);

                    data.pages = {
                        prev: {disabled: true},
                        next: {disabled: true},
                        list: []
                    };

                    data.pages.prev.number = Math.max(data.current_page - 1, 1);
                    data.pages.prev.disabled = data.current_page < 2;

                    data.pages.next.number = Math.min(data.current_page + 1, data.page_count);
                    data.pages.next.disabled = data.current_page > data.page_count;

                    let pageRangeStart = data.current_page - 2 > 0 ? data.current_page - 2 : 1; 
                    let pageRangeEnd = pageRangeStart + 4 < data.page_count ? pageRangeStart + 4 : data.page_count; 

                    for (let z = pageRangeStart; z <= pageRangeEnd; z++) {
                        data.pages.list.push({
                            number: z,
                            active: data.current_page == z
                        });
                    }

                    // FlashService.Success('Book found', data);
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }
    }

})();