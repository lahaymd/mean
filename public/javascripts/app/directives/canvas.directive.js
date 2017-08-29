(function(){
	angular.module('myApp')
		.directive('canvasDirective', function(){
			return {
				restrict : 'E',
				template: `<div >my gco is {{gco}}</div>`,
				scope: {gco : '@'},
				link: function(scope, element, attributes) {
					console.log('element ', element);
					var c = document.createElement('canvas');
					c.setAttribute('id', attributes.gco)
					c.height= 300;
					var canvass = c.getContext('2d');
					canvass.fillStyle='blue'
					canvass.fillRect(25, 25, 100, 100);
					canvass.globalCompositeOperation = attributes.gco
					canvass.fillStyle='red'
					canvass.fillRect(75, 75, 100, 100);
					element[0].appendChild(c)
				}
			}
		})
})()