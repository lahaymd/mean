(function(){
  'use strict';





angular
    .module('myApp')
    .config(config);

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
          templateUrl: '/partials/selecteduser',
          controller: 'UserController'
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
          template: "<object data='/images/illustrator-resume.pdf' width='100%' height='100%'></object>"
        });
        
}

})();