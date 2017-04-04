;(function(){
	angular.module('myApp').
		controller('ShowUserController', ['$scope', '$stateParams', 'AuthService', function($scope, $stateParams, AuthService) {
      // $scope.selectedUser = {};
     
      
   var refresh=  function(){ AuthService.find($stateParams.id)
                      .then(function(user) {
                        $scope.selectedUser = user;
                        console.log(user,'!!!')
                      }, function(error) {
                        console.log(error);
                      })
                  }

    refresh();


    // var fetchUsers= function() {
    //               AuthService.getUsers()
    //               .then(function(users) {
    //                 $scope.userlist = users;
    //               }, function(error) {
    //                 console.log(error)
    //               })
    //             }

      $scope.updateUserx = function() {
        console.log($scope.selectedUser)
        AuthService.update($scope.selectedUser)
          .then(function() {
            console.log('updated from controller')
              // fetchUsers();
          }, function(error) {
            console.log('you fucked up')
            console.log(error.message)
          })
      }

}])
})();