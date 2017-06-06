(function() {
angular.module('myApp')
	.component('foot', {
		templateUrl: '/partials/footer',
		controller: function(){
			this.date = new Date().getFullYear()
		}
	})
 } ) ()