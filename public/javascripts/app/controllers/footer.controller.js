(function() {
	angular.module('myApp')
		.controller('FooterController', function() {
			var $ctrl = this;
			$ctrl.test = 'I am a test';
			$ctrl.date = new Date().getFullYear();
			$ctrl.func = function() { return 'blah';}
		
		})
})()