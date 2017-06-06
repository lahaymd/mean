(function() {
angular.module('myApp')
	.component('test', {
		templateUrl: '/partials/test',
		controller: function(){
			this.date = new Date().getFullYear()
		}
	})
 } ) ()