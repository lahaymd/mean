angular.module('myApp')
	.component('hireMeComponent', {
        require: 'ngModel',
		bindings: {
          hiremelist: '='
        },
		templateUrl: '/partials/hireme',
		controller:  hireMeController
	})




function hireMeController(AuthService,  $mdDialog, $mdToast) {
      // $ctrl.hiremelist = {}
var $ctrl = this;
			
  var hired = function() {
        // $ctrl.showConfirm().
        // then(function(){ 
        // if($ctrl.status){
            AuthService.hire($ctrl.hiremelist.firstname,$ctrl.hiremelist.lastname,$ctrl.hiremelist.email,$ctrl.hiremelist.phone,$ctrl.hiremelist.message)
            .then(function (newUser) {
                    console.log('New',JSON.stringify(newUser));
                    $ctrl.hiremelist.push(newUser);
                    console.log('new user',newUser)
                    // alert($ctrl.hiremelist);
                    angular.element(document.querySelectorAll('input')).val('');
             
                }, function(error) {
                    alert(JSON.stringify($ctrl.hiremelist));
                    alert(error);
                })
                // .catch(function(error) {
                //   alert($ctrl.hiremelist);
                //   alert(error)
                // })
        // } //end of if block
        // })
      }
  



  $ctrl.showConfirm = function(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.confirm()
          .title('Would you like to submit form?')
          .textContent('press ok to submit press cancel to cancel')
          .ariaLabel('Lucky day')
          .targetEvent(ev)
          .ok('submit!')
          .cancel('cancel');

    $mdDialog.show(confirm).then(function() {
      // $ctrl.status = true;
      hired();
      $ctrl.openToast();
     angular.element(document.querySelectorAll('input')).val('');
    }, function(error) {
      alert(error);
    });
  };


  $ctrl.openToast = function($event) {
    $mdToast.show($mdToast.simple()
      .textContent('sent')
      .position('bottom')
      .hideDelay(10000)

      );
    // Could also do $mdToast.showSimple('Hello');
  };




// 			var fetchHired= function() {
//                   AuthService.getHired()
//                   .then(function(users) {
//                     console.log('users',users)
//                     $ctrl.hiremelist = users;
//                   }, function(error) {
//                     console.log(error)
//                   })
//                 }

// fetchHired();





		}

