(function () {
    'use strict';

    angular
        .module('app')
        .controller('Home.IndexController', Controller);

    function Controller(UserService, QuoteService) {
        var vm = this;

        vm.user = null;
        vm.quote = null;

        initController();

        function initController() {
            // get current user
            UserService.GetCurrent().then(function (user) {
                vm.user = user;
            });

            // QuoteService.GetQuote().then(function (quote) {
            //     try {
            //         vm.quote = quote[0];
            //     } catch(e) {
            //         console.error('Unable to get quote');
            //         console.error(e);
            //     }
            // });
        }
    }

})();