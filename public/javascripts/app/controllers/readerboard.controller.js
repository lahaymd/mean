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



				var width = 500;
				var height = 500;
				var margin = 40;
				var svg = d3.select(".d3-attach").append("svg")
									.attr("class", 'd3')
                                     .attr("width", width + margin + margin)
                                     .attr("height", height + margin + margin)
                                     // .style('display' ,'block')
                                     // .style('margin', '0 auto')
                                     .append('g')
                                     .attr('transform', 'translate(' +width/2 +','+ height/2 +')')

                 var radii = vm.results.map(function(item) {return item[1]})
                 var color = d3.scaleOrdinal(d3.schemeCategory20);

                 var rscale = d3.scaleLinear().domain([1,d3.max(radii)]).range([10,50])
                 	console.log(rscale(3))
                 	


                                    var simulation = d3.forceSimulation()
                                    	.force('x', d3.forceX(width/2).strength(.002) )
                                    	.force('y', d3.forceY(height/2).strength(.002) )
                                    	.force('collide', d3.forceCollide(function(d){
                                    		// console.log('d' + d3.max(vm.results,function(d) {return d[1]}))
                                    		// console.log(rscale(d));
                                    		return rscale(d[1]);
                                    	}))



                 
                  	var circles = svg.selectAll('circles')
                  					.data(vm.results);
                  					

                  				var circleEnter =	circles.enter()
                  					.append('circle')
                  					.attr('fill', function(d){ return color(d[1])})
                  					.attr('id', function(d){return d[0]})
                  					.attr('r', function(d){ return rscale(d[1])})
                  					.attr('cx', function(d) { return d.x})
                  					.attr('cy', function(d) { return d.y})
                  					// .append('text')
                  					// .text(function(d){return d[0]})
                  					// .attr('cx', 390)
                  					// .attr('cy', 390)
                  					// .style("opacity", 0)

                  			// 		circlesEnter.transition()
               						// .style('transform', 'translate(100,100)')
               						var circleText = circles.enter()
               						.append('text')
               						.text(function(d){return d[0] + " : " + d[1]})
               						.style('font-size', '12px')
               						.attr('transform','translate(-10,7)')
d3.select('#a')
			.attr('fill', 'yellow')



 var e = circles.exit()

            .transition()
            .delay(2000)
              .duration(3000)
                .attr("r", 1000)
                // .style("opacity", 0)
                .remove();


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

			} //end of vm.areaOne function
		}]) // closing controller function
})()