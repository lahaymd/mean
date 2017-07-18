				
(function(){
	angular.module('myApp').
		component('canvasComponent', {
			templateUrl: '/partials/canvas',
			controller: canvasController
			
		})

		function canvasController($window){


			// document.addEventListener('DOMContentLoaded', function(){

$window.addEventListener('resize', function(){
	console.log('resized')
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight/2;
		init()
})

var canvas = angular.element(document).find('canvas')[0];
console.log(canvas)
canvas.width = window.innerWidth;
canvas.height = window.innerHeight/2;
var ctx = canvas.getContext('2d');
// ctx.rect(10,10,100,200)
// ctx.stroke()

var img = new Image();   // Create new img element
img.src = 'canvas.jpeg'; // Set source path
// img.addEventListener('load', function() {
// // alert(1)
// ctx.drawImage(img, 10, 10,20,20,5,5,100,100)
// });
// var x = Math.random() * window.innerWidth;
// var y = Math.random() * window.innerHeight;
// var dx = 4;
// var dy = 4;
// var dw = 100;
// // var dy = 100;
// var sw = 20;
// var radius = 30
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

this.myFunc = function(event){
	mouse.x = event.x;
	mouse.y = event.y;
	console.log('my function')
	console.log('ev',event)
}
// $window.addEventListener('mousemove', function(event) {
// 	// console.log(event)
// 	mouse.x = event.x;
// 	mouse.y = event.y;
// 	console.log(mouse)
// 	console.log('e',event)
// })

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
		var gradient=ctx.createLinearGradient(0,0,window.innerWidth,0);
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
			if(this.x + this.radius >window.innerWidth   || this.x - this.radius < 0  ){
				this.dx = -this.dx
			}
			if(this.y + this.radius > window.innerHeight/2  || this.y - this.radius < 0) {
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


// canvas.addEventListener('click', function(){
// 	console.log('mouseover')
// 	inc += 10;
// 	ctx.clearRect(0,0,600,500)
// 	ctx.drawImage(img, 10, 10,20,20,inc,5,100,100)
// })


// 	img.onload = function () {
// 	alert(1)
//     ctx.drawImage(img, 0, 0);
// }
// setInterval(function(){
// 	ctx.clearRect(0,0,canvas.width,canvas.height)
// 	ctx.drawImage(img, 0, 10,sw,20,x,y,dw,dy)
// 	// console.log('ink', inc)
// 	// console.log(x)
// 	if(x >canvas.width - dw   || x < 0  ){
// 	dx = -dx
// }
// 	if(y > innerHeight - dy  || y < 0) {
// 		dy = -dy
// 	}
// x+=dx;
// y+=dy;
// 		// console.log('fuck')}
// 		// else{inc = -inc}
// },100)
// var circle = new Cirle(200,200 , 3, 3, 30)

var circleArray = []

function init() {
	circleArray = []

for(var i =0; i<20; i++) {
	var radius = Math.random() * 30 + 4;
	var x = Math.random() * (window.innerWidth - radius * 2) + radius;
	var y = Math.random() * (window.innerHeight/2 - radius * 2) + radius;
	var dx = (Math.random()* 1) +2
	var dy = (Math.random()* 1) +2
	circleArray.push(new Circle(x,y,dx,dy,radius))
}
console.log(circleArray)
}

function animate(){
	requestAnimationFrame(animate) 
	ctx.clearRect(0,0,window.innerWidth,window.innerHeight/2)

	for(var i = 0; i<circleArray.length; i++) {
		circleArray[i].update();
	}

	
}
init();
animate();


// })













		}


})()



