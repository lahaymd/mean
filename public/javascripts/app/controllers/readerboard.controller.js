(function() {
	angular.module('myApp').
		controller('ReaderboardController', ['$scope', function($scope){
			var vm = this;
			vm.results;
		
				vm.clear = () => {
					document.getElementById('one').value = '';
					document.getElementById('two').value = '';
					vm.one = null;
					vm.two  = null;
					vm.results = [];
				
				}

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
					// console.log('letters',vm.letters)

				var letterDifference = function(){
					var arr = [];
					var lettersLength = vm.letters.length;
					var lettersTwoLength = vm.lettersTwo.length;
					var lettersTwoMapped = vm.lettersTwo.map(function(item){ return item[0]});
					var lettersMapped = vm.letters.map(function(item){ return item[0]});
					var lettersMap = vm.letters.map(function(item){ return item[1]});
					var lettersTwoMap = vm.lettersTwo.map(function(item){ return item[1]});
						
								for(var i = 0; i< lettersLength; i++) {
									if(lettersTwoMapped.indexOf(lettersMapped[i]) !== -1) {
										var MappedFindIdx =lettersTwoMapped.findIndex(function(index, idx, arr){return index === lettersMapped[i] ;});
										// console.log('MappedFindIdx', MappedFindIdx);
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
					return arr;

				} //end of letterDifference function

				vm.results = letterDifference().sort();
				// console.log('vm.results', letterDifference())
			} //end of vm.areaOne function
		}]) // closing controller function
})()