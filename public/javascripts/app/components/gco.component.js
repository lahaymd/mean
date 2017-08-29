(function(){
	angular.module('myApp')
		.component('gcoComponent', {
			templateUrl: '/partials/gco',
			controller: GcoController
		})

		function GcoController($window, $interval, $document, $scope){
			console.log('this ',this)
			this.gco = ['source-in','source-over','source-out','source-atop', 'destination-over','destination-out','lighter','destination-atop','destination-in', 'copy','xor', 'multiply', 'screen', 'overlay', 'darken','lighten', 'color-dodge', 'color-burn', 'hard-light', 'soft-light','difference', 'exclusion', 'hue', 'saturation', 'color', 'luminosity'];
			this.offset = $window.innerWidth > 667? 125 : 41;
          console.log('gco',this.gco)
          console.log('gco',this.gco[0])
			var canvasText = angular.element($document[0].querySelector('#text'))[0];
			var canvas = angular.element($document[0].querySelector('#gco'))[0];


// 					var sourceIn = angular.element($document[0].querySelector('#source'))[0];
// 					console.log(sourceIn)
// 					var sourceInCtx = sourceIn.getContext('2d');
// 					sourceInCtx.globalCompositeOperation = 'source-in';
// // 					sourceInCtx.moveTo(0,0);
// // sourceInCtx.lineTo(200,100);
// // sourceInCtx.stroke();
// 					sourceInCtx.fillStyle='blue'
// 					sourceInCtx.fillRect(25, 25, 100, 100);
// 					sourceInCtx.fillStyle='orange'
// 					sourceInCtx.fillRect(75, 75, 100, 100);
				

				var body = angular.element(document).find('main')[0];
				var can;
				var canvasArray = [];
			angular.forEach(this.gco, function(value, key){
				var cant = document.createElement('canvas');
				// console.log(body)
				// console.log(value , key)
				cant.setAttribute('id', value)
				can = cant.getContext('2d');
				cant.height= 300;
				can.globalCompositeOperation = value
				can.fillStyle='blue'
				can.fillRect(25, 25, 100, 100);
				can.fillStyle='red'
				can.fillRect(75, 75, 100, 100);
				canvasArray.push(cant)
				// can.clearRect(0,0,300,150);



			});
			console.log(canvasArray)
			// angular.forEach(canvasArray, function(value, key){
			// 	console.log('value = ' ,value)
			// 	body.append(value);
			// });
			// console.log(canvas)
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
			ctxText.clearRect(0,0,$window.innerWidth,$window.innerHeight)
			 ctxText.font = '48px serif';
			ctxText.strokeText(this.gco[i], 40, canvasText.height - 50);
			ctx.fillStyle='blue'
			 // ctx.translate($window.innerWidth/2, $window.innerWidth/2);
  		// 	ctx.rotate( Math.PI / 180);
			 // ctx.translate(-$window.innerWidth/2, -$window.innerWidth/2);
			ctx.fillRect(25, 25, 100, 100);
			ctx.globalCompositeOperation = this.gco[i]
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