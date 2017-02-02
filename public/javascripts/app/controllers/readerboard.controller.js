(function() {
	angular.module('myApp').
		controller('ReaderboardController',  function($document, $log, $timeout){
			var vm = this;


vm.areaOne = function(one,two) {


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
	
	 
		// console.log('letters',vm.letters)


// 	vm.diff = function(){
// console.log('test')
// 					vm.arr = [];
// 					var obj = {};

// 					for(var i = 0; i < vm.letters.length; i++) {
// 					var lettersMapped = vm.letters.map(function(item){ return item[0]});
// 					var lettersTwoMapped = vm.lettersTwo.map(function(item){ return item[0]});
// 						if(lettersTwoMapped.indexOf(lettersMapped[i]) == -1) {
							
// 							obj[lettersMapped[i]] = -Math.abs(vm.letters[i][1]);
							
// 						} else {
// 							obj[lettersTwoMapped[i]] = vm.lettersTwo[i][1];
// 						}





// 							vm.arr.push(obj);
// 					console.log('arr', vm.arr);
// 					}
// 					// return arr;
// 				// };	

// // console.log('diff', vm.diff())
// vm.bar = vm.arr[0];
// vm.baz = Object.keys(vm.bar).map(function(item){
// 	var obj={};
// 	obj[item] = vm.bar[item];
// 	return obj;
// })
// .
// reduce(function(prev,curr){
// 	return prev
// },[{}])


	var letterDifference = function(){
		var arr = [];
		var obj = {};
		var lettersLength = vm.letters.length;
		var lettersTwoLength = vm.lettersTwo.length;
		
		var lettersTwoMapped = vm.lettersTwo.map(function(item){ return item[0]});
		// console.log('lettersTwoMapped', lettersTwoMapped);
		// var lettersTwoFindIndex =lettersTwoMapped.findIndex(function(i, idx, arr){return i === vm.lettersTwo[i][0]});
		var lettersMapped = vm.letters.map(function(item){ return item[0]});
		// console.log('lettersMapped', lettersMapped);
		// var lettersFindIndex =lettersMapped.findIndex(function(i, idx, arr){return i === vm.letters[i][0]});
		
		var lettersMap = vm.letters.map(function(item){ return item[1]});
		// console.log('lettersMap', lettersMap)
		var lettersTwoMap = vm.lettersTwo.map(function(item){ return item[1]});
		// console.log('lettersTwoMap', lettersTwoMap)

		
			
					for(var i = 0; i< lettersLength; i++) {
						if(lettersTwoMapped.indexOf(lettersMapped[i]) !== -1) {
						var MappedFindIdx =lettersTwoMapped.findIndex(function(index, idx, arr){return index === lettersMapped[i] ;});
						console.log('MappedFindIdx', MappedFindIdx)
						
							// arr.splice(MappedFindIdx, 1);
							// arr.push({[lettersMapped[i]] : lettersTwoMap[MappedFindIdx] - lettersMap[i]})

							continue;
						} else {

							arr.push({[lettersMapped[i]] : -Math.abs(lettersMap[i]) } );
						}
			}
		
				for(var i =0; i < lettersTwoLength; i++) {
					if(lettersMapped.indexOf(lettersTwoMapped[i]) !== -1) {
			var MappedFindIndex =lettersMapped.findIndex(function(index, idx, arr){return index === lettersTwoMapped[i] ;});
			console.log('MappedFindIndex',MappedFindIndex)
			// alert('MappedFindIndex',MappedFindIndex)

					arr.push({[lettersTwoMapped[i]] : lettersTwoMap[i] - lettersMap[MappedFindIndex]});
					}
					else  {
						arr.push({[lettersTwoMapped[i]] : lettersTwoMap[i] });

					}
				}
				

		if(vm.lettersTwo.length === 0 ) {



		}

console.log('arr',arr)



			
		
		// else {

		// 		arr.push({lettersMapped[i] : Math.abs(lettersMap[i])});
		// 	}
			// if(vm.letters.indexOf('a') === -1) {
		// for(var i = 0; i < vm.letters.length ; i++) {
		// 	} 
		// }
			// else {
		// 		arr.push({lettersMapped[i] : 1+ 1 })
		// 	}
		// }

		// if(vm.lettersTwo.length !== 0 && lettersMapped.indexOf(lettersTwoMapped))


							

		// vm.lettersTwo.map(function(item, index, array){
		// var thisMapped= this.map(function(i, idx, arr) {return i[0]})
	 //  	console.log('thisMapped', thisMapped)
		// var thisMappedFindIndex =thisMapped.findIndex(function(i, idx, arr){return i === item[0];});

		// console.log(thisMappedFindIndex)

		// console.log('item', item)
		// console.log('index', index)
		// console.log('array', array)
		// console.log('this[index]', this[index])
		// console.log('this', this)


	  
	 //  	if( this.length > 0 && thisMapped.indexOf(item[0] !== -1) && thisMappedFindIndex !== -1) {

		// 	obj[item[0]] =  item[1] - this[thisMappedFindIndex][1];

		// } else {
							
		// 	obj[item[0]] = item[1]

		// 		};
							
		// console.log('thisMappedFindIndex',thisMappedFindIndex)
		// console.log('obj', obj)

		return arr;
	// },vm.letters)
} // end of letterDifference function
// console.log('vm.letterDifference', letterDifference())

vm.results = letterDifference();
// vm.results.sort()

// console.log('results', vm.results)



				}
		})
})()