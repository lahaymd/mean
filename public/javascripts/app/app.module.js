(function() {
	'use strict';



	angular.module('myApp', ['ui.router','ngAnimate', 'ngMessages', 'ngMaterial', 'angular-inview', 'md.data.table', 'smoothScroll'])
		.config(function($mdThemingProvider) {
			$mdThemingProvider.theme('default')
				.primaryPalette('blue')
				.accentPalette('teal')
				.warnPalette('red')
				.backgroundPalette('grey')
				.dark() 
		})

})(); 