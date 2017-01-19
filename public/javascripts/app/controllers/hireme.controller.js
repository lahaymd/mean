(function() {
	angular.module('myApp')
		.controller('HireMeController', ['AuthService', '$scope', '$mdDialog', '$mdToast',  function(AuthService, $scope, $mdDialog, $mdToast) {
		$scope.checkboxModel = false;

    $scope.propertyName = 'firstname';

    $scope.lists = ['firstname', 'lastname', 'email', 'phone', 'message']

    $scope.sortBy = function(property) {

      $scope.propertyName = property;
      // return property;
    }

  



  $scope.showConfirm = function(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.confirm()
          .title('Would you like to submit form?')
          .textContent('press ok to submit press cancel to cancel')
          .ariaLabel('Lucky day')
          .targetEvent(ev)
          .ok('submit!')
          .cancel('cancel');

    $mdDialog.show(confirm).then(function() {
      // $scope.status = true;
      $scope.hired();
      $scope.openToast();
    }, function() {
     angular.element(document.querySelectorAll('input')).val('');
    });
  };


  $scope.openToast = function($event) {
    $mdToast.show($mdToast.simple()
      .textContent('sent')
      .position('bottom')

      );
    // Could also do $mdToast.showSimple('Hello');
  };

			$scope.hiremelist = {};



			var fetchHired= function() {
                  AuthService.getHired()
                  .then(function(users) {
                    $scope.hiremelist = users;
                    console.log(users)
                  }, function(error) {
                    console.log(error)
                  })
                }

fetchHired();


			$scope.hired = function() {
        // $scope.showConfirm().
        // then(function(){ 
        // if($scope.status){
    				AuthService.hire($scope.hiremelist.firstname,$scope.hiremelist.lastname,$scope.hiremelist.email,$scope.hiremelist.phone,$scope.hiremelist.message)
    				.then(function (newUser) {
              			// alert(JSON.stringify(newUser));
              			$scope.hiremelist.push(newUser);
              			// alert($scope.hiremelist);
              			angular.element(document.querySelectorAll('input')).val('');
             
            		})
            		.catch(function(error) {
            			alert($scope.hiremelist);
            			alert(error)
            		})
        // } //end of if block
        // })
			}


		}])
})()