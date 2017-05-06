(function () {
    'use strict';

    angular
        .module('app', ['ui.router'])
        .config(config)
        .run(run);

    function config($stateProvider, $urlRouterProvider) {
        // default route
        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'home/index.html',
                controller: 'Home.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'home' }
            })
            .state('account', {
                url: '/account',
                templateUrl: 'account/index.html',
                controller: 'Account.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'account' }
            })
            .state('books', {
                url: '/books',
                templateUrl: 'books/index.html',
                controller: 'Books.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'books' }
            })
            .state('book', {
                url: '/books/view/:book',
                templateUrl: 'book/index.html',
                controller: 'Book.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'book' }
            })
            .state('shelves', {
                url: '/shelves',
                templateUrl: 'shelves/index.html',
                controller: 'Shelves.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'shelves' }
            })
            .state('shelves/create', {
                url: '/shelves/create',
                templateUrl: 'shelves/create.html',
                controller: 'Shelves.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'shelves' }
            })
            .state('shelves/edit', {
                url: '/shelves/edit/:_id',
                templateUrl: 'shelves/edit.html',
                controller: 'Shelves.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'shelves' }
            });
    }

    function run($http, $rootScope, $window) {
        // add JWT token as default auth header
        $http.defaults.headers.common['Authorization'] = 'Bearer ' + $window.jwtToken;

        // update active tab on state change
        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            $rootScope.activeTab = toState.data.activeTab;
        });
    }

    // manually bootstrap angular after the JWT token is retrieved from the server
    $(function () {
        // get JWT token from server
        $.get('/app/token', function (token) {
            window.jwtToken = token;

            angular.bootstrap(document, ['app']);
        });
    });
})();