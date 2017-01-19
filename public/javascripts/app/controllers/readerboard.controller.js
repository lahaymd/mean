(function() {
	angular.module('myApp').
		controller('ReaderboardController',  function($document, $log, $timeout){
			var vm = this;


vm.areaOne = function(one,two) {

// 				vm.copy = function(x){
// 	vm.cop = angular.copy(vm.letterDifference,x)
// }

	vm.clear = () => {
		$document.find('textarea').val('');
		vm.letterDifference = {};
	}

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
	
	 
		console.log('letters',vm.letters)


				





	vm.letterDifference = vm.lettersTwo.map(function(item, index, array){

		console.log('item', item)
		console.log('index', index)
		console.log('array', array)
		console.log('this[index]', this[index])
		console.log('this', this)

		var thisMapped= this.map(function(i, idx, arr) {return i[0]})

	  	console.log('thisMapped', thisMapped)
							
		var thisMappedFindIndex =thisMapped.findIndex(function(i, idx, arr){return i === item[0];});

		console.log(thisMappedFindIndex)

		var obj = {};
	  
	  	if( this.length > 0 && thisMapped.indexOf(item[0] !== -1) && thisMappedFindIndex !== -1) {

			obj[item[0]] =  item[1] - this[thisMappedFindIndex][1];

		} else {
							
			obj[item[0]] = item[1]

				};
							
		console.log('thisMappedFindIndex',thisMappedFindIndex)
		console.log('obj', obj)

		return obj;
	},vm.letters)


				}
		})
})()