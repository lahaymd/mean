angular.module('myApp')
	.controller('ExampleController',  function($scope, $mdToast){
		$scope.date = new Date();
		$scope.ctrlName = 'foo';
		$scope.ctrlFlavor = 'cherry';
		$scope.isDisabled= true;
		$scope.saySomething= function() {alert('say something!')}
		$scope.someMethod = function(blah) {
			alert(blah)
		}

		$scope.showToast = function() {
			$mdToast.show({
				hideDelay: 5000,
				position: 'top right',
				parent: angular.element(document.querySelector('#toastContainer')),
				template: '<md-toast><span class="md-toast-text" flex>Custom toast!</span><md-button class="md-highlight" ng-click="openMoreInfo($event)">More info</md-button><md-button ng-click="closeToast()">Close</md-button></md-toast>'
			})
			
		}
	})
