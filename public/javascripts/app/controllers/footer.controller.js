(function() {
	angular.module('myApp')
		.controller('FooterController', function() {
			var $ctrl = this;
			$ctrl.date = new Date().getFullYear();
		})
})()