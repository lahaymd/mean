(function() {
	angular.module('myApp').
		controller('UserController', ['$scope', '$stateParams', 'AuthService', '$location', '$window',  function($scope, $stateParams, AuthService, $location, $window ) {

 // $scope.userlist = {};
// $scope.displayAmount = 3;
$scope.numbers = [];

for(var i =1; i <= 100; i++){
  $scope.numbers.push(i)
}

 $scope.displayPagination =function(idx) {
  // fetchUsers();
   // alert(idx);
   if(idx === 0){$scope.begin = 0}
   $scope.begin = idx  * $scope.displayAmount
    
 }



 $scope.lists = ['username', 'id', 'password']

    $scope.sortBy = function(property) {

      $scope.propertyName = property;
      // return property;
    }

    $scope.limitDisplayedTo = function(prop) {
             $scope.displayAmount = prop;
             $scope.limit = Math.ceil($scope.userlistLength / $scope.displayAmount);
           }

var fetchUsers= function() {
                  AuthService.getUsers()
                  .then(function(users) {
                    $scope.userlist = users;
                    $scope.userlistLength = users.length;
                    $scope.displayAmount = $scope.displayAmount || 3;
                    $scope.limit = Math.ceil($scope.userlistLength / $scope.displayAmount);
                    console.log(users)
                  }, function(error) {
                    console.log(error)
                  })
                }

fetchUsers();



 
  $scope.removeUser = function(id) {
                      console.log(id)
                      $scope.isLoading = true;
                          AuthService.remove(id)
                            .then(function(user) {
                              console.log(user);
                              console.log($scope.userlist)
                              console.log(id);
                              var index = $scope.userlist.findIndex(x=> x._id == id);
                              $scope.userlist.splice(index,1);
                              $scope.userlistLength = $scope.userlist.length;
                              $scope.limit = Math.ceil($scope.userlistLength / $scope.displayAmount);
                              console.log('promise returned');
                              $scope.isLoading= false;
                            
                            })
                            
                        }


  $scope.test = 'testing link function'

      $scope.selectedUser = {};
      
   var refresh=  function(){ AuthService.find($stateParams.id)
                      .then(function(user) {
                        $scope.selectedUser = user;
                        console.log(user,'!!')
                      }, function(error) {
                        console.log(error);
                      })
                  }

    refresh();


      $scope.updateUser = function() {
        console.log($scope.selectedUser)
        AuthService.update($scope.selectedUser)
          .then(function(x) {
            var index= $scope.userlist.findIndex(x=> x._id == $scope.selectedUser._id)
            console.log(index)
            console.log(x);
            console.log('updated from controller')
            $window.location.reload();

              // $scope.userlist.splice(index, 1, $scope.selectedUser);
              $location.path('/users');

          }, function(error) {
            console.log('you fucked up')
            console.log(error.message)
          })
      }


$scope.register = function () {
      $scope.isLoading= true;
      // call register from service
      AuthService.register($scope.userlist.username, $scope.userlist.password)
        // handle success
        .then(function (newUser) {
          console.log(newUser)
          $scope.userlist.push(newUser);
          $scope.userlistLength = $scope.userlist.length;
          $scope.limit = Math.ceil($scope.userlistLength / $scope.displayAmount);
          angular.element(document.querySelectorAll('input')).val('');
          $scope.isLoading= false;
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


  
}])
})();