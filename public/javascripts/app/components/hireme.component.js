angular.module('myApp')
	.component('hireMeComponent', {
        require: 'ngModel',
		// bindings: {
  //         hiremelist: '<'
  //       },
		templateUrl: '/partials/hireme',
		controller: ['AuthService', '$mdDialog', '$mdToast', hireMeController]
	})




function hireMeController(AuthService,  $mdDialog, $mdToast) {
			// this.hiremelist = {}
			
  var hired = function() {
        // this.showConfirm().
        // then(function(){ 
        // if(this.status){
            AuthService.hire(this.hiremelist.firstname,this.hiremelist.lastname,this.hiremelist.email,this.hiremelist.phone,this.hiremelist.message)
            .then(function (newUser) {
                    console.log('New',JSON.stringify(newUser));
                    this.hiremelist.push(newUser);
                    console.log('new user',newUser)
                    // alert(this.hiremelist);
                    angular.element(document.querySelectorAll('input')).val('');
             
                }, function(error) {
                    alert(JSON.stringify(this.hiremelist));
                    alert(error);
                })
                // .catch(function(error) {
                //   alert(this.hiremelist);
                //   alert(error)
                // })
        // } //end of if block
        // })
      }
  



  this.showConfirm = function(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.confirm()
          .title('Would you like to submit form?')
          .textContent('press ok to submit press cancel to cancel')
          .ariaLabel('Lucky day')
          .targetEvent(ev)
          .ok('submit!')
          .cancel('cancel');

    $mdDialog.show(confirm).then(function() {
      // this.status = true;
      hired();
      this.openToast();
     angular.element(document.querySelectorAll('input')).val('');
    }, function(error) {
      alert(error);
    });
  };


  this.openToast = function($event) {
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
//                     this.hiremelist = users;
//                   }, function(error) {
//                     console.log(error)
//                   })
//                 }

// fetchHired();





		}

