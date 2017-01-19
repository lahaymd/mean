angular.module('myApp')
	.directive('example',  function(){
		// Runs during compile
		return {
			// name: '',
			// priority: 1,
			// terminal: true,
			// scope: {
			// 	name: '=',
			// 	someMeth : '&',
			// 	dial: '&',
			// 	flavor: '@'
			// }, // {} = isolate, true = child, false/undefined = no change
			 // controller: 'ReaderboardController',
			// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
			restrict: 'AE', // E = Element, A = Attribute, C = Class, M = Comment
			// template: '',
			templateUrl: '/partials/example-directive',
			// replace: true,
			// transclude: true,
			// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
			link: function($scope, iElm, iAttrs, controller) {
				
			}
		};
	})