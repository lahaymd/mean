angular.module('myApp')
	.component('exampleComponent', {
		bindings: {
			message: '=',
			brand: '<',
			flavor: '@',
			at: '@',
			lucy: '@'
		},
		// template: 'hello {{$ctrl.message}}',
		templateUrl: '/partials/example-component',
		controller: function(){
			this.message = 'Michael component',
			this.ctrlFlavor = 'blackberry'
			     // this.lucy ='Lucy Dusteena Pundsack'
		}
	})