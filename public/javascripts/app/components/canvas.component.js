(function(){
	angular.module('myApp').
		component('canvasComponent', {
			templateUrl: '/partials/canvas',
			controller: canvasController,
			transclude: true,
			bindings: {
				circs: '='
			}
			
		})

		function canvasController($window,$attrs){
			
console.log('attrs',$attrs.circs)
var  c = $attrs.circs !== undefined ? $attrs.circs : 30;
console.log('c',c)
// console.log('circs', circs)
			
// this.alertCircs()
this.circles = parseInt($attrs.circs);

$window.addEventListener('resize', function(){
	console.log('resized')
		canvas.width = $window.innerWidth;
		canvas.height = $window.innerHeight/2;
		init();
	
})

var canvas = angular.element(document).find('canvas')[0];
console.log(canvas)
canvas.width = $window.innerWidth;
canvas.height = $window.innerHeight/2;
var ctx = canvas.getContext('2d');

var img = new Image();   // Create new img element
img.src = 'canvas.jpeg'; // Set source path

var mouse = {
	x: undefined,
	y: undefined
}

var colorArray = [
	'#ffaa33',
	'#4411aa',
	'#00ff00'
]
var maxRadius = 100;

angular.element(document.querySelector('canvas')).on('mousemove', function(event){
	mouse.x = event.x;
	mouse.y = event.y;
	// console.log('my function')
	console.log('ev',event)
	console.log('mouse', mouse.x)
})


function Circle(x,y, dx, dy, radius) {
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;
	this.minRadius  = radius;
	this.color = colorArray[Math.floor(Math.random()* colorArray.length)]

	this.draw = function(){
		ctx.beginPath();
		ctx.arc(this.x,this.y,this.radius,0,Math.PI *2, false)
		var gradient=ctx.createLinearGradient(0,0,$window.innerWidth,0);
gradient.addColorStop("0","magenta");
gradient.addColorStop("0.5","blue");
gradient.addColorStop("1.0","red");


ctx.shadowColor = 'black';
ctx.shadowOffsetX = 10;
ctx.shadowOffsetY = 10;
ctx.shadowBlur = 10;
// Fill with gradient
ctx.strokeStyle=gradient;
		ctx.lineWidth = 4;
		ctx.fillStyle = this.color
		ctx.fill();
		ctx.stroke();
	}

	this.update = function(){
			if(this.x + this.radius >$window.innerWidth   || this.x - this.radius < 0  ){
				this.dx = -this.dx
			}
			if(this.y + this.radius > $window.innerHeight/2  || this.y - this.radius < 0) {
				this.dy = -this.dy
			}
		this.y+=this.dy;
		this.x+=this.dx;

		if(mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
			if(this.radius  < maxRadius) {

			this.radius += 1;
			}
		} else if (this.radius > this.minRadius) {
			this.radius -= 1;
		}

		this.draw()
	}
}

var circleArray = []

function init() {
	circleArray = []


for(var i =0; i<30; i++) {
	var radius = Math.random() * 30 + 4;
	var x = Math.random() * ($window.innerWidth - radius * 2) + radius;
	var y = Math.random() * ($window.innerHeight/2- radius * 2) + radius;
	var dx = (Math.random()* 1) +2
	var dy = (Math.random()* 1) +2
	circleArray.push(new Circle(x,y,dx,dy,radius))
}
console.log(circleArray)
}

function animate(){
	requestAnimationFrame(animate) 
	ctx.clearRect(0,0,$window.innerWidth,$window.innerHeight/2)

	for(var i = 0; i<circleArray.length; i++) {
		circleArray[i].update();
	}

	
}

this.updateCircles = function(circles){
	console.log(circles)

					circleArray = []


for(var i =0; i<circles; i++) {
	var radius = Math.random() * 30 + 4;
	var x = Math.random() * ($window.innerWidth - radius * 2) + radius;
	var y = Math.random() * ($window.innerHeight/2- radius * 2) + radius;
	var dx = (Math.random()* 1) +2
	var dy = (Math.random()* 1) +2
	circleArray.push(new Circle(x,y,dx,dy,radius))
}
console.log(circleArray)


}

init();
animate();


		}


})()



