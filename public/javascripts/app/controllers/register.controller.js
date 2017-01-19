(function(){
	angular.module('myApp').
		controller('RegisterController',
  ['$location', 'AuthService',
  function ($location, AuthService) {
    var vm = this;
    vm.registerForm = {};
    vm.register = function () {
      // call register from service
      AuthService.register(vm.registerForm.username, vm.registerForm.password)
        // handle success
        .then(function () {
          // vm.registerForm = data;
           vm.registerForm = {};
           $location.path('/users')
        })
        // handle error
        .catch(function (error) {
          alert(error)
        });
        // vm.registerForm = {};
    };
    
}])
})();