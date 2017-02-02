(function() {
	angular.module('myApp').
		controller('ReaderboardController',  function($document){
			var vm = this;
			vm.test = 'testing readerboard controller'
			vm.clear = () => {
				vm.results = '';
				vm.letters = '';
				vm.lettersTwo = '';
				$document.find('textarea').val('');
		}
vm.areaOne = function(one,two) {
	var foo = function(x){
		x = x || '';
	return	x.replace(/\s+/g, '').split('').sort()
		.map(letter => letter.toLowerCase().match(/\S/g))
		.reduce((last, now) => last.concat(now),[])
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
		var arr = [];
		var lettersLength = vm.letters.length;
		var lettersTwoLength = vm.lettersTwo.length;
		var lettersTwoMapped = vm.lettersTwo.map(item => item[0]);
		var lettersMapped = vm.letters.map(item => item[0]);
		var lettersMap = vm.letters.map(item => item[1]);
		var lettersTwoMap = vm.lettersTwo.map(item => item[1]);
					for(var i = 0; i< lettersLength; i++) {
						if(lettersTwoMapped.indexOf(lettersMapped[i]) !== -1) {
						var MappedFindIdx =lettersTwoMapped.findIndex(function(index, idx, arr){return index === lettersMapped[i] ;});
							// continue;
						} else { arr.push({[lettersMapped[i]] : -Math.abs(lettersMap[i]) } );}
					}
		
				for(var i =0; i < lettersTwoLength; i++) {
					if(lettersMapped.indexOf(lettersTwoMapped[i]) !== -1) {
			var MappedFindIndex =lettersMapped.findIndex(function(index, idx, arr){return index === lettersTwoMapped[i] ;});
		
					arr.push({[lettersTwoMapped[i]] : lettersTwoMap[i] - lettersMap[MappedFindIndex]});
					}
					else  {
						arr.push({[lettersTwoMapped[i]] : lettersTwoMap[i] });

					}
				}
		return arr;
	}
vm.results = letterDifference();

				}
		})
})()