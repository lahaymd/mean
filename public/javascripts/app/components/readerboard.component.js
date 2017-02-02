(function() {
	angular.module('myApp')
		.component('readerboardComponent', {
			bindings : {
				title: '<',
				clear: '&',
				area: '&',
				results: '='


			},
			templateUrl : '/partials/readerboard-component',
			transclude: true,
			controller: 'MyComponentController'
			// function() {
			// 	this.myName = 'Mike La Hay'
			// }
		})


		
})()