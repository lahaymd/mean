(function() {
	angular.module('myApp').
		controller('NavController', ['$mdSidenav', '$location', 'AuthService', '$mdDialog',  function($mdSidenav, $location, AuthService, $mdDialog) {
			var vm = this;
			// vm.isSidenavOpen= false;
			// vm.user
			
			 vm.showAdvanced = function(ev) {
					    $mdDialog.show({
					      controller: 'DialogController',
					      controllerAs: 'dialog',
					      templateUrl: '/partials/sign-up',
					      parent: angular.element(document.body),
					      targetEvent: ev,
					      clickOutsideToClose:true,
					      fullscreen: true// Only for -xs, -sm breakpoints.
					    })
					    .then(function(answer) {
					    	vm.userr = answer;
					    	// console.log('answer', answer)
					    	 // vm.userlist.push(answer);
					    	vm.getSession();
					    	// vm.saveToMongoLab();
					    	// vm.closeDialog();
					    	// alert('you anserwered' + answer)
					    	// console.log('you anserwered' + answer)
					    	vm.fetchMongoLab();
					      // $scope.status = 'You said the information was "' + answer + '".';
					    }, function(e) {
					    	// alert('you fucked up' + e)
					      // $scope.status = 'You cancelled the dialog.';
					    });
					  };





			vm.showSignIn = function(ev) {
					    $mdDialog.show({
					      controller: 'DialogController',
					      controllerAs: 'dialog',
					      templateUrl: '/partials/sign-in',
					      parent: angular.element(document.body),
					      targetEvent: ev,
					      clickOutsideToClose:true,
					      fullscreen: true// Only for -xs, -sm breakpoints.
					    })
					    .then(function(answer) {
					    	// alert('answer' + JSON.stringify(answer))
					    	console.log('answer', answer)
					    	vm.userr = answer;
					    	// var token = "xxx";
// localStorage.setItem("vm.user", vm.user);
// localStorage.getItem("vm.user"); //returns "xxx"
					    	 // vm.userlist.push(answer);
					    	vm.getSession();
					    	// vm.saveToMongoLab();
					    	// vm.closeDialog();
					    	// alert('you anserwered' + answer)
					    	// console.log('you anserwered' + answer)
					    	vm.fetchMongoLab();
					      // $scope.status = 'You said the information was "' + answer + '".';
					    }, function(e) {
					    	// alert('you fucked up' + e)
					      // $scope.status = 'You cancelled the dialog.';
					    });
					  };
					  



		 // vm.loginToMongoLab  = function () {
			// 	      // call login from service
			// 	      AuthService.findMongoLab(vm.loginForm.fuck, vm.loginForm.shit)
			// 	        // handle success
			// 	        .then(function (user) {
			// 	        	console.log('USER', user)
			// 	        	vm.user = user
			// 	        	// alert(user.fuck + 'userdata')
			// 	        	vm.getSession();
			// 	        })
			// 	        // handle error
			// 	        .catch(function (error) {
			// 	        	console.log(error)
			// 	        });
			// 	    };
			 

			//  vm.saveToMongoLab = function () {
			//       // $scope.isLoading= true;
			//       // call register from service
			//       AuthService.postToMongoLab(vm.userlist.fuck, vm.userlist.shit)
			//         // handle success
			//         .then(function (newUser) {
			//         	vm.getSession();
			//         	// alert('new user' + newUser)
			//           // console.log(newUser)
			//           // console.log('fuck:::' ,newUser.fuck)
			//           if(newUser.fuck === undefined) {
			//           	// alert('already in db')
			//           }
			//           vm.userlist.push(newUser);
			//       vm.getSession();
			//         })
			//         // handle error
			//         .catch(function (error) {
			//           // console.log(error)
			//         });
			//         // $scope.registerForm = {};
			//     };


			vm.fetchMongoLab= function() {
			                  AuthService.getMongoLab()
			                  .then(function(users) {
			                    vm.userlist = users;
			                    // console.log(users)
			                  }, function(error) {
			                    // console.log(error)
			                  })
			                }

			vm.fetchMongoLab();


			vm.logout = function () {

      // call logout from service
      AuthService.logout()
        .then(function () {
        	// alert('logged out')
        	vm.session = '';
        	vm.user = {};
          $location.path('/');
        });

    };

			vm.isLogged = function() {
				// console.log(AuthService.isLoggedIn())
			return	AuthService.isLoggedIn() 
			}

			vm.isLogged()

			vm.getSession = function () {
				AuthService.getSession()
					.then(function(session) {
						vm.session = session.authenticated
						// alert('session from NavController getSession ' + session.authenticated)
					}, function(error) {
						// alert('getSession error' + error)
					})
			}
			vm.getSession()

			vm.persistUser = function () {
				AuthService.getUser()
					.then(function(user) {
						vm.user = user
					})
			}

			vm.persistUser()







			


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
		controller('DialogController', ['AuthService','$scope', '$interval', '$window', '$mdDialog', '$location', function(AuthService, $scope, $interval, $window, $mdDialog, $location){
			var dialog = this
			dialog.closeDialog = function() {
      										$mdDialog.cancel();
    									}

    		dialog.saveToMongoLab = function () {
			      // $scope.isLoading= true;
			      // call register from service
			      AuthService.postToMongoLab(dialog.userlist.fuck, dialog.userlist.shit, dialog.userlist.files)
			        // handle success
			        .then(function (newUser) {
			        	// vm.getSession();
			        	// alert('new user from DialogController saveToMongoLab ' + newUser)
			          // console.log('new user data ' + newUser.data)
			          // console.log('fuck:::' ,newUser.fuck)
			          if(newUser.fuck === undefined) {alert('already in db')}
			          $mdDialog.hide(newUser)
			          // dialog.userlist.push(newUser);
			      // vm.getSession();
			        })
			        // handle error
			        .catch(function (error) {
			          // console.log(error)
			        });
			        // $scope.registerForm = {};
			    };


			    dialog.loginToMongoLab = function () {
				      // call login from service
				      AuthService.findMongoLab(dialog.loginForm.fuck, dialog.loginForm.shit)
				        // handle success
				        .then(function (user) {
				        	// alert('logged('User '+ JSON.stringify(user))
				        	console.log('USER', user)
				        	// vm.user = user
				        	// alert(user.fuck + 'userdata')
				        	// vm.getSession();
				        	$mdDialog.hide(user);
				        })
				        // handle error
				        .catch(function (error) {
				        	// console.log(error)
				        });
				    };



		}]).
		controller('LoginController', ['AuthService','$scope', '$interval', '$window', '$mdDialog', function(AuthService, $scope, $interval, $window, $mdDialog){

			var vm = this;
			vm.user = 'mik'
			 // vm.userlist = {};
			 // vm.loginForm ={};


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
// console.log('size', size)
// console.log('size2', size2)
// console.log('location', location)
// console.log('location2', location2)




			 angular.element($window).on('scroll', function() {
			 	didScroll = true;
			 	didS = true;
			 	$scope.$apply($interval(function() {
			 		if(didScroll && vm.isVisible ) {

        				didScroll = false;
        				// console.log('You scrolled');
						// console.log('scrollY', $window.scrollY);
// console.log('location', location)
// console.log('innerHeight', $window.innerHeight)						
						vm.sd = Math.round(  (location + size - ($window.scrollY + $window.innerHeight)) / 50)
						// console.log('sd', vm.sd)
    				}
	
    				if (didS && vm.isVis) {
    					didS = false;
						vm.scale = Math.round(  (location2 + size2 - ($window.scrollY + $window.innerHeight)) / 50)
						// vm.rad = Math.round(  (location2 + size2  - ($window.scrollY + $window.innerHeight))  )
						// console.log('scale', vm.scale)
						// console.log('scrollY', $window.scrollY);

						// vm.rad = Math.round(  (  $window.scrollY - (location - $window.innerHeight)) / 50)
    				}
		

	}, 500))




			 })


			 vm.addLogo = function() {
			 var el = document.querySelector('#b');
			 el.classList.add('logo-path')
			 // alert(1)
			}

			//  vm.lucy = 'jhljkhljkh'

			//  vm.demo = function() {alert(1)}

			//  vm.loginToMongoLab  = function () {
			// 	      // call login from service
			// 	      AuthService.findMongoLab(vm.loginForm.fuck, vm.loginForm.shit)
			// 	        // handle success
			// 	        .then(function (user) {
			// 	        	alert(user.fuck + 'userdata')
			// 	        	vm.getSession();
			// 	        })
			// 	        // handle error
			// 	        .catch(function (error) {
			// 	        	console.log(error)
			// 	        });
			// 	    };



				   




			 

			//  vm.saveToMongoLab = function () {
			//       // $scope.isLoading= true;
			//       // call register from service
			//       AuthService.postToMongoLab(vm.userlist.fuck, vm.userlist.shit)
			//         // handle success
			//         .then(function (newUser) {
			//         	// alert(newUser)
			//           // console.log(newUser)
			//           // console.log('fuck:::' ,newUser.fuck)
			//           if(newUser.fuck === undefined) {alert('already in db')}
			//           vm.userlist.push(newUser);
			//         })
			//         // handle error
			//         .catch(function (error) {
			//           console.log(error)
			//         });
			//         // $scope.registerForm = {};
			//     };


			// var fetchMongoLab= function() {
			//                   AuthService.getMongoLab()
			//                   .then(function(users) {
			//                     vm.userlist = users;
			//                     console.log(users)
			//                   }, function(error) {
			//                     console.log(error)
			//                   })
			//                 }

			// fetchMongoLab();


			// vm.logout = function () {

   //    // call logout from service
   //    AuthService.logout()
   //      // .then(function () {
   //      // 	// alert('logged out')
   //      //   // $location.path('/login');
   //      // });

   //  };

			// vm.isLogged = function() {
			// return	AuthService.isLoggedIn() 
			// }

			// vm.isLogged()

			// vm.getSession = function () {
			// 	AuthService.getSession()
			// 		.then(function(session) {
			// 			vm.session = session.authenticated
			// 			// alert(session)
			// 		}, function(error) {
			// 			// console.log(error)
			// 		})
			// }
			// vm.getSession()
			
		}])
		
})();