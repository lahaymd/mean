(function(){
  'use strict';





angular
    .module('myApp')
    .config(config)
    .run(function($rootScope) {
      $rootScope.rs = '30 percent'
    })

function config($stateProvider, $urlRouterProvider, $locationProvider) {
	       $urlRouterProvider.otherwise('/');
         $locationProvider.html5Mode(true);
    $stateProvider
       .state('login', {
          url: '/',
          templateUrl: '/partials/login',
           controller: 'LoginController',
           controllerAs: 'vm'
        }).
       state('hireme', {
        url: '/hireme',
        templateUrl: '/partials/hireme',
        controller: 'HireMeController'
        // controllerAs: '$ctrl'
       }).
        state('users', {
          url: '/users',
          templateUrl: '/partials/users',
          controller: 'UserController'
        }).
        state('users.detail', {
          url: '/:id',
          templateUrl: '/partials/selecteduser'
          ,controller: 'UserController'
          ,parent: 'users'
        }).
        state('register', {
          url: '/register',
          templateUrl: '/partials/register',
          controller: 'RegisterController',
          controllerAs: 'vm'
        }).
        state('api', {
          url: '/api/user',
          templateUrl: '/partials/users',
          controller: 'UserController'
        }).
        state('readerboard', {
          url: '/readerboard',
          templateUrl: '/partials/readerboard',
          controller: 'ReaderboardController',
          controllerAs: 'vm'

        }).
        state('pdf', {
          url: '/pdf',
          templateUrl: '/partials/pdf' 
        }).
        state('portfolio', {
          url: '/portfolio',
          component: 'portfolio'
          // template: '<portfolio-component></portfolio-component>'
        });
        
}

})();
