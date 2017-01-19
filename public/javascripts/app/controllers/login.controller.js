(function() {
	angular.module('myApp').
		controller('NavController', ['$mdSidenav', '$location',  function($mdSidenav, $location ) {
			var vm = this;
			// vm.isSidenavOpen= false;

			



			vm.currentNavItem = $location.path().slice(1) || 'login';
			console.log(vm.currentNavItem)


	
		vm.open= function() {
			$mdSidenav('left').toggle();
			}
		
	}]).
		controller('SidenavController', ['$mdSidenav', function($mdSidenav){
			var $ctrl = this;
			$ctrl.toggleNav = () => $mdSidenav('left').toggle();
			
		}]).
		controller('LoginController', ['AuthService', function(AuthService){

			var vm = this;
			 vm.userlist = {};

			 vm.demo = function() {alert(1)}
			 

			 vm.saveToMongoLab = function () {
			      // $scope.isLoading= true;
			      // call register from service
			      AuthService.postToMongoLab(vm.userlist.fuck)
			        // handle success
			        .then(function (newUser) {
			          console.log(newUser)
			          vm.userlist.push(newUser);
			          // angular.element(document.querySelectorAll('input')).val('');
			          // $scope.isLoading= false;
			          // $scope.registerForm = data;
			           // $scope.userlist = {};
			           // $location.path('/users')
			        })
			        // handle error
			        .catch(function (error) {
			          alert(error)
			        });
			        // $scope.registerForm = {};
			    };


			var fetchMongoLab= function() {
			                  AuthService.getMongoLab()
			                  .then(function(users) {
			                    vm.userlist = users;
			                    console.log(users)
			                  }, function(error) {
			                    console.log(error)
			                  })
			                }

			fetchMongoLab();
			
		}]).
		controller('ModalController', ['$mdDialog', function($mdDialog) {
			var ctrl = this;

			ctrl.showAlert = function(event) {
			$mdDialog.show(
		      	$mdDialog.alert()
		        .parent(angular.element(document.querySelector('#popupContainer')))
		        .clickOutsideToClose(true)
		        .title('This is an alert title')
		        .textContent('You can specify some description text in here.')
		        .ariaLabel('Alert Dialog Demo')
		        .ok('Got it!')
		        .targetEvent(event)
		    );
		}
	}])
		
})();