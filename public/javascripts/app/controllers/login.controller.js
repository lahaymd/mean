(function() {
	angular.module('myApp').
		controller('NavController', ['$mdSidenav', '$location',  function($mdSidenav, $location ) {
			var vm = this;
			// vm.isSidenavOpen= false;

			


			vm.currentNavItem = $location.path().slice(1) || 'login';
			console.log('current nav item',vm.currentNavItem)


	
		vm.open= function() {
			$mdSidenav('left').toggle();
			}
		
	}]).
		controller('SidenavController', ['$mdSidenav', function($mdSidenav){
			var $ctrl = this;
			$ctrl.toggleNav = () => $mdSidenav('left').toggle();
			
		}]).
		controller('LoginController', ['AuthService','$scope', '$interval', '$window', function(AuthService, $scope, $interval, $window){

			var vm = this;
			 vm.userlist = {};


			 vm.scale = 15;
			 vm.sd = 15;
			 vm.rad = 0;

			 // angular.element($window).on('resize', function(){
			 // 	$window.scrollTo(0, 0);
			 // 	vm.scale = 0;
			 // vm.sd = 0;
			 // vm.rad = 0;
			 // })
			 var didScroll = false;
			 var didS = false;
			 // vm.isVisible= true;

			 var getElemDistance = function ( elem ) {
    var location = 0;
    if (elem.offsetParent) {
        do {
            location += elem.offsetTop;
            elem = elem.offsetParent;
        } while (elem);
    }
    return location >= 0 ? location : 0;
};
var elem = document.querySelector('#blurredimg');
var location = getElemDistance( elem );
var elem2 = document.querySelector('#pica');
var location2 = getElemDistance(elem2);
var size = elem.clientHeight;
var size2 = elem2.clientHeight;
console.log('size', size)
console.log('size2', size2)
console.log('location', location)
console.log('location2', location2)




			 angular.element($window).on('scroll', function() {
			 	didScroll = true;
			 	didS = true;
			 	$scope.$apply($interval(function() {
			 		if(didScroll && vm.isVisible ) {

        				didScroll = false;
        				console.log('You scrolled');
						console.log('scrollY', $window.scrollY);
console.log('location', location)
console.log('innerHeight', $window.innerHeight)						
						vm.sd = Math.round(  (location + size - ($window.scrollY + $window.innerHeight)) / 50)
						console.log('sd', vm.sd)
    				}
	
    				if (didS && vm.isVis) {
    					didS = false;
						vm.scale = Math.round(  (location2 + size2 - ($window.scrollY + $window.innerHeight)) / 50)
						// vm.rad = Math.round(  (location2 + size2  - ($window.scrollY + $window.innerHeight))  )
						console.log('scale', vm.scale)
						console.log('scrollY', $window.scrollY);

						// vm.rad = Math.round(  (  $window.scrollY - (location - $window.innerHeight)) / 50)
    				}
		

	}, 500))




			 })


			 vm.addLogo = function() {
			 var el = document.querySelector('#b');
			 el.classList.add('logo-path')
			 alert(1)
			}

			 vm.lucy = 'jhljkhljkh'

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
			
		}])
		
})();