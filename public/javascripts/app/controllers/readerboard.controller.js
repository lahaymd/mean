(function() {
  angular.module('myApp').
    controller('ReaderboardController', ['$scope', '$mdBottomSheet', '$window', function($scope, $mdBottomSheet, $window){
      var vm = this;

      vm.areaOne = function(one,two) {

        var foo = function(x){
          x = x || '';
        return  x.replace(/\s+/g, '').split('').sort()

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
          vm.lettersTwo = foo(two);
          
      

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
          //    console.log(x)
          var arr = [];
          //    x[0].remove()
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

      
//start of D3 code
var t = d3.transition()
      .duration(750);
        var width = $window.innerWidth;
        console.log('width ',width)
        var height = $window.innerHeight;
        var margin = 40;
        var svg = d3.select("#bubble-chart")
                    .attr("viewBox", "0 0 " + width + " " + height )
                    .attr("preserveAspectRatio", "xMidYMid meet")

         console.log('svg', svg)
         svg.selectAll('g').transition(t).attr('transform', 'translate(-220 ,-100 )')
      .style("fill-opacity", 1e-6).remove()
                   
                    // svg.exit().remove()
         var g = svg.append('g') 
                    .attr('transform', 'translate(' +width/2 +','+ height/2 +')')
                    .attr('class', 'foo')
console.log('g', g)

         var radii = vm.results.map(function(item) {return Math.abs(item[1])})
         var color = d3.scaleOrdinal(d3.schemeCategory20);
         const negColor =d3.scaleOrdinal(d3.schemeCategory20b)
         var rscale = d3.scaleLinear().domain([1,d3.max(radii)]).range([10,50])
                  // console.log('rscale ',d3.max(radii))
                  // console.log(radii)
                  // console.log(d3.min(radii))
                  // console.log(rscale(10))
                  // console.log(rscale(-10))
                  // console.log(rscale(Math.abs(-10)))
                  function up(datum) {



      var circles = g.selectAll('circles')
                     // .data(datum, function(d){ return d})
                     .attr('fill', 'orange')
console.log('circles', circles)

circles.selectAll('circle')
      .attr('class', 'upddate');





                            var circleEnter = circles
                     .data(datum, function(d){ return d})
                            .enter()
                            .append('circle')
                            
                            .attr('class', 'thesvgid')
                            .attr('fill', function(d){
                              if(d[1] < 0) {return 'url(#myGradient)'} else {
                             return color(d[1]);
                              }
                            })
                            // .attr('filter', d => 'url(#son-of-sam)')
                            .style('opacity', function(d){
                              if(d[1]===0) {return 0;
                              } else{
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
                .on("end", dragended))
                
      circles.exit().remove()

      circles.attr('class', 'update')

var circleText = circles.enter()
.append('text')
.text(function(d){
  if(d[1] === 0){ return ''; } 
    return d[0] + " : " + d[1];
})

.style('font-size', '12px')
.attr('transform','translate(-9,6)')

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
                                  
                        if(d[1]< 0)  { return width;
                        } else {
                         return width/3;
                       }
                          } ))
              .force('y', d3.forceY(function(d) {
                        if(d[1]< 0)  { return width/2;
                        } else {
                         return width/2
                       }
                          } ) ).alphaTarget(0.3).restart();
 });


                    function ticked() {
                   
                      circleEnter
                        .attr('cx', function(d) { return d.x})
                        .attr('cy', function(d) { return d.y})
                      circleText
                      .attr('x', function(d) { return d.x})
                      .attr('y', function(d) { return d.y})
                    }

          var simulation = d3.forceSimulation()
            .force('x', d3.forceX(width/2).strength(.92))
            .force('y', d3.forceY(height/3).strength(.92) )
            // .velocityDecay(.4)
            // .alphaTarget(.2)
            .force('collide', d3.forceCollide(function(d){
              // alert(d)
              // console.log('d' + d3.max(vm.results,function(d) {return d[1]}))
              // console.log(rscale(d));
              return rscale(Math.abs(d[1])) +2;
            }).iterations(16))
            .force("center", d3.forceCenter())
  

                    simulation.nodes(datum)
                      .on('tick', ticked)

  }

  up(vm.results)



  
 
const w = $window.innerWidth;
const h = 400;
var svgBar = d3.select("#bar-chart")
            .attr("viewBox", "0 0 " + w + " " + h )
            .attr("preserveAspectRatio", "xMidYMid meet");
 var   marginBar = {top: 20, right: 20, bottom: 30, left: 60},
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
    .attr("transform", "translate(" + marginBar.left + "," + marginBar.top + ")")



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

  function update(data) {


  var fluid =  gBar.selectAll("rect")
    // .remove()
    .data(data)
    .enter()
    .append("rect")
    .attr("x", function(d) { return xBar(d[0]); })
      .attr("y", function(d) { console.log('d' + d); return  yBar(Math.abs(d[1]/sum) ); })
      .attr("width", xBar.bandwidth())
      // .transition(t)
      .attr("height", function(d) { console.log('ybar sum ' + sum); return heightBar - (yBar(d[1]/sum)) ; })
      .attr('fill', 'url(#Triangle)')

console.log('fluid', fluid)


  }
  update(vm.results)
  // d3.select('#two').on('change', function(){

  // update(vm.results)
  // }) 

  // console.log('circ', circles)
  var donut = d3.select('#donut'),
    donutWidth = +donut.attr("width"),
    donutHeight = +donut.attr("height");
    donut.selectAll('g').remove()
    var gr= donut.append("g").attr("transform", "translate("+ (width/2)+ "," + (height / 2) + ")");

var radius = Math.min(donutWidth, donutHeight) / 4;

        var color = d3.scaleOrdinal(d3.schemeCategory20);

 
        
        var donutArcWidth = 30;

// d3.json('d3.json', function(data){
        var arc = d3.arc()
          .innerRadius(radius - donutArcWidth)
          .outerRadius(radius);
console.log('pie', vm.results[0])
        var pie = d3.pie()
          .sort(null)
          .value(function(d) { console.log('d',d); return d[1]; })

     var group = gr.selectAll(".arc")
      .data(pie(vm.results))
      .enter().append("g"); 
        
        group.append('path')
          .attr('d', arc)
          .attr('fill', function(d, i) { 
            console.log('color' , d);
            return color(d.data[1]);
          
          });


   // JOIN new data with old elements.
  // var text = group.selectAll("text")
  //   .data(vm.results, function(d) { return d; });

  // // EXIT old elements not present in new data.
  // text.exit()
  // // .attr('class', 'text')
  //     .attr("class", "exit")
  //   .transition(t)
  //     .attr("y", 60)
  //     .style("fill-opacity", 1e-6)
  //     .remove();

  // // UPDATE old elements present in new data.
  // text.attr("class", "update")
  // // .attr('class', 'text')
  //     .attr("y", 0)
  //     .style("fill-opacity", 1)
  //   .transition(t)
  //     .attr("x", function(d, i) { return i * 32; });

  // // ENTER new elements present in new data.
  // text.enter().append("text")
  // // .attr('class', 'text')
  //     .attr("class", "enter")
  //     .attr("dy", ".35em")
  //     // .attr("y", -60)
  //     // .attr("x", function(d, i) { return i * 32; })
  //     .style("fill-opacity", 1e-6)
  //     // .text(function(d) { return d; })
  //   // group.append("text")
  //     .attr("transform", function(d) {
  //       console.log('trans', d);
  //       var _d = arc.centroid(d);
  //       // _d[0] *= 1.5;  //multiply by a constant factor
  //       // _d[1] *= 1.5;  //multiply by a constant factor
  //       return "translate(" + _d + ")";
  //     })
  //     .attr("dy", ".50em")
  //     .style("text-anchor", "middle")
  //     .attr('font-size', '2em')
  //     .text(function(d) {
  //          return vm.results[0]
  //     })
  //   .transition(t)
  //     .attr("y", 0)
  //     .style("fill-opacity", 1);


    group.append("text")
      .attr("transform", function(d) {
        console.log('d',d)
        var _d = arc.centroid(d);
        // _d[0] *= 1.5;  //multiply by a constant factor
        // _d[1] *= 1.5;  //multiply by a constant factor
        return "translate(" + _d + ")";
      })
      .attr("dy", ".50em")
      .style("text-anchor", "middle")
      .attr('font-size', '12px')
      .text(function(d) {
        console.log('text d', d);
           return d.data[0] + ": "+ d.data[1];
      });


    group.append("text")
     .attr("text-anchor", "middle")
     .attr('font-size', '30px')
     // .attr('y', 20)
     .text(vm.results.reduce(function(prev, curr){ 
      if(curr[1]< 0){
      return prev;
    } else{ 
      return prev + curr[1];}
      },0));




  // console.log(data)
// })



      } //end of vm.areaOne function
    }]) // closing controller function



      
})()