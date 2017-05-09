window.addEventListener('DOMContentLoaded', function(){
	console.log('dom loaded');
	// alert(1)

	// d3.select("body").append("p").text("new paragraph!");
	setTimeout(function(){


		var jsonCircles = [
   { "x_axis": 30, "y_axis": 30, "radius": 20, "color" : "green" },
   { "x_axis": 70, "y_axis": 70, "radius": 20, "color" : "purple"},
   { "x_axis": 110, "y_axis": 100, "radius": 20, "color" : "red"}];
 
 var svgContainer = d3.select("body").append("svg")
                                     .attr("width", 200)
                                     .attr("height", 200);
 
var circles = svgContainer.selectAll("circle")
                          .data(jsonCircles)
                          .enter()
                          .append("circle");

// var scale = d3.scale.linear();

var circleAttributes = circles
                       .attr("cx", function (d) { return d.x_axis; })
                       .attr("cy", function (d) { return d.y_axis; })
                       .attr("r", function (d) { return d.radius; })
                       .style("fill", function(d) { return d.color; })
						.transition()
					    .duration(750)
					    .delay(function(d, i) { return i * 10; })
					    .attr("r", function(d) { return d.radius * 2 });



// Update…
var p = d3.select("body")
  .selectAll("p")
  .data([4, 8, 15, 16, 23, 42])
    // .text(function(d) { return d; });

// Enter…
p.enter().append("p")
    .text(function(d) { return 'entering' + d; });

// Exit…
p.exit().remove();
	}, 2000)
	
})



// 	function() {
//   return "hsl(" + Math.random() * 360 + ",100%,50%)";
// });