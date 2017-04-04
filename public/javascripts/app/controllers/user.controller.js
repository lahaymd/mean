(function() {
	angular.module('myApp').
		controller('UserController', ['$scope', '$transition$', 'AuthService', '$location', '$window', '$mdDialog', '$state', '$timeout',  function($scope, $transition$, AuthService, $location, $window, $mdDialog, $state, $timeout ) {
// $scope.alertTransition = () => alert($transition$.params())
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

$scope.fetchUsers= function() {
                  AuthService.getUsers()
                  .then(function(users) {
                    console.log('users',users)
                    $scope.userlist = users;
                    $scope.userlistLength = users.length;
                    $scope.displayAmount = $scope.displayAmount || 3;
                    $scope.limit = Math.ceil($scope.userlistLength / $scope.displayAmount);
                    console.log(users)
                  }, function(error) {
                    console.log(error)
                  })
                }

$scope.fetchUsers();


$scope.showConfirm = function(ev) {
    
    

    $mdDialog.show({
               
                template: '<md-dialog ng-show="isLoading" id="plz_wait" style="background-color:transparent;box-shadow:none">' +
                            '<div layout="row" layout-sm="column" layout-align="center center" aria-label="wait">' +
                                '<md-progress-circular md-mode="indeterminate" ></md-progress-circular>' +
                            '</div>' +
                         '</md-dialog>',
                parent: angular.element(document.body),
                clickOutsideToClose:false,
                fullscreen: false
              }).then(function() {
      // $scope.isLoading = false;
    }, function(error) {
      alert(error);
    });
  };



 
  $scope.removeUser = function(id) {
                      console.log(id)
                      $scope.isLoading = true;
                              // $scope.showConfirm();
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

      // $scope.selectedUser = {};
      
   var refresh=  function(){ AuthService.find($transition$.params().id)
                      .then(function(user) {
                        $scope.selectedUser = user;
                        console.log(user,'!!')
                      }, function(error) {
                        console.log(error);
                      })
                  }

    refresh();


    $scope.scrollMe = function() {
      // var card = document.querySelector('md-card');
      // card.scrollIntoView(false)
      
      $timeout( function(){
      var uname = document.querySelector('#uname');
      uname.focus()
      }, 1500)
    }


      $scope.updateUser = function() {
        console.log('selected user',$scope.selectedUser)
        AuthService.update($scope.selectedUser)
          .then(function(x) {
            $state.go("^", null, { reload: true });
            $timeout( ()=>  {
            var table = document.getElementById('table')
            table.scrollIntoView();
              },100)
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