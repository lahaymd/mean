(function() {
	angular.module('myApp').
		controller('ReaderboardController',  function($document, $log, $timeout){
			var vm = this;

				vm.clear = () => {
		$document.find('textarea').val('');
		vm.letterDifference = {};
	}

	



vm.areaOne = function(one,two) {

	vm.foo = function(x){
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

	 vm.letters = vm.foo(one);
	 vm.lettersTwo = vm.foo(two)
	
	 
		console.log('letters',vm.letters)
		console.log('letters2',vm.lettersTwo)

	
						
// vm.letterDifference = vm.letters.map(function(item, index, array){

// 		console.log('item', item)
// 		console.log('index', index)
// 		console.log('array', array)
// 		console.log('this[index]', this[index])
// 		console.log('this', this)

// 		var thisMapped= this.map(function(i, idx, arr) {return i[0]})
// 	  	console.log('thisMapped', thisMapped)

// 		var lettersMapped = vm.letters.map(function(item){return item[0]})
// 		console.log('lettersMapped', lettersMapped)
							
// 		var thisMappedFindIndex =thisMapped.findIndex(function(i, idx, arr){return i === item[0];});

// 		console.log('thisMappedFindIndex',thisMappedFindIndex)

// 		var notThisMappedFindIndex =thisMapped.find(function(i, idx, arr){return i !== item[0];});

// 		console.log('notThisMappedFindIndex',notThisMappedFindIndex)

// 		var vm.obj = {};
	
// 	  	if( this.length > 0 && thisMapped.indexOf(item[0]) !== -1 && thisMappedFindIndex !== -1) {

// 			vm.obj[item[0]] =  item[1] - this[thisMappedFindIndex][1];

// 			}

// 		// else if(thisMapped.indexOf(item[0]) === -1) {
// 		// 	vm.obj['z'] = 5
// 		// 		// vm.obj[this[notThisMappedFindIndex][0]] = -Math.abs(this[notThisMappedFindIndex][1]);
// 		// 	}

// 		 else {
							
// 			vm.obj[item[0]] = item[1]

// 				};
							
// 		console.log('thisMappedFindIndex',thisMappedFindIndex)
// 		console.log('vm.obj', vm.obj)

// 		return vm.obj;
// 	},vm.lettersTwo)





	  	var lettersTwoMapped = vm.lettersTwo.map(function(item){return item[0]})
		console.log('lettersTwoMapped', lettersTwoMapped)

			var lettersMapped = vm.letters.map(function(item){return item[0]})
		console.log('lettersMapped', lettersMapped)
		

	vm.letterDifference = //function(){


		  vm.lettersTwo.map(function(item, index, array){

		console.log('item', item)
		console.log('index', index)
		console.log('array', array)
		console.log('this[index]', this[index])
		console.log('this', this)

		var thisMapped= this.map(function(i, idx, arr) {return i[0]})
	  	console.log('thisMapped', thisMapped)

							
		var thisMappedFindIndex =thisMapped.findIndex(function(i, idx, arr){return i === item[0];});
		console.log('thisMappedFindIndex',thisMappedFindIndex)


		var notThisMappedFindIndex =thisMapped.find(function(i, idx, arr){return i !== item[0];});
		console.log('notThisMappedFindIndex',notThisMappedFindIndex)

		vm.obj = {};

		
	
	  	if( this.length > 0 && thisMapped.indexOf(item[0]) !== -1 && thisMappedFindIndex !== -1) {

			vm.obj[item[0]] =  item[1] - this[thisMappedFindIndex][1];

			}

		// else if(thisMapped.indexOf(item[0]) === -1) {
		// 	vm.obj['z'] = 5
		// 		// vm.obj[this[notThisMappedFindIndex][0]] = -Math.abs(this[notThisMappedFindIndex][1]);
		// 	}

		 else {
							
			vm.obj[item[0]] = item[1]

				};
							
		console.log('thisMappedFindIndex',thisMappedFindIndex)
		console.log('vm.obj', vm.obj)

		return vm.obj;
	},vm.letters)


//}
console.log('vm.letterDifference', vm.letterDifference)

				} //end of area one
		})
})()