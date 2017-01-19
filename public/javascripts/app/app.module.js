(function() {
	'use strict';



	angular.module('myApp', ['ui.router','ngAnimate', 'ngMessages', 'ngMaterial'])
		.config(function($mdThemingProvider) {
			$mdThemingProvider.theme('default')
				.primaryPalette('blue')
				.accentPalette('teal')
				.warnPalette('red')
				.backgroundPalette('grey')
				.dark() 
		})

})(); 