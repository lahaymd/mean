(function(){
  'use strict';





angular
    .module('myApp')
    .config(config)
    .run(function($rootScope, $transitions, $state, $mdToast, $location) {
      // $transitions.onBefore({ to:'hireme'}, function(trans){
      //   var myAuthService = trans.injector().get('AuthService');
      //   return myAuthService.isLoggedIn();
      // })
      // $rootScope.rs = '30 percent'

//       $transitions.onStart( { to: 'users.*' }, function(MyAuthService, $state) {
//   // If the user is not authenticated
//   if (!MyAuthService.isAuthenticated()) {

//     // Then return a promise for a successful login.
//     // The transition will wait for this promise to settle
//     return MyAuthService.authenticate().catch(function() {

//       // Redirect to a state that we know doesn't require auth.
//       return $state.target("guest");
//     });
//   }
// });
    $transitions.onBefore({to:'*'}, function(trans){
      // alert(11)
      var myAuthService = trans.injector().get('AuthService');
      var foo = trans.$to().data.restricted;
        // alert('foo' +foo)
        // alert('isslogged' + myAuthService.isLoggedIn())
      //   return foo;
      
      // if(foo && !myAuthService.isLoggedIn() ) {
      //   return trans.router.stateService.target('login');
      // }
       //      if(!myAuthService.getUserStatus() ){
       //    return trans.router.stateService.target('login');
       // }
      // if(!myAuthService.getUserStatus().$$state.status  ){
      //  console.log('no session son' +JSON.stringify(myAuthService.getUserStatus().$$state.status) )          
      //  return trans.router.stateService.target('login');
      //  } 

      // if(foo && !myAuthService.getUserStatus() ){
      //   alert(1)
      //   myAuthService.showToast()
      //     return trans.router.stateService.target('login');


      //  }
      return myAuthService.getUserStatus()
        .then(function(response) {
          //response = {status:true}
            // alert(JSON.stringify(response))
            // alert(foo)
            // alert(myAuthService.isLoggedIn())
          if( (!myAuthService.isLoggedIn()) && (foo)) {
            // alert(2)
            myAuthService.showToast()
              return trans.router.stateService.target('login');
          }
          })
      
          
            
          // if(foo && !myAuthService.isLoggedIn()){
          //   alert(2)
          //   myAuthService.showToast()
          //     return trans.router.stateService.target('login');
          // }
          // myAuthService.getUserStatus()
          //   .then( function(){

          // if(foo && !myAuthService.isLoggedIn()){
          //   // alert(3)
          //   // console.log(myAuthService.isLoggedIn())
          //      // myAuthService.showToast()
          //     $location.path('/');
          //      alert(4)
          //     // return trans.router.stateService.target('login');
          //     // return trans.router.stateService.target('login');
          // }
              
          //   })
            
      
        
      })


    })

function config($stateProvider, $urlRouterProvider, $locationProvider) {
	       $urlRouterProvider.otherwise('/');
         $locationProvider.html5Mode(true);
    $stateProvider
       .state('login', {
          url: '/',
          templateUrl: '/partials/login',
           controller: 'LoginController',
            data: {restricted: false},
           controllerAs: 'vm'
        }).
       state('hireme', {
        url: '/hireme',
        // component: 'hireMeComponent',
        templateUrl: '/partials/hireme',
         data: {restricted: false},
        controller: 'HireMeController'
        // controllerAs: '$ctrl'
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
           data: {restricted: true},
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
