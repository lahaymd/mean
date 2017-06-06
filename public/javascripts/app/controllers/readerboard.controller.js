(function() {
	angular.module('myApp').
		controller('ReaderboardController', ['$scope', function($scope){
			var vm = this;

	
			vm.areaOne = function(one,two) {

				var foo = function(x){
					x = x || '';
				return	x.replace(/\s+/g, '').split('').sort()

					.map(function(letter) {
						return letter.toLowerCase().match(/\S/g);
					})
					.reduce(function(last, now) {
						return last.concat(now)
					},[])
					.reduce(function(last, now) {
						var index = last[0].indexOf(now);
						if(index === -1) {
							last[0].push(now);
							last[1].push(1)
						} else {
							last[1][index] += 1;
						}
						return last
					}, [[], []])
					.reduce(function(last, now, index, context) {
						var zip = [];
						last.forEach(function(word, i) {
							zip.push([word, context[1][i]])
						});
						return zip;
					}) 
				};

					vm.letters = foo(one);
				 	vm.lettersTwo = foo(two)
					
			

				var letterDifference = function(){

					Array.from(document.getElementsByClassName("d3")).forEach(
    function(element, index, array) {
        element.remove()
    }
);

                Array.from(document.getElementsByClassName("gbar")).forEach(
    function(element, index, array) {
        element.remove()
    }
);
				
					// var x =document.getElementsByClassName('d3');
					// 		console.log(x)
					var arr = [];
					// 		x[0].remove()
					var lettersLength = vm.letters.length;
					var lettersTwoLength = vm.lettersTwo.length;
					var lettersTwoMapped = vm.lettersTwo.map(function(item){ return item[0]});
					var lettersMapped = vm.letters.map(function(item){ return item[0]});
					var lettersMap = vm.letters.map(function(item){ return item[1]});
					var lettersTwoMap = vm.lettersTwo.map(function(item){ return item[1]});
						
								for(var i = 0; i< lettersLength; i++) {
									if(lettersTwoMapped.indexOf(lettersMapped[i]) !== -1) {
										var MappedFindIdx =lettersTwoMapped.findIndex(function(index, idx, arr){return index === lettersMapped[i] ;});
											continue;
									} else {

												arr.push([lettersMapped[i] , -Math.abs(lettersMap[i]) ] );
											}
								}
					
							for(var i =0; i < lettersTwoLength; i++) {
								if(lettersMapped.indexOf(lettersTwoMapped[i]) !== -1) {
						var MappedFindIndex =lettersMapped.findIndex(function(index, idx, arr){return index === lettersTwoMapped[i] ;});
						// console.log('MappedFindIndex',MappedFindIndex)
						// alert('MappedFindIndex',MappedFindIndex)

								arr.push([lettersTwoMapped[i] , lettersTwoMap[i] - lettersMap[MappedFindIndex]]);
								}
								else  {
									arr.push([lettersTwoMapped[i] , lettersTwoMap[i] ]);

								}
							}
							console.log(arr)
					return arr;

				} //end of letterDifference function

				vm.results = letterDifference().sort();

				vm.changeZero = function() {
					if(vm.results[0][1] !==NaN) {vm.results[0][1]++}
				}


				var width = 375;
				var height = 500;
				var margin = 40;
				var svg = d3.select(".d3-attach").insert("svg",":first-child")
									.attr("class", 'd3')
                                     .attr("width", width + margin + margin) 
                                     .attr("height", height + margin + margin)
                                     // .style('display' ,'block')
                                     // .style('margin', '0 auto')
                                    var g = svg.append('g')
                                     .attr('transform', 'translate(' +width/2 +','+ height/2 +')')

                 var radii = vm.results.map(function(item) {return Math.abs(item[1])})
                 var color = d3.scaleOrdinal(d3.schemeCategory20);
                 const negColor =d3.scaleOrdinal(d3.schemeCategory20b)

                 var rscale = d3.scaleLinear().domain([1,d3.max(radii)]).range([10,50])
                 	console.log(d3.max(radii))
                 	console.log(radii)
                 	console.log(d3.min(radii))
                 	console.log(rscale(10))
                 	console.log(rscale(-10))
                 	console.log(rscale(Math.abs(-10)))
                 	


                                    var simulation = d3.forceSimulation()
                                    	.force('x', d3.forceX(width/2).strength(.92))
                                    	.force('y', d3.forceY(width/2).strength(.92) )
             //                        	.velocityDecay(.4)
   										// .alphaTarget(.2)
                                    	.force('collide', d3.forceCollide(function(d){
                                        // alert(d)
                                    		// console.log('d' + d3.max(vm.results,function(d) {return d[1]}))
                                    		// console.log(rscale(d));
                                    		return rscale(Math.abs(d[1])) +2;
                                    	}).iterations(16))
                                    	.force("center", d3.forceCenter())
                                     
                                    	// .force("charge", d3.forceManyBody().strength([400])) 
                                    	// .force("link", d3.forceLink())
                                    	// .force("charge", d3.forceManyBody(50))

                 
                  	var circles = g.selectAll('circles')
                  					.data(vm.results, function(d) { return d;});

                  					// UPDATE
								  // Update old elements as needed.
								  // circles.attr("class", "update");

                  					

                  					var circleEnter = circles.enter()
                  					.append('circle')
                  					.attr('fill', function(d){
                  						if(d[1] < 0) {return negColor(d[1])} else {

                  					 return color(d[1]);
                  						}
                  					})
                  					.style('opacity', function(d){
                  						if(d[1]===0) {return 0;} else{
                  							return 1;
                  						}
                  					})
                            .attr('stroke', (d) => color(4))
                            .attr('stroke-width', 3)
                  					.attr('id', function(d){return d[0]})
                  					.attr('r', function(d){ return rscale(Math.abs(d[1]))})
                  					.attr('cx', function(d) { return d.x})
                  					.attr('cy', function(d) { return d.y})
                  					.call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended));  


                  			// 		circlesEnter.transition()
               						// .style('transform', 'translate(100,100)')
               						var circleText = circles.enter()
               						.append('text')
               						.text(function(d){
                            if(d[1] === 0){ return ''; } 
                              return d[0] + " : " + d[1];
                          })
                          
               						.style('font-size', '12px')
               						.attr('transform','translate(-9,6)')
// d3.select('#a')
// 			.attr('fill', 'yellow')




function dragstarted(d) {
            if (!d3.event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }
        
        function dragged(d) {
            d.fx = d3.event.x;
            d.fy = d3.event.y;
        }
        
        function dragended(d) {
            if (!d3.event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        } 

 d3.select('#combine').on('click' , function() {
      simulation.force('x', d3.forceX(width/2))
      .force('y', d3.forceY(width/2) )


 })
 
 d3.select('#separate').on('click' , function() {

    simulation.force('x', d3.forceX(function(d) {
                                  
                        if(d[1]< 0)  { return 475;
                        } else {
                         return 120
                       }
                          } ))
              .force('y', d3.forceY(function(d) {
                        if(d[1]< 0)  { return width/2;
                        } else {
                         return width/2
                       }
                          } ) ).alphaTarget(0.3).restart();

 });


                  	simulation.nodes(vm.results)
                  		.on('tick', ticked)

                  	function ticked() {
                  		circleEnter
                  			.attr('cx', function(d) { return d.x})
                  			.attr('cy', function(d) { return d.y})
                  		circleText
                  		.attr('x', function(d) { return d.x})
                  		.attr('y', function(d) { return d.y})
                  	}

const w = 600;
const h = 400;
var svgBar = d3.select("#bar-chart")
            .attr("viewBox", "0 0 " + w + " " + h )
            .attr("preserveAspectRatio", "xMidYMid meet");
 var   marginBar = {top: 20, right: 20, bottom: 30, left: 40},
    widthBar = w - marginBar.left - marginBar.right,
    heightBar = h - marginBar.top - marginBar.bottom;



var xBar = d3.scaleBand().rangeRound([0, widthBar]).padding(0.1),
    yBar = d3.scaleLinear().rangeRound([heightBar, 0]),
    sum = vm.results.reduce(function(prev, curr){ 
      if(curr[1]< 0){
      return prev;
    } else{ 
      return prev + curr[1];}
      },0);
  var t = d3.transition()
    .duration(750)
    .ease(d3.easeLinear);

var gBar = svgBar.append("g")
    .attr('class', 'gbar')
    .attr("transform", "translate(" + marginBar.left + "," + marginBar.top + ")");


    xBar.domain(vm.results.map(function(d) { return d[0]; }));
  yBar.domain([0, 1]);






  gBar.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + heightBar + ")")
      .style('stroke', 'white')
       .style('font-size', '20px')
      .call(d3.axisBottom(xBar));

  gBar.append("g")
      .attr("class", "axis axis--y")
      .style('stroke', 'white')
       .style('font-size', '20px')
      .call(d3.axisLeft(yBar).ticks(10, "%"))
    .append("text")
      .style('font-size', '20px')
      .style('fill', 'white')
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("Frequency");

  // d3.select('#bar-chart').remove()

  gBar.selectAll(".bar")
    // .remove()
    .data(vm.results)
    .enter().append("rect")
      .attr("class", "bar")
      // .style("transform", "rotate(180deg)")
      // .style('transform-origin', 'center center')
      .attr("x", function(d) { return xBar(d[0]); })
      .attr("y", function(d) { console.log('d' + d); return  yBar(Math.abs(d[1]/sum) ); })
      .attr("width", xBar.bandwidth())
      .transition(t)
      .attr("height", function(d) { console.log('ybar sum ' + sum); return heightBar - (yBar(d[1]/sum)) ; })




























      } //end of vm.areaOne function
		}]) // closing controller function



      
})()