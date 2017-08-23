(function(){

	angular.module('myApp').
		component('bannerComponent', {
			templateUrl: '/partials/banner',
			controller: bannerController
		})

		function bannerController($attrs){
			var tur = angular.element(document.querySelector('#turbwave'))
			var bf = .01
			var dx = .003
			// console.log('bf outside',bf)

			function raf(){
				setTimeout(function() {
				requestAnimationFrame(raf)
				if (bf >= .015 || bf <.01 ){dx = -dx}
			tur.attr('baseFrequency',bf);
			bf += dx;
			// console.log('bf inside',bf)
			},1000/5)
		}


			raf()

		}

})()