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
		controller('LoginController', ['AuthService','$scope', '$window', function(AuthService, $scope, $window){

			var vm = this;
			 vm.userlist = {};

			 vm.scale = 0;
			 vm.sd = 0;

			 var didScroll = false;
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
var elem = document.querySelector('#visible-img');
var location = getElemDistance( elem );
console.log('location', location)



			 angular.element($window).on('scroll', function() {

			 	didScroll = true;

			 	

			 	$scope.$apply(setInterval(function() {
			 		if(didScroll && vm.isVisible ) {
        didScroll = false;
        console.log('You scrolled');
	console.log('scrollY', window.scrollY);
	console.log('scale', vm.scale)
	console.log('sd', vm.sd)
	var a = document.getElementById('visible-img');
	var rect = a.getBoundingClientRect();
	console.log('rect',rect.top)
			vm.scale = Math.round(  (  window.scrollY - (location - window.innerHeight)) / 10)
			vm.sd = Math.round(  (  window.scrollY - (location - window.innerHeight)) / 10)
    }
	

		

	}, 500))




			 })



// var didScroll = false;

// window.onscroll = doThisStuffOnScroll;

// function doThisStuffOnScroll() {
//     didScroll = true;
// }

// setInterval(function() {
//     if(didScroll) {
//         didScroll = false;
//         console.log('You scrolled');
//     }
// }, 100);






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