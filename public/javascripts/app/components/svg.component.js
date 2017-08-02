(function(){

	angular.module('myApp').
		component('svgComponent', {
			templateUrl: '/partials/comic-svg',
			controller: svgController
		})

		function svgController(){
			var g = angular.element(document.querySelector('#pow'));
			console.log('g',g)
			// g.attr('fill', 'url(svg/#pattern)')
		}

})()