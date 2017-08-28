(function(){
	angular.module('myApp')
		.component('gcoComponent', {
			templateUrl: '/partials/gco',
			controller: GcoController
		})

		function GcoController($window, $interval){

			this.gco = [ 'source-in','source-over','source-out','source-atop', 'destination-over','destination-out','lighter','destination-atop','destination-in', 'copy','xor', 'multiply', 'screen', 'overlay', 'darken','lighten', 'color-dodge', 'color-burn', 'hard-light', 'soft-light','difference', 'exclusion', 'hue', 'saturation', 'color', 'luminosity'];

          console.log('gco',this.gco)
          console.log('gco',this.gco[0])
			var canvasText = angular.element(document).find('canvas')[0];
			var canvas = angular.element(document).find('canvas')[1];
				
			console.log(canvas)
			console.log(canvasText)
			canvas.width = 500;
			canvasText.width = 500;
			canvasText.height = $window.innerHeight/2;
			canvas.height = $window.innerHeight/2;
			var ctx = canvas.getContext('2d');
			var ctxText = canvasText.getContext('2d');
			var i = 0;
			var stop ; 
		this.start = ()=> {
			stop = $interval(function(){

			ctx.clearRect(0,0,$window.innerWidth,$window.innerHeight)
			ctx.globalCompositeOperation = this.gco[i]
			ctxText.clearRect(0,0,$window.innerWidth,$window.innerHeight)
			 ctxText.font = '48px serif';
			ctxText.strokeText(this.gco[i], 40, canvasText.height - 50);
			ctx.fillStyle='blue'
			 // ctx.translate($window.innerWidth/2, $window.innerWidth/2);
  		// 	ctx.rotate( Math.PI / 180);
			 // ctx.translate(-$window.innerWidth/2, -$window.innerWidth/2);
			ctx.fillRect(25, 25, 100, 100);
  			// ctx.translate(105, 0);
			console.log(this.gco[i])
			ctx.fillStyle='red'
			
			ctx.fillRect(75, 75, 100, 100);
			i++;
			if(i>=this.gco.length) {
				i = 0;
			}
			}.bind(this),1500)

		}

		this.stop = ()=> {
			console.log('stop')
		$interval.cancel(stop); 
		} 


		}
})()