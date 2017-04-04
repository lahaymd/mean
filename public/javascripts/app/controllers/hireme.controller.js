(function() {
  angular.module('myApp')
    .controller('HireMeController', ['AuthService', '$scope', '$mdDialog', '$mdToast',  function(AuthService, $scope, $mdDialog, $mdToast) {
			$scope.hiremelist;
    
  var hired = function() {
        // $scope.showConfirm().
        // then(function(){ 
        // if($scope.status){
            AuthService.hire($scope.hiremelist.firstname,$scope.hiremelist.lastname,$scope.hiremelist.email,$scope.hiremelist.phone,$scope.hiremelist.message)
            .then(function (newUser) {
                    console.log('New',JSON.stringify(newUser));
                    $scope.hiremelist.push(newUser);
                    console.log('new user',newUser)
                    // alert($scope.hiremelist);
                    angular.element(document.querySelectorAll('input')).val('');
             
                }, function(error) {
                    alert(JSON.stringify($scope.hiremelist));
                    alert(error);
                })
                // .catch(function(error) {
                //   alert($scope.hiremelist);
                //   alert(error)
                // })
        // } //end of if block
        // })
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
      hired();
      $scope.openToast();
     angular.element(document.querySelectorAll('input')).val('');
    }, function(error) {
      alert(error);
    });
  };


  $scope.openToast = function($event) {
    $mdToast.show($mdToast.simple()
      .textContent('sent')
      .position('bottom')
      .hideDelay(10000)

      );
    // Could also do $mdToast.showSimple('Hello');
  };




			var fetchHired= function() {
                  AuthService.getHired()
                  .then(function(users) {
                    $scope.hiremelist = users;
                    console.log('users',users)
                  }, function(error) {
                    console.log(error)
                  })
                }

fetchHired();





		}])
})()