(function(){

	angular.module('myApp').
		component('svgComponent', {
			templateUrl: '/partials/comic-svg',
			controller: svgController
		})

		function svgController(){
			this.one = 1;
			this.two  = 0;
			this.three = 0;
			this.four = 0;
			this.five = 0;
			this.six = 0;
			this.seven = 1;
			this.eight = 0;
			this.nine = 0;
			this.ten = 0;
			this.eleven  = 0;
			this.twelve  = 0;
			this.thirteen  = 1;
			this.forteen  = 0;
			this.fifteen  = 0;
			this.sixteen =0;
			this.seventeen =0;
			this.eighteen =0;
			this.nineteen =1;
			this.twenty =0;
			this.compTran1 = 0;
			this.compTran2 = .33;
			this.compTran3 = .66;
			this.compTran4 = 1;
			this.compTran5 = 0;
			this.compTran6 = .33;
			this.compTran7 = .66;
			this.compTran8 = 1;
			this.compTran9 = 0;
			this.compTran10 = .33;
			this.compTran11 = .66;
			this.compTran12 = 1;
			this.compTran13 = 0;
			this.compTran14 = .33;
			this.compTran15 = .66;
			this.compTran16 = 1;
			this.cm1 = 0;
			this.cm2 = 0;
			this.cm3 = 0;
			this.cm4 = 0;
			this.cm5 = 0;
			this.cm6 = 0;
			this.cm7 = 0;
			this.cm8 = 0;
			this.cm9 = 0;
			var g = angular.element(document.querySelector('#pow'));
			console.log('g',g)
			// g.attr('fill', 'url(svg/#pattern)')
		}

})()