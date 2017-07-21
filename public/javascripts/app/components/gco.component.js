(function(){
	angular.module('myApp')
		.component('gcoComponent', {
			templateUrl: '/partials/gco',
			controller: GcoController
		})

		function GcoController($window, $interval){

			var gco = [ 'source-in','source-over','source-out','source-atop', 'destination-over','destination-out','lighter','destination-atop','destination-in', 'copy','xor', 'multiply', 'screen', 'overlay', 'darken','lighten', 'color-dodge', 'color-burn', 'hard-light', 'soft-light','difference', 'exclusion', 'hue', 'saturation', 'color', 'luminosity'];

          console.log('gco',gco)
			var canvas = angular.element(document).find('canvas')[1];
			var canvasText = angular.element(document).find('canvas')[0];
			console.log(canvas)
			console.log(canvasText)
			canvas.width = $window.innerWidth;
			canvasText.width = $window.innerWidth;
			canvasText.height = $window.innerHeight;
			canvas.height = $window.innerHeight;
			var ctx = canvas.getContext('2d');
			var ctxText = canvasText.getContext('2d');
			var i = 0
			var time = new Date();
			$interval(function(){

			ctx.clearRect(0,0,$window.innerWidth,$window.innerHeight)
			ctxText.clearRect(0,0,$window.innerWidth,$window.innerHeight)
			 ctxText.font = '48px serif';
			ctxText.strokeText(gco[i], 40, canvasText.height - 50);
			ctx.fillStyle='red'
			 // ctx.translate($window.innerWidth/2, $window.innerWidth/2);
  		// 	ctx.rotate( Math.PI / 180);
			 // ctx.translate(-$window.innerWidth/2, -$window.innerWidth/2);
			ctx.fillRect(25, 25, 100, 100);
  			// ctx.translate(105, 0);
			ctx.globalCompositeOperation = gco[i]
			console.log(gco[i])
			ctx.fillStyle='blue'
			
			ctx.fillRect(75, 75, 100, 100);
			i++;
			if(i>=gco.length) {
				i = 0;
			}
			},1500)



		}
})()