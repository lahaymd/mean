(function() {
	angular.module('myApp').
		controller('NavController', ['$transitions','$mdSidenav', '$location', 'AuthService', '$mdDialog',  function($transitions,$mdSidenav, $location, AuthService, $mdDialog) {
			var vm = this;

			vm.initScope = function() {
			    $state.go('home');
			}


			vm.toggleNav = () => $mdSidenav('left').toggle();
			
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
					    	// console.log('answer', answer)
					    	vm.userr = answer;
					    	// var token = "xxx";
// localStorage.setItem(vm.userr, answer.files);
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




						vm.showUpdate = function(ev) {
					    $mdDialog.show({
					      controller: 'DialogController',
					      controllerAs: 'dialog',
					      templateUrl: '/partials/update',
					      parent: angular.element(document.body),
					      targetEvent: ev,
					      clickOutsideToClose:true,
					      fullscreen: true// Only for -xs, -sm breakpoints.
					    })
					    .then(function(answer) {
					    	// alert('answer' + JSON.stringify(answer))
					    	// console.log('answer', answer)
					    	vm.userr = answer;
					    	// var token = "xxx";
// localStorage.setItem(vm.userr, answer.files);
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


			vm.getUser= function() {
			                  AuthService.getUser()
			                  .then(function(users) {
			                    // vm.userlist = users;
			                    vm.userr= users
			                    // alert('vm.getuser ' + JSON.stringify(users))
			                    // console.log(users)
			                  }, function(error) {
			                    // console.log(error)
			                  })
			                }

			vm.getUser();


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
						// alert('session from NavController getSession ' + JSON.stringify(session))
					}, function(error) {
						// alert('getSession error' + error)
					})
			}
			vm.getSession()

		



$transitions.onSuccess({to:'*'}, function(trans,state,foo){
			// console.log(trans.router.globals.current.name)
			// console.log('state',state)
			// console.log('foo',foo)
			var $state = trans.router.globals.current.name;
			console.log($state);
			if( ($state != 'hireme') && ($state != 'home') && ($state !== 'pdf')){
				console.log('beep');
				vm.currentNavItem = '';

			}
			
		
			// if($state){}
			vm.currentNavItem = $location.path().slice(1) || 'home';
			console.log('current nav item',vm.currentNavItem)

})
	
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
				        	// alert('logged User' + JSON.stringify(user))
				        	// console.log('USER', user)
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

				    


				    dialog.updateToMongoLab = function () {
				      // call login from service
				      AuthService.updateMongoLab(dialog.updateMe.fuck, dialog.updateMe.shit, dialog.updateMe.files)
				        // handle success
				        .then(function (user) {
				        	// alert('logged User' + JSON.stringify(user))
				        	// console.log('USER', user)
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
		controller('LoginController', ['AuthService','$scope', '$interval', '$window', '$mdDialog', '$document', function(AuthService, $scope, $interval, $window, $mdDialog, $document){

			// var vm = this;
			//     var top = 400;
		 //    var duration = 2000; //milliseconds

		 //    //Scroll to the exact position
		 //    $document.scrollTop(top, duration).then(function() {
		 //      console && console.log('You just scrolled to the top!');
		 //    });

		 //    var offset = 30; //pixels; adjust for floating menu, context etc
		 //    //Scroll to #some-id with 30 px "padding"
		 //    //Note: Use this in a directive, not with document.getElementById 
		 //    var someElement = angular.element(document.getElementById('some-id'));
		 //    $document.scrollToElement(someElement, offset, duration);
// 			vm.user = 'mik'
// 			 // vm.userlist = {};
// 			 // vm.loginForm ={};


// 			 vm.scale = 15;
// 			 vm.sd = 15;
// 			 vm.rad = 0;

// 			 // angular.element($window).on('resize', function(){
// 			 // 	$window.scrollTo(0, 0);
// 			 // 	vm.scale = 0;
// 			 // vm.sd = 0;
// 			 // vm.rad = 0;
// 			 // })
// 			 var didScroll = false;
// 			 var didS = false;
// 			 // vm.isVisible= true;

// 			 var getElemDistance = function ( elem ) {
//     var location = 0;
//     if (elem.offsetParent) {
//         do {
//             location += elem.offsetTop;
//             elem = elem.offsetParent;
//         } while (elem);
//     }
//     return location >= 0 ? location : 0;
// };
// var elem = document.querySelector('#blurredimg');
// var location = getElemDistance( elem );
// var elem2 = document.querySelector('#pica');
// var location2 = getElemDistance(elem2);
// var size = elem.clientHeight;
// var size2 = elem2.clientHeight;
// // console.log('size', size)
// // console.log('size2', size2)
// // console.log('location', location)
// // console.log('location2', location2)




// 			 angular.element($window).on('scroll', function() {
// 			 	didScroll = true;
// 			 	didS = true;
// 			 	$scope.$apply($interval(function() {
// 			 		if(didScroll && vm.isVisible ) {

//         				didScroll = false;
//         				// console.log('You scrolled');
// 						// console.log('scrollY', $window.scrollY);
// // console.log('location', location)
// // console.log('innerHeight', $window.innerHeight)						
// 						vm.sd = Math.round(  (location + size - ($window.scrollY + $window.innerHeight)) / 50)
// 						// console.log('sd', vm.sd)
//     				}
	
//     				if (didS && vm.isVis) {
//     					didS = false;
// 						vm.scale = Math.round(  (location2 + size2 - ($window.scrollY + $window.innerHeight)) / 50)
// 						// vm.rad = Math.round(  (location2 + size2  - ($window.scrollY + $window.innerHeight))  )
// 						// console.log('scale', vm.scale)
// 						// console.log('scrollY', $window.scrollY);

// 						// vm.rad = Math.round(  (  $window.scrollY - (location - $window.innerHeight)) / 50)
//     				}
		

// 	}, 500))




// 			 })


// 			 vm.addLogo = function() {
// 			 var el = document.querySelector('#b');
// 			 el.classList.add('logo-path')
// 			 // alert(1)
// 			}


			
		}])
		
})();