(function(){
  'use strict';





angular
    .module('myApp')
    .config(config)
    .run(function($rootScope, $transitions, $state, $mdToast, $location) {


   

    $transitions.onBefore({to:'*'}, function(trans){

   
      var myAuthService = trans.injector().get('AuthService');
      var foo = trans.$to().data.restricted;
   
      return myAuthService.getUserStatus()
        .then(function(response) {
          response = {status:true}
            // alert(JSON.stringify(response))
            // alert(JSON.stringify(myAuthService.getUser()))
            
            // alert(foo)
            // alert(myAuthService.isLoggedIn())
          if( (!myAuthService.isLoggedIn()) && (foo)) {
            // alert(2)
            myAuthService.showToast()
              return trans.router.stateService.target('login');
          }
          })

        
      })


    })

function config($stateProvider, $urlRouterProvider, $locationProvider) {
	       $urlRouterProvider.otherwise('/');
         $locationProvider.html5Mode(true);
    $stateProvider
       .state('home', {
          url: '/',
          templateUrl: '/partials/home',
           controller: 'LoginController',
            data: {restricted: false},
           controllerAs: 'vm'
        }).
       state('hireme', {
        url: '/hireme',
        // templateUrl: '/partials/hireme',
         data: {restricted: false},
        component: 'hireMeComponent',
        resolve: {
          hiremelist: function(AuthService) {
            return AuthService.getHired();
          }
        }
        // controller: 'HireMeController'
        // controllerAs: '$ctrl'
       }).
        state('canvas', {
          url: '/canvas',
          component: 'canvasComponent',
          data: {restricted: false}
        }).state('svg-filter', {
          url: '/svg-filter',
          component: 'svgFilterComponent',
          data: {restricted: false}
        }).
        state('gco', {
          url: '/gco',
           data: {restricted: false},
          component: 'gcoComponent'
        }).
        state('dashboard', {
          url: '/dashboard',
          // templateUrl: '/partials/dashboard',
          component: 'dashboardComponent',
           data: {restricted: false}
        }).
        state('svg', {
          url: '/svg',
          component: 'svgComponent',
           data: {restricted: false}
          // component: 'gcoComponent'
        }).
        state('users', {
          url: '/users',
          templateUrl: '/partials/users',
           data: {restricted: true},
          controller: 'UserController'
        }).
        state('users.detail', {
          url: '/:id',
          templateUrl: '/partials/selecteduser',
          controller: 'UserController',
          data: {restricted: true}
        }).
        state('register', {
          url: '/register',
          templateUrl: '/partials/register',
          controller: 'RegisterController',
           data: {restricted: true},
          controllerAs: 'vm'
        }).
        state('api', {
          url: '/api/user',
          templateUrl: '/partials/users',
           data: {restricted: true},
          controller: 'UserController'
        }).
        state('readerboard', {
          url: '/readerboard',
          templateUrl: '/partials/readerboard',
          controller: 'ReaderboardController',
           data: {restricted: false},
          controllerAs: 'vm'

        }).        
        state('pdf', {
          url: '/pdf',
          templateUrl: '/partials/pdf' ,
          data: {restricted: false}
        }).
        state('portfolio', {
          url: '/portfolio',
           data: {restricted: true},
          component: 'portfolio'
          // template: '<portfolio-component></portfolio-component>'
        });
        
}

})();
